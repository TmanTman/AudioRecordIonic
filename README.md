# AudioRecordIonic
A short example to demonstrate how audio can be recorded with the new MediaRecorder API

The MediaRecorder has been available for a while now on the most popular browsers, [see here](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder). On desktop this app works from Chrome v49 onward. To make sure that this is available in your Ionic project, make use of the Crosswalk browser - Chrome 49 features have been included since version 19.49.514.4 onward.

To run the project:
 - Clone the repo
 - Install the dependencies: bower install
 - Add the Android platform: $ cordova platforms add android
 - Install the plugins:
   - Crosswalk browser: $ cordova plugins add cordova-plugin-crosswalk-webview
   - File API: $ cordova plugins add cordova-plugin-file
   - Media (for permission, could probably just necessary permissions): $ cordova plugins add cordova-plugin-media
 - Run the project either on a browser or on Android

 Notes:

 There are two different recording mechanisms for audio, depending on whether the application is run in the browser or in cordova on a mobile device. On application startup, the audioPlayerShim.run.js file determines whether the application is run on the web or on cordova, and selects the appropriate recording API.

 The difference is: To replay the audio, an <audio> element has to point its source to a URL containing the audio blob. In the browser, audioBlob.createObjectURL works fine, but not on mobile (since createObjectURL on mobile creates a link to the local file, not a served file - log the created URL and note the 'file:///' protocol). So to circumnavigate that, in cordova the audio file is written to the device and the <audio> element source is pointed to the file url.

 To write the audio file, I copied code from the [ngCordova](https://github.com/driftyco/ng-cordova/blob/master/src/plugins/file.js). The reason I did it is because if you follow convention and concatenate all Javascript files to app.js, but you deploy different index.html files for web and mobile (which is very useful since you don't want to link and load the big ngCordova js file for a web user) the browser will complain that it can't ngCordova for the audioPlayerCordova.service.js file that's in the browser.
