declare module 'rn-bugly' {
    export function setUserIdentifier (userId: string): void;
    export function updateAppVersion (version: string): void;
    export function setTag (tagId: number): void;
    /**
     * 获取本地已有升级策略（非实时，可用于界面红点展示）
     */
    export function getUpgradeInfo (): Promise<{
        apkMd5: string,
        apkUrl: string,
        id: string,
        imageUrl: string,
        newFeature: string,
        title: string,
        versionName: string,
        fileSize: number,
        popInterval: number,
        popTimes: number,
        publishType: publishType,
        updateType: number,
        upgradeType: upgradeType,
        versionCode: number,
        publishTime: number,
    }>;
    /**
    * @param isManual  用户手动点击检查，非用户点击操作请传false
    * @param isSilence 是否显示弹窗等交互，[true:没有弹窗和toast] [false:有弹窗或toast]
    */
    export function checkUpgrade (params:{isManual?: boolean,isSilence?: boolean}): void;
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