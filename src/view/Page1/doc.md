# 记一次后端Tomcat多环境Docker改造

[1](https://baidu.com)

[2](https://baidu.com)

## 背景

> 项目比较小，开发阶段使用云服务器，只有dev环境，当时没有什么任何不适应的情况，项目采用`jenkins+tomcat+nginx`部署
> 但是！
> 项目进入 `uat阶段`-`>pro阶段`的时候，问题来了，环境变多了（开发进入后期，云服务的环境也迁入到机房的物理机），但是配置也跟着复杂了起来，这时候我想到了docker（这不是最适合`docker`的情景，但是用`docker`之后很爽）
> 一不做而不休，撸起袖子打开iterm就把所有环境穿上docker的新衣裳

## 思路

- step1:安装docker
- step2:将所有后端tomcat都替换成docker-tomcat
- step3:修改后端jenkins配置

> 这里考虑过把 jenkins也放入docker，把数据库也放入docker，redis也放入docker
> 1.出于稳定性考虑，数据库服务器已经部署完成，因此不改造db
> 2.目前jenkins控制docker镜像，因此jenkins放入docker个人感觉必要性不大，因此jenkins使用原本jenkins

## 行动

### 安装Docker
> docker 安装啥的这里我不多墨迹，满大街都是文档

```
// todo docker 安装专题（waiting。。。）
```

```
// 清理
yum remove docker*
```
```
// 环境
yum install -y yum-utils device-mapper-persistent-data lvm2
```

```
// 安装
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum -y install docker-ce
```
```
// 查看
docker version
```
![23777d78db86e54c89c730301b095bda.png](static/img1.jpg)

> `ok` docker 准备好了


### 下载Tomcat镜像&准备动作

> 接下来我们把docker加工成我们想要的内容，有心的同学可以自己制作`docker file` 我这里就偷懒使用官方镜像了

```
// 查看服务器镜像，选择人数最多的就可以 或者去官网查询需要版本
docker search tomcat
// `:`后为版本号，默认不写而`lasted`
// 这里我使用tomcat9+jre8版本，详情见docker官网
docker pull tomcat:9.0.14-jre8
```

当前环境如下：

> `dev` 日志重要性不大，日志输出多，频繁重启
> `uat`&`pro`日志很重要，并且需要将日志记录在案，偶尔需要重启

因此采取如下方案：
> 1.所有环境使用volumes挂载公共路径
> 2.所有环境使用volumes挂载webapp目录方便jenkins自动部署
> 3.`uat`&`pro`环境使用volumes持久化存储logs目录下日志
> 使用配置容器将上述内容配置起来（并不需要启动容器，仅仅提供配置）
> 4.环境略多，将上述内容编写shell脚本方便使用

```
#!/bin/sh
BASE="$0"

ENV="$1"

# 简单校验 参数传入
if [ ! $ENV ] ;then
    echo "[$BASE ENV] ENV not empty";
    exit 1;
else
    echo "<-BEGIN->"
fi
# dev 环境
if [$ENV = "dev"] ; then
docker create --name conf-tomcat-$ENV \
-v /home/tomcat/$ENV/elastic:/usr/local/shareDir \
-v /home/tomcat/$ENV/conf:/usr/local/tomcat/conf \
-v /home/tomcat/$ENV/webapp:/usr/local/tomcat/webapps \
tomcat
else
# 其他环境
docker create --name conf-tomcat-$ENV \
-v /home/tomcat/$ENV/elastic:/usr/local/shareDir \
-v /home/tomcat/$ENV/conf:/usr/local/tomcat/conf \
-v /home/tomcat/$ENV/webapp:/usr/local/tomcat/webapps \
-v /home/tomcat/$ENV/logs:/usr/local/tomcat/logs \
tomcat
fi

echo "<-END->"
```

```
// `ok` 准备完成->运行脚本->查看配置情况
// 记得`-a` 不加参数看不到未启动容器（未启用+异常退出）
docker ps -a

// 记得给文件夹授予操作权限
// 偷懒可以 chown -R 777 文件夹/
```

不废话，容器运行起来！：
```
// 运行tomcat容器
// 继承对应配置
// 映射宿主机器端口
// 直接运行
// 容器重命名
docker run -itd -h 8080:8080 --volumes-from conf-dev --name tomcat-uat tomcat:9.0.14-jre8
```

```
// 瞄一眼容器启动情况（没错很稳！）
docker ps
```
> 到这里docker容器准备已经完成，就等着jenkins使用呢！


### Jenkins 配置
> jenkins 安装也是满大街都是，可以压缩包，可以直接安装，也可以扔到docker里，反正你高兴就行。
```
// todo 很详细的jenkins安装 （waiting。。。）
```

```
// 把jenkins用户加到docker分组中，让jenkins拥有操作cocker权限
// 这步无限重要
usermod -a docker jenkins
```

> 不管三七二十我们先把jenkins创建一个（假装是一个，其他的都是以后复制的）
> 配置jenkins
> 这里需要注意`name=`后面需要写正则表达式，如果不加`^`那么会把我的`配置容器tomcat-env-conf`一起启动起来，虽然没影响，但是浪费资源，而且，如果不小心把其他测试容器弄起来，很吓人的。
```
# 进入打包目录，这里我叫`core`小伙伴可以根据`pom`的`finalName`来自己改动
cd core
ENV=dev
/usr/local/maven/bin/mvn clean package -P$ENV
cd target
rm -rf /home/tomcat/$ENV/webapp/core-$ENV.war
mv core.war /home/tomcat/$ENV/webapp/core-$ENV.war
# 喵一眼镜像情况，方便查看
docker ps -a
# 重启我们需要的镜像
docker restart `docker ps -aq   --filter name="^tomcat-$ENV\$"`
```

> ok 完成配置，启动一下喵一眼，并且把其他环境配置起来，复制工程即可

### 前端改造

```
// todo 前端多环境，下一次改造一波。
```

## 总结

> docker 准备的期间略显麻烦，但是当来到jenkins的步骤的时候，就已经可以明显的体会到docker的方便，不仅配置少了很多，并且管用用户的处理也更加方便（之前jenkins要处理tomcat那可是要不少麻烦事情，可能有偷懒的小伙伴直接改成root，但是安全隐患又成一个问题）

