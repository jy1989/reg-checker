//var striptags = require('striptags');
const rp = require('request-promise')

async function checker(no) {

    var options = {
        method: 'GET',
        url: `http://api.passport.pptv.com/checkRegister?loginid=${no}&sceneFlag=1&channel=208000101005`,
        json: true
    };


    let { message } = await rp(options)
    console.log(message);
    let isExist = false;
    if (message.indexOf('已存在此帐号') >= 0) {
        isExist = true;
    }
    return {
        msg: message,
        isExist
    }



}
module.exports = {
    checker
}
