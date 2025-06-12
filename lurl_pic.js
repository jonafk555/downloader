(async function() {
    // 程式目標：掃描整個網頁，找出所有符合指定格式 (lurl, r2lurls, r2limit) 的資源並全部下載。

    console.log('開始掃描整個網頁，尋找 lurl[0-99], r2lurls, r2limit[0-99] (包含無數字) 的連結...');

    // 1. 定義更新後的網址特徵 (正規表示式)
    //    將 r2limit\d{1,2} 修改為 r2limit\d{0,2}，使其可以匹配 0 到 2 個數字
    const urlRegex = /(https:\/\/(?:lurl\d{1,2}\.lurl\.cc|r2lurls\.lurl\.cc|r2limit\d{0,2}\.lurl\.cc)\/[^\s"'<>()]+)/g;

    // 2. 取得整個網頁的 HTML 內容
    const pageContent = document.documentElement.innerHTML;

    // 3. 找出所有符合條件的網址
    const matches = pageContent.match(urlRegex);

    if (!matches || matches.length === 0) {
        console.log('掃描完畢，沒有在頁面上找到任何符合條件的連結。');
        alert('掃描完畢，沒有找到任何符合條件的檔案。');
        return;
    }

    // 4. 使用 Set 來自動過濾掉重複的網址
    const uniqueUrls = new Set(matches);
    const fileCount = uniqueUrls.size;

    console.log(`掃描完成！找到 ${matches.length} 個符合的連結，其中有 ${fileCount} 個不重複的檔案。`);

    // 5. 彈出確認視窗，詢問使用者是否要下載
    if (confirm(`找到了 ${fileCount} 個不重複的檔案，您確定要全部下載嗎？`)) {
        
        console.log('使用者已確認，準備開始下載...');
        const urlsToDownload = Array.from(uniqueUrls); // 將 Set 轉換為陣列以便操作

        // 6. 遍歷所有不重複的網址並觸發下載
        for (let i = 0; i < urlsToDownload.length; i++) {
            const url = urlsToDownload[i];
            console.log(`[${i + 1}/${fileCount}] 正在啟動下載: ${url}`);

            const link = document.createElement('a');
            link.href = url;
            link.download = url.substring(url.lastIndexOf('/') + 1) || 'download';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 短暫延遲 (500毫秒)，避免因過於頻繁觸發下載而被瀏覽器阻擋
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('所有下載任務皆已啟動！請檢查您的瀏覽器下載列表。');
        alert('所有下載任務皆已啟動！');

    } else {
        console.log('使用者取消了下載操作。');
    }
})();
