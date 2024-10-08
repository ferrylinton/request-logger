const path = require("path");
const fs = require('fs');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');


function generateJSFilename({ hash, chunk }) {
    const filename = `${chunk.name}.${hash.slice(0, 8)}.js`;
    const jsFolder = path.resolve(__dirname, "dist", "assets", "js");

    try {
        if (fs.existsSync(jsFolder)) {
            fs.rmSync(jsFolder, { recursive: true, force: true });
        }
    } catch (error) {
        console.log(error);
    }

    return `assets/js/${filename}`;
}

function generateCSSFilename({ hash, chunk }) {
    const filename = `${chunk.name}.${hash.slice(0, 8)}.css`;
    const cssFolder = path.resolve(__dirname, "dist", "assets", "css");

    try {
        if (fs.existsSync(cssFolder)) {
            fs.rmSync(cssFolder, { recursive: true, force: true });
        }
    } catch (error) {
        console.log(error);
    }

    return `assets/css/${filename}`;
}

module.exports = (_env, argv) => {

    return {

        entry: "./src/client/index.tsx",

        output: {
            filename: generateJSFilename,
            chunkFilename: generateJSFilename,
            path: path.resolve(__dirname, "dist"),
            publicPath: "/"
        },

        watchOptions: {
            ignored: ["**/server", "**/node_modules"],
        },

        resolve: {
            alias: {
                "@src": path.join(__dirname, "src"),
            },
            extensions: ['.tsx', '.ts', '.js']
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader",
                    options: { configFile: 'tsconfig.client.json' },
                    exclude: [path.resolve(__dirname, "src", "server"), path.resolve(__dirname, 'node_modules')],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /[\\/]image[\\/].+(png|jpe?g|svg|webp|ico)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "assets/image/[name].[hash:8][ext]",
                    }
                }
            ]
        },

        optimization: {
            minimizer: [new CssMinimizerPlugin(), "..."],
            splitChunks: {
                cacheGroups: {
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        name: 'vendor-react',
                        chunks: 'all',
                    },
                    styles: {
                        name: "styles",
                        test: /\.css$/,
                        chunks: "all",
                        enforce: true,
                    },
                },
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/client/index.html",
                filename: "index.html",
                favicon: "./src/favicon.ico",
                inject: false,
                minify: false
            }),
            new MiniCssExtractPlugin({
                filename: generateCSSFilename
            }),
            new PurgeCSSPlugin({
                paths: glob.sync(`${path.join(__dirname, 'src', 'client')}/**/*`, { nodir: true }),
            }),
        ],

    }
};