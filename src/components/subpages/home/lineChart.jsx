import React, { useState, useEffect, useRef } from 'react';
import { useLinearRegression } from '../../../hooks/useLinearRegression';

import { Line } from 'react-chartjs-2';
import { 
	Chart as ChartJS,
	Filler,
	CategoryScale,
	LinearScale, 
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(
	Filler,
	CategoryScale,
	LinearScale, 
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = ({ values, time }) => {
	const valuesNumber = useRef(0);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				display: false
			},
			title: {
				display: false,
				text: 'User charts'
			},
			verticalLine: {}
		},
		scales: {
			x: {
				// border: { display: false },
				grid: {
					display: false,
					borderWidth: 3,
				},
				ticks: { display: false }
			},
			y: {
				// border: { display: false },
				grid: {
					display: false,
					borderWidth: 3,
				},
				ticks: { display: false }
			}

		},
		maintainAspectRatio: false
	};

	const formattedData = (function () {
		if (values.length == 0) return [];

		let elm = [...Array(time === "10years" && 120 || time === "1year" && 12 || time === "3months" && 90 || time === "30days" && 30 || time === "7days" && 7).keys()];

		const formattedValues = Object.keys(values).map(key => {
			return { x: parseInt(key - 1), y: values[key] };
		});

		Object.keys(formattedValues).forEach(key => {
			elm.splice(formattedValues[key].x, 1);
		});

		elm = elm.map(elm => ({x: elm, y: 0}));

		elm.forEach(obj => {
			formattedValues.splice(obj.x, 0, obj);
		});

		valuesNumber.current = formattedValues.length;

		return formattedValues;
	})();

	const linearReg = useLinearRegression();

	const [data, setData] = useState({
		labels: [],
		datasets: [{}]
	});

	const verticalLinePlugin = {
		id: 'verticalLine',
		afterDatasetsDraw: (chart) => {
			const ctx = chart.ctx;
			const index = valuesNumber.current - 1;  // Position où la ligne doit être dessinée (basée sur l'index du point)
			const xScale = chart.scales.x;
			const yScale = chart.scales.y;
			
			const x = xScale.getPixelForValue(index);  // Calculer la position X pour la ligne verticale

			// Dessiner la ligne verticale
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x, yScale.top);
			ctx.lineTo(x, yScale.bottom - 15);
			ctx.lineWidth = 4;
			ctx.strokeStyle = '#6779A6';  // Couleur de la ligne
			ctx.lineCap = "round";
			ctx.setLineDash([5, 15]);
			ctx.stroke();
			ctx.restore();

			// Écrire le texte "TODAY" en dessous
			ctx.save();
			ctx.textAlign = 'center';
			ctx.fillStyle = '#6779A6';
			ctx.fillText("TODAY", x, yScale.bottom - 3);  // Position du texte
			ctx.restore();
		}
	};

	useEffect(() => {
		const func = linearReg(formattedData, 'x', 'y');

		setData({
			labels: [...Array(valuesNumber.current + 3).keys()],
			datasets: [{
				label: 'Past',
				data: formattedData,
				borderColor: "#FF6384",
				backgroundColor: (context) => {
					const bgColor = [];

					if (!context.chart.chartArea) return;
					const {
						ctx,
						data,
						chartArea: { top, bottom }
					} = context.chart;

					const gradient = ctx.createLinearGradient(0, top, 0, bottom);
					gradient.addColorStop(0, "rgba(255, 177, 193, 1)");
					gradient.addColorStop(1, "rgba(255, 177, 193, 0)");
					return gradient;
				},
				tension: .4,
				borderWidth: 1,
				fill: "start",
				pointRadius: 4,
				pointHoverRadius: 6,
				order: 4,
				z: 4,
			}, {
				label: 'Forecast',
				data: [
					formattedData.at(-1),
					{x: valuesNumber.current, y: func(valuesNumber.current)},
					{x: valuesNumber.current + 1, y: func(valuesNumber.current + 1)},
					{x: valuesNumber.current + 2, y: func(valuesNumber.current + 2)}
				],
				borderColor: "#FFCD56",
				backgroundColor: (context) => {
					const bgColor = [];

					if (!context.chart.chartArea) return;
					const {
						ctx,
						data,
						chartArea: { top, bottom }
					} = context.chart;

					const gradient = ctx.createLinearGradient(0, top, 0, bottom);
					gradient.addColorStop(0, "rgba(255, 230, 170, 1)");
					gradient.addColorStop(1, "rgba(255, 230, 170, 0)");
					return gradient;
				},
				borderWidth: 1,
				fill: "start",
				tension: 0,
				pointRadius: 4,
				pointHoverRadius: 6,
				order: 2,
				z: 2
			}]
		});
	}, [values, valuesNumber.current])

	return (
		<div style={{marginTop: "20px", height: "300px"}}>
			<Line
				options={options}
				data={data}
				plugins={[verticalLinePlugin]}
			/>
		</div>
	)
}

export default LineChart;