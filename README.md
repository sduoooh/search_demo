# search_demo


# 介绍
## 项目整体
search_demo是一个简易的搜索结果展示，初衷是作为多配置切换的聚合搜索器。
目前仅用于可视化某蝉站的仅answer、article搜索结果，主要作为api请求的结果验证。
## server.py 
为简易的转发服务，仅通过http与前端交互，按前端提供的url与headers进行请求，并将结果返回给前端，方便前端绕开浏览器对referer的更改限制。
## config.js
简单的配置信息，包括vite调试服务器的host及后端的url。
注意，经过测试，vite的host应当设置为任意正经域名，启用https，否则蝉站api请求需求的某参数的生成将出错。