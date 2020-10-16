const { browser } = require('../utils/puppeteer.js');
var striptags = require('striptags');


async function checker(no) {
    let t = await browser();
    //console.log(t)
    const page = await t.newPage();

    await page.setViewport({
        width: 1800,
        height: 1000
    })

    const navigationPromise = page.waitForNavigation()

    await page.goto(`https://login.sina.com.cn/signup/signup?entry=homepage`, { waitUntil: 'networkidle2', timeout: 999999999 })
    await navigationPromise
    await page.type('input[name=mobile]', no, { delay: 0 })
    await page.$eval('input[name=mobile]', e => e.blur());
    let msg = '';
    let isExist = false;
    try {
        await page.waitForSelector('.erro', { timeout: 5000 });
        msg = await page.$eval('.erro', el => el.innerHTML);
        msg = striptags(msg);
        if (msg.indexOf('已注册') >= 0) {
            isExist = true
        }
    }
    catch (err) {
        await page.waitForSelector('.icon_succ', { timeout: 5000 });
        isExist = false;
    }
    //console.log(msg)
    await t.close();
    return {
        msg: msg,
        isExist: isExist
    }

}

module.exports = {
    checker
}
