# AudioRecordIonic
A short example to demonstrate how audio can be recorded with the new MediaRecorder API

The MediaRecorder is now available natively in some browsers. This example definitely works from Chrome v49 on desktop. On Android, add the Crosswalk browser to the project. The latest stable version of Crosswalk at the time of writing is Chrome v49, which has the MediaRecorder API baked in.

What has been done:
 - Created a new Ionic project: $ionic start AudioRecorder blank
 - cd into folder: $cd AudioRecorder
 - Added the Crosswalk browser: $ionic browser add crosswalk
 - Added the record directive to app.js
