declare module 'rn-bugly' {
    export type setUserIdentifier = (userId: string) => void;
    export type updateAppVersion = (version: string) => void;
    export type setTag = (tagId: number) => void;
    export type getUpgradeInfo = () => Promise<{
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
        publishType: number,
        updateType: number,
        upgradeType: number,
        versionCode: number,
        publishTime: number,
    }>;
    export type checkUpgrade = (params:{isManual?: boolean,isSilence?: boolean}) => void;
    export type log = (level:logLevel,tag:string,log:string) => void;
    export type postException = (parmas:{category:number,errorType:string,errorMsg:string,stack?:string,extraInfo?:{[key:string]:string}}) => void;
    enum logLevel {
        v = 'v',
        d = 'd',
        i = 'i',
        w = 'w',
        e = 'e',
    }
}