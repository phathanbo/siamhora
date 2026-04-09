function calculateDayFriendship() {
    const male = document.getElementById('maleDay').value;
    const female = document.getElementById('femaleDay').value;
    const display = document.getElementById('day-result-display');
    const textContent = document.getElementById('day-match-text');

    let resultText = "";
    let statusClass = "neutral";

    // Helper check function
    const isDayPair = (d1, d2) => (male === d1 && female === d2) || (male === d2 && female === d1);

    // 1. ตรวจสอบมิตรใหญ่ (ดีมาก)
    if (isDayPair("อาทิตย์", "พฤหัสบดี") || 
        isDayPair("จันทร์", "พุธ") || 
        isDayPair("ศุกร์", "อังคาร") || 
        isDayPair("ราหู", "เสาร์")) {
        resultText = "<strong>วันเป็นมิตรใหญ่ (ดีมาก):</strong> คู่นี้ส่งเสริมกันดีนัก มีความเกื้อกูลและเมตตาต่อกันสูง";
        statusClass = "good";
    }
    // 2. ตรวจสอบมิตรน้อย
    else if (isDayPair("อาทิตย์", "เสาร์") || 
             isDayPair("จันทร์", "อังคาร") || 
             isDayPair("อังคาร", "ราหู") || 
             isDayPair("พุธ", "เสาร์")) {
        resultText = "<strong>วันเป็นมิตรน้อย:</strong> คู่นี้เป็นมิตรต่อกัน อยู่ด้วยกันได้อย่างราบรื่นพอสมควร";
        statusClass = "good";
    }
    // 3. ตรวจสอบศัตรูใหญ่ (ไม่ดี)
    else if (isDayPair("อาทิตย์", "อังคาร") || 
             isDayPair("จันทร์", "พฤหัสบดี") || 
             isDayPair("พุธ", "ราหู") || 
             isDayPair("ศุกร์", "เสาร์")) {
        resultText = "<strong>วันเป็นศัตรูใหญ่ (ไม่ดี):</strong> ระวังความขัดแย้งรุนแรง มีทิฐิเข้าหากัน มักมีเรื่องร้อนใจ";
        statusClass = "bad";
    }
    // 4. ตรวจสอบศัตรูน้อย
    else if (isDayPair("อาทิตย์", "จันทร์") || 
             isDayPair("อังคาร", "เสาร์") || 
             isDayPair("พฤหัสบดี", "ราหู") || 
             isDayPair("พุธ", "ศุกร์")) {
        resultText = "<strong>วันเป็นศัตรูน้อย:</strong> มีเรื่องระหองระแหงกันบ้าง ไม่ค่อยลงรอยกันในบางเรื่อง";
        statusClass = "bad";
    }
    else {
        resultText = "<strong>วันเป็นกลาง:</strong> ไม่เป็นมิตรและไม่เป็นศัตรูต่อกันโดยตรง (อยู่ในเกณฑ์ปกติ)";
        statusClass = "neutral";
    }

    // อัปเดต UI
    display.style.display = "block";
    display.className = "result-card " + statusClass;
    textContent.innerHTML = resultText;
}