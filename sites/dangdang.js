//var striptags = require('striptags');
const rp = require('request-promise')

function getSetCookie() {
    return new Promise((resolve, reject) => {

        rp.post({ url: `https://login.dangdang.com/p/mobile_checker.php`, form: { mobile: '' } }, function (err, res, body) {
            resolve(res.headers['set-cookie']);
        });
    })
}
async function checker(no) {
    let cookie = await getSetCookie();
    var options = {
        method: 'GET',
        url: `https://login.dangdang.com/p/mobile_checker.php?mobile=${no}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
            'Host': 'login.dangdang.com',
            'Cookie': cookie
        },

    };
    let isExist = await rp(options);
    return {
        msg: '',
        isExist
    }

}
module.exports = {
    checker
}
