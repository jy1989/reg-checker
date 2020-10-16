const { browser } = require('../utils/puppeteer.js');
var striptags = require('striptags');



const rp = require('request-promise')
async function checker(no) {
    var options = {
        method: 'post',
        uri: `https://passport.tuniu.com/register/isPhoneAvailable`,
        qs: {
            intlCode: '0086',
            tel: no
        },
        json: true
    };

    let { errmsg } = await rp(options)
    let isExist = true;
    if (errmsg.indexOf('可以注册') >= 0) {
        isExist = false;
    }
    return {
        msg: errmsg,
        isExist
    }

}
module.exports = {
    checker
}
