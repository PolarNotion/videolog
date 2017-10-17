(function ($) {
  $.fn.videoLog = function (options) {

    function throttle (callback, limit) {

      var wait = false;
      return function () {
        if (!wait) {

          callback.apply(null, arguments);
          wait = true;
          setTimeout(function () {
            wait = false;
          }, limit);
        }
      }
    }

    var callApi = throttle(makeRequest, 2000);

    function makeRequest () {
      console.log('API CALLED');
    }

    function createCheckpointArray (durationInSeconds) {
      var checkpoints = [];
      console.log(durationInSeconds)
      videoLength = durationInSeconds
      var checkpoint = durationInSeconds / 10;
      console.log(checkpoint)
      for (var i = 0; i < 10; i++) {
        var flag = checkpoint * i
        checkpoints.push(flag.toFixed() + 'seconds')
        console.log(checkpoints)
      }
      return checkpoints
    }

    function checkArrayForTimestamp (array, currentTime) {
      if (array.indexOf(currentTime.toFixed() + 'seconds') > -1) {
        console.log('attempt request')
        callApi()
      }
    }

    // Establish our settings
    var settings = $.extend({}, options);
    var youtubeVideos = [];


    return this.each(function () {

      var $this = $(this);
      // Check if object is an iframe element,
      // then check if src attribute contains vimeo or youtube
      if ($this.is("iframe")) {

        // Vimeo Video
        if ($this.attr('src').indexOf("vimeo") > -1) {
          var id = this.id;
          var player = new Vimeo.Player(id);
          var checkpoints;
          player.getDuration().then(function(duration) {
            checkpoints = createCheckpointArray(duration)
          }).catch(function(error) {
            console.log(error)
          })

          player.on('pause', function () {
            player.getCurrentTime().then(function (seconds) {
              console.log('Vimeo video ' + id + ' paused at: ' + seconds);
            }).catch(function (error) {
              console.log("There was an error");
            });
          });

          player.on('play', function () {
            player.on('timeupdate', function () {
              player.getCurrentTime().then(function (seconds) {
                console.log('Vimeo video ' + id + ' played at: ' + seconds);
                checkArrayForTimestamp(checkpoints, seconds)
              }).catch(function (error) {
                console.log("There was an error:", error);
              });
            });
          });
        }

        // Youtube Video
        else if ($this.attr('src').indexOf("youtube") > -1) {

          youtubeVideos.push(this);
          var videoScope = this;
          var checkpoints;

          function createYoutubeVideoById(id) {
            var id = youtubeVideos[i].id;
            var ytplayer;
            ytplayer = new YT.Player(id, {
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });

            function onPlayerReady(event) {
              document.getElementById(id);
              var duration = ytplayer.getDuration()
              checkpoints = createCheckpointArray(duration)
            }

            function getStatus(playerStatus) {

              if (playerStatus == -1) {
                console.log("Not yet started"); // unstarted = gray
              } else if (playerStatus == 0) {
                console.log("Youtube video " + id + " has ended at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 1) {
                var message = setInterval(function () {
                  console.log("Youtube video " + id + " is playing at " + ytplayer.getCurrentTime());
                  var duration = ytplayer.getCurrentTime()
                  checkArrayForTimestamp(checkpoints, duration)
                }, 1000);
              } else if (playerStatus == 2) {
                console.log("Youtube video " + id + " has been paused at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 3) {
                console.log("Youtube video " + id + " is buffering at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 5) {
                console.log("Youtube video " + id + " was cued at " + ytplayer.getCurrentTime());
              } else if (playerStatus !== 1) {
                clearInterval(message);
              }

            }

            function onPlayerStateChange(event) {
              getStatus(event.data);
            }
          }

          window.onYouTubeIframeAPIReady = function () {

            for (i = 0; i < youtubeVideos.length; i++) {
              createYoutubeVideoById(videoScope.id)
            }
          }
        }
      }

      // HTML5 Video
      if ($this.is("video")) {

        var id = this.id;
        var checkpoints;

        $this.on('loadedmetadata', function() {
          console.log(this)
           checkpoints = createCheckpointArray(this.duration)
        });

        $this.on("timeupdate", function () {
          console.log('HTML5 Video ' + id + ' played at: ' + this.currentTime);
          checkArrayForTimestamp(checkpoints, this.currentTime)
        });
        $this.on("play", function () {
        });
        $this.on("pause", function () {
          console.log('HTML5 Video ' + id + ' paused at: ' + this.currentTime);
        });
        //END of HTML 5 Video
      }

      //Youtube-iFrame API script
      var tag = document.createElement('script');
      tag.id = 'iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    });
  };

}(jQuery));
