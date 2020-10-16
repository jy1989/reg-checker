# reg-checker
 查询手机号码注册过哪些网站

## 使用

```
> node index.js 13800138000
```
### 注意
此项目用了`puppeteer-core`，需要自行配置一下 [puppeteer.js](./utils/puppeteer.js) 的 `executablePath`，或者自行修改 [package.json](./package.json) 和[puppeteer.js](./utils/puppeteer.js) 的 `puppeteer-core` 为 `puppeteer`再重新安装。

## 效果
```
> node index.js 13800138000
号码 13800138000
1【学信网】 已注册:【是】 信息【】
2【百度】 已注册:【是】 信息【该手机已注册，可以通过密码或短信快捷登录。】
3【新浪】 已注册:【是】 信息【该手机号已注册，请直接登录，忘记密码请点此找回】
5【CSDN】 已注册:【否】 信息【手机号不存在】
6【好奇心日报】 已注册:【否】 信息【该手机号尚未注册】
7【途牛】 已注册:【是】 信息【该手机号已经注册。】
```

## 原理 && 介绍

项目结构简单，主要使用了`pupeteer`和`request-promise` [idaily例子](./sites/qdaily.js)，到各大网站的注册或者登录页中撞手机号， 用以获取是否注册过的信息。

## 欢迎PR