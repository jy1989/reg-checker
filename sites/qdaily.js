const { browser } = require('../utils/puppeteer.js');
var striptags = require('striptags');
const rp = require('request-promise')

async function checker(no) {
    let t = await browser();
    //console.log(t)
    const page = await t.newPage();

    await page.setViewport({
        width: 1800,
        height: 1000
    })

    const navigationPromise = page.waitForNavigation()

    await page.goto(`http://www.qdaily.com/articles/65277.html`, { waitUntil: 'networkidle2', timeout: 999999999 })
    await navigationPromise
    //await page.$eval('input[name=username]', e => e.blur());
    let token = await page.$eval("meta[name=csrf-token]", el => el.getAttribute('content'))
    //console.log(token);
    await t.close();
    var options = {
        method: 'post',
        uri: `http://www.qdaily.com/users/sign_in`,
        qs: {
            'user[remember_me]': '1',
            'user[phone]': no,
            'user[password]': '123123',
            'authenticity_token': token,
            'commit': 'Log in'
        },
        json: true
    };


    let isExist = true;
    let result = await rp(options)
    let msg = result.meta.msg;
    if (msg.indexOf('未注册') >= 0) {
        isExist = false
    }

    //console.log(msg)

    return {
        msg: msg,
        isExist: isExist
    }

}

module.exports = {
    checker
}
