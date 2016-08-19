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

 Notes:

 There are two different recording mechanisms for audio depending on whether the application is run on the browser or on cordova on a mobile device. On application startup, the audioPlayerShim.run.js file determines whether the application is run on the web or on cordova, and selects the appropriate recording API.

 The difference is: To replay the audio, an <audio> element has to point its source to a URL containing the audio blob. On the browser audioBlob.createObjectURL works fine, but not on mobile (since createObjectURL on mobile creates a link to the local file, not a served file - log the created URL and note the 'file:///' protocol). So to circumnavigate that, on cordova the audiofile is written to the device and the <audio> element source is pointed to the file.

 To write the audio file, I copied code from the [cordova-plugin-file](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html) writeFile but code adapted for Ionic on [ngCordova](https://github.com/driftyco/ng-cordova/blob/master/src/plugins/file.js). The reason I did it is because if you deploy all your Javascript files to both web and mobile, but you deploy different index.html files (very useful since you don't want to link and load the big ngCordova js file for a web user) the browser will complain that it can't ngCordova for the audioPlayerCordova.service.js file in the browser.
