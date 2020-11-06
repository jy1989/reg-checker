var sites = require('./sites/sites.json');
(async () => {
    let no = process.argv[2]
    console.log('号码 ' + no)
    //console.log(sites)

    let { key, name } = sites[sites.length - 1]


    const { checker } = require('./sites/' + key);
    let result = await checker(no)
    let { msg, isExist } = result
    console.log(`【${name}-${key}】已注册:【${isExist ? '是' : '否'}】 信息【${msg}】`)

    //let isReg = await xuexin(no)
    //console.log(isReg)
})();