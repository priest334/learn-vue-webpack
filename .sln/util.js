'use strict'

const glob = require('glob');
const path = require('path');

function isObjectEmpty(obj) {
    return JSON.stringify(obj) === '{}';
}

function findEntries(root, filter) {
    let files = glob.sync(path.resolve(root, filter));
    let prefix = root.replace(/\\/g, '/');
    let entries = {};
    files.forEach((file) => {
        let name = path.dirname(file);
        name = name.replace(prefix+'/', '');
        entries[name] = file;
    });
    return entries;
}

module.exports = {
    isObjectEmpty,
    findEntries
}
