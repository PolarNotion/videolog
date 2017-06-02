(function($) {
  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({
      vimeo: false,
      youtube: false,
      video: false
    }, options);


    return this.each( function() {

        $(".vimeo").each(function() {

          // //VIMEO Video using vAPI
          //
          //   if (document.querySelector('iframe') {
          //     // check if url has vimeo or youtube word in url
          //     // if url == youtube
          //       // run youtube code
          //     // else if url == vimeo
          //     // run vimeo code
          //   }
          var id = this.id;
          var player = new Vimeo.Player(id);

          player.on('pause', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log('Vimeo video ' + id + ' paused at: ' + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });

          player.on('play', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log('Vimeo video ' + id + ' played at: ' + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });
          //END of Vimeo video
      });

      $(".video").each(function() {

        //var video_player={};
        var id = this.id;
        var video_player = document.getElementById(id);

        $(video_player).click(function() {
          if (video_player.paused) {
            console.log('HTML5 Video ' + id + ' played at: ' + video1.currentTime);
          }
          else if (video_player.played) {
            console.log('HTML5 Video ' + id + ' paused at: ' + video1.currentTime);
          }
        });
        //END of HTML 5 Video

      });

      window.onYouTubeIframeAPIReady = function() {

        $(".youtube").each(function() {

          // BEGINNING OF YOUTUBE SETTINGS
          //debugger;
          var id = this.id;
          var ytplayer;
          ytplayer = new YT.Player(id, {
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
          });

          function onPlayerReady(event) {

            document.getElementById(id);
          }

          function getStatus(playerStatus) {
            //debugger;
            if (playerStatus == -1) {
              console.log("Not yet started"); // unstarted = gray
            } else if (playerStatus == 0) {
              console.log("Youtube video", id, "has ended at ", ytplayer.getCurrentTime());
            } else if (playerStatus == 1) {
              console.log("Youtube video ", id, " is playing at ", ytplayer.getCurrentTime());
            } else if (playerStatus == 2) {
              console.log("Youtube video", id, "has been paused at ", ytplayer.getCurrentTime());
            } else if (playerStatus == 3) {
              console.log("Youtube video", id, "is buffering at ", ytplayer.getCurrentTime());
            } else if (playerStatus == 5) {
              console.log("Youtube video", id, "was cued at ", ytplayer.getCurrentTime());
            }
          }

          function onPlayerStateChange(event) {
            getStatus(event.data);
          }

          // END OF YOUTUBE SETTINGS

        });

      }

      //Youtube/iFrame API script
      var tag = document.createElement('script');
      tag.id = 'iframe-demo';
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    });

  };

  // $.fn.videoActions.defaults = {
  //   //Maybe don't need this? What other stuff to add make plugin more customizable
  //     height: '0',
  //     width: '0',
  // };

}(jQuery));
