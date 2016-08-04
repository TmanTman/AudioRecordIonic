angular.module('starter', ['ionic', 'ngCordova'])

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

RecordDirective.$inject = ['$ionicPlatform', '$cordovaFile', '$cordovaMedia', '$timeout'];

function RecordDirective($ionicPlatform, $cordovaFile, $cordovaMedia, $timeout) {
    var ddo = {
        scope: {},
        restrict: 'E',
        template: [
            '<button class="button icon ion-record" ng-class="{\'button-assertive\': recording}" ng-click="action()"></button>',
            '<span ng-if="initialiseAudio"><ion-spinner></ion-spinner></span>',
            '<div><audio controls></audio></div>'
        ].join(''),
        link: function(scope, element, attributes) {
            var mediaRecorder;
            var mediaStream;
            var recordedBlobs = [];
            var audioElement = element.find('audio')[0];
            scope.recording = false;
            scope.initialiseAudio = false;
            scope.action = function() {
                if (!scope.recording) {
                    scope.recording = true;
                    recordedBlobs = [];
                    if (navigator.webkitGetUserMedia) {
                        scope.initialiseAudio = true;
                        navigator.webkitGetUserMedia (
                            {
                                audio: true,
                                video: false
                            },
                            function(stream) {
                                $timeout(function() {
                                    scope.initialiseAudio = false; //since it happens outside of angular world
                                });
                                mediaStream = stream;
                                mediaRecorder = new MediaRecorder(stream, {
                                    mimeType: 'audio/webm'
                                });
                                mediaRecorder.ondataavailable = function (event) {
                                    if (scope.recording) {
                                        recordedBlobs.push(event.data);
                                    }
                                };
                                mediaRecorder.start(10);
                            },
                            function(err) {
                                $timeout(function() {
                                    scope.initialiseAudio = false; //since it happens outside of angular world
                                });
                                console.log('The following gUM error occured: ' + err);
                            }
                        );
                    } else {
                        console.log('getUserMedia not supported on your browser!');
                    }
                } else {
                    scope.recording = false;
                    mediaRecorder.stop();
                    mediaStream.getTracks().forEach(function(track) {
                        console.log('stopping stream track');
                        track.stop();
                    });
                    var superAudioBuffer = new Blob(recordedBlobs, {
                        type: 'audio/webm'
                    });
                    console.log(superAudioBuffer);
                    var audioUrl = URL.createObjectURL(superAudioBuffer);
                    if (document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1) {
                        //Cordova
                        console.log(audioUrl);
                        $ionicPlatform.ready(function() {
                            $cordovaFile.writeFile(cordova.file.cacheDirectory, 'temp.webm', superAudioBuffer, true)
                            .then(function(success) {
                                var mediaSource = cordova.file.cacheDirectory + 'temp.webm';
                                audioElement.src = mediaSource;
                                audioElement.play();
                            }, function(error) {
                                console.log('Write error:');
                                console.log(error);
                            });
                        });
                    } else {
                        //On browser
                        audioElement.src = audioUrl;
                        audioElement.play();
                    }
                }
            };
            scope.$on('$destroy', function() {
                $cordovaFile.removeFile(cordova.file.cacheDirectory, "temp.webm")
                .then(function (success) {
                    console.log('File removal successful');
                }, function (error) {
                    console.log('File removal error: ');
                    console.log(error);
                });
            });
        }
    };
    return ddo;
}
