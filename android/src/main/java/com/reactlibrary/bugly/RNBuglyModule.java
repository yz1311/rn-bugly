
package com.reactlibrary.bugly;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.tencent.bugly.beta.Beta;
import com.tencent.bugly.beta.UpgradeInfo;
import com.tencent.bugly.crashreport.BuglyLog;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.HashMap;
import java.util.Map;

public class RNBuglyModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNBuglyModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNBugly";
  }

  @ReactMethod
  public void setUserId(String userID) {
    CrashReport.setUserId(userID);
  }

  @ReactMethod
  public void setAppChannel(String appChannel) {
    CrashReport.setAppChannel(getReactApplicationContext(), appChannel);
  }

  @ReactMethod
  public void setAppVersion(String version) {
    CrashReport.setAppVersion(getReactApplicationContext(), version);
  }

  @ReactMethod
  public void setAppPackage(String appPackage) {
    CrashReport.setAppPackage(getReactApplicationContext(), appPackage);
  }

  @ReactMethod
  public void setUserSceneTag(int tagId) {
    CrashReport.setUserSceneTag(getReactApplicationContext(), tagId);
  }

  @ReactMethod
  public void putUserData(String userKey, String userValue, Promise promise) {
    try
    {
      CrashReport.putUserData(this.reactContext,userKey,userValue);
      promise.resolve(true);
    }catch (Exception e)
    {
      promise.resolve(e.getMessage());
    }
  }

  @ReactMethod
  public void postException(ReadableMap map, Promise promise) {

    try
    {
      int category = map.getInt("category");
      String errorType = map.getString("errorType");
      String errorMsg = map.getString("errorMsg");
      String stack = "";
      if(map.hasKey("stack"))
      {
        stack = map.getString("stack");
      }
      Map<String,String> extra = new HashMap<String, String>();
      if(map.hasKey("extraInfo"))
      {
        ReadableMap extraInfo = map.getMap("extraInfo");
        ReadableMapKeySetIterator iterator = extraInfo.keySetIterator();
        while (iterator.hasNextKey()){
          String key = iterator.nextKey();
          extra.put(key, map.getString(key));
        }
      }
      CrashReport.postException(category,errorType,errorMsg,stack,extra);
      promise.resolve(true);
    }catch (Exception e)
    {
      promise.resolve(e.getMessage());
    }
  }

  @ReactMethod
  public void log(String level,String tag,String log) {
    switch (level)
    {
      case "v":
        BuglyLog.v(tag,log);
        break;
      case "d":
        BuglyLog.d(tag,log);
        break;
      case "i":
        BuglyLog.i(tag,log);
        break;
      case "w":
        BuglyLog.w(tag,log);
        break;
      case "e":
        BuglyLog.e(tag,log);
        break;
    }
  }

  @ReactMethod
  public void checkUpgrade(ReadableMap options) {
    //用户手动点击检查，非用户点击操作请传false
    boolean isManual = true;
    //是否显示弹窗等交互，[true:没有弹窗和toast] [false:有弹窗或toast]
    boolean isSilence = false;
    if(options.hasKey("isManual"))
    {
      isManual = options.getBoolean("isManual");
    }
    if(options.hasKey("isSilence"))
    {
      isSilence = options.getBoolean("isSilence");
    }
    Beta.checkUpgrade(isManual,isSilence);
  }

  @ReactMethod
  public void getUpgradeInfo(Promise promise) {

    UpgradeInfo info = Beta.getUpgradeInfo();
    if(info!=null)
    {
      WritableMap writableMap = Arguments.createMap();
      writableMap.putString("apkMd5",info.apkMd5);
      writableMap.putString("apkUrl",info.apkUrl);
      writableMap.putString("id",info.id);
      writableMap.putString("imageUrl",info.imageUrl);
      writableMap.putString("newFeature",info.newFeature);
      writableMap.putString("title",info.title);
      writableMap.putString("versionName",info.versionName);
      writableMap.putDouble("fileSize",info.fileSize);
      //弹窗间隔（ms）
      writableMap.putDouble("popInterval",info.popInterval);
      //弹窗次数:
      writableMap.putInt("popTimes",info.popTimes);
      //发布类型（0:测试 1:正式）:
      writableMap.putInt("publishType",info.publishType);
      writableMap.putInt("updateType",info.updateType);
      //弹窗类型（1:建议 2:强制 3:手工）:
      writableMap.putInt("upgradeType",info.upgradeType);
      writableMap.putInt("versionCode",info.versionCode);
      writableMap.putDouble("publishTime",info.publishTime);
      promise.resolve(writableMap);
    }
    promise.resolve(null);
  }
}