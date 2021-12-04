const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Compilation } = require("webpack");

class TestPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap({ name: this.constructor.name }, (compilation) => {
            return compilation.hooks.processAssets.tap(
                { name: this.constructor.name, stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE, },
                (assets) => {
                    console.log(`******Assets: ${JSON.stringify(Object.keys(assets))}`)
                }
            );
        });
    }
}

module.exports = {
    stats: { children: false, modules: false },

    module: {
        rules: [
            { test: /\.aaa$/i, use: { loader: 'file-loader', options: { name: '[name].[ext]' } } },
            { test: /\.bbb$/i, type: 'asset/resource' }
        ],
    },

    output: {
        assetModuleFilename: '[name][ext]',
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new TestPlugin({
            template: "src/index.ejs",
        })
    ]
};
