### nginx 安装
```
// 下载
wget http://nginx.org/download/nginx-1.15.7.tar.gz

// 环境安装
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel

// 解压
tar -zxvf nginx-1.15.7.tar.gz
cd nginx-1.15.7.tar.gz

// 配置
./configure --with-stream --with-http_ssl_module

// 编译安装
make && make install

// 查看安装目录 (/usr/local/nginx)
whereis nginx

// 操作命令（/usr/local/nginx/sbin/）
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s 　

// 配置防火墙
firewall-cmd --zone=public --add-port=80/tcp --permanent && firewall-cmd --reload
```
Nginx 代理 Mysql
```
vi /usr/local/nginx/conf/nginx.conf
// 与 http 同级别
// 添加如下内容
stream {

    upstream cloudsocket {
       hash $remote_addr consistent;
       # 指定数据库ip&port
       server {ip}:3306 weight=5 max_fails=3 fail_timeout=30s;
    }
    server {
       # nginx 代理端口
       listen 13306;#数据库服务器监听端口
       proxy_connect_timeout 10s;
       #设置客户端和代理服务之间的超时时间5min
       proxy_timeout 300s;
       proxy_pass cloudsocket;
    }   
}
```

### DAY3 前端环境部署 Node & Yarn
基础环境配置
```
// 添加node库
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
// 添加yarn库（前端使用yarn执行命令）
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

// 安装
yum install yarn -y

// 配置景象 
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
```

前端项目初始化
```
// cd 进入前端代码位置 初始化依赖
yarn install

// 如果出现问题bzip2 : Cannot exec : No such file or directory
// https://blog.csdn.net/baleee/article/details/83895473
yum install bzip2 -y

rm -rf node_modules/
yarn install
```