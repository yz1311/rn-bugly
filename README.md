
# rn-bugly
bugly for react-native,支持统计，android支持升级

## 安装

`$ npm install https://github.com/yz1311/rn-bugly --save`

### Mostly automatic installation

`$ react-native link rn-bugly`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `rn-bugly` and add `RNBugly.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBugly.a` and `Bugly.framework` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.RNBuglyPackage;` to the imports at the top of the file
  - Add `new RNBuglyPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':rn-bugly'
  	project(':rn-bugly').projectDir = new File(rootProject.projectDir, 	'../node_modules/rn-bugly/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

  	```
      compile project(':rn-bugly')
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
`info.plist`文件读取SDK初始化参数，可配置的参数如下：
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
`MainApplication.java`
```
import com.tencent.bugly.Bugly;

@Override
public void onCreate() {
  super.onCreate();
  //初始化bugly
  Bugly.init(getApplicationContext(),"你的Key",false);
  ...
}
```

## 使用
```javascript
import RNBugly from 'rn-bugly';

```

具体方法请查看: [index.d.ts](./index.d.ts)
  