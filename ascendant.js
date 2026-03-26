"use strict";

/* =========================
   ตารางอาทิตย์ย้ายราศี (อ้างอิงปฏิทินไทย นิรายนะ)
========================= */
const SUN_SIGNS = [
    { start: "01-16", name: "มังกร", index: 9 },
    { start: "02-13", name: "กุมภ์", index: 10 },
    { start: "03-14", name: "มีน", index: 11 },
    { start: "04-13", name: "เมษ", index: 0 },
    { start: "05-14", name: "พฤษภ", index: 1 },
    { start: "06-15", name: "เมถุน", index: 2 },
    { start: "07-16", name: "กรกฎ", index: 3 },
    { start: "08-17", name: "สิงห์", index: 4 },
    { start: "09-17", name: "กันย์", index: 5 },
    { start: "10-18", name: "ตุลย์", index: 6 },
    { start: "11-16", name: "พิจิก", index: 7 },
    { start: "12-16", name: "ธนู", index: 8 }
];

/* =========================
   ตารางอันโตนาที (เวลาที่ใช้ในแต่ละราศี)
========================= */
const ANTO_NATI = [
    { name: "เมษ", time: 120 },
    { name: "พฤษภ", time: 144 },
    { name: "เมถุน", time: 168 },
    { name: "กรกฎ", time: 192 },
    { name: "สิงห์", time: 216 },
    { name: "กันย์", time: 216 },
    { name: "ตุลย์", time: 216 },
    { name: "พิจิก", time: 216 },
    { name: "ธนู", time: 192 },
    { name: "มังกร", time: 168 },
    { name: "กุมภ์", time: 144 },
    { name: "มีน", time: 120 }
];

const descriptions = {
    "เมษ": "นักสู้ กล้าตัดสินใจ มีภาวะผู้นำ ชอบความท้าทาย",
    "พฤษภ": "มั่นคง หนักแน่น รักสวยรักงาม ชอบสะสมทรัพย์",
    "เมถุน": "ฉลาด ช่างเจรจา ปรับตัวเก่ง เรียนรู้ไว",
    "กรกฎ": "อ่อนโยน รักครอบครัว มีสัญชาตญาณในการดูแล",
    "สิงห์": "มั่นใจในตัวเอง สง่าผ่าเผย ชอบเป็นจุดสนใจ",
    "กันย์": "ละเอียด รอบคอบ ช่างสังเกต รักความเป็นระเบียบ",
    "ตุลย์": "รักความยุติธรรม มีเสน่ห์ เข้ากับคนง่าย",
    "พิจิก": "ลึกซึ้ง ลึกลับ จิตใจเข้มแข็งเด็ดเดี่ยว",
    "ธนู": "รักอิสระ ชอบเรียนรู้ มองโลกในแง่ดี",
    "มังกร": "ขยัน อดทน จริงจังกับชีวิต มุ่งมั่นในงาน",
    "กุมภ์": "ความคิดแปลกใหม่ รักอิสระ รักพวกพ้อง",
    "มีน": "ช่างฝัน มีเมตตา มีลางสังหรณ์แม่นยำ"
};

/* =========================
   ฟังก์ชันช่วยคำนวณ
========================= */

function getSunSignIndex(birthDateStr) {
    if (!birthDateStr) return 0;
    const d = new Date(birthDateStr);
    if (isNaN(d)) return 0;

    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const mmdd = `${mm}-${dd}`;

    // หาดัชนีราศีโดยการวนลูปถอยหลัง เพื่อหาช่วงวันที่ที่มากที่สุดที่ยังน้อยกว่า mmdd
    // หรือเช็คแบบช่วงให้ชัดเจน
    for (let i = SUN_SIGNS.length - 1; i >= 0; i--) {
        if (mmdd >= SUN_SIGNS[i].start) {
            return SUN_SIGNS[i].index;
        }
    }

    // ถ้าเกิดก่อน 16 ม.ค. (เช่น 01-10) จะตกราศีธนู (Index 8) ของรอบปีที่แล้ว
    return 8; 
}

function getFullAscendantInfo(birthDateStr, birthTimeStr) {
    if (!birthDateStr || !birthTimeStr) {
        return { signName: "ไม่ทราบ", index: -1, description: "ข้อมูลไม่ครบ" };
    }

    const sunSignIndex = getSunSignIndex(birthDateStr);
    let [hours, minutes] = birthTimeStr.split(":").map(Number);
    
    // คำนวณนาทีนับจาก 06:00 น.
    let totalMinutes = ((hours - 6) * 60) + minutes;
    if (totalMinutes < 0) totalMinutes += 1440; // กรณีเกิดก่อน 6 โมงเช้า

    let currentSignIndex = sunSignIndex;
    let remainingMinutes = totalMinutes;

    // วนลูปหมุนราศีตามอันโตนาที
    for (let i = 0; i < 12; i++) {
        const timeInThisSign = ANTO_NATI[currentSignIndex].time;
        if (remainingMinutes < timeInThisSign) break;
        
        remainingMinutes -= timeInThisSign;
        currentSignIndex = (currentSignIndex + 1) % 12;
    }

    const finalSign = ANTO_NATI[currentSignIndex];
    return {
        signName: finalSign.name,
        index: currentSignIndex,
        description: descriptions[finalSign.name] || "คุณเป็นคนมีเอกลักษณ์เฉพาะตัว"
    };
}