"use strict";

/* =========================
   1. DATA (Immutable)
========================= */
const relations = Object.freeze([
    { day: "อาทิตย์", friend: "พฤหัสบดี", enemy: "อังคาร", power: "ศุกร์", element: "เสาร์" },
    { day: "จันทร์", friend: "พุธ", enemy: "พฤหัสบดี", power: "ราหู", element: "พฤหัสบดี" },
    { day: "อังคาร", friend: "ศุกร์", enemy: "อาทิตย์", power: "พฤหัสบดี", element: "ราหู" },
    { day: "พุธ", friend: "จันทร์", enemy: "ราหู", power: "เสาร์", element: "ศุกร์" },
    { day: "พฤหัสบดี", friend: "อาทิตย์", enemy: "จันทร์", power: "อังคาร", element: "จันทร์" },
    { day: "ศุกร์", friend: "อังคาร", enemy: "เสาร์", power: "อาทิตย์", element: "พุธ" },
    { day: "เสาร์", friend: "ราหู", enemy: "ศุกร์", power: "พุธ", element: "อาทิตย์" }
]);

/* =========================
   2. VALIDATION
========================= */
function validateRelation(data) {
    return data.day && data.friend && data.enemy && data.power && data.element;
}

/* =========================
   3. UI TEMPLATE (Safe)
========================= */
function createCard(data) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-3";

    const card = document.createElement("div");
    card.className = "card border-gold h-100 shadow-sm";

    card.innerHTML = `
        <div class="card-header bg-dark text-white text-center py-2 border-bottom-gold">
            <b class="text-gold">วัน${data.day}</b>
        </div>
        <div class="card-body p-2 small">
            ${createItem("success", "มิตร", `<span style="color: #28a745;">${data.friend}</span>`, "เกื้อกูลกัน เป็นที่ปรึกษาที่ดี")}
            ${createItem("danger", "ศัตรู", `<span style="color: #dc3545;">${data.enemy}</span>`, "ความเห็นไม่ตรงกัน มักมีปากเสียง")}
            ${createItem("primary", "สมพล", `<span style="color: #007bff;">${data.power}</span>`, "ช่วยกันสร้างฐานะ มีพลังอำนาจ")}
            ${createItem("warning text-dark", "ธาตุ", `<span style="color: #ffc107;">${data.element}</span>`, "เสริมความมั่นคง เป็นปึกแผ่น")}
        </div>
    `;

    col.appendChild(card);
    return col;
}



function createItem(color, label, value, desc) {
    return `
        <div class="mb-2">
            <span class="badge badge-${color}">${label}:</span>
            <b>${value}</b><br>
            <small class="text-muted">${desc}</small>
        </div>
    `;
}



/* =========================
   4. RENDER ENGINE
========================= */
function renderRelationTable() {
    const container = document.getElementById("relationTableBody");

    if (!container) {
        console.warn("❗ relationTableBody not found");
        return;
    }

    // ป้องกัน render ซ้ำ
    if (container.dataset.rendered === "true") return;

    container.innerHTML = "";

    relations.forEach(item => {
        if (!validateRelation(item)) {
            console.error("❌ Invalid data:", item);
            return;
        }
        container.appendChild(createCard(item));
    });

    container.dataset.rendered = "true";
}


function renderTablerelation() {
    const container = document.getElementById("relationTableBodypage");
    if (!container) return;

    const html = `
    <div class="card shadow-lg border-gold">
            <div class="card-header bg-white text-gold text-center py-4">
                <h2 class="mb-0 ">🌟 ตำราดาวคู่มิตร - คู่ศัตรู</h2>
                <br>
                <span>สรุปความสัมพันธ์ของคนเกิดทั้ง 7 วัน</span>
            </div>
            <div class="card-body bg-light">
                <div class="row" id="relationTableBody">
                </div>
                <hr>
                <div class="alert alert-warning small py-2">
                    <b>หมายเหตุ:</b> ใช้สำหรับพิจารณาการหาหุ้นส่วน คู่ครอง หรือบุคคลที่จะขอความช่วยเหลือ
                </div> 
           <div class="row mt-4">
            <div class="col-6">
                <button class="btn btn-outline-secondary btn-block border-0" onclick="navigateTo('mainpage')">
                    <i class="fas fa-chevron-left"></i> กลับหน้าห้องพยากรณ์
                </button>
            </div>
            <div class="col-6">
                <button class="btn btn-outline-secondary btn-block border-0" onclick="goBack()">
                    <i class="fas fa-home"></i> กลับหน้าหลัก
                </button>
            </div>
        </div>   
    `;
    container.innerHTML = html;
    renderRelationTable();
}

/* =========================
   5. PAGE CONTROL
========================= */
function showPlanetRelationPage() {
    if (typeof navigateTo === "function") {
        navigateTo("planetRelationPage");
    } else {
        console.warn("⚠️ navigateTo not found");
    }
    renderTablerelation();
}



document.addEventListener("DOMContentLoaded", () => {
    renderTablerelation();
});