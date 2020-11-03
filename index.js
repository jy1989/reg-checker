var sites = require('./sites/sites.json');
(async () => {
    let no = process.argv[2]
    let choiceSites = process.argv[3] ? process.argv[3].split(',') : []
    //console.log(choiceSites)
    console.log('号码 ' + no)
    //console.log(sites)
    for (let i in sites) {
        let { key, name, enable } = sites[i]
        if (!enable || (choiceSites.length > 0 && !choiceSites.includes(key))) {
            continue;
        }

        const { checker } = require('./sites/' + key);
        let result = await checker(no)
        let { msg, isExist } = result
        console.log(`${parseInt(i) + 1}【${name}-${key}】 已注册:【${isExist ? '是' : '否'}】 信息【${msg}】`)
    }
    //let isReg = await xuexin(no)
    //console.log(isReg)
})();