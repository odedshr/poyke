const modules = [{ entry: './src/server/index.ts', filename: './server.js', target: 'node' }];

module.exports = modules.map(({ entry, externals = {}, filename, target }) => ({
	mode: 'development',
	entry,
	target,
	externals,
	devtool: 'inline-source-map',
	output: {
		filename
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [{ test: /\.html?$/, loader: 'html-loader' }],
		rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
	}
}));
