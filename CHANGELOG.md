# 0.3.1 (2021-03-17)
* 由于jcenter仓库的问题，暂时固定`com.tencent.bugly:nativecrashreport`版本为`3.8.0`

jcenter仓库如果无法访问，请使用[aliyun](https://maven.aliyun.com/mvn/guide) 替换

# 0.3.0 (2020-04-11)


## 修复

* 将android端的方法判断，防止ios端调用报错
* 解决./gradlew assemleRelease编译报错


## 新增

* 将初始化方法拆分成两种(`依旧可以用原来的方法进行初始化，下面两个方法只是对Bugly.init的简单封装`)，可以选择进入app时不自动更新，完全由js端代码控制检查
    `原来:`
    ```
    import com.tencent.bugly.Bugly;

    Bugly.init(getApplicationContext(),"注册时申请的APPID",false);
    ```


    `现在:`
    ```
    import com.reactlibrary.bugly.RNBuglyModule;

    ** 下面的方法根据情况二选一 **

    //初始化并且自动检查更新
    RNBuglyModule.init(getApplicationContext(),"注册时申请的APPID",false);

    //仅仅初始化
    RNBuglyModule.initWithoutAutoCheckUpgrade(getApplicationContext(),"注册时申请的APPID",false);
    ```
* 新增example及demo apk，更新文档
* 补全putUserData方法，ios端的实现
