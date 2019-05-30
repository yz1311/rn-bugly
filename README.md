
# rn-bugly

## Getting started

`$ npm install https://github.com/yz1311/rn-bugly --save`

### Mostly automatic installation

`$ react-native link rn-bugly`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `rn-bugly` and add `RNBugly.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBugly.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBuglyPackage;` to the imports at the top of the file
  - Add `new RNBuglyPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':rn-bugly'
  	project(':rn-bugly').projectDir = new File(rootProject.projectDir, 	'../node_modules/rn-bugly/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':rn-bugly')
  	```

## Usage
```javascript
import RNBugly from 'rn-bugly';

// TODO: What to do with the module?
RNBugly;
```
  