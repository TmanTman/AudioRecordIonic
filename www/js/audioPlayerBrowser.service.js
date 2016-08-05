(function() {
    angular
    .module('starter')
    .service('AudioPlayerBrowser', AudioPlayerBrowser);

    AudioPlayerBrowser.$inject = ['$q'];

    function AudioPlayerBrowser($q) {
        //Note that the browser operation is synchronous. Async promises only
        //used because the Cordova AudioPlayer is async and both interfaces need
        //to be the same
        this.initialiseAudio = function(pAudioBlob) {
            var deferred = $q.defer();
            var audioUrl = URL.createObjectURL(pAudioBlob);
            deferred.resolve(audioUrl);
            return deferred.promise;
        };
    }

})();
