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
	const [valuesNumber, setValuesNumber] = useState(0);
	useEffect(() => setValuesNumber(Object.keys(values).length), [values]);

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
		let elm = [...Array(time === "10yrs" && 120 || time === "1yr" && 12 || time === "1m" && 30).keys()];

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

		return formattedValues;
	})();

	useEffect(() => {
		setValuesNumber(formattedData.length);
		console.log(formattedData)
	}, [values, formattedData]);

	const linearReg = useLinearRegression();

	const [data, setData] = useState({
		labels: [],
		datasets: [{}]
	});

	const verticalLinePlugin = {
		id: 'verticalLine',
		afterDatasetsDraw: (chart) => {
			const ctx = chart.ctx;
			const index = valuesNumber;  // Position où la ligne doit être dessinée (basée sur l'index du point)
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
		if (Object.keys(values).length === 0) return;

		const func = linearReg(formattedData, 'x', 'y');

		setData({
			labels: [...Array(valuesNumber + 3).keys()],
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
					{x: valuesNumber, y: func(valuesNumber)},
					{x: valuesNumber + 1, y: func(valuesNumber + 1)},
					{x: valuesNumber + 2, y: func(valuesNumber + 2)}
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
			}
			]
		});
	}, [values])

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