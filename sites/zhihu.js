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

    await page.goto(`https://www.zhihu.com/account/password_reset`, { waitUntil: 'networkidle2', timeout: 999999999 })
    await navigationPromise
    await page.type('input[name=username]', no, { delay: 0 })
    //await page.$eval('input[name=username]', e => e.blur());
    //await page.$eval(".PasswordReset-nextStep", element => element.click())
    await page.keyboard.press("Enter", { delay: 0 });
    let msg = '';
    let isExist = true;
    try {
        await page.waitForSelector('.SignFlowInput-errorMask', { timeout: 5000 });
        msg = await page.$eval('.SignFlowInput-errorMask', el => el.innerHTML);
        msg = striptags(msg);
        if (msg.indexOf('未注册') >= 0) {
            isExist = false
        }
    }
    catch (err) {

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
