// ==========================================
// 1. ข้อมูลฐานระบบ (Database)
// ==========================================

const TABOO_DATA = {
    0: { 
        day: "อาทิตย์", 
        good: ["สระผม (อายุยืน)", "ตัดผม (อายุยืน)", "นุ่งผ้าใหม่ (ชนะศัตรู)", "อาบน้ำเพ็ญ/ทำบุญ"], 
        bad: ["ตัดเล็บ (จะมีศัตรู)", "ห้ามขึ้นบ้านใหม่ (ร้อนรุ่มเหมือนไฟ)", "ห้ามทำการมงคลเกี่ยวกับน้ำ", "ห้ามเผาศพ (ซ้ำซ้อน)"] 
    },
    1: { 
        day: "จันทร์", 
        good: ["สระผม (มีลาภ)", "ตัดผม (จะมีลาภ)", "นุ่งผ้าใหม่ (คนรักเมตตามาก)", "ตัดเล็บ (มีลาภใหญ่)", "ซื้อของเข้าบ้าน/เริ่มงานใหม่"], 
        bad: ["ห้ามทำของหาย (จะไม่ได้คืน)", "ห้ามเดินทางไกลทางน้ำ", "ห้ามโกนจุก"] 
    },
    2: { 
        day: "อังคาร", 
        good: ["สระผม (ชนะศัตรู)", "โกนหนวดเครา (แก้เคล็ด)", "เหมาะกับงานช่าง/อาวุธ"], 
        bad: ["ตัดผม (ศัตรูจะทำร้าย/ให้โทษ)", "นุ่งผ้าใหม่ (มีทุกข์มาก)", "ตัดเล็บ (ทรัพย์จะหาย)", "ห้ามแต่งงาน/หมั้นหมาย", "ห้ามขึ้นบ้านใหม่ (โจรชุก)"] 
    },
    3: { 
        day: "พุธ", 
        good: ["นุ่งผ้าใหม่ (มีสุขมาก)", "ตัดเล็บ (เจริญสวัสดี)", "เปิดร้านค้าใหม่/เจรจาธุรกิจ"], 
        bad: ["สระผม (จะเกิดถ้อยร้อยความ)", "ตัดผม (พุธหัวกุด - จะเกิดทะเลาะวิวาท)", "ห้ามแต่งงาน", "ห้ามทุบรื้ออาคาร/ขุดดิน"] 
    },
    4: { 
        day: "พฤหัสบดี", 
        good: ["สระผม (เทวดารักษา)", "ตัดผม (เทวดารักษา)", "นุ่งผ้าใหม่ (เป็นสวัสดีมาก)", "ไหว้ครู/เริ่มเรียนวิชา/รับตำแหน่ง"], 
        bad: ["ตัดเล็บ (จะมีทุกข์)", "ห้ามย้ายเตียงนอน", "ห้ามเดินทางไกล"] 
    },
    5: { 
        day: "ศุกร์", 
        good: ["สระผม (อยู่สุขเย็นใจ)", "ตัดผม (จะมีลาภ)", "นุ่งผ้าใหม่ (มีทรัพย์มาก)", "ตัดเล็บ (มีโภคทรัพย์)", "แต่งงาน/หมั้นหมาย"], 
        bad: ["ห้ามขึ้นบ้านใหม่ (ทุกข์ใจ)", "ห้ามทำบุญขึ้นบ้านใหม่", "ห้ามซื้อเสื้อผ้าสีดำ"] 
    },
    6: { 
        day: "เสาร์", 
        good: ["สระผม (สิ่งที่คิดไว้จะสำเร็จ)", "ตัดผม (การที่คิดไว้จะสำเร็จ)", "เหมาะกับงานเกษตร/ที่ดิน", "ทำพิธีแก้บน/ไสยศาสตร์"], 
        bad: ["นุ่งผ้าใหม่ (โศกเศร้า)", "ตัดเล็บ (จะเจ็บป่วย)", "ห้ามทำการมงคลส่วนใหญ่"] 
    }
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
    
    if (goodList) {
        goodList.innerHTML = data.good.map(item => 
            `<li class="list-item-custom"><i class="fas fa-check-circle text-success mr-2"></i>${item}</li>`
        ).join('');
    }

    if (badList) {
        badList.innerHTML = data.bad.map(item => 
            `<li class="list-item-custom"><i class="fas fa-times-circle text-danger mr-2"></i>${item}</li>`
        ).join('');
    }

    updateDirectionDisplay(dayIndex);
    updateZodiacLuckDisplay(dayIndex);
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
    const selectedDay = document.getElementById('tabooDaySelect').value;
    updateDailyTaboo(parseInt(selectedDay));
    
    // ปรับปรุงการแสดงผลวันที่ (Optional: ถ้าอยากให้รู้ว่าเป็นคำทำนายของวันไหน)
    const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
    console.log("เปลี่ยนมุมมองเป็นวัน: " + days[selectedDay]);
}

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
            `<li class="list-item-custom"><i class="fas fa-check-circle text-success mr-2"></i>${item}</li>`
        ).join('');
    }

    if (badList) {
        badList.innerHTML = data.bad.map(item => 
            `<li class="list-item-custom"><i class="fas fa-times-circle text-danger mr-2"></i>${item}</li>`
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