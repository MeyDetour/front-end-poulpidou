import React, { useState, useEffect, useRef } from 'react';
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

const LineChart = ({ values }) => {
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

	const formattedData = Object.keys(values).map(key => {
		return { x: parseInt(key - 1), y: values[key] };
	});

	console.log(formattedData)
	const data = {
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
			tension: .2,
			borderWidth: 1,
			fill: "start",
			pointRadius: 5,
			pointHoverRadius: 10,
			order: 4,
			z: 4,
		}, {
			label: 'Forecast',
			data: [
				{x: valuesNumber - 1, y: 12},
				{x: valuesNumber - 1 + 1, y: 5},
				{x: valuesNumber - 1 + 2, y: 4},
				{x: valuesNumber - 1 + 3, y: 9}
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
			tension: .2,
			pointRadius: 5,
			pointHoverRadius: 10,
			order: 2,
			z: 2
		}]
	};

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

	console.log(Object.keys(values).length)


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