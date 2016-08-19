# AudioRecordIonic
A short example to demonstrate how audio can be recorded with the new MediaRecorder API

The MediaRecorder has been available for a while now on the most popular browser, [see here](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder). This example definitely works from Chrome v49 on desktop. To make sure that this is available in your Ionic project, make use of the Crosswalk browser - Chrome 49 features have been in crosswalk since version crosswalk-19.49.514.4. The latest stable version of Crosswalk will have the MediaRecorder included.

To run the project:
 - Clone the repo
 - Install the dependencies: bower install
 - Add the Android platform: $ cordova platforms add android
 - Install the plugins:
   - Crosswalk browser: $ cordova plugins add cordova-plugin-crosswalk-webview
   - File API: $ cordova plugins add cordova-plugin-file
   - Media (for permission, could probably just necessary permissions): $ cordova plugins add cordova-plugin-media
 - Run the project on either a browser or on Android
