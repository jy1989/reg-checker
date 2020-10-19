//var striptags = require('striptags');
const rp = require('request-promise')

async function checker(no) {

    var options = {
        method: 'POST',
        url: `https://passport3.pcauto.com.cn/passport3/api/validate_mobile.jsp?mobile=${no}&req_enc=UTF-8`,
        json: true
    };


    let { desc } = await rp(options)
    //console.log(desc);
    let isExist = false;
    if (desc.indexOf('已经注册过') >= 0) {
        isExist = true;
    }
    return {
        msg: desc,
        isExist
    }



}
module.exports = {
    checker
}
