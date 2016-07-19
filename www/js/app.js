angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('recordDirective', RecordDirective);

RecordDirective.$inject = [];

function RecordDirective() {
    var ddo = {
        scope: {},
        restrict: 'E',
        template: [
            '<button class="button" ng-click="record()">Record</button>',
            '<button class="button" ng-click="stop()">Stop</button>',
            '<div><audio controls></audio></div>'
        ].join(''),
        link: function(scope, element, attributes) {
            var mediaRecorder;
            var mediaStream;
            var recordedBlobs = [];
            var audioElement = element.find('audio')[0];
            scope.record = function() {
                recordedBlobs = [];
                console.log('Record clicked');
                if (navigator.webkitGetUserMedia) {
                   navigator.webkitGetUserMedia (
                      {
                         audio: true,
                         video: false
                      },
                      function(stream) {
                          console.log('got Stream');
                          mediaStream = stream;
                          mediaRecorder = new MediaRecorder(stream, {
                              mimeType: 'audio/webm'
                          });
                          mediaRecorder.ondataavailable = function (event) {
                              console.log('data available');
                              recordedBlobs.push(event.data);
                          };
                          mediaRecorder.start(10);
                      },
                      function(err) {
                         console.log('The following gUM error occured: ' + err);
                      }
                   );
                } else {
                   console.log('getUserMedia not supported on your browser!');
                }
            };
            scope.stop = function() {
                console.log('Stop button clicked');
                mediaRecorder.stop();
                mediaStream.getTracks().forEach(function(track) {
                    console.log('stopping stream track');
                    track.stop();
                });
                var superAudioBuffer = new Blob(recordedBlobs, {
                    type: 'audio/webm'
                });
               var audioUrl = URL.createObjectURL(superAudioBuffer);
               audioElement.src = audioUrl;
            };
        }
    };
    return ddo;
}
