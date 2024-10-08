const useLinearRegression = () => {
	// Code from : https://dev.to/oliverjumpertz/simple-linear-regression-theory-math-and-implementation-in-javascript-51e9
	// Waiting an real ARIMA implementation
	function linearRegression(inputArray, xLabel, yLabel) {
		const x = inputArray.map((element) => element[xLabel]);
		const y = inputArray.map((element) => element[yLabel]);

		const sumX = x.reduce((prev, curr) => prev + curr, 0);
		const avgX = sumX / x.length;

		const xDifferencesToAverage = x.map((value) => avgX - value);
		const xDifferencesToAverageSquared = xDifferencesToAverage.map(
			(value) => value ** 2
		);
		const SSxx = xDifferencesToAverageSquared.reduce(
			(prev, curr) => prev + curr, 
			0
		);

		const sumY = y.reduce((prev, curr) => prev + curr, 0);
		const avgY = sumY / y.length;

		const yDifferencesToAverage = y.map((value) => avgY - value);
		const xAndYDifferencesMultiplied = xDifferencesToAverage.map(
			(curr, index) => curr * yDifferencesToAverage[index]
		);

		const SSxy = xAndYDifferencesMultiplied.reduce(
			(prev, curr) => prev + curr,
			0
		);

		const slope = SSxy / SSxx;
		const intercept = avgY - slope * avgX;

		return (x) => intercept + slope * x;
	}

	return linearRegression;
}

export { useLinearRegression };