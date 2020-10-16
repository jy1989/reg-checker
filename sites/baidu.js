const { browser } = require('../utils/puppeteer.js');
var striptags = require('striptags');

async function checker(no) {
    let t = await browser();
    //console.log(t)
    const page = await t.newPage();

    await page.setViewport({
        width: 2400,
        height: 880
    })

    const navigationPromise = page.waitForNavigation()


    await page.goto(`https://wappass.baidu.com/passport/?regpad&u=https%3A%2F%2Fwww.baidu.com%2F&tpl=mn&regtype=1`, { waitUntil: 'networkidle2', timeout: 999999999 })
    await navigationPromise
    await page.type('#TANGRAM__11__phone', no, { delay: 0 })
    await page.$eval('#TANGRAM__11__phone', e => e.blur());
    await page.waitForSelector('.pass-confirmContent-msg');
    let msg = await page.$eval('.pass-confirmContent-msg', el => el.innerHTML);
    msg = striptags(msg);
    await t.close();
    return {
        msg: msg,
        isExist: msg.indexOf('已注册') > 0
    }







}

module.exports = {
    checker
}
