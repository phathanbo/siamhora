"use strict";

// =====================
// DATA
// =====================
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

// ธาตุสัมพันธ์ (แก้ให้ logic ชัดเจน)
const ELEMENT_RELATION = {
    "น้ำ": { support: "ลม", block: "ไฟ", icon: "💧" },
    "ดิน": { support: "ไฟ", block: "ลม", icon: "🪨" },
    "ไฟ":  { support: "ดิน", block: "น้ำ", icon: "🔥" },
    "ลม":  { support: "น้ำ", block: "ดิน", icon: "🌪️" }
};

// =====================
// CORE LOGIC
// =====================
function analyzeCompatibility(p1, p2) {

    if (!ZODIAC_MASTER[p1] || !ZODIAC_MASTER[p2]) {
        return {
            error: true,
            message: "กรุณาเลือกนักษัตรให้ครบก่อน"
        };
    }

    const person1 = ZODIAC_MASTER[p1];
    const person2 = ZODIAC_MASTER[p2];

    let score = 70;
    let zodiacResult = "เป็นกลาง";

    // --- Zodiac ---
    if (person1.friend.includes(p2)) {
        score = 95;
        zodiacResult = "คู่สร้างคู่สม (มงคลยิ่ง)";
    } else if (person1.enemy.includes(p2)) {
        score = 40;
        zodiacResult = "คู่กัด/ศัตรู (ต้องระวัง)";
    }

    // --- Element ---
    let elementResult = "ธาตุเป็นกลาง";

    if (ELEMENT_RELATION[person1.element].support === person2.element) {
        elementResult = "ธาตุหนุนนำ (ฝ่ายคุณหนุนเขา)";
        score += 10;
    } 
    else if (ELEMENT_RELATION[person2.element].support === person1.element) {
        elementResult = "ธาตุหนุนนำ (เขาหนุนคุณ)";
        score += 10;
    }
    else if (ELEMENT_RELATION[person1.element].block === person2.element) {
        elementResult = "ธาตุพิฆาต (คุณกดเขา)";
        score -= 20;
    } 
    else if (ELEMENT_RELATION[person2.element].block === person1.element) {
        elementResult = "ธาตุพิฆาต (เขากดคุณ)";
        score -= 20;
    }

    // clamp score
    score = Math.max(20, Math.min(100, score));

    return {
        score,
        zodiacResult,
        elementResult,
        p1Element: person1.element,
        p2Element: person2.element
    };
}

// =====================
// UI
// =====================
function processCompatibility() {

    const myZodiac = document.getElementById('myZodiac')?.value;
    const partnerZodiac = document.getElementById('partnerZodiac')?.value;
    const resultDiv = document.getElementById('compatResult');

    if (!resultDiv) return;

    const result = analyzeCompatibility(myZodiac, partnerZodiac);

    if (result.error) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<div class="alert alert-warning text-center">${result.message}</div>`;
        return;
    }

    const icon1 = ELEMENT_RELATION[result.p1Element]?.icon || "";
    const icon2 = ELEMENT_RELATION[result.p2Element]?.icon || "";

    const colorScore =
        result.score >= 80 ? '#d4af37' :
        result.score >= 50 ? '#28a745' :
        '#dc3545';

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="card border-gold animate__animated animate__fadeIn">
            <div class="card-body text-center">

                <h5 class="text-muted">ระดับความสมพงษ์</h5>

                <div style="font-size:4rem;color:${colorScore}">
                    ${result.score}%
                </div>

                <h3>${result.zodiacResult}</h3>

                <div class="row mt-3">
                    <div class="col-5">
                        <div>คุณ (${myZodiac})</div>
                        <b>${result.p1Element} ${icon1}</b>
                    </div>

                    <div class="col-2">❤️</div>

                    <div class="col-5">
                        <div>คู่ (${partnerZodiac})</div>
                        <b>${result.p2Element} ${icon2}</b>
                    </div>
                </div>

                <div class="mt-3">
                    <strong>วิเคราะห์:</strong> ${result.elementResult}
                </div>

            </div>
        </div>
    `;

    resultDiv.scrollIntoView?.({ behavior: 'smooth' });
}

// =====================
// QUICK MODE
// =====================
let debounceTimer = null;

function quickAnalyze() {

    if (typeof navigateTo === "function") {
        navigateTo('compatibilityPage');
    }

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        processCompatibility();
    }, 300);
}