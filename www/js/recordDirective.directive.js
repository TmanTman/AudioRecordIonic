(function() {
    angular
    .module('starter')
    .directive('recordDirective', RecordDirective);

    RecordDirective.$inject = ['$ionicPlatform', '$timeout', 'AudioPlayer'];

    function RecordDirective($ionicPlatform, $timeout, AudioPlayer) {
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
                                        mimeType: 'audio/webm;codecs=opus',
                                        audioBitsPerSecond: 128000
                                    });
                                    mediaRecorder.ondataavailable = function (event) {
                                        recordedBlobs.push(event.data);
                                    };
                                    mediaRecorder.onstop = function() {
                                        var superAudioBuffer = new Blob(recordedBlobs, {
                                            type: 'audio/webm'
                                        });
                                        AudioPlayer.initialiseAudio(superAudioBuffer).then(function(path) {
                                            audioElement.src = path;
                                            audioElement.play();
                                        });
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
                    }
                };
            }
        };
        return ddo;
    }
})();
