var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
	context: __dirname + '/src/',
	entry: './js/main.js',
	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), exclude: /node_modules/ },
			{ test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less'), exclude: /node_modules/ },
			{ test: /\.png$/, loader: 'url', exclude: /node_modules/ },
			{ test: /\.(eot|svg|ttf|woff|otf|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]', exclude: /node_modules/ }
		]
	},
	plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true })
    ],
	resolveLoader: {
		root: __dirname + '/node_modules/'
	}
}

if(process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/public';
	config.plugins = [(new webpack.optimize.UglifyJsPlugin())];
}

module.exports = config;