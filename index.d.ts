declare module 'rn-bugly' {
    /**
     * 设置当前的用户id
     * 精确定位到某个用户的异常
     * @param userId 
     */
    export function setUserId (userId: string): void;
    export function setAppVersion (version: string): void;
    export function setAppChannel (appChannel: string): void;
    export function setAppPackage (appPackage: string): void;
    export function setTag (tagId: number): void;
    /**
     * 自定义Map参数可以保存发生Crash时的一些自定义的环境信息。在发生Crash时会随着异常信息一起上报并在页面展示。
     * 最多可以有9对自定义的key-value（超过则添加失败）；
     * key限长50字节，value限长200字节，过长截断；
     * key必须匹配正则：[a-zA-Z[0-9]]+。
     * @param params 
     */
    export function putUserData (params:{userKey: string,userValue: string}): boolean;
    /**
     * 获取本地已有升级策略（非实时，可用于界面红点展示）
     */
    export function getUpgradeInfo (): Promise<{
        //包md5值
        apkMd5: string,
        //APK的CDN外网下载地址
        apkUrl: string,
        //唯一标识
        id: string,
        //图片url
        imageUrl: string,
        //升级特性描述
        newFeature: string,
        //升级提示标题
        title: string,
        versionName: string,
        //APK文件的大小
        fileSize: number,
        //提醒间隔
        popInterval: number,
        //提醒次数
        popTimes: number,
        //升级类型 0测试 1正式
        publishType: publishType,
        updateType: number,
        //升级策略 1建议 2强制 3手工
        upgradeType: upgradeType,
        versionCode: number,
        //升级发布时间,ms
        publishTime: number,
    }>;
    /**
    * @param isManual  用户手动点击检查，非用户点击操作请传false
    * @param isSilence 是否显示弹窗等交互，[true:没有弹窗和toast] [false:有弹窗或toast]
    */
    export function checkUpgrade (params:{isManual?: boolean,isSilence?: boolean}): void;
    /**
     * Android Only,打印日志
     * 用户传入TAG和日志内容。该日志将在Logcat输出，并在发生异常时上报。
     * @param {*} level 
     * @param {*} tag 
     * @param {*} log 
     */
    export function log (level:logLevel,tag:string,log:string): void;
    export function postException (parmas:{category:number,errorType:string,errorMsg:string,stack?:string,extraInfo?:{[key:string]:string}}): void;
    enum logLevel {
        v = 'v',
        d = 'd',
        i = 'i',
        w = 'w',
        e = 'e',
    }
    enum publishType {
        //测试
        test = 0,
        //正式
        production = 1
    }
    /**
     * 升级策略
     */
    enum upgradeType {
        //建议
        suggest = 1,
        //强制
        mandotary = 2,
        //手工
        manual = 3
    }
}