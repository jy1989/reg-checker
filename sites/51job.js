const rp = require('request-promise')
async function checker(no) {
    var options = {
        method: 'post',
        uri: `https://login.51job.com/ajax/checkinfo.php?value=${no}&nation=CN&type=mobile`
    };

    let result = await rp(options)
    //console.log(result)
    result = result.replace('(', '')
    result = result.replace(')', '')
    result = JSON.parse(result)
    let isExist = true;
    if (result.result === 0) {
        isExist = false;
    }
    return {
        msg: '',
        isExist
    }

}
module.exports = {
    checker
}
