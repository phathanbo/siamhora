"use strict";

const APP_MENU = [
    { id: 'sevenDigitsPage', title: 'เลข 7 ตัว ฐาน 9', icon: 'fa-layer-group', color: '#d4af37' },
    { id: 'taksaPage', title: 'ทักษา', icon: 'fa-chart-line', color: '#d4af37' },
    { id: 'yarmPage', title: 'ยามอัฏฐกาล', icon: 'fa-clock', color: '#d4af37' },
    { id: 'planetRelationPage', title: 'คู่มิตร-ศัตรู', icon: 'fa-user-friends', color: '#d4af37' },
    { id: 'numerologyPage', title: 'เบอร์มงคล', icon: 'fa-mobile-alt', color: '#d4af37' },
    { id: 'weeklyColorSection', title: 'สีมงคล', icon: 'fa-fill', color: '#d4af37'},
    { id: 'dreamPage', title: 'ทำนายฝัน', icon: 'fa-sun', color: '#d4af37'},
    { id: 'nameAnalysisPage', title: 'วิเคราะห์ชื่อ', icon: 'fa-user', color: '#d4af37'},
    { id: 'lifeExtensionPage', title: 'ต่อชะตา' , icon: 'fa-fire', color: '#d4af37'},
    { id: 'elementManualPage' , title: 'คู่ธาตุ' , icon: 'fa-water', color: '#d4af37'},
    { id: 'chatraPage', title: 'ฉัตร 3 ชั้น', icon: 'fa-tree', color: '#d4af37'},
    { id: 'lottoPage', title: 'เลขเด็ด', icon: 'fa-dice', color: '#d4af37'},
];

/**
 * สร้างเมนู Dashboard บนหน้าหลัก
 */
function buildDashboard() {
    const menuGrid = document.getElementById('menuGrid');
    if(!menuGrid) return;

    menuGrid.innerHTML = APP_MENU.map(item => `
        <div class="col-6 col-md-4 mb-4">
            <div class="card h-100 bg-dark border-gold py-4 shadow-sm" 
                 style="cursor:pointer; transition: 0.3s;" 
                 onclick="navigateTo('${item.id}')"
                 onmouseover="this.style.transform='scale(1.05)'"
                 onmouseout="this.style.transform='scale(1)'">
                <div class="card-body">
                    <i class="fas ${item.icon} fa-3x mb-3" style="color:${item.color}"></i>
                    <h5 class="text-white">${item.title}</h5>
                </div>
            </div>
        </div>
    `).join('');
}

$(document).ready(function() {
    buildDashboard();
    
    // ตรวจสอบฟังก์ชันอัปเดตยามจากไฟล์ yarmPage.js
    if(typeof updateNavYarm === 'function') {
        updateNavYarm();
        setInterval(updateNavYarm, 60000);
    }
});