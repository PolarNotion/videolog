(function($) {
  $.fn.videoActions = function(options) {

    // Establish our default settings
    var settings = $.extend({}, $.fn.videoActions.defaults, options);
    var v_players={};
    var id

    return $(".vimeo").each(function() {

          //VIMEO Video using vAPI
          //var iframe = document.querySelector('iframe');
          var id = this.id;
          v_players[id] = new Vimeo.Player(id);

          v_players[id].on('pause', function() {
            v_players[id].getCurrentTime().then(function(seconds) {
              console.log("Vimeo video paused at: " + seconds);
            }).catch(function(error) {
              console.log("There was an error");
            });
          });

          v_players[id].on('play', function() {
            v_players[id].getCurrentTime().then(function(seconds) {
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
      vimeo: false,
      html5: false,
      youtube: false
  };

}(jQuery));
