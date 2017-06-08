(function($) {
    $.fn.videoActions = function(options) {

        // Establish our default settings
        var settings = $.extend({}, options);
        var youtubeVids = [];
        var isPlayMessage = true;

        return this.each(function() {

                  if ($(this).is("iframe")) {
                    if ($(this).attr('src').indexOf("vimeo") > -1) {

                      $.getScript('https://player.vimeo.com/api/player.js', function(jd) {
                        console.log("vimeo api loaded");
                     });

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
                          player.on('timeupdate', function() {
                            player.getCurrentTime().then(function(seconds) {
                                console.log('Vimeo video ' + id + ' played at: ' + seconds);
                            }).catch(function(error) {
                                console.log("There was an error");
                            });
                          });
                        });

                        //END of Vimeo video
                    }
                    else if ($(this).attr('src').indexOf("youtube") > -1) {

                        youtubeVids.push(this);
                        var videoScope = this;

                        function createYoutubeVideoById(id) {
                            var id = youtubeVids[i].id;
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

                                if (playerStatus == -1) {
                                    console.log("Not yet started"); // unstarted = gray
                                } else if (playerStatus == 0) {
                                    console.log("Youtube video " + id + " has ended at " + ytplayer.getCurrentTime());
                                } else if (playerStatus == 1) {
                                  playMessage = setInterval(function(){
                                    console.log("Youtube video " + id + " is playing at " + ytplayer.getCurrentTime());
                                  }, 1000);
                                } else if (playerStatus == 2) {
                                  clearInterval(playMessage);
                                    console.log("Youtube video " + id + " has been paused at " + ytplayer.getCurrentTime());
                                } else if (playerStatus == 3) {
                                    console.log("Youtube video " + id + " is buffering at " + ytplayer.getCurrentTime());
                                } else if (playerStatus == 5) {
                                    console.log("Youtube video " + id + " was cued at " + ytplayer.getCurrentTime());
                                }
                            }

                            function onPlayerStateChange(event) {
                                getStatus(event.data);
                            }
                        }

                        window.onYouTubeIframeAPIReady = function() {

                            for (i = 0; i < youtubeVids.length; i++) {
                                createYoutubeVideoById(videoScope.id)
                            }
                          }
                      }
                  }

                    if ($(this).is("video")) {

                        var id = this.id;
                        var video_player = document.getElementById(id);

                        $(video_player).click(function() {
                            if (video_player.paused) {
                              video_player.ontimeupdate = function()  {
                                console.log('HTML5 Video ' + id + ' played at: ' + video_player.currentTime);
                              }
                            } else if (video_player.played) {
                                console.log('HTML5 Video ' + id + ' paused at: ' + video_player.currentTime);
                            }
                        });
                        //END of HTML 5 Video
                    }

            //Youtube/iFrame API script
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        });
    };

}(jQuery));
