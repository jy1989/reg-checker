const rp = require('request-promise')
async function checker(no) {
    var options = {
        method: 'post',
        uri: `https://account.chsi.com.cn/account/checkmobilephoneother.action`,
        qs: { mphone: no, dataInfo: no, optType: 'REGISTER' },
        json: true
    };

    let isNotExist = await rp(options)
    //console.log(result);
    return {
        msg: "",
        isExist: !isNotExist
    }

}
module.exports = {
    checker
}
