# AudioRecordIonic
A short example to demonstrate how audio can be recorded with the new MediaRecorder API

The MediaRecorder is now available natively in some browsers. This example definitely works from Chrome v49 on desktop. On Android, add the Crosswalk browser to the project. The latest stable version of Crosswalk at the time of writing is Chrome v49, which has the MediaRecorder API baked in.

To run the project:
 - Clone the repo
 - install the dependencies: bower install
 - install the plugins:
   - Crosswalk browser: $ cordova plugins add cordova-plugin-crosswalk-webview
   - File API: $ cordova plugins add cordova-plugin-file
   - Media (for permission, could probably just necessary permissions): $ cordova plugins add cordova-plugin-media
 - Run the project on either a browser or on Android
