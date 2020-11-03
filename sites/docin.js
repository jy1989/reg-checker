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

    await page.goto(`https://www.docin.com/app/findPassword`, { waitUntil: 'networkidle2', timeout: 10000 })
    await navigationPromise
    await page.type('input[name=login_email]', no, { delay: 0 })
    await page.$eval("#form1 > div > div.fondPwdB > table > tbody > tr:nth-child(3) > td > input", element => element.click())
    await navigationPromise

    // await page.$eval('input[name=mobile]', e => e.blur());
    let msg = '';
    let isExist = true;
    try {

        await page.waitForSelector('#form1 > div > div.fondPwdB > table > tbody > tr:nth-child(2) > td > div', { timeout: 8000 });
        msg = await page.$eval('#form1 > div > div.fondPwdB > table > tbody > tr:nth-child(2) > td > div', el => el.innerHTML);
        //console.log(msg)
        msg = striptags(msg).replace(/\s+/g, "")
        if (msg.indexOf('还未注册') >= 0) {
            isExist = false
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
