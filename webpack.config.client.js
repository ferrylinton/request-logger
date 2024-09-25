const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { config } = require("dotenv");

module.exports = (_env, argv) => {

    return {

        entry: "./src/client/index.tsx",

        output: {
            filename: "assets/js/[name].[fullhash].js",
            chunkFilename: 'assets/js/[name].[contenthash].bundle.js',
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
                },
                {
                    test: /favicon.ico/,
                    type: "asset/resource",
                    generator: {
                        filename: "favicon.ico"
                    },
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
                },
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/client/index.html",
                filename: "index.html",
                inject: false,
                minify: false
            }),
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash].css"
            }),
        ],

    }
};