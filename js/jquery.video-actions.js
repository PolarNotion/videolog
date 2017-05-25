(function($) {

  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({
      loop: true
    }, options);

    return this.each(function() {

      if ( settings.loop ) {
        //VIMEO Video using vAPI
        var iframe = document.querySelector('iframe');
        var player = new Vimeo.Player(iframe);

        player.on('pause', function() {
          console.log('The VIMEO video was paused');

          player.getCurrentTime().then(function(seconds) {
            console.log("Time: " + seconds);
          }).catch(function(error) {
              console.log("There was an error");
          });

        });

        player.on('play', function() {
          console.log('The VIMEO video was played');

          player.getCurrentTime().then(function(seconds) {
            console.log("Time: " + seconds);
          }).catch(function(error) {
              console.log("There was an error");
          });

        });

        //HTML 5 Video usng DOM API
        var video1 = document.querySelector('video');

        $(video1).click(function() {
          if (video1.paused) {
            console.log('Video Paused', video1.currentTime);
          }
          else if (video1.played) {
            console.log('Video Playing', video1.currentTime);
          }
        });
      }

    });

  };

}(jQuery));
