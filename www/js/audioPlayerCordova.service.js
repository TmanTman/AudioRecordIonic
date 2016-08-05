(function() {
    angular
    .module('starter')
    .service('AudioPlayerCordova', AudioPlayerCordova);

    AudioPlayerCordova.$inject = ['$ionicPlatform', '$cordovaFile', '$q'];

    function AudioPlayerCordova($ionicPlatform, $cordovaFile, $q) {
        this.initialiseAudio = function(pAudioBlob) {
            var deferred = $q.defer();
            $ionicPlatform.ready(function() {
                var storageLocation = cordova.file.cacheDirectory;
                var filename = 'temp.webm';
                $cordovaFile.writeFile(storageLocation, filename, pAudioBlob, true)
                .then(function(success) {
                    deferred.resolve(storageLocation + filename);
                }, function(error) {
                    console.log('Write error:');
                    console.log(error);
                });
            });
            return deferred.promise;
        };
    }
})();
