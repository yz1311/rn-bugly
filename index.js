
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
    }
};
