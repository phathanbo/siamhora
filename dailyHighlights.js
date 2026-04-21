"use strict";

/**
 * เปิดหน้าไฮไลท์ประจำวันและเตรียมข้อมูล
 */
function showDailyHighlightPage() {
    // 1. ตั้งค่าวันที่ใน Input (ใช้เวลาท้องถิ่นแทน ISO เพื่อความแม่นยำของวันที่)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const picker = document.getElementById('highlightDatePicker');
    if (picker) {
        picker.value = `${year}-${month}-${day}`;
    }
    
    // 2. เปลี่ยนหน้า
    if (typeof window.navigateTo === "function") {
        window.navigateTo('dailyHighlightPage');
    }
    
    // 3. วาดตาราง
    generateDailyMap();
}

/**
 * สร้างตารางยามมงคลประจำวัน
 */
function generateDailyMap() {
    const picker = document.getElementById('highlightDatePicker');
    const dayContainer = document.getElementById('dayYarmList');
    const nightContainer = document.getElementById('nightYarmList');
    const titleEl = document.getElementById('mapDateTitle');

    if (!picker || !picker.value || !dayContainer || !nightContainer) return;

    // ตรวจสอบว่ามีข้อมูลยามจากไฟล์อื่นโหลดมาหรือยัง
    if (!window.YARM_CHART || !window.YARM_INFO) {
        console.error("DailyHighlight: YARM_CHART or YARM_INFO is missing.");
        return;
    }

    const targetDate = new Date(picker.value);
    let dayOfWeek = targetDate.getDay(); 
    
    // แสดงวันที่ภาษาไทย
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (titleEl) {
        titleEl.innerText = targetDate.toLocaleDateString('th-TH', options);
    }

    dayContainer.innerHTML = '';
    nightContainer.innerHTML = '';

    const timeLabels = [
        "06:00 - 07:30", "07:30 - 09:00", "09:00 - 10:30", "10:30 - 12:00",
        "12:00 - 13:30", "13:30 - 15:00", "15:00 - 16:30", "16:30 - 18:00",
        "18:00 - 19:30", "19:30 - 21:00", "21:00 - 22:30", "22:30 - 00:00",
        "00:00 - 01:30", "01:30 - 03:00", "03:00 - 04:30", "04:30 - 06:00"
    ];

    // วาดกลางวัน 8 ยาม
    for (let i = 0; i < 8; i++) {
        const starId = window.YARM_CHART.day[dayOfWeek][i];
        dayContainer.appendChild(renderYarmRow(timeLabels[i], starId));
    }

    // วาดกลางคืน 8 ยาม 
    // หมายเหตุ: ตามหลักโหราศาสตร์ ตารางกลางคืนจะอิงตามวันปัจจุบันที่เลือก
    for (let i = 0; i < 8; i++) {
        const starId = window.YARM_CHART.night[dayOfWeek][i];
        nightContainer.appendChild(renderYarmRow(timeLabels[i + 8], starId));
    }
}

/**
 * สร้างแถวข้อมูล HTML ของแต่ละยาม
 */
function renderYarmRow(timeRange, starId) {
    const info = window.YARM_INFO[starId];
    // เรียกใช้ getStarColor จาก yarmPage.js (ตรวจสอบความพร้อม)
    const color = typeof window.getStarColor === "function" ? window.getStarColor(starId) : "#ffd700";
    
    // Logic การให้คะแนนดาว
    let count = 4;
    if ([0, 1, 5, 6].includes(starId)) count = 5; // กลุ่มมงคลสูง
    else if ([4, 7].includes(starId)) count = 3;  // กลุ่มควรระวัง

    const stars = "⭐".repeat(count);

    const div = document.createElement('div');
    div.className = "yarm-row-mobile animate__animated animate__fadeIn";
    div.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        margin-bottom: 8px;
        border-left: 5px solid ${color};
        background: rgba(255, 255, 255, 0.03);
        border-radius: 4px;
        gap: 10px;
    `;
    
    div.innerHTML = `
        <div style="flex: 1; min-width: 120px;">
            <div style="color: #aaa; font-size: 0.85rem; margin-bottom: 2px;">
                <i class="far fa-clock"></i> ${timeRange}
            </div>
            <div style="color: ${color}; font-size: 1.1rem; font-weight: bold;">
                ${info.name}
            </div>
            <div style="font-size: 0.7rem; letter-spacing: 2px;">${stars}</div>
        </div>
        <div style="flex: 2; text-align: right;">
            <div style="color: #eee; font-size: 0.9rem; font-weight: 500; line-height: 1.3;">
                ${info.good}
            </div>
        </div>
    `;
    return div;
}

/**
 * ดาวน์โหลดรูปภาพแผนที่ฤกษ์ประจำวัน
 */
async function downloadDailyMap(element) {
    // ตรวจสอบว่ามี Library html2canvas หรือไม่
    if (typeof html2canvas === "undefined") {
        alert("ระบบไม่พบ Library สำหรับสร้างภาพ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต");
        return;
    }

    const area = document.getElementById('dailyMapCapture');
    if (!area) return;

    const btn = element instanceof HTMLElement ? element : document.querySelector('.download-btn');
    const originalContent = btn ? btn.innerHTML : "";

    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังเตรียมภาพ...';
        btn.disabled = true;
    }

    // สร้าง Footer สำหรับใส่ในภาพ
    const footer = document.createElement('div');
    footer.id = 'temp-footer';
    footer.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid rgba(212,175,55,0.3);
        color: #d4af37;
    `;
    footer.innerHTML = `
        <div style="font-size: 14px;">🔮 <strong>สยามโหรามงคล</strong></div>
        <div style="font-size: 11px; opacity: 0.7;">ลิขสิทธิ์ข้อมูลตามตำราทักษาพยากรณ์</div>
    `;

    try {
        const originalStyle = area.style.cssText;
        
        // ปรับแต่ง Area ให้เหมาะสมกับการเป็นรูปภาพ (Fixed Width)
        area.style.width = "500px";
        area.style.padding = "25px";
        area.style.background = "#121212"; // พื้นหลังเข้มเพื่อให้ตัวหนังสือชัดเจน
        area.appendChild(footer);

        const canvas = await html2canvas(area, {
            backgroundColor: '#121212',
            scale: 2, // เพิ่มความชัด
            useCORS: true,
            logging: false,
            width: 500
        });
        
        // คืนค่า
        area.removeChild(footer);
        area.style.cssText = originalStyle;

        // ดาวน์โหลด
        const dateTitle = document.getElementById('mapDateTitle')?.innerText || 'Daily';
        const link = document.createElement('a');
        link.download = `ฤกษ์มงคล_${dateTitle.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

    } catch (e) {
        console.error("Capture Error:", e);
        alert("ไม่สามารถสร้างรูปภาพได้: " + e.message);
    } finally {
        if (btn) {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    }
}