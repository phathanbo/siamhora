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
            ${createItem("success", "มิตร", data.friend, "เกื้อกูลกัน เป็นที่ปรึกษาที่ดี")}
            ${createItem("danger", "ศัตรู", data.enemy, "ความเห็นไม่ตรงกัน มักมีปากเสียง")}
            ${createItem("primary", "สมพล", data.power, "ช่วยกันสร้างฐานะ มีพลังอำนาจ")}
            ${createItem("warning text-dark", "ธาตุ", data.element, "เสริมความมั่นคง เป็นปึกแผ่น")}
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

/* =========================
   5. PAGE CONTROL
========================= */
function showPlanetRelationPage() {
    if (typeof navigateTo === "function") {
        navigateTo("planetRelationPage");
    } else {
        console.warn("⚠️ navigateTo not found");
    }

    renderRelationTable();
}

/* =========================
   6. INIT (โหลดครั้งเดียว)
========================= */
document.addEventListener("DOMContentLoaded", () => {
    renderRelationTable();
});