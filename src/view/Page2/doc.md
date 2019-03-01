# 单机部署k8s并部署tomcat服务

## 目录

* [基本安装](#基本安装)
* [k8s集群初始化](k8s集群初始化)
* [安装过程中遇到的问题](安装过程中遇到的问题)
* [安装完成后的配置](安装完成后的配置)
* [配置tomcat RC](配置tomcatRC)
* [配置tomcat service](配置tomcatservice)
* [查看战果](查看战果)
* [总结](总结)

## 开始

### 环境

基本配置

| 内容 | 参数 |
| --- | --- |
| 操作系统 | centos7 |
| 机器环境 | VMware虚拟机（mac） |
| 部署目标 | tomcat任意版本 |

虚拟机配置

| 内容 | 参数 |
| --- | --- |
| 网卡模式 | NAT |
| CPU核心数 | 2 |
| 内存 | 2G |
### 基本安装
安装`docker`
```
// 安装docker
$ yum install -y docker-ce
// 开机启动 && 启动服务
$ systemctl enable docker && systemctl start docker
```
安装镜像
> google 镜像并不在docker库中，因此要防止墙的问题，需要找代替镜像
```
// 查看kubeadm镜像
$ kubeadm config images list

// 结果
k8s.gcr.io/kube-apiserver:v1.13.3
k8s.gcr.io/kube-controller-manager:v1.13.3
k8s.gcr.io/kube-scheduler:v1.13.3
k8s.gcr.io/kube-proxy:v1.13.3
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.2.24
k8s.gcr.io/coredns:1.2.6

// 执行如下脚本（没有翻墙的同学只能通过阿里云镜像或者其他镜像）
$ for i in `kubeadm config images list`; do 
  imageName=${i#k8s.gcr.io/}
  docker pull registry.aliyuncs.com/google_containers/$imageName
  docker tag registry.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
  docker rmi registry.aliyuncs.com/google_containers/$imageName
done;

// 开机启动 && 启动服务
$ systemctl enable kubelet && systemctl start kubelet
```

### k8s集群初始化

```
// 安装命令
$ kubeadm init
```
### 安装过程中遇到的问题
```
[ERROR NumCPU]: the number of available CPUs 1 is less than the required 2

// 解决：
// 虚拟机修改配置
```

```
[ERROR FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables contents are not set to 1

// 解决：
// 编辑配置
$ vi /etc/sysctl.conf
// 添加如下内容
net.bridge.bridge-nf-call-iptables = 1
```

```
[ERROR Swap]: running with swap on is not supported. Please disable swap

// 解决：
// 禁用swap功能
swapoff -a

// 修改配置
$ vi /etc/fstab
# 注释如下内容
# k8s need disabled
# /dev/mapper/centos-swap swap                    swap    defaults        0 0
```
安装成功
```
Your Kubernetes master has initialized successfully!
```
### 安装完成后的配置
```
// 安装成功后根据提示配置
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
// master 参与工作（单机模式必备）
kubectl taint nodes --all node-role.kubernetes.io/master-
```
> 这边有一个BUG遇到，实际服务器可能不存在，但是虚拟机使用NAT模式，并且网卡配置为dhcp模式，动态获取ip
> 导致一些里问题
> eg：coredns 启动失败
> eg：kube-apiserver-localhost.localdomain 启动失败
> 解决改为静态配置

```
BOOTPROTO=static

// ...省略...

# ip 为自己实际环境ip
IPADDR=192.168.228.128
GATEWAY=192.168.228.2
NETMASK=255.255.255.0
DNS1=8.8.8.8
DNS2=114.114.114.114
```
查看k8s集群情况(现在只有system pod)
```
$ kubectl get pods --all-namespaces

// 结果如下
kube-system   coredns-86c58d9df4-48pxx                        1/1     Running   0          6m10s
kube-system   coredns-86c58d9df4-wdlmr                        1/1     Running   0          6m10s
kube-system   etcd-localhost.localdomain                      1/1     Running   0          5m22s
kube-system   kube-apiserver-localhost.localdomain            1/1     Running   0          5m18s
kube-system   kube-controller-manager-localhost.localdomain   1/1     Running   0          5m4s
kube-system   kube-proxy-56m56                                1/1     Running   0          6m10s
kube-system   kube-scheduler-localhost.localdomain            1/1     Running   0          5m18s
kube-system   weave-net-585s5                                 2/2     Running   0          60s
```
开启单机模式
```
$kubectl taint nodes --all node-role.kubernetes.io/master-
```

查看master节点情况
> 不要慌，这里`NotReady` 完全正常
> 安装网卡插件后，查询即可变为`Ready`
```
$ kubectl get nodes
// 结果
localhost.localdomain   NotReady    master   144m   v1.13.3
```

安装网络插件
```
// 这边有很多选择，本次使用`weave`
// 配置地址 https://kubernetes.io/docs/concepts/cluster-administration/addons/

$ kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

开通必要端口号 防止不必要的问题出现
```
// 6443
firewall-cmd --zone=public --add-port=6443/tcp --permanent && firewall-cmd --reload
// 10250
firewall-cmd --zone=public --add-port=10250/tcp --permanent && firewall-cmd --reload
```

### 配置tomcat RC
配置docker镜像
```
// 查看所需要镜像
docker search tomcat
// 下载tag为tomcat的images（默认版本为lasted）
docker pull tomcat
```

> `replicas: 1` pod实例个数为1
> `image: tomcat` docker镜像
> `name: tomcat-demo` rc名称
> `spec:template:` 当运行实例个数小于replicas时候，rc会根据spec:template: 自动生成对应个数pod
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: tomcat-demo
spec:
  replicas: 1
  selector:
    app: tomcat-demo
  template:
    metadata:
      labels:
        app: tomcat-demo
    spec:
      containers:
      - name: tomcat-demo
        image: tomcat
        ports:
        - containerPort: 8080
```
运行配置并查看结果
```
// 运行yaml
$ kubectl create -f tomcat-demo-rc.yaml
// 结果如下
tomcat-demo   NodePort    10.105.57.5   <none>        8080:30001/TCP   14s
```

### 配置tomcat service

> `nodePort: 30001` 映射端口8080:30001
> `name: tomcat-demo` 服务名

`tomcat-demo-svc.yaml`配置文件内容
```
apiVersion: v1
kind: Service
metadata:
  name: tomcat-demo
spec:
  type: NodePort
  ports:
   - port: 8080
     nodePort: 30001
  selector:
    app: tomcat-demo
```
运行配置并查看结果
```
// 运行yaml
$ kubectl create -f tomcat-demo-svc.yaml
// 结果如下
tomcat-demo   NodePort    10.105.57.5   <none>        8080:30001/TCP   14s
```
> `注意` svc与rc文件可以写在同一个yaml中
开通端口号
```
$ firewall-cmd --zone=public --add-port=30001/tcp --permanent && firewall-cmd --reload
```

### 查看战果

浏览器中查看结果 `http://${ip地址}:30001/`

### 总结

> 安装过生中遇到不少坑，但是都都克服了，最后加入tomcat环节我觉得很有必要，作为初学者，很多文章，都在讲“k8s集群”， 各种集群部署文章，跟着流程安装了一圈，对错与否都模棱两可，还是需要一个“可视化的结果”


