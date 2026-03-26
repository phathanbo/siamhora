"use strict";

const dailyColors = {
    0: { day: "อาทิตย์", lucky: "แดง", wealth: "เขียว", power: "ชมพู/ดำ", forbidden: "ฟ้า/น้ำเงิน", numbers: "1, 9" },
    1: { day: "จันทร์", lucky: "เหลือง/ขาว", wealth: "ม่วง", power: "เขียว", forbidden: "แดง", numbers: "2, 5" },
    2: { day: "อังคาร", lucky: "ชมพู", wealth: "ส้ม/ทอง", power: "ม่วง/ดำ", forbidden: "ขาว/เหลือง", numbers: "3, 8" },
    3: { day: "พุธ", lucky: "เขียว", wealth: "ฟ้า/น้ำเงิน", power: "ส้ม/ทอง", forbidden: "ชมพู", numbers: "4, 7" },
    4: { day: "พฤหัสบดี", lucky: "ส้ม/ทอง", wealth: "แดง", power: "ฟ้า/น้ำเงิน", numbers: "5, 1" },
    5: { day: "ศุกร์", lucky: "ฟ้า/น้ำเงิน", wealth: "ชมพู", power: "เหลือง/ขาว", forbidden: "ม่วง", numbers: "6, 3" },
    6: { day: "เสาร์", lucky: "ม่วง/ดำ", wealth: "น้ำเงิน/ฟ้า", power: "แดง", forbidden: "เขียว", numbers: "7, 2" }
};

function generateLuckyNumbers(baseNumbers){

    const nums = new Set();

    while(nums.size < 3){

        const base = baseNumbers[Math.floor(Math.random()*baseNumbers.length)];
        const rand = Math.floor(Math.random()*10);

        const num = `${base}${rand}`;
        const rev = `${rand}${base}`;

        if(!nums.has(num) && !nums.has(rev)){
            nums.add(num);
        }

    }

    return [...nums].join(", ");

}

// ===== random function (เผื่อใช้ในอนาคต) =====
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}


// ===== ดึงข้อมูลวันปัจจุบัน =====
function getTodayLuckyData() {

    const today = new Date().getDay();

    if (!dailyColors.hasOwnProperty(today)) {
        console.error("Lucky.js: day index invalid", today);
        return dailyColors[0];
    }

    return dailyColors[today];
}


// ===== แสดงหน้าสีมงคล =====
function showLuckyPage() {

    if (typeof navigateTo === "function") {
        navigateTo('auspiciousPage');
    }

    const page = document.getElementById('luckyPage');
    if (page) {
        page.classList.remove('hidden');
    }

    const data = getTodayLuckyData();
    const container = document.getElementById('luckyContent');
    const luckyNums = generateLuckyNumbers(data.numbers.split(",").map(n=>n.trim()));

    if (!container) {
        console.warn("Lucky.js: luckyContent element not found");
        return;
    }

    container.innerHTML = `
        <div class="text-center mb-4">
            <h3 class="text-primary">วันนี้วัน${data.day}</h3>
            <p class="text-muted small">อัปเดตข้อมูลตามตำราทักษาพยากรณ์</p>
        </div>

        <div class="list-group">

            <div class="list-group-item d-flex justify-content-between">
                <span>🎨 <b>สีมงคลหลัก:</b></span>
                <span class="text-success">${data.lucky}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between">
                <span>💰 <b>สีเสริมโชคลาภ:</b></span>
                <span class="text-info">${data.wealth}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between">
                <span>🦁 <b>สีเสริมอำนาจ:</b></span>
                <span class="text-secondary">${data.power}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between bg-light-danger">
                <span>🚫 <b>สีต้องห้าม (กาลกิณี):</b></span>
                <span class="text-danger fw-bold">${data.forbidden || 'ไม่มี'}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between bg-gold-light">
                <span>🔢 <b>เลขนำโชควันนี้:</b></span>
                <span class="fw-bold text-dark">${luckyNums}</span>
            </div>

        </div>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
}



// ===== แถบข้อมูลมงคลบน header =====
function updateHeaderLuckyBar() {

    const data = getTodayLuckyData();
    const luckyNums = generateLuckyNumbers(data.numbers.split(",").map(n=>n.trim()));

    const dayEl = document.getElementById('headerDayName');
    const luckyEl = document.getElementById('headerLuckyColor');
    const wealthEl = document.getElementById('headerWealthColor');
    const forbiddenEl = document.getElementById('headerForbiddenColor');
    const numberEl = document.getElementById('headerLuckyNumber');

    if (dayEl) dayEl.innerText = data.day;
    if (luckyEl) luckyEl.innerText = data.lucky;
    if (wealthEl) wealthEl.innerText = data.wealth;
    if (forbiddenEl) forbiddenEl.innerText = data.forbidden || "ไม่มี";
    if (numberEl) numberEl.innerText = luckyNums;

}


// ===== เรียกตอนโหลดหน้าเว็บ =====
window.addEventListener("load", updateHeaderLuckyBar);