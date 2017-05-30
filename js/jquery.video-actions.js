(function($) {
  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({}, $.fn.videoActions.defaults, options);

    return $(".vimeo").each(function() {

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

  };

  $.fn.videoActions.defaults = {
      height: '390',
      width: '640',
  };

}(jQuery));
