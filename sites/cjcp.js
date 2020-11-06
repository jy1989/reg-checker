//var striptags = require('striptags');
const rp = require('request-promise')

async function checker(no) {

    var options = {
        method: 'POST',
        url: `https://www.cjcp.com.cn/member/ajax_sjbd.php?uname=${no}&action=uname_mobile_yz`
    };


    let res = await rp(options)
    res = res.replace(/\s+/g, "")
    //console.log(res);
    let isExist = false;
    if (res == '2') {
        isExist = true;
    }
    return {
        msg: res,
        isExist
    }



}
module.exports = {
    checker
}
