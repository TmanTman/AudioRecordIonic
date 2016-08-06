(function() {
    angular
    .module('starter')
    .service('AudioPlayerCordova', AudioPlayerCordova);

    AudioPlayerCordova.$inject = ['$ionicPlatform', '$window', '$q'];

    function AudioPlayerCordova($ionicPlatform, $window, $q) {
        this.initialiseAudio = function(pAudioBlob) {
            var deferred = $q.defer();
            $ionicPlatform.ready(function() {
                var storageLocation = cordova.file.cacheDirectory;
                var filename = 'temp.webm';
                $window.resolveLocalFileSystemURL(storageLocation + filename, function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function() {
                            console.log('Successfully wrote file');
                            console.log(fileEntry);
                            deferred.resolve(storageLocation + filename);
                        };
                        fileWriter.onerror = function(e) {
                            console.log('Failed to write: ');
                             console.log(e);
                        };
                        fileWriter.write(pAudioBlob);
                    });
                }, function(e) {
                    console.log('Failed to resolve file: ');
                    console.log(e);
                });
            });
            return deferred.promise;
        };
    }
})();
