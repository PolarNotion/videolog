(function($) {
  $.fn.videoActions = function(options) {

    var video_player={};
    var id = this.id;

    // Establish our default settings
    var settings = $.extend({}, $.fn.videoActions.defaults, options);


    return this.each( function() {

        $(".vimeo").each(function() {

          //VIMEO Video using vAPI
          //var iframe = document.querySelector('iframe');
          var player = new Vimeo.Player(this);

          player.on('pause', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log("Vimeo video paused at: " + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });

          player.on('play', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log("Vimeo video played at: " + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });
          //END of Vimeo video
      });

      $(".video").each(function() {

        var video_player={};
        var id = this.id;

      video_player[id] = document.getElementById(id);

        $(video_player[id]).click(function() {
          if (video_player[id].paused) {
            console.log('HTML5 Video played at: ', video1.currentTime);
          }
          else if (video_player[id].played) {
            console.log('HTML5 Video paused at: ', video1.currentTime);
          }
        });
        //END of HTML 5 Video

      });

    });

  };

  $.fn.videoActions.defaults = {
      height: '0',
      width: '0',
  };

}(jQuery));
