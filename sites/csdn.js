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
    await page.goto(`https://passport.csdn.net/forget`, { waitUntil: 'networkidle2', timeout: 999999999 })
    await navigationPromise
    await page.type('input[name=cnPhone]', no, { delay: 0 })
    //await page.$eval('input[name=username]', e => e.blur());
    await page.$eval("#app > div.container-main.container-pc > div.main-content > div.step > div.form-layout.form-horizontal.form-coustom > div:nth-child(5) > div > button", element => element.click())
    //await page.keyboard.press("Enter", { delay: 0 });
    let msg = '';
    let isExist = true;
    try {
        //await page.waitForSelector('#js_err_dom', { timeout: 5000 });
        await page.waitForFunction('document.querySelector("#js_err_dom").innerHTML.length > 0', { timeout: 5000 });
        msg = await page.$eval('#js_err_dom', el => el.innerHTML);
        msg = striptags(msg);
        if (msg.indexOf('不存在') >= 0) {
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
