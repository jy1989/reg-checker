const puppeteer = require('puppeteer-core');

module.exports = {
    browser: async () => {
        //console.log(process.argv[1])
        return await puppeteer.launch({
            headless: !(process.argv[1].indexOf('test') >= 0),
            devtools: false,
            timeout: 0,
            executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
            //slowMo: 0 // slow down by 250ms
            args: ['--lang=zh-cn'],
            ignoreDefaultArgs: ['--enable-automation']
        });
    }
};
