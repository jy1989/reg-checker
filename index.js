var sites = require('./sites/sites.json');
(async () => {
    let no = process.argv[2]
    let singleSite = process.argv[3]
    console.log('号码 ' + no)
    //console.log(sites)
    for (let i in sites) {
        let { key, name, enable } = sites[i]
        if (!enable || (singleSite && singleSite != key)) {
            continue;
        }

        const { checker } = require('./sites/' + key);
        let result = await checker(no)
        let { msg, isExist } = result
        console.log(`${parseInt(i) + 1}【${name}】 已注册:【${isExist ? '是' : '否'}】 信息【${msg}】`)
    }
    //let isReg = await xuexin(no)
    //console.log(isReg)
})();