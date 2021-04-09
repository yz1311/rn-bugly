
#import "RNBugly.h"
#import <Bugly/Bugly.h>
#import <React/RCTConvert.h>

@implementation RNBugly

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+ (void)startWithAppId
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [Bugly startWithAppId:nil];
    });
}

RCT_EXPORT_METHOD(setUserIdentifier:(NSString *)userId)
{
    [Bugly setUserIdentifier:userId];
}

RCT_EXPORT_METHOD(updateAppVersion:(NSString *)version)
{
    [Bugly updateAppVersion:version];
}

//设置标签，可在网站生成标签ID
RCT_EXPORT_METHOD(setTag:(NSUInteger)tag)
{
    [Bugly setTag:tag];
}

RCT_EXPORT_METHOD(closeCrashReport)
{
    [Bugly closeCrashReport];
}

RCT_EXPORT_METHOD(getCurrentTag:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSUInteger tag = [Bugly currentTag];
    resolve([NSNumber numberWithUnsignedInteger:tag]);
}

RCT_EXPORT_METHOD(getUserData:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSDictionary* dict = [Bugly allUserValues];
    resolve(dict);
}

RCT_EXPORT_METHOD(getBuglyVersion:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    resolve([Bugly sdkVersion]);
}

RCT_EXPORT_METHOD(putUserData:(NSString *)userKey:(NSString *)userValue)
{
    [Bugly setUserValue:userValue forKey:userKey];
}

RCT_EXPORT_METHOD(postException:(NSDictionary *)params)
{
    NSInteger category = [RCTConvert NSInteger:[params objectForKey:@"category"]];
    NSString *errorType = [RCTConvert NSString:[params objectForKey:@"errorType"]];
    NSString *errorMsg = [RCTConvert NSString:[params objectForKey:@"errorMsg"]];
    NSString *stack = [RCTConvert NSString:[params objectForKey:@"stack"]];
    NSArray *stackTraceArray = [stack componentsSeparatedByString:@""];
    NSDictionary *extraInfo = [RCTConvert NSDictionary:[params objectForKey:@"extraInfo"]];
    if(extraInfo == nil) {
        extraInfo = [NSMutableDictionary dictionary];
    }
    [Bugly reportExceptionWithCategory:category name:errorMsg reason:@" " callStack:stackTraceArray extraInfo:extraInfo terminateApp:NO];
}
@end

