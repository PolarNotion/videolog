(function($) {
  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({
      vimeo: false,
      youtube: false,
      video: false
    }, options);


        return this.each(function() {
            var videoVids = document.body.querySelectorAll('video');

        $(".vimeo").each(function() {

            //Loop through HTML5 videos
            for (i = 0; i < videoVids.length; i++) {

                if (this === videoVids[i]) {

                    var id = this.id;
                    var video_player = document.getElementById(id);

                    $(video_player).click(function() {
                        if (video_player.paused) {
                            console.log('HTML5 Video ' + id + ' played at: ' + video1.currentTime);
                        } else if (video_player.played) {
                            console.log('HTML5 Video ' + id + ' paused at: ' + video1.currentTime);
                        }
                    });
                    //END of HTML 5 Video
                }
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
