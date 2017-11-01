(function ($) {
  $.fn.videoLog = function (options) {
    // Establish our settings
    var settings = $.extend({
      connectId: null,
    }, options);
    var youtubeVideos = [];

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

    function makeRequest (currentTime, totalTime, latestCompletion, $context) {
      var connectId = settings.connectId
      var mediaId = $context.attr('data-media-id')
      var url = 'https://private-anon-c86ad25f29-dhportalconnect.apiary-mock.com/dhportal-videos?person=' + connectId + '&tag=' + mediaId
      $.ajax(url, {
        method: 'POST',
        data: {
          current_position: currentTime,
          completed_percentage: calculateLatestCompletion(currentTime, totalTime, latestCompletion),
          completed_at: currentTime === totalTime ? Date.now() : null,
        },
      })
    }

    function calculatePercentComplete (currentTime, totalTime) {
      var result = currentTime / totalTime
      return result.toFixed(2)
    }

    function calculateLatestCompletion(currentTime, totalTime, latestCompletion) {
      var completed = calculatePercentComplete(currentTime, totalTime)
      return completed > latestCompletion ? completed : latestCompletion
    }

    function createCheckpointArray (durationInSeconds) {
      var checkpoints = [];
      videoLength = durationInSeconds
      var checkpoint = durationInSeconds / 10;
      for (var i = 0; i < 10; i++) {
        var flag = checkpoint * (i + 1)
        checkpoints.push(flag.toFixed())
      }
      return checkpoints
    }

    // This function will return latestCompletion so you can reassign the variable correctly
    function checkArrayForTimestamp (array, currentTime, latestCompletion, $context) {
      var seconds = currentTime.toFixed()
      var completion = calculateLatestCompletion(currentTime, array[array.length - 1], latestCompletion)
      if (array.indexOf(seconds) > -1) {
        callApi(seconds, array[array.length - 1], completion, $context)
      }
      return completion
    }

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
          var latestCompletion = 0;

          player.getDuration().then(function(duration) {
            checkpoints = createCheckpointArray(duration)
          }).catch(function(error) {
            // console.log(error)
          })

          player.on('pause', function () {
            player.getCurrentTime().then(function (seconds) {
              // console.log('Vimeo video ' + id + ' paused at: ' + seconds);
            }).catch(function (error) {
              // console.log("There was an error");
            });
          });

          player.on('play', function () {
            player.on('timeupdate', function () {
              player.getCurrentTime().then(function (seconds) {
                // console.log('Vimeo video ' + id + ' played at: ' + seconds);
                latestCompletion = checkArrayForTimestamp(checkpoints, seconds, latestCompletion, $this)
              }).catch(function (error) {
                // console.log("There was an error:", error);
              });
            });
          });
        }

        // Youtube Video
        else if ($this.attr('src').indexOf("youtube") > -1) {

          youtubeVideos.push(this);
          var videoScope = this;
          var checkpoints;
          var latestCompletion = 0;

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
                // console.log("Not yet started"); // unstarted = gray
              } else if (playerStatus == 0) {
                // console.log("Youtube video " + id + " has ended at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 1) {
                var message = setInterval(function () {
                  // console.log("Youtube video " + id + " is playing at " + ytplayer.getCurrentTime());
                  var duration = ytplayer.getCurrentTime()
                  latestCompletion = checkArrayForTimestamp(checkpoints, duration, latestCompletion, $this)
                }, 1000);
              } else if (playerStatus == 2) {
                // console.log("Youtube video " + id + " has been paused at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 3) {
                // console.log("Youtube video " + id + " is buffering at " + ytplayer.getCurrentTime());
              } else if (playerStatus == 5) {
                // console.log("Youtube video " + id + " was cued at " + ytplayer.getCurrentTime());
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
        } // end youtube

        // Haivision Video
        else if ($this.attr('src').indexOf("theplatform") > -1) {
          var mediaId = $this.attr('data-media-id');
          var checkpoints = [];
          var latestCompletion = 0;
          window.addEventListener(mediaId + 'Loaded', function() {      
            var controller = window['player' + mediaId];
            controller.addEventListener('OnMediaLoadStart', function(e) {
              if (e.data.baseClip.isAd) return
              checkpoints = createCheckpointArray(e.data.length / 1000.0)
            })

            controller.addEventListener('OnMediaPlaying', function(e) {
              var duration = e.data.currentTime / 1000.0;
              latestCompletion = checkArrayForTimestamp(checkpoints, duration, latestCompletion, $this)
            })
            
          })


        } // end haivision
      }

      // HTML5 Video
      if ($this.is("video")) {

        var id = this.id;
        var checkpoints;
        var latestCompletion = 0;

        $this.on('loadedmetadata', function() {
          checkpoints = createCheckpointArray(this.duration)
        });

        $this.on("timeupdate", function () {
          // console.log('HTML5 Video ' + id + ' played at: ' + this.currentTime);
          latestCompletion = checkArrayForTimestamp(checkpoints, this.currentTime, latestCompletion, $this)
        });
        $this.on("play", function () {
        });
        $this.on("pause", function () {
          // console.log('HTML5 Video ' + id + ' paused at: ' + this.currentTime);
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
