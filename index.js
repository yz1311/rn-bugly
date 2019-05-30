
import { NativeModules,Platform } from 'react-native';

const { RNBugly } = NativeModules;

export default {
    setUserIdentifier: function (userId) {
        RNBugly.setUserIdentifier(userId);
    },
    updateAppVersion: function (version) {
        RNBugly.updateAppVersion(version);
    },
    setTag: function (tagId) {
        if(Platform.OS === 'android') {
            RNBugly.setUserSceneTag(tagId);
        } else {
            RNBugly.setTag(tagId);
        }
    },
    //Android Only,获取升级信息
    getUpgradeInfo: function () {
        return RNBugly.getUpgradeInfo();
    },
    //Android Only,检查更新
    checkUpgrade: function (params) {
        RNBugly.checkUpgrade(params);
    },
    //Android Only,打印日志
    log: function (level, tag, log) {
        RNBugly.log(level,tag,log);
    },
    //Android Only,主动上传日志
    postException: function (params) {
        RNBugly.postException(params);
    }
};
