var videoElement = document.querySelector('#vjs_video_3_html5_api');
var videoSource = videoElement.src;

if (videoSource) {
  var link = document.createElement('a');
  link.href = videoSource;
  link.download = 'video.mp4';

  link.style.display = 'none';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
} else {
  console.log('Video source not found.');
}
