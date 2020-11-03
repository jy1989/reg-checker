const { browser } = require('../utils/puppeteer.js');
const { delay } = require('../utils/util.js');
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

    await page.goto(`https://passport.meituan.com/account/unitivesignup`, { waitUntil: 'networkidle2', timeout: 10000 })
    await navigationPromise
    await page.type('input[name=mobile]', no, { delay: 0 })
    await page.$eval("body > div.content > div.J-unitive-signup-form > div > form > div.form-field.form-field--vbtn > div.verify-wrapper > input", element => element.click())
    await delay(1000)

    // await page.$eval('input[name=mobile]', e => e.blur());
    let msg = '';
    let isExist = false;
    try {

        //await page.waitForSelector('#J-verify-tip', { timeout: 8000 });
        msg = await page.$eval('#J-verify-tip', el => el.innerHTML);
        //console.log(msg)
        msg = striptags(msg);
        if (msg.indexOf('已经注册') >= 0) {
            isExist = true
        }
    }
    catch (err) {
        //await page.waitForSelector('.icon_succ', { timeout: 5000 });
        //isExist = false;
        console.error(err)
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
