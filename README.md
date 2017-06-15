# Videolog :: jQuery Plugin for Video Tracking
[https://polarnotion.github.io/videolog/](https://polarnotion.github.io/videolog/)

## Usage
VideoLog.js is a jquery plugin that lets you view video activity from users on either HTML5 MP4 videos, Youtube, and/or Vimeo platforms.

Rather than having functionatlity of seeing one video on one platform, you may have multiple videos from any of the three platforms above.

## Installation
Include videolog.min.js and the Vimeo API script in your javascript file or at the bottom of your html document and 
call the videolog function. 

Use any Vimeo, Youtube iframe element or HTML5 video Element and give each a class name to 
be used when calling the function. Our example below has 'trackable-video' class name. 

If multiple videos are on the page, give each a unique id to eliminate confusion of which video you are tracking.

### HTML

```html
<iframe id="vp1" class="trackable-video" src="https://player.vimeo.com/video/76979871"></iframe>

<iframe id="yt1" class="trackable-video" src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"></iframe>

<video id="video1" class="trackable-video" height="250" width="350" controls>
<source src="videos/video-example.mp4" type="video/mp4"> Your browser does not support HTML5 video. </video>

<script src="jquery.js"></script> // jquery
<script src="dist/videolog.min.js"></script> // video plugin
<script src="https://player.vimeo.com/api/player.js"></script> //vimeo api*
```

### JS

```javascript
  $('.trackable-video').videoLog();
```
