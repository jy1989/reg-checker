const { browser } = require('../utils/puppeteer.js');
var striptags = require('striptags');



const rp = require('request-promise')
async function checker(no) {
    var options = {
        method: 'post',
        uri: `http://www.taonanw.com/?page=mobile_find_psd`,
        qs: {

            mobile: no
        },
        json: true
    };

    let result = await rp(options)
    //console.log(result)
    let isExist = true;
    if (result == 'error_phone') {
        isExist = false;
    }
    return {
        msg: result,
        isExist
    }

}
module.exports = {
    checker
}
