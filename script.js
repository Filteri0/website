document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. 滾動浮現特效 (Scroll Reveal Animation)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    // 設定觀察器，當區塊進入視窗 15% 時觸發動畫
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 觸發過後就停止觀察，節省效能
            }
        });
    }, {
        root: null,
        threshold: 0.15, // 元素出現 15% 即可觸發
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================
       2. 專業證照 Modal 彈窗資料綁定
       ========================================= */
    const certificateModalElement = document.getElementById('certificateModal');
    if (certificateModalElement) {
        const certificateModal = new bootstrap.Modal(certificateModalElement);
        
        document.querySelectorAll('.view-certificate').forEach(button => {
            button.addEventListener('click', () => {
                try {
                    // 獲取按鈕上的 data 屬性
                    const data = {
                        title: button.dataset.title || '未知證照',
                        issuer: button.dataset.issuer || '未知機構',
                        date: button.dataset.date || '未知日期',
                        link: button.dataset.link || '#',
                        image: button.dataset.image || ''
                    };

                    // 更新 DOM 元素
                    document.getElementById('certificateModalLabel').textContent = data.title;
                    document.getElementById('certificateModalIssuer').textContent = data.issuer;
                    document.getElementById('certificateModalDate').textContent = data.date;
                    
                    const modalLink = document.getElementById('certificateModalLink');
                    modalLink.href = data.link;
                    modalLink.style.display = data.link !== '#' ? 'inline-block' : 'none';
                    
                    document.getElementById('certificateModalImage').src = data.image;

                    // 顯示彈窗
                    certificateModal.show();
                } catch (error) {
                    console.error('證書顯示錯誤:', error);
                    alert('無法顯示證書信息，請稍後再試。');
                }
            });
        });
    }
});