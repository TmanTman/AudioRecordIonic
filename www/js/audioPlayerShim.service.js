(function() {
    angular
    .module('starter')
    .service('AudioPlayer', AudioPlayer);

    AudioPlayer.$inject = [];

    function AudioPlayer() {
        var audioPlayer;
        this.setAudioPlayer = function(pPlayer) {
            audioPlayer = pPlayer;
        };

        this.initialiseAudio = function(pAudioBlob) {
            if (!audioPlayer) {
                throw new AudioPlayerNotDefined();
            } else {
                return audioPlayer.initialiseAudio(pAudioBlob);
            }
        };
    }
    function AudioPlayerNotDefined() {
        this.message = 'Audio Player is not defined';
        this.error = 'AudioPlayerNotDefined';
        this.toString = function() { return this.messsage; };
    }
})();
