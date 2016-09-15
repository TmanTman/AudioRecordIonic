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
                '<div><audio controls></audio></div>'
            ].join(''),
            link: function(scope, element, attributes) {
                var mediaRecorder;
                var mediaStream;
                var recordedBlobs = [];
                var audioElement = element.find('audio')[0];
                var options = {
                    audio: true,
                    video: false
                };
                scope.recording = false;
                scope.action = function() {
                    if (!scope.recording) {
                        scope.recording = true;
                        recordedBlobs = [];
                        if (navigator.webkitGetUserMedia) {
                            navigator.webkitGetUserMedia(options, onSuccess, onError);
                        } else {
                            alert('Either you\'re not using Chrome or gUM is not supported!');
                        }
                    } else {
                        scope.recording = false;
                        mediaRecorder.stop();
                        mediaStream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    }
                };
                function onSuccess(stream) {
                    mediaStream = stream;
                    mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'audio/webm'
                    });
                    mediaRecorder.ondataavailable = function (event) {
                        recordedBlobs.push(event.data);
                    };
                    mediaRecorder.onstop = function() {
                        var totalAudioBlob = new Blob(recordedBlobs, {
                            type: 'audio/webm'
                        });
                        AudioPlayer.initialiseAudio(totalAudioBlob).then(function(path) {
                            audioElement.src = path;
                            audioElement.play();
                        });
                    };
                    mediaRecorder.start(10);
                }
                function onError(err) {
                    console.log('The following gUM error occured: ' + err);
                }
            }
        };
        return ddo;
    }
})();
