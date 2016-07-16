# React 单页面应用结构总结

> - React：页面展示
> - Redux：数据控制
> - react-router：路由控制
> - webpack：打包发布
> - sass：主题控制
> - nginx：静态页面服务器


## — React：页面展示
> 1. 路由页面
> 1. 通用组件
> 1. 静态资源

### —— 路由页面 --> containers

    1. index来控制所有页面
    2. 样式采用sass并且用文件夹形式整理一起
    3. 页面唯一使用的图片，最好放在同一个文件夹下，然后用 webpack require

### —— 通用组件 --> components

    1. index来控制所有组件
    2. 样式采用sass并且用文件夹形式整理一起
    3. 组件使用的图片，放在同一个文件夹下，然后用 webpack require

### —— 静态资源 --> static

    1. 直接调用



## — Redux：数据控制
> 1. actions
> 1. reducers
> 1. middleware


### —— actions --> 请求数据与改变state状态
### —— reducers --> 共同组成state树

    1. 每个页面一个module，同一个页面的acitons和reducers放在一起
    2. 用index来维护所有的需要外界调用的actions
    3. 用reducer.js来将所有页面的reducers管理与合并起来

### —— middleware --> 中间件

    1. redux-thunk => 便于在 aciton 中 dispatch
    2. react-router-redux => 便于在 state 中获取路由信息
    3. redux-devtools => 便于开发调试

## — react-router：路由控制
> 1. store
> 1. onEnter
> 1. 全局思维


    store --> redux 创建的 store 用于 dispatch 到 state 树中
    onEnter --> 控制页面的进入，相当于在页面进入前搞一些事情
    全局思维 --> 如果是全局需要的数据，绝对不在页面中处理。可以在onEnter，可以在App


## — webpack：打包发布
    首屏优化的最佳解决方案



## — sass：主题控制
    用sass语法来提升编写样式的速度，并且管理样式

## — nginx：静态页面服务器

```
# /nginx.config

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;


    sendfile        on;

    keepalive_timeout  65;

    #gzip  on;

    include        vhosts/*;
}

```
```
# /vhosts/erp-web.config

server {
    listen       8010;
    server_name  localhost;

    root /Users/jasonff/project/erp-web;

    gzip on;

    location / {
        try_files $uri @fallback;
    }

    location @fallback {
        rewrite .* /index.html break;
    }


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

}


```
