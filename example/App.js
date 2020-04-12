/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNBugly from 'rn-bugly';

const App: () => React$Node = () => {

  const [updateInfo, setUpdateInfo] = useState(null);

  const checkForUpdate = () => {
    RNBugly.checkUpgrade({
      isManual: false,
      isSilence: false,
    });
  };

  const getUpdateInfo = async () => {
    let updateInfo = await RNBugly.getUpgradeInfo();
    setUpdateInfo(updateInfo);
  };

  useEffect(() => {
    (async () => {
      RNBugly.putUserData('test', 'AAA');
      setTimeout(() => {
        checkForUpdate();
      }, 3000);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {Platform.OS == 'android' ?
              <Button title='检查更新' onPress={checkForUpdate}></Button>
              :
              null
            }
            {Platform.OS == 'android' ?
              <View style={{marginTop: 10}}>
                <Button title='获取更新信息' onPress={getUpdateInfo}></Button>
                {updateInfo?
                  <View style={{paddingHorizontal:7,paddingVertical:10}}>
                    {
                      Object.keys(updateInfo).map((key,index)=>(
                        <View key={key} style={{flexDirection:'row'}}>
                            <Text style={{color: '#333',flex:1}}>{({
                              title: '标题',
                              newFeature: '升级说明',
                              publishTime: '发布时间',
                              apkMd5: '安装包Md5',
                              apkUrl: '安装包下载地址',
                              fileSize: '安装包大小',
                              popInterval: '弹窗间隔（ms）',
                              popTimes: '弹窗次数',
                              publishType: '发布类型（0:测试 1:正式）',
                              upgradeType: '弹窗类型（1:建议 2:强制 3:手工）',
                              imageUrl: '图片地址',
                            }[key]||key)+': '}</Text>
                            <Text style={{color: '#999',flex:1}}>{updateInfo[key]}</Text>
                        </View>
                      ))
                    }
                  </View>
                  :
                  null
                }
              </View>
              :
              null
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
