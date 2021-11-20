const { execSync } = require('child_process');
const fs = require("fs");

const log = (text, color) => {
    if (color === undefined) {
        console.log(text);
        return;
    }
    try {
        console.log(require('chalk')[color](text));
    } catch(error) {
        console.log(text);
    }
}

const checkAndInstallNodeModules = (path) => {
    log(`Checking for ${path}/node_modules...`);
    if (!fs.existsSync(`${path}/node_modules`)) {
        try {
            log(`Installing node modules...`, 'blue');
            execSync(`cd ${path} && npm ci`);
            log(`Node modules installed`, 'green');
            return;
        } catch(error) {
            console.log(error);
        }
    }
    log(`\t${path}/node_modules exists`, 'green');
}

const benchWebpackLoader = (folder) => new Promise((resolve) => {
    try {
        const start = Date.now();
        execSync(`cd ${folder} && npm run build`);
        const end = Date.now();
        const buildTime = end - start;
        resolve(buildTime);
    } catch(error) {
        console.log(error);
    }
});

checkAndInstallNodeModules('.');
checkAndInstallNodeModules('./typescript-with-swc');
checkAndInstallNodeModules('./typescript-with-tsc');

const chalk = require('chalk');

const times = parseInt(process.argv.slice(2)[0], 10) || 1;

log(`Running production builds for ${times} times...\n`);

let benchTimes = 0;

const bench = async () => {
    log(`Running production builds...\n`);
    const [SWCResult, tsLoaderResult] = await Promise.all([
        benchWebpackLoader('typescript-with-swc'),
        benchWebpackLoader('typescript-with-tsc')
    ]);

    const diff = tsLoaderResult - SWCResult;
    
    const formattedSWCResult = new Intl.NumberFormat('fr', { maximumSignificantDigits: 3 }).format(SWCResult);
    const formattedTsLoaderResult = new Intl.NumberFormat('fr', { maximumSignificantDigits: 3 }).format(tsLoaderResult);
    const formattedDiff = new Intl.NumberFormat('fr', { maximumSignificantDigits: 3 }).format(diff);
    const formattedSWCDiff = chalk.red(diff < 0 ? `+${Math.abs(formattedDiff)} ms` : '');
    const formattedTsLoaderDiff = chalk.red(diff > 0 ? `+${formattedDiff} ms` : '');

    console.log(`SWC: ${formattedSWCResult} ms \t\t ${formattedSWCDiff}`);
    console.log(`ts-loader: ${formattedTsLoaderResult} ms \t\t ${formattedTsLoaderDiff}`);

    benchTimes++;

    if (benchTimes < times) {
        bench();
    }
}

bench();