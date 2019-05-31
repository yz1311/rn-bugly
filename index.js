
import { NativeModules,Platform } from 'react-native';

const { RNBugly } = NativeModules;

export default {
    /**
     * 设置当前的用户id
     * 精确定位到某个用户的异常
     * @param userId 
     */
    setUserId: function (userId) {
        if(Platform.OS === 'android') {
            RNBugly.setUserId(userId);
        } else {
            RNBugly.setUserIdentifier(userId);
        }
    },
    setAppVersion: function (version) {
        if(Platform.OS === 'android') {
            RNBugly.setAppVersion(version);
        } else {
            RNBugly.updateAppVersion(version);
        }
    },
    setAppChannel: function (appChannel) {
        if(Platform.OS === 'android') {
            RNBugly.setAppChannel(appChannel);
        } else {
            
        }
    },
    setAppPackage: function (appPackage) {
        if(Platform.OS === 'android') {
            RNBugly.setAppPackage(appPackage);
        } else {
            
        }
    },
    setTag: function (tagId) {
        if(Platform.OS === 'android') {
            RNBugly.setUserSceneTag(tagId);
        } else {
            RNBugly.setTag(tagId);
        }
    },
    /**
     * 自定义Map参数可以保存发生Crash时的一些自定义的环境信息。在发生Crash时会随着异常信息一起上报并在页面展示。
     * 最多可以有9对自定义的key-value（超过则添加失败）；
     * key限长50字节，value限长200字节，过长截断；
     * key必须匹配正则：[a-zA-Z[0-9]]+。
     * @param {*} userKey 
     * @param {*} userValue 
     */
    putUserData: function (userKey,userValue) {
        return RNBugly.putUserData(userKey,userValue);
    },
    /**
     * Android Only,获取本地已有升级策略（非实时，可用于界面红点展示）
     */
    getUpgradeInfo: function () {
        return RNBugly.getUpgradeInfo();
    },
    /**
     * Android Only,检查更新
    * @param isManual  用户手动点击检查，非用户点击操作请传false
    * @param isSilence 是否显示弹窗等交互，[true:没有弹窗和toast] [false:有弹窗或toast]
    */
    checkUpgrade: function (params) {
        RNBugly.checkUpgrade(params);
    },
    /**
     * Android Only,打印日志
     * 用户传入TAG和日志内容。该日志将在Logcat输出，并在发生异常时上报。
     * @param {*} level 
     * @param {*} tag 
     * @param {*} log 
     */
    log: function (level, tag, log) {
        RNBugly.log(level,tag,log);
    },
    //Android Only,主动上传日志
    postException: function (params) {
        RNBugly.postException(params);
    }
};
