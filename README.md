# reg-checker
 查询手机号码注册过哪些网站

## 使用


自选网站
```
> node index.js 13800138000 pptv
```
```
> node index.js 13800138000 meituan,baidu
```

全部运行
```
> node index.js 13800138000
```
### 注意
此项目用了`puppeteer-core`，需要自行配置一下 [puppeteer.js](./utils/puppeteer.js) 的 `executablePath`，或者自行修改 [package.json](./package.json) 和[puppeteer.js](./utils/puppeteer.js) 的 `puppeteer-core` 为 `puppeteer`。

## 效果
```
> node index.js 13800138000
号码 13800138000
1【学信网-xuexin】 已注册:【是】 信息【】
2【百度-baidu】 已注册:【是】 信息【该手机已注册，可以通过密码或短信快捷登录。】
3【新浪-sina】 已注册:【是】 信息【该手机号已注册，请直接登录，忘记密码请点此找回】
5【CSDN-csdn】 已注册:【否】 信息【手机号不存在】
6【好奇心日报-qdaily】 已注册:【否】 信息【该手机号尚未注册】
7【途牛-tuniu】 已注册:【是】 信息【该手机号已经注册。】
8【当当网-dangdang】 已注册:【是】 信息【】
9【太平洋汽车-pcauto】 已注册:【否】 信息【OK】
10【PPTV-pptv】 已注册:【是】 信息【PPTV已存在此帐号，请使用PPTV入口登录】
11【淘男网-taonan】 已注册:【否】 信息【error_phone】
12【前程无忧-51job】 已注册:【是】 信息【】
13【美团-meituan】 已注册:【是】 信息【该手机号已经注册，请直接登录或找回密码】
14【豆丁网-docin】 已注册:【否】 信息【此账号还未注册或验证】
15【彩经网-cjcp】已注册:【是】 信息【2】
```

## 原理 && 介绍

```
├── LICENSE
├── README.md
├── index.js
├── package.json
├── sites
│   ├── 51job.js
│   ├── baidu.js
│   ├── csdn.js
│   ├── dangdang.js
│   ├── docin.js
│   ├── meituan.js
│   ├── pcauto.js
│   ├── pptv.js
│   ├── qdaily.js
│   ├── sina.js
│   ├── sites.json
│   ├── taonan.js
│   ├── tuniu.js
│   ├── xuexin.js
│   └── zhihu.js
├── test-last.js
└── utils
    ├── puppeteer.js
    └── util.js
```

项目结构简单，主要使用了`pupeteer`和`request-promise` [idaily 例子](./sites/qdaily.js)，到各大网站的注册或者登录页中撞手机号，获取手机号码是否注册过。

带验证码或滑动验证的网站还没研究，暂时只实现了一些不带验证码的网站。

## 欢迎PR
