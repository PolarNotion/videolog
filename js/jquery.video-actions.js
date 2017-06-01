(function($) {
  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({}, $.fn.videoActions.defaults, options);


    return this.each( function() {

        $(".vimeo").each(function() {

          //VIMEO Video using vAPI
          //var iframe = document.querySelector('iframe');
          var id = this.id;
          var player = new Vimeo.Player(id);

          player.on('pause', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log('Vimeo video', id, 'paused at: ' + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });

          player.on('play', function() {
            player.getCurrentTime().then(function(seconds) {
              console.log('Vimeo video', id, 'played at: ' + seconds);
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
            console.log('HTML5 Video', id, 'played at: ', video1.currentTime);
          }
          else if (video_player.played) {
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
