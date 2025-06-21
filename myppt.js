// 1. 在網頁中尋找影片的 <source> 標籤
// document.querySelector('video source') 會找到頁面中第一個 <video> 元素內的 <source> 元素
const sourceElement = document.querySelector('video source');

// 2. 檢查是否成功找到影片來源
if (sourceElement && sourceElement.src) {
  // 如果找到了，就從中提取 src 網址
  const videoSrc = sourceElement.src;
  console.log('成功找到影片網址:', videoSrc);

  // --- 以下的下載邏輯與之前相同 ---

  // 3. 建立一個新的 <a> 標籤 (錨點/連結)
  const link = document.createElement('a');

  // 4. 設定連結的屬性
  link.href = videoSrc;
  link.download = 'downloaded_video.mp4'; // 您可以自訂下載的檔案名稱

  // 5. 將連結暫時加入到網頁中並點擊
  document.body.appendChild(link);
  link.click();

  // 6. 移除暫時的連結
  document.body.removeChild(link);

} else {
  // 如果在頁面上找不到 'video source' 元素，則在主控台提示錯誤
  console.error('錯誤：在頁面上找不到影片來源！請確認頁面有 <video> 標籤且內部包含 <source>。');
}
