const puppeteer = require('puppeteer-core');

module.exports = {
    browser: async () => {
        return await puppeteer.launch({
            headless: true,
            devtools: false,
            timeout: 0,
            executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
            //slowMo: 0 // slow down by 250ms
            args: ['--lang=zh-cn']
        });
    }
};
