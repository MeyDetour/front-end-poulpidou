import { Line } from 'react-chartjs-2';
import { 
	Chart as ChartJS,
	CategoryScale,
	LinearScale, 
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale, 
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = ({ type, time }) => {

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
		maintainAspectRatio: false
	};

	const data = {
		labels: [0, 1, 2, 3, 4, 5],
		datasets: [{
			label: 'Past',
			data: [
				{x: 0, y: 10},
				{x: 1, y: 8},
				{x: 2, y: 12}
			],
			borderColor: "#ff6384",
			backgroundColor: "#ffb1c1",
			tension: .1,
			order: 1,
			z: 1
		}, {
			label: 'Forecast',
			data: [
				{x: 2, y: 12},
				{x: 3, y: 5},
				{x: 4, y: 4},
				{x: 5, y: 9}
			],
			borderColor: "#ffcd56",
			backgroundColor: "#ffe6aa",
			tension: .1,
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
			ctx.lineTo(x, yScale.bottom);
			ctx.lineWidth = 4;
			ctx.strokeStyle = '#ffcd56';  // Couleur de la ligne
			ctx.stroke();
			ctx.restore();

			// Écrire le texte "TODAY" en dessous
			// ctx.save();
			// ctx.textAlign = 'center';
			// ctx.fillStyle = '#ffcd56';
			// ctx.fillText("TODAY", x, yScale.bottom + 20);  // Position du texte
			// ctx.restore();
		}
	};


	return (
		<div style={{marginTop: "20px", height: "400px"}}>
			<Line
				options={options}
				data={data}
				plugins={[verticalLinePlugin]}
			/>
		</div>
	)
}

export default LineChart;