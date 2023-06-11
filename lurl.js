function downloadVideoFromSource() {
  var videoElement = document.getElementById('vjs_video_3_html5_api');
  var sourceElement = videoElement.getElementsByTagName('source')[0];
  
  if (sourceElement) {
    var videoUrl = sourceElement.src;
    var downloadLink = document.createElement('a');
    downloadLink.href = videoUrl;
    downloadLink.download = 'video.mov';
    downloadLink.click();
  }
}

// Usage:
downloadVideoFromSource();
