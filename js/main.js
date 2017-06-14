$(function() {
  $('a[href*="#"]:not([href="#"]):not([role="tab"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top + 64
        }, 1000);
        return false;
      }
    }
  });
});

$('nav').scrollmptious().css('transition', 'top 0.2s ease-in-out');