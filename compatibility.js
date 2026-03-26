"use strict";
// ข้อมูลนักษัตรไทยและธาตุ
const ZODIAC_MASTER = {
    "ชวด":   { element: "น้ำ", animal: "หนู", friend: ["ฉลู", "มะโรง", "วอก"], enemy: ["มะเมีย"] },
    "ฉลู":   { element: "ดิน", animal: "วัว", friend: ["ชวด", "มะเส็ง", "ระกา"], enemy: ["มะแม"] },
    "ขาล":   { element: "ลม", animal: "เสือ", friend: ["มะเมีย", "จอ", "กุน"], enemy: ["วอก"] },
    "เถาะ":  { element: "ลม", animal: "กระต่าย", friend: ["มะแม", "กุน", "จอ"], enemy: ["ระกา"] },
    "มะโรง": { element: "ดิน", animal: "งูใหญ่", friend: ["ชวด", "วอก", "ระกา"], enemy: ["จอ"] },
    "มะเส็ง": { element: "ไฟ", animal: "งูเล็ก", friend: ["ฉลู", "ระกา"], enemy: ["กุน"] },
    "มะเมีย": { element: "ไฟ", animal: "ม้า", friend: ["ขาล", "จอ"], enemy: ["ชวด"] },
    "มะแม":  { element: "ดิน", animal: "แพะ", friend: ["เถาะ", "กุน"], enemy: ["ฉลู"] },
    "วอก":   { element: "ลม", animal: "ลิง", friend: ["ชวด", "มะโรง"], enemy: ["ขาล"] },
    "ระกา":  { element: "ลม", animal: "ไก่", friend: ["ฉลู", "มะเส็ง", "มะโรง"], enemy: ["เถาะ"] },
    "จอ":    { element: "ดิน", animal: "หมา", friend: ["ขาล", "มะเมีย", "เถาะ"], enemy: ["มะโรง"] },
    "กุน":   { element: "น้ำ", animal: "หมู", friend: ["เถาะ", "มะแม", "ขาล"], enemy: ["มะเส็ง"] }
};

// ตรรกะความสัมพันธ์ของธาตุ
const ELEMENT_RELATION = {
    "น้ำ": { support: "ดิน", block: "ไฟ", icon: "💧", color: "#007bff" },
    "ดิน": { support: "ไฟ", block: "ลม", icon: "🪵", color: "#8B4513" },
    "ไฟ":  { support: "ลม", block: "น้ำ", icon: "🔥", color: "#dc3545" },
    "ลม":  { support: "น้ำ", block: "ดิน", icon: "🌪️", color: "#6c757d" }
};

// 1. ฟังก์ชันคำนวณ (Logic)
function analyzeCompatibility(p1, p2) {
    const person1 = ZODIAC_MASTER[p1];
    const person2 = ZODIAC_MASTER[p2];

    let score = 70; 
    let zodiacResult = "เป็นกลาง";

    if (person1.friend.includes(p2)) {
        score = 95;
        zodiacResult = "คู่สร้างคู่สม (มงคลยิ่ง)";
    } else if (person1.enemy.includes(p2)) {
        score = 40;
        zodiacResult = "คู่กัด/ศัตรู (ต้องระวัง)";
    }

    const elementRel = ELEMENT_RELATION[person1.element];
    let elementResult = "ธาตุเป็นกลาง";

    if (elementRel.support === person2.element || ELEMENT_RELATION[person2.element].support === person1.element) {
        elementResult = "ธาตุหนุนนำ: ส่งเสริมทรัพย์สินและบารมี";
        score = Math.min(score + 10, 100);
    } else if (elementRel.block === person2.element || ELEMENT_RELATION[person2.element].block === person1.element) {
        elementResult = "ธาตุพิฆาต: มักมีเรื่องร้อนใจหรือปากเสียง";
        score = Math.max(score - 20, 20);
    }

    return { score, zodiacResult, elementResult, p1Element: person1.element, p2Element: person2.element };
}

// 2. ฟังก์ชันแสดงผล (UI Interface)
function processCompatibility() {
    const myZodiac = document.getElementById('myZodiac').value;
    const partnerZodiac = document.getElementById('partnerZodiac').value;
    const resultDiv = document.getElementById('compatResult');

    const result = analyzeCompatibility(myZodiac, partnerZodiac);

    // ดึง Icon และสี
    const icon1 = ELEMENT_RELATION[result.p1Element].icon;
    const icon2 = ELEMENT_RELATION[result.p2Element].icon;
    const colorScore = result.score >= 80 ? '#d4af37' : (result.score >= 50 ? '#28a745' : '#dc3545');

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="card border-gold animate__animated animate__fadeIn" style="background: rgba(0,0,0,0.03); border-radius: 15px;">
            <div class="card-body text-center">
                <h5 class="text-muted mb-2">ระดับความสมพงษ์</h5>
                <div style="font-size: 4rem; font-weight: bold; color: ${colorScore}; line-height: 1;">
                    ${result.score}%
                </div>
                
                <h3 class="mt-3 mb-4" style="color: #333;">${result.zodiacResult}</h3>
                
                <div class="row align-items-center bg-white py-3 rounded-lg shadow-sm border mx-1">
                    <div class="col-5">
                        <div class="small text-muted">คุณ (${myZodiac})</div>
                        <div class="h5 mb-0">ธาตุ${result.p1Element} ${icon1}</div>
                    </div>
                    <div class="col-2 h4 mb-0 text-gold">❤️</div>
                    <div class="col-5">
                        <div class="small text-muted">คู่ของคุณ (${partnerZodiac})</div>
                        <div class="h5 mb-0">ธาตุ${result.p2Element} ${icon2}</div>
                    </div>
                </div>

                <div class="mt-4 p-3 rounded" style="background: rgba(212, 175, 55, 0.1); border-left: 5px solid #d4af37;">
                    <p class="mb-0 text-dark"><strong>บทวิเคราะห์ธาตุ:</strong> ${result.elementResult}</p>
                </div>
            </div>
        </div>
    `;

    // เลื่อนลงไปดูผลลัพธ์อัตโนมัติ
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function quickAnalyze() {
    // 1. เปลี่ยนหน้าไปที่ compatibilityPage ก่อน
    navigateTo('compatibilityPage');
    
    // 2. สั่งให้คำนวณผล (ถ้ามีข้อมูลใน Select อยู่แล้ว)
    setTimeout(() => {
        processCompatibility();
    }, 300); // รอ animation เปลี่ยนหน้าแป๊บหนึ่ง
}