"use strict";
// 1. ประกาศตัวแปรไว้ด้านบนสุด
const relations = [
    { day: "อาทิตย์", friend: "พฤหัสบดี", enemy: "อังคาร", power: "ศุกร์", element: "เสาร์" },
    { day: "จันทร์", friend: "พุธ", enemy: "พฤหัสบดี", power: "ราหู", element: "พฤหัสบดี" },
    { day: "อังคาร", friend: "ศุกร์", enemy: "อาทิตย์", power: "พฤหัสบดี", element: "ราหู" },
    { day: "พุธ", friend: "จันทร์", enemy: "ราหู", power: "เสาร์", element: "ศุกร์" },
    { day: "พฤหัสบดี", friend: "อาทิตย์", enemy: "จันทร์", power: "อังคาร", element: "จันทร์" },
    { day: "ศุกร์", friend: "อังคาร", enemy: "เสาร์", power: "อาทิตย์", element: "พุธ" },
    { day: "เสาร์", friend: "ราหู", enemy: "ศุกร์", power: "พุธ", element: "อาทิตย์" }
];

// 2. ฟังก์ชันแสดงหน้า (เรียกจาก script.js)
function showPlanetRelationPage() {
    if (typeof navigateTo === "function") {
        navigateTo('planetRelationPage');
    }
    // ไม่ต้องรอ setTimeout นาน เพราะเราจะวาดดักไว้ก่อนแล้ว 
    // แต่สั่งซ้ำเพื่อความมั่นใจ
    renderRelationTable();
}

// 3. ฟังก์ชันวาดตาราง
function renderRelationTable() {
    const container = document.getElementById('relationTableBody');
    if (!container) {
        console.warn("หา relationTableBody ไม่เจอในขณะนี้");
        return;
    }

    let html = "";
    relations.forEach(data => {
        html += `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="card border-gold h-100 shadow-sm">
                    <div class="card-header bg-dark text-white text-center py-2 border-bottom-gold">
                        <b class="text-gold">วัน${data.day}</b>
                    </div>
                    <div class="card-body p-2 small">
                        <div class="mb-2"><span class="badge badge-success">มิตร:</span> <b>${data.friend}</b><br><small class="text-muted">เกื้อกูลกัน เป็นที่ปรึกษาที่ดี</small></div>
                        <div class="mb-2"><span class="badge badge-danger">ศัตรู:</span> <b>${data.enemy}</b><br><small class="text-muted">ความเห็นไม่ตรงกัน มักมีปากเสียง</small></div>
                        <div class="mb-2"><span class="badge badge-primary">สมพล:</span> <b>${data.power}</b><br><small class="text-muted">ช่วยกันสร้างฐานะ มีพลังอำนาจ</small></div>
                        <div class="mb-0"><span class="badge badge-warning text-dark">ธาตุ:</span> <b>${data.element}</b><br><small class="text-muted">เสริมความมั่นคง เป็นปึกแผ่น</small></div>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

// 4. บังคับให้วาดทันทีที่โหลดหน้าเว็บ (ไม่ต้องรอ F5 หรือกดปุ่ม)
document.addEventListener('DOMContentLoaded', renderRelationTable);