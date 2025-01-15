document.addEventListener('DOMContentLoaded', function() {
    // 平滑滾動功能
    document.querySelectorAll('.nav-link, .scroll-indicator a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 添加額外的偏移量，避免內容被固定導航欄遮擋
                const offset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 證書查看功能
    const certificateModal = new bootstrap.Modal(document.getElementById('certificateModal'));
    
    document.querySelectorAll('.view-certificate').forEach(button => {
        button.addEventListener('click', () => {
            try {
                const data = ['title', 'issuer', 'date', 'link', 'image'].reduce((acc, attr) => {
                    const value = button.getAttribute(`data-${attr}`);
                    if (!value) throw new Error(`缺少 ${attr} 數據`);
                    acc[attr] = value;
                    return acc;
                }, {});

                Object.entries({
                    '#certificateModalLabel': data.title,
                    '#certificateModalIssuer': data.issuer,
                    '#certificateModalDate': data.date,
                    '#certificateModalLink': data.link,
                    '#certificateModalImage': data.image
                }).forEach(([selector, value]) => {
                    const element = document.querySelector(selector);
                    if (selector === '#certificateModalLink') {
                        element.href = value;
                    } else if (selector === '#certificateModalImage') {
                        element.src = value;
                    } else {
                        element.textContent = value;
                    }
                });

                certificateModal.show();
            } catch (error) {
                console.error('證書顯示錯誤:', error);
                alert('無法顯示證書信息，請稍後再試。');
            }
        });
    });
});