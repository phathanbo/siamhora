"use strict";

/* =========================
   1. DATA (Static + Optimized)
========================= */
const DAY_RULE_MAP = (() => {
    const rules = [
        {
            type: "good",
            label: "วันเป็นมิตรใหญ่ (ดีมาก)",
            desc: "คู่นี้ส่งเสริมกันดีมาก",
            pairs: [["อาทิตย์", "พฤหัสบดี"], ["จันทร์", "พุธ"], ["ศุกร์", "อังคาร"], ["ราหู", "เสาร์"]]
        },
        {
            type: "good",
            label: "วันเป็นมิตรน้อย",
            desc: "เป็นมิตรพอสมควร",
            pairs: [["อาทิตย์", "เสาร์"], ["จันทร์", "อังคาร"], ["อังคาร", "ราหู"], ["พุธ", "เสาร์"]]
        },
        {
            type: "bad",
            label: "วันเป็นศัตรูใหญ่ (ไม่ดี)",
            desc: "ขัดแย้งสูง",
            pairs: [["อาทิตย์", "อังคาร"], ["จันทร์", "พฤหัสบดี"], ["พุธ", "ราหู"], ["ศุกร์", "เสาร์"]]
        },
        {
            type: "bad",
            label: "วันเป็นศัตรูน้อย",
            desc: "มีปัญหาบ้าง",
            pairs: [["อาทิตย์", "จันทร์"], ["อังคาร", "เสาร์"], ["พฤหัสบดี", "ราหู"], ["พุธ", "ศุกร์"]]
        }
    ];

    const map = new Map();

    rules.forEach(rule => {
        rule.pairs.forEach(([a, b]) => {
            const key1 = `${a}|${b}`;
            const key2 = `${b}|${a}`;
            map.set(key1, rule);
            map.set(key2, rule);
        });
    });

    return map;
})();

/* =========================
   2. UTIL
========================= */
function normalize(value) {
    return value ? value.trim() : "";
}

function safeSetHTML(el, html) {
    if (el) el.innerHTML = html;
}

/* =========================
   3. MAIN FUNCTION
========================= */
function calculateDayFriendship() {
    try {
        const maleEl = document.getElementById("maleDay");
        const femaleEl = document.getElementById("femaleDay");
        const displayEl = document.getElementById("day-result-display");
        const textEl = document.getElementById("day-match-text");

        if (!maleEl || !femaleEl || !displayEl || !textEl) {
            alert("ระบบไม่พร้อมใช้งาน (DOM error)");
            console.error("❌ DOM missing");
            return;
        }

        const male = normalize(maleEl.value);
        const female = normalize(femaleEl.value);

        if (!male || !female) {
            displayEl.style.display = "none";
            return;
        }

        /* =========================
           4. LOOKUP (O(1))
        ========================= */
        const key = `${male}|${female}`;
        const result = DAY_RULE_MAP.get(key) || {
            type: "neutral",
            label: "วันเป็นกลาง",
            desc: "อยู่ในเกณฑ์ปกติ"
        };

        /* =========================
           5. UI UPDATE
        ========================= */
        displayEl.className = `result-card ${result.type}`;
        displayEl.style.display = "block";

        safeSetHTML(
            textEl,
            `<strong>${result.label}:</strong> ${result.desc}`
        );

    } catch (err) {
        console.error("🔥 ERROR:", err);
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
}