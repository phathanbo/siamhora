"use strict";
// 1. ฐานข้อมูลข้อห้ามรายวัน
const TABOO_DATA = {
    0: { 
        day: "อาทิตย์", 
        good: ["ตัดผม (อายุยืน สุขภาพแข็งแรง)", "ตัดเล็บ (โชคดีมีลาภ)", "อาบน้ำเพ็ญ/ทำบุญ"], 
        bad: ["ห้ามขึ้นบ้านใหม่ (ร้อนรุ่มเหมือนไฟ)", "ห้ามทำการมงคลเกี่ยวกับน้ำ", "ห้ามเผาศพ (ซ้ำซ้อน)"] 
    },
    1: { 
        day: "จันทร์", 
        good: ["ตัดผม (มีโชคลาภ/เสน่ห์)", "ตัดเล็บ (มีลาภใหญ่)", "ซื้อของเข้าบ้าน/เริ่มงานใหม่"], 
        bad: ["ห้ามทำของหาย (จะไม่ได้คืน)", "ห้ามเดินทางไกลทางน้ำ", "ห้ามโกนจุก"] 
    },
    2: { 
        day: "อังคาร", 
        good: ["ตัดผม (มีเดชอำนาจ ผู้คนยำเกรง)", "โกนหนวดเครา (แก้เคล็ด)", "เหมาะกับงานช่าง/อาวุธ"], 
        bad: ["ห้ามแต่งงาน/หมั้น", "ห้ามตัดเล็บ (ขัดลาภ/จะเจ็บป่วย)", "ห้ามขึ้นบ้านใหม่ (โจรชุก)"] 
    },
    3: { 
        day: "พุธ", 
        good: ["ตัดเล็บ (สิริมงคล)", "เปิดร้านค้าใหม่/เจรจาธุรกิจ"], 
        bad: ["ห้ามตัดผม (พุธหัวกุด - ลาภหายมีแต่ทุกข์)", "ห้ามแต่งงาน", "ห้ามทุบรื้ออาคาร/ขุดดิน"] 
    },
    4: { 
        day: "พฤหัสบดี", 
        good: ["ตัดผม (เทวดาคุ้มครอง เป็นสิริสวัสดิ์)", "ไหว้ครู/เริ่มเรียนวิชา/รับตำแหน่ง"], 
        bad: ["ห้ามย้ายเตียงนอน", "ห้ามตัดเล็บ (จะเกิดเรื่องเศร้า/เสียทรัพย์)", "ห้ามเดินทางไกล"] 
    },
    5: { 
        day: "ศุกร์", 
        good: ["ตัดผม (ลาภลอย/เสน่ห์เมตตา)", "ตัดเล็บ (สิริมงคลสูงสุด)", "แต่งงาน/หมั้นหมาย"], 
        bad: ["ห้ามขึ้นบ้านใหม่ (ทุกข์ใจ)", "ห้ามทำบุญขึ้นบ้านใหม่", "ห้ามซื้อเสื้อผ้าสีดำ"] 
    },
    6: { 
        day: "เสาร์", 
        good: ["เหมาะกับงานเกษตร/ที่ดิน", "ทำพิธีแก้บน/ไสยศาสตร์"], 
        bad: ["ห้ามตัดผม (จะเกิดเรื่องร้าย/คดีความ)", "ห้ามตัดเล็บ (คนในบ้านจะแตกแยก)", "ห้ามทำการมงคลส่วนใหญ่"] 
    }
};

// 2. ฐานข้อมูลทิศมงคล
const DIRECTION_DATA = {
    0: { lucky: "ทิศใต้ (ศรี)", blind: "ทิศเหนือ (กาลกิณี)" },               // อาทิตย์
    1: { lucky: "ทิศตะวันตกเฉียงใต้ (ศรี)", blind: "ทิศตะวันออกเฉียงเหนือ (กาลกิณี)" }, // จันทร์
    2: { lucky: "ทิศตะวันตก (ศรี)", blind: "ทิศตะวันออก (กาลกิณี)" },               // อังคาร
    3: { lucky: "ทิศตะวันตกเฉียงเหนือ (ศรี)", blind: "ทิศตะวันออกเฉียงใต้ (กาลกิณี)" }, // พุธ
    4: { lucky: "ทิศตะวันออกเฉียงเหนือ (ศรี)", blind: "ทิศตะวันตกเฉียงใต้ (กาลกิณี)" }, // พฤหัสบดี
    5: { lucky: "ทิศตะวันออกเฉียงใต้ (ศรี)", blind: "ทิศตะวันตกเฉียงเหนือ (กาลกิณี)" }, // ศุกร์
    6: { lucky: "ทิศเหนือ (ศรี)", blind: "ทิศใต้ (กาลกิณี)" }                // เสาร์
};

// 3. ฐานข้อมูลดวงนักษัตร (สมพงษ์-ปะทะ)
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

// ฟังก์ชันหลักที่ทำงานตอนโหลดหน้า (ป้องกันข้อมูลหายตอน F5)
document.addEventListener('DOMContentLoaded', () => {
    // แก้ไขปัญหา month is not defined โดยการประกาศตรงนี้
    const now = new Date();
    const dayIndex = now.getDay();
    const month = now.getMonth(); // สำหรับใช้ในส่วนอื่นถ้าจำเป็น

    console.log("เริ่มโหลดข้อมูลรายวัน: เดือนที่", month + 1);
    
    // รันฟังก์ชันแสดงผล
    updateDailyTaboo(dayIndex);
    
    // ถ้ามีส่วน Zodiac ให้รันด้วย
    if (typeof updateZodiacLuckDisplay === 'function') {
        updateZodiacLuckDisplay(dayIndex);
    }
});

// ฟังก์ชันหลักในการแสดงผลหน้า
function showDailyTabooPage() {
    const today = new Date().getDay();
    const data = TABOO_DATA[today];
    
    // 1. แสดงชื่อวันและรายการ ดี-ร้าย
    document.getElementById('tabooDayTitle').innerText = "วัน" + data.day;
    document.getElementById('goodList').innerHTML = data.good.map(item => `<li>${item}</li>`).join('');
    document.getElementById('badList').innerHTML = data.bad.map(item => `<li>${item}</li>`).join('');
    
    // 2. แสดงทิศมงคล
    updateDirectionDisplay(today);
    
    // 3. แสดงดวงนักษัตร
    updateZodiacLuckDisplay(today);
    
    navigateTo('dailyTabooPage');
}

function updateDirectionDisplay(dayIndex) {
    const dir = DIRECTION_DATA[dayIndex];
    const container = document.getElementById('directionContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="p-3 rounded border-gold" style="background: rgba(212, 175, 55, 0.05);">
            <h6 class="text-gold text-center mb-3"><i class="fas fa-compass"></i> ทิศมงคลประจำวัน</h6>
            <div class="row text-center">
                <div class="col-6 border-right" style="border-right-color: rgba(212, 175, 55, 0.2) !important;">
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
    
    document.getElementById('zodiacGreat').innerText = great.join(', ') || "-";
    document.getElementById('zodiacBad').innerText = bad.join(', ') || "-";
}

async function downloadTabooImage() {
    const area = document.getElementById('tabooCaptureArea');
    const canvas = await html2canvas(area, { backgroundColor: '#1a1a1a', scale: 2 });
    const link = document.createElement('a');
    link.download = `ดวงรายวัน_${new Date().toLocaleDateString('th-TH')}.png`;
    link.href = canvas.toDataURL();
    link.click();
}