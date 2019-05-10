'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const OpnWebpackPlugin = require('opn-webpack-plugin')

const { isObjectEmpty, findEntries } = require('./util');


const argv = process.execArgv;
const target = '*';
if (argv.length > 0) {
    target = argv[0];
}

const rootDir = `./dist/${target}`;

let hotMiddleware = null;

function startTargetWithConfig(config, port=88) {
    return new Promise((resolve, reject) => {
        let data = require(config)();
        data.plugins.push(
            new OpnWebpackPlugin({
                target: `http://127.0.0.1:${port}`,
                options: {}
            }),
            new webpack.HotModuleReplacementPlugin()
        );
        let compiler = webpack(data);
        hotMiddleware = WebpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500
        });

        compiler.hooks.compilation.tap('compilation', compilation => {
            compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
                hotMiddleware.publish({ action: 'reload' });
                cb();
            })
        });

        let server = new WebpackDevServer(
            compiler,
            {
                contentBase: path.resolve(rootDir),
                quiet: true,
                before (app, ctx) {
                    app.use(hotMiddleware);
                    ctx.middleware.waitUntilValid(() => {
                        resolve()
                    });
                }
            }
        )
        server.listen(port);
        resolve(`server running on ${port}`);
    })
}

function startTarget(name) {
    let entries = findEntries(path.resolve('.app'), `${name}/app.config.js`);
    if (isObjectEmpty(entries)) {
        console.log('Nothing to build!');
        return;
    }
    let default_port = 8081
    for (let key in entries) {
        startTargetWithConfig(entries[key], default_port).then(result => {
            console.log(`${key}: ${result}`);
        });
        default_port += 1;
    }
}

startTarget(target);
