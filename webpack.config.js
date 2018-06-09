/*module.exports = {
    entry: __dirname + "/src/index.js",     //入口文件
    output: {
        path: __dirname + "/html",          //打包后的文件存放的地方
        filename: "pack.js"               //打包后输出文件的文件名
    }
}*/
module.exports = {
	entry: {
        "index" : __dirname + "/src/js/index.js"
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js/,
            use: {
                loader: "babel-loader",
                options: {presets: ["env"]}
            },
            exclude: /node_modules/			
        },
        {
			test: /\.(scss|css)/,
			use:[
				{loader: 'style-loader'},
				{loader: 'css-loader'},
				{loader: 'sass-loader'}
			]
		}]
    }
}