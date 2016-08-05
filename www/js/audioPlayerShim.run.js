(function() {
    angular
    .module('starter')
    .run(AudioPlayerRun);

    AudioPlayerRun.$inject = ['AudioPlayer', 'AudioPlayerCordova', 'AudioPlayerBrowser']

    function AudioPlayerRun(AudioPlayer, AudioPlayerCordova, AudioPlayerBrowser) {
        var audioPlayer;
        if (document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1) {
            //Cordova
            audioPlayer = AudioPlayerCordova;
        } else {
            //Browser
            audioPlayer = AudioPlayerBrowser;
        }
        AudioPlayer.setAudioPlayer(audioPlayer);
    }
})();
