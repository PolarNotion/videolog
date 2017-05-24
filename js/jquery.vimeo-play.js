(function($) {

  $.fn.vimeoPlay = function(options) {

    // Establish our default settings
    var settings = $.extend({
      loop: true
    }, options);


    return this.each(function() {

      if ( settings.loop ) {
        var iframe = document.querySelector('iframe');
        var player = new Vimeo.Player(iframe);

        player.on('play', function() {
          console.log('played the video!');
        });
      }

    });

  };

}(jQuery));
