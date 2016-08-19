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
                writeFile(storageLocation, filename, pAudioBlob, true)
                .then(function(success) {
                    deferred.resolve(storageLocation + filename);
                }).catch(function(error){
                    console.log('Error:');
                    console.log(error);
                });
            });
            return deferred.promise;
        };

        var errorCodes = {
            1: 'NOT_FOUND_ERR',
            2: 'SECURITY_ERR',
            3: 'ABORT_ERR',
            4: 'NOT_READABLE_ERR',
            5: 'ENCODING_ERR',
            6: 'NO_MODIFICATION_ALLOWED_ERR',
            7: 'INVALID_STATE_ERR',
            8: 'SYNTAX_ERR',
            9: 'INVALID_MODIFICATION_ERR',
            10: 'QUOTA_EXCEEDED_ERR',
            11: 'TYPE_MISMATCH_ERR',
            12: 'PATH_EXISTS_ERR'
        };

        function writeFile(path, fileName, text, replaceBool) {
          var q = $q.defer();
          if ((/^\//.test(fileName))) {
            q.reject('file-name cannot start with \/');
          }
          replaceBool = replaceBool ? false : true;
          var options = {
            create: true,
            exclusive: replaceBool
          };
          try {
            $window.resolveLocalFileSystemURL(path, function (fileSystem) {
              fileSystem.getFile(fileName, options, function (fileEntry) {
                fileEntry.createWriter(function (writer) {
                  if (options.append === true) {
                    writer.seek(writer.length);
                  }

                  if (options.truncate) {
                    writer.truncate(options.truncate);
                  }

                  writer.onwriteend = function (evt) {
                    if (this.error) {
                      q.reject(this.error);
                    } else {
                      q.resolve(evt);
                    }
                  };
                  writer.write(text);
                  q.promise.abort = function () {
                    writer.abort();
                  };
                });
              }, function (error) {
                error.message = errorCodes[error.code];
                q.reject(error);
              });
            }, function (err) {
              err.message = errorCodes[err.code];
              q.reject(err);
            });
          } catch (e) {
            e.message = errorCodes[e.code];
            q.reject(e);
          }
          return q.promise;
      };
    }
})();
