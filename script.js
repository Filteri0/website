// 當網頁的所有 HTML 標籤載入完成後，執行以下程式碼
document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. 滾動浮現特效 (Scroll Reveal Animation)
       ========================================= */
    // 找出所有帶有 .reveal 類別的區塊 (也就是 HTML 中各個 section)
    const revealElements = document.querySelectorAll('.reveal');
    
    // 建立一個「交集觀察器 (IntersectionObserver)」
    // 它的作用是監聽元素是否滾動進入了瀏覽器的可視範圍
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 如果這個元素進入了視窗 (isIntersecting 為 true)
            if (entry.isIntersecting) {
                // 給該元素加上 'active' 類別，觸發 CSS 的淡入上浮動畫
                entry.target.classList.add('active');
                // 動畫觸發過一次後，就停止觀察該元素，節省瀏覽器效能
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null, // 以整個瀏覽器視窗作為觀察基準
        threshold: 0.15, // 當元素有 15% 出現在畫面上時，就觸發動畫
        rootMargin: "0px"
    });

    // 讓觀察器開始監視每一個找到的 .reveal 元素
    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================
       2. 專業證照 Modal 彈窗資料綁定
       ========================================= */
    // 找出 HTML 中用來顯示證書彈窗的元素 (Modal)
    const certificateModalElement = document.getElementById('certificateModal');
    
    // 確認頁面上有這個 Modal 元素才執行接下來的動作，避免報錯
    if (certificateModalElement) {
        // 使用 Bootstrap 原生的功能將它轉換成可操作的彈窗物件
        const certificateModal = new bootstrap.Modal(certificateModalElement);
        
        // 找出所有寫著「查看詳細」的按鈕 (.view-certificate)
        document.querySelectorAll('.view-certificate').forEach(button => {
            // 當其中一個按鈕被點擊時，觸發以下事件
            button.addEventListener('click', () => {
                try {
                    // 第一步：讀取按鈕上隱藏的 data-* 屬性資料 (例如 data-title)
                    const data = {
                        title: button.dataset.title || '未知證照',   // 證照名稱
                        issuer: button.dataset.issuer || '未知機構', // 發證機構
                        date: button.dataset.date || '未知日期',     // 取得日期
                        link: button.dataset.link || '#',           // 驗證網址
                        image: button.dataset.image || ''           // 證書圖片路徑
                    };

                    // 第二步：把讀取到的資料，塞進 Modal 彈窗的各個對應位置中
                    document.getElementById('certificateModalLabel').textContent = data.title;
                    document.getElementById('certificateModalIssuer').textContent = data.issuer;
                    document.getElementById('certificateModalDate').textContent = data.date;
                    
                    // 處理連結：如果有正確網址就放上去，沒有就把這個按鈕隱藏
                    const modalLink = document.getElementById('certificateModalLink');
                    modalLink.href = data.link;
                    modalLink.style.display = data.link !== '#' ? 'inline-block' : 'none';
                    
                    // 替換證書圖片的 src 網址
                    document.getElementById('certificateModalImage').src = data.image;

                    // 第三步：資料都更新好了，顯示彈窗！
                    certificateModal.show();
                    
                } catch (error) {
                    // 如果有出錯 (例如找不到元素)，在控制台報錯並跳出警告
                    console.error('證書顯示錯誤:', error);
                    alert('無法顯示證書信息，請稍後再試。');
                }
            });
        });
    }
});