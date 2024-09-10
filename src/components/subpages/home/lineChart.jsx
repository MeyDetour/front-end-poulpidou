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
		return { x: parseInt(key), y: values[key] };
	});
	console.log(formattedData)
	const data = {
		labels: [0, 1, 2, 3, 4, 5],
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
				gradient.addColorStop(0, "#FFB1C1");
				gradient.addColorStop(1, "#FCFCFC");
				return gradient;
			},
			tension: .1,
			borderWidth: 1,
			fill: "start",
			pointRadius: 5,
			pointHoverRadius: 10,
			order: 4,
			z: 4,
		}, {
			label: 'Forecast',
			data: [
				{x: 2, y: 12},
				{x: 3, y: 5},
				{x: 4, y: 4},
				{x: 5, y: 9}
			],
			borderColor: "#ffcd56",
			backgroundColor: (context) => {
				const bgColor = [];

				if (!context.chart.chartArea) return;
				const {
					ctx,
					data,
					chartArea: { top, bottom }
				} = context.chart;

				const gradient = ctx.createLinearGradient(0, top, 0, bottom);
				gradient.addColorStop(0, "#FFE6AA");
				gradient.addColorStop(1, "#FCFCFC");
				return gradient;
			},
			borderWidth: 1,
			fill: "start",
			tension: .1,
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
			const index = 2;  // Position où la ligne doit être dessinée (basée sur l'index du point)
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