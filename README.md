
# rn-bugly

[![npm version](http://img.shields.io/npm/v/rn-bugly.svg?style=flat-square)](https://npmjs.org/package/rn-bugly "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/rn-bugly.svg?style=flat-square)](https://npmjs.org/package/rn-bugly "View this project on npm")

bugly for react-native,支持统计，android支持应用全量升级

## 安装

> `$ npm install rn-bugly --save`

* react-native <0.60

> `$ react-native link rn-bugly`

* react-native >=0.60

新版RN会自动link,不需要执行link命令

---
不管是哪个版本的react-native，ios端都需要在`ios`文件夹下执行
```shell
$ cd ios
$ pod install
```


### 配置
#### iOS
`AppDelegate.m`
```
#import "RNBugly.h"
-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  //初始化bugly，会自动读取info.plist中的参数
  [RNBugly startWithAppId];
	return YES;
}
```
`info.plist`文件读取SDK初始化参数，可配置的参数如下(`除Appid为必填外，其它可选`)：
```
- Appid
    - Key: BuglyAppIDString
    - Value: 字符串类型
- 渠道标识
    - Key: BuglyAppChannelString
    - Value: 字符串类型
- 版本信息
    - Key: BuglyAppVersionString
    - Value: 字符串类型
- 开启Debug信息显示
    - Key: BuglyDebugEnable
    - Value: BOOL类型
```

#### Android
`MainApplication.java`(依旧可以用Bugly.init进行初始化，下面两个方法只是对Bugly.init的简单封装)
```
import com.reactlibrary.bugly.RNBuglyModule;

@Override
public void onCreate() {
  super.onCreate();

  ...

  ** 下面的方法根据情况二选一 **

  //参数解析：
  //参数1：上下文对象
  //参数2：注册时申请的APPID
  //参数3：是否开启debug模式，true表示打开debug模式，false表示关闭调试模式

  //初始化并且自动检查更新
  RNBuglyModule.init(getApplicationContext(),"注册时申请的APPID",false);

  //仅仅初始化(推荐使用该方法，所有的检查更新触发都都js端，更加灵活)
  RNBuglyModule.initWithoutAutoCheckUpgrade(getApplicationContext(),"注册时申请的APPID",false);
}
```

## 使用
```javascript
import RNBugly from 'rn-bugly';


//如果上面采用的initWithoutAutoCheckUpgrade初始化，并且需要进入app的时候也自动检查更新，可以使用下面的方法手动检查更新
//官方原生的init初始化其实有3s的延迟时间，等待初始化完成，所以js端也需要等待3m后才能检查更新
setTimeout(()=>{
  RNBugly.checkUpgrade({
        isManual: false,
        isSilence: false
      });
},3000);



//点击按钮触发检查更新(一般在[关于]-[检查更新])
//此时早已初始化了，不需要延时
RNBugly.checkUpgrade({
        //该值为true的时候，会有toast提示，如果不需要提示，设置为false
        isManual: true,
        isSilence: false
      });


//获取更新信息
//注意:更新信息获取一次后会储存在本地，即使后台控制停止该版本更新，该方法依旧可以获取到数据
let updateInfo = await RNBugly.getUpgradeInfo();
```

具体方法请查看: [index.d.ts](./index.d.ts)

参考[demo](./example),或者下载[example.apk](https://zhaoyang.lanzous.com/ib832sh)体验



## 注意事项&&疑问

#### 1.无法使用?

请升级到最新版本后再试

目前对于React Native不用区分版本，直接使用最新版即可,只是安装方式略有不同

#### 2.<font color='red'>集成后全量更新无效果</font>

请确定targetSDKVersion是否为28或者以上，bugly请求由于使用了http，而android 9默认是不支持http请求的，需要调整下

具体请参考:

https://blog.csdn.net/weixin_34114823/article/details/88037177

#### 3.为什么我点击更新按钮后，对话框关闭，啥反应都没有?

等一会会出现安装提示,bugly对的更新方式是直接在通知栏显示下载进度，下载完成覆盖安装，如果状态栏没有提示，那就是没有通知权限(oppo/vivo系统是默认不开启该权限的)
  
## 截图

<img style="width:300px;object-fit: contain;margin-right: 20px;"  src='https://tva1.sinaimg.cn/large/007S8ZIlgy1gdpp54zj0nj30u01uoqed.jpg' />
<img style="width:300px;object-fit: contain" src='https://tva1.sinaimg.cn/large/007S8ZIlgy1gdpp5gjhhvj30u01uotej.jpg' />
