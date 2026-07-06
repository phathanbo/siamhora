function initTarot() {
    const tarotBtn = document.getElementById('drawTarotBtn');
    const tarotResult = document.getElementById('tarotResult');
    if (!tarotBtn || !tarotResult) return;

    tarotBtn.addEventListener('click', () => {
        const lastDraw = localStorage.getItem('lastTarotDraw');
        const today = new Date().toISOString().split('T')[0];

        if (lastDraw === today) {
            Swal.fire('อ๊ะ!', 'คุณเปิดไพ่ยิปซีประจำวันไปแล้ว รอวันพรุ่งนี้นะครับ', 'warning');
            return;
        }

        // Animation
        tarotBtn.disabled = true;
        tarotBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังสับไพ่...';
        
        setTimeout(() => {
            const randomIdx = Math.floor(Math.random() * tarotCards.length);
            const card = tarotCards[randomIdx];
            
            localStorage.setItem('lastTarotDraw', today);
            
            tarotResult.innerHTML = `
                <div class="card bg-dark border-gold mt-4 p-3 text-center" style="animation: fadeIn 1s;">
                    <img src="${card.img}" alt="${card.name}" style="max-height: 300px; width: auto; margin: 0 auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(212,175,55,0.3);">
                    <h3 class="text-gold mt-3">${card.name}</h3>
                    <p class="text-light mt-2" style="font-size: 1.1rem;">${card.meaning}</p>
                </div>
            `;
            tarotResult.style.display = 'block';
            tarotBtn.innerHTML = '<i class="fas fa-check"></i> เปิดไพ่สำเร็จ';
        }, 1500);
    });
}

function initSiamsi() {
    const siamsiBtn = document.getElementById('shakeSiamsiBtn');
    const siamsiResult = document.getElementById('siamsiResult');
    if (!siamsiBtn || !siamsiResult) return;

    siamsiBtn.addEventListener('click', () => {
        const lastDraw = localStorage.getItem('lastSiamsiDraw');
        const today = new Date().toISOString().split('T')[0];

        if (lastDraw === today) {
            Swal.fire('อ๊ะ!', 'คุณเสี่ยงเซียมซีประจำวันไปแล้ว รอวันพรุ่งนี้นะครับ', 'warning');
            return;
        }

        // Animation
        siamsiBtn.disabled = true;
        siamsiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังเขย่าเซียมซี...';
        
        setTimeout(() => {
            const randomIdx = Math.floor(Math.random() * siamsiSticks.length);
            const stick = siamsiSticks[randomIdx];
            
            localStorage.setItem('lastSiamsiDraw', today);
            
            siamsiResult.innerHTML = `
                <div class="card bg-dark border-gold mt-4 p-4 text-center" style="animation: fadeIn 1s;">
                    <h2 class="text-gold mb-3" style="font-size: 3rem;">หมายเลข ${stick.num}</h2>
                    <span class="badge badge-warning mb-3" style="font-size: 1.2rem;">${stick.type}</span>
                    <p class="text-light mt-2" style="font-size: 1.2rem; line-height: 1.8;">"${stick.text}"</p>
                </div>
            `;
            siamsiResult.style.display = 'block';
            siamsiBtn.innerHTML = '<i class="fas fa-check"></i> เสี่ยงทายสำเร็จ';
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTarot();
    initSiamsi();
});
