#!/usr/bin/env node
var program = require('commander'),
    colors = require('colors'), // подсветка вывода данных
    config = {
        "autoTag": true,
        "host": null,
        "pathFilterRegexp": false,
        "clearCookies": false,
        "customCookies": false,
        "customHeaders": [
            {
                "name": "User-Agent",
                "value": "yandex-tank yandex-tank/har2ammo"
            }
        ]
    };


var Har2Ammo = require('..');


program
    .version('0.1.5')
    .option('-i, --input <file>', 'path to HAR file')
    .option('-o, --output <file> [required]', 'path to ammo.txt file')
    .option('-h, --host <hostname>', 'base host, strong val')
    .option('-c, --config <file> [required]', 'parh to config file')
    .parse(process.argv);

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    har2ammo -i input.har -o ammo.txt');
    console.log('    har2ammo -c config.json -i input.har -o ammo.txt');
    console.log('');
});

program.parse(process.argv);

if (!program.input) {
    program.help();
    process.exit(0);
}

var har2ammo = new Har2Ammo(program, config, handler);

function handler(error, data) {
    if (error) {
        console.error(error.red);
        process.exit(1);
    }
    console.log(data);
};
