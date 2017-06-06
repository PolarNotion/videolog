(function($) {
    $.fn.videoActions = function(options) {

        // Establish our default settings
        var settings = $.extend({

        }, options);
        var youtubeVids = [];
        var playMessage;

        return this.each(function() {

            var iframeVids = document.body.querySelectorAll('iframe');
            var videoVids = document.body.querySelectorAll('video');

            // Go through each iframe video (youtube or vimeo)
            for (i = 0; i < iframeVids.length; i++) {
                if (this === iframeVids[i]) {

                    // Check iframe src attribute has 'vimeo' word
                    if ($(iframeVids[i]).attr('src').indexOf("vimeo") > -1) {


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
                    else if ($(iframeVids[i]).attr('src').indexOf("youtube") > -1) {

                        youtubeVids.push(this);
                        var videoScope = this;

                        function createYoutubeVideoById(id) {
                            var id = youtubeVids[i].id;
                            console.log(youtubeVids[i], 'videos');
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

                                //youtubevids.forEach(createYoutubeVideoById(videoScope.id));

                            }
                        }
                    }
                }
            }

            //Youtube/iFrame API script
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            //Loop through HTML5 videos
            for (i = 0; i < videoVids.length; i++) {

                if (this === videoVids[i]) {

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
            }
        });
    };

}(jQuery));
