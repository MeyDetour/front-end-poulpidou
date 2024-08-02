const path = require('path');

module.exports = {
	resolve: {
		fallback: {
			"https": require.resolve("https-browserify"),
			"http": require.resolve("stream-http"),
			"buffer": require.resolve("buffer/"),
			"crypto": require.resolve("crypto-browserify"),
			"stream": require.resolve("stream-browserify")
		}
	}
};
