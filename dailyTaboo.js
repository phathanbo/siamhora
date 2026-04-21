// ==========================================
// 1. ข้อมูลฐานระบบ (Database)
// ==========================================

const TABOO_DATA = {
    0: { day: "อาทิตย์", good: ["สระผม (อายุยืน)", "ตัดผม (อายุยืน)", "นุ่งผ้าใหม่ (ชนะศัตรู)"], bad: ["ตัดเล็บ (จะมีศัตรู)", "ห้ามขึ้นบ้านใหม่"] },
    1: { day: "จันทร์", good: ["สระผม (มีลาภ)", "ตัดผม (จะมีลาภ)", "ตัดเล็บ (มีลาภใหญ่)"], bad: ["ห้ามทำของหาย", "ห้ามเดินทางไกลทางน้ำ"] },
    2: { day: "อังคาร", good: ["สระผม (ชนะศัตรู)", "โกนหนวดเครา"], bad: ["ตัดผม (ศัตรูจะทำร้าย)", "นุ่งผ้าใหม่", "ตัดเล็บ"] },
    3: { day: "พุธ", good: ["นุ่งผ้าใหม่ (มีสุขมาก)", "ตัดเล็บ"], bad: ["สระผม", "ตัดผม (พุธหัวกุด)"] },
    4: { day: "พฤหัสบดี", good: ["สระผม", "ตัดผม", "นุ่งผ้าใหม่"], bad: ["ตัดเล็บ (จะมีทุกข์)"] },
    5: { day: "ศุกร์", good: ["สระผม", "ตัดผม", "นุ่งผ้าใหม่", "ตัดเล็บ"], bad: ["ห้ามขึ้นบ้านใหม่"] },
    6: { day: "เสาร์", good: ["สระผม", "ตัดผม"], bad: ["นุ่งผ้าใหม่", "ตัดเล็บ"] }
};

const DIRECTION_DATA = {
    0: { lucky: "ทิศตะวันออก", blind: "ทิศตะวันตกเฉียงเหนือ" },
    1: { lucky: "ทิศตะวันตก", blind: "ทิศตะวันออก" },
    2: { lucky: "ทิศตะวันออก", blind: "ทิศตะวันออกเฉียงเหนือ" },
    3: { lucky: "ทิศเหนือ", blind: "ทิศเหนือ" },
    4: { lucky: "ทิศเหนือ", blind: "ทิศใต้" },
    5: { lucky: "ทิศตะวันออก", blind: "ทิศตะวันตก" },
    6: { lucky: "ทิศใต้", blind: "ทิศตะวันออกเฉียงใต้" }
};

const ZODIAC_RELATIONS = {
    "ชวด": { great: ["มะโรง", "วอก"], bad: ["มะเมีย"] },
    "ฉลู": { great: ["มะเส็ง", "ระกา"], bad: ["มะแม"] },
    "ขาล": { great: ["มะเมีย", "จอ"], bad: ["วอก"] },
    "เถาะ": { great: ["มะแม", "กุน"], bad: ["ระกา"] },
    "มะโรง": { great: ["ชวด", "วอก"], bad: ["จอ"] },
    "มะเส็ง": { great: ["ฉลู", "ระกา"], bad: ["กุน"] },
    "มะเมีย": { great: ["ขาล", "จอ"], bad: ["ชวด"] },
    "มะแม": { great: ["เถาะ", "กุน"], bad: ["ฉลู"] },
    "วอก": { great: ["ชวด", "มะโรง"], bad: ["ขาล"] },
    "ระกา": { great: ["ฉลู", "มะเส็ง"], bad: ["เถาะ"] },
    "จอ": { great: ["ขาล", "มะเมีย"], bad: ["มะโรง"] },
    "กุน": { great: ["เถาะ", "มะแม"], bad: ["มะเส็ง"] }
};

// ==========================================
// 2. ฟังก์ชันการทำงาน (Logic)
// ==========================================

function updateDailyTaboo(dayIndex) {
    const data = TABOO_DATA[dayIndex];
    if (!data) return;

    const dayTitle = document.getElementById('tabooDayTitle');
    const goodList = document.getElementById('goodList');
    const badList = document.getElementById('badList');

    if (dayTitle) dayTitle.innerText = "วัน" + data.day;
    
    // ใช้ Inline Style สำหรับสีเขียว/แดง เพื่อความชัวร์
    if (goodList) {
        goodList.innerHTML = data.good.map(item => 
            `<li style="list-style:none; color:#5cb85c;"><i class="fas fa-check-circle mr-2"></i> ${item}</li>`
        ).join('');
    }

    if (badList) {
        badList.innerHTML = data.bad.map(item => 
            `<li style="list-style:none; color:#d9534f;"><i class="fas fa-times-circle mr-2"></i> ${item}</li>`
        ).join('');
    }

    if (typeof updateDirectionDisplay === 'function') updateDirectionDisplay(dayIndex);
    if (typeof updateZodiacLuckDisplay === 'function') updateZodiacLuckDisplay(dayIndex);
}

function updateDirectionDisplay(dayIndex) {
    const dir = DIRECTION_DATA[dayIndex];
    const container = document.getElementById('directionContainer');
    if (!container || !dir) return;

    container.innerHTML = `
        <div class="direction-card">
            <h6 class="text-gold text-center mb-3"><i class="fas fa-compass"></i> ทิศมงคลประจำวัน</h6>
            <div class="row text-center">
                <div class="col-6 border-right-gold">
                    <span class="badge badge-success mb-2">🎯 ทิศโชคลาภ</span>
                    <div class="text-white font-weight-bold">${dir.lucky}</div>
                </div>
                <div class="col-6">
                    <span class="badge badge-danger mb-2">🚫 ทิศกาลกิณี</span>
                    <div class="text-white font-weight-bold">${dir.blind}</div>
                </div>
            </div>
        </div>
    `;
}

function updateZodiacLuckDisplay(dayIndex) {
    const dayZodiacs = ["มะโรง", "มะเส็ง", "มะเมีย", "มะแม", "วอก", "ระกา", "จอ"];
    const currentDayZodiac = dayZodiacs[dayIndex];
    
    let great = [];
    let bad = [];
    
    for (let zodiac in ZODIAC_RELATIONS) {
        if (ZODIAC_RELATIONS[zodiac].great.includes(currentDayZodiac)) great.push(zodiac);
        if (ZODIAC_RELATIONS[zodiac].bad.includes(currentDayZodiac)) bad.push(zodiac);
    }
    
    const greatEl = document.getElementById('zodiacGreat');
    const badEl = document.getElementById('zodiacBad');
    
    if (greatEl) greatEl.innerText = great.join(', ') || "-";
    if (badEl) badEl.innerText = bad.join(', ') || "-";
}

// ==========================================
// 3. เริ่มทำงานตอนโหลดหน้า (Initialization)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const dayIndex = now.getDay();

    // แสดงวันที่ปัจจุบัน
    const dateDisplay = document.getElementById('current-date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = "วันนี้: " + now.toLocaleDateString('th-TH', options);
    }

    // รันข้อมูลรายวัน
    updateDailyTaboo(dayIndex);
    
    // รันยามอุบากอง (ถ้ามีฟังก์ชันนี้อยู่ในไฟล์เดียวกัน)
    if (typeof renderUbakongDay === 'function') {
        renderUbakongDay();
    }
});

// ฟังก์ชันสำหรับ Capture รูปภาพ
async function downloadTabooImage() {
    const area = document.getElementById('tabooCaptureArea');
    if (!area) return;
    try {
        const canvas = await html2canvas(area, { backgroundColor: '#1a1a1a', scale: 2 });
        const link = document.createElement('a');
        link.download = `ดวงรายวัน_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
    } catch (e) {
        console.error("Capture Failed:", e);
    }
}

// ฟังก์ชันเมื่อผู้ใช้เปลี่ยนวันใน Dropdown
function changeTabooDay() {
    const select = document.getElementById('tabooDaySelect');
    if (select) updateDailyTaboo(parseInt(select.value));
}

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const dayIndex = now.getDay();

    const tabooSelect = document.getElementById('tabooDaySelect');
    if (tabooSelect) tabooSelect.value = dayIndex;

    const dateDisplay = document.getElementById('current-date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = "วันนี้: " + now.toLocaleDateString('th-TH', options);
    }

    updateDailyTaboo(dayIndex);
});

// ปรับปรุงฟังก์ชันเดิมให้รองรับการเปลี่ยนข้อมูล
function updateDailyTaboo(dayIndex) {
    const data = TABOO_DATA[dayIndex];
    if (!data) return;

    // 1. อัปเดตหัวข้อและรายการ ดี-ร้าย
    const dayTitle = document.getElementById('tabooDayTitle');
    const goodList = document.getElementById('goodList');
    const badList = document.getElementById('badList');

    if (dayTitle) dayTitle.innerText = "วัน" + data.day;
    
    if (goodList) {
        goodList.innerHTML = data.good.map(item => 
            `<div class="list-item-custom"><i class="fas fa-check-circle text-success mr-2"></i>${item}</div>`
        ).join('');
    }

    if (badList) {
        badList.innerHTML = data.bad.map(item => 
            `<div class="list-item-custom"><i class="fas fa-times-circle text-danger mr-2"></i>${item}</div>`
        ).join('');
    }

    // 2. อัปเดตทิศมงคลและดวงนักษัตรตามวันที่เลือก
    updateDirectionDisplay(dayIndex);
    updateZodiacLuckDisplay(dayIndex);
}

// แก้ไขส่วน DOMContentLoaded เพื่อให้ Dropdown ตรงกับวันจริงตอนเปิดแอปครั้งแรก
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const dayIndex = now.getDay();

    // ตั้งค่า Dropdown ให้ตรงกับวันปัจจุบัน
    const tabooSelect = document.getElementById('tabooDaySelect');
    if (tabooSelect) tabooSelect.value = dayIndex;

    // แสดงวันที่ปัจจุบัน
    const dateDisplay = document.getElementById('current-date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = "วันนี้: " + now.toLocaleDateString('th-TH', options);
    }

    // รันข้อมูลครั้งแรก
    updateDailyTaboo(dayIndex);
});