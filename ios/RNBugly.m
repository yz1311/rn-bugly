
#import "RNBugly.h"
#import <Bugly/Bugly.h>

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

@end
  
