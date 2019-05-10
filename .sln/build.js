'use strict'

process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const { isObjectEmpty, findEntries } = require('./util');

const argv = process.execArgv;
const target = '*';
if (argv.length > 0) {
  target = argv[0];
}


function buildTargetWithConfig(config) {
  return new Promise((resolve, reject) => {
    let data = require(config);
    webpack(data(), (err, stats) => {
      if (err) {
        reject(err.stack || err);
      } else if (stats.hasErrors()) {
        let message = '';
        stats.toString('verbose').split(/\r?\n/).forEach(line=>{
          message += `  ${line}\n`;
        });
        reject(message);
      } else {
        resolve(stats.toString({chunks: false, colors: true}));
      }
    });
  });
}

function buildTarget(name) {
  let entries = findEntries(path.resolve('.sln'), `${name}/app.config.js`);
  if (isObjectEmpty(entries)) {
    console.log('Nothing to build!');
    return;
  }
  for (let key in entries) {
    buildTargetWithConfig(entries[key]).then(result => {
      console.log(`----------------- build ${key} successfully ------------------`);
      console.log(result)
      console.log(`----------------- build ${key} successfully ------------------`);
    }, reason => {
      console.log(`----------------- build ${key} failed ------------------`);
      console.log(reason)
      console.log(`----------------- build ${key} failed ------------------`);
    }).catch(err => {
      console.log(`----------------- build ${key} exception ------------------`);
      console.log(err)
      console.log(`----------------- build ${key} exception ------------------`);
    });
  }
}

buildTarget(target);