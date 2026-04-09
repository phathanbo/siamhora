function calculateBirthFortune() {
    const day = parseInt(document.getElementById('fortuneDay').value);
    const month = parseInt(document.getElementById('fortuneMonth').value);
    const year = parseInt(document.getElementById('fortuneYear').value);
    
    // ดึงค่า พ.ศ. มาแปลงเป็น จ.ศ.
    const beValue = parseInt(document.getElementById('fortuneBE').value);
    const cs = beValue - 1181; // สูตรแปลง พ.ศ. เป็น จ.ศ.
    
    const display = document.getElementById('fortune-result-display');
    
    if (!month || isNaN(month) || isNaN(beValue)) {
        alert("กรุณากรอกข้อมูลเดือนและ พ.ศ. ให้ครบถ้วน");
        return;
    }

    // --- แบบที่ ๑ และ ๒: (วัน + เดือน + ปี) * 3 / 7 ---
    const sum12 = (day + month + year) * 3;
    const remain12 = sum12 % 7;
    
    let res1 = "";
    let res2 = "";

    // พยากรณ์แบบที่ ๑
    const text1 = {
        1: "อาชีพทางทำนาดี",
        2: "อาชีพทางค้าขายดี",
        3: "การอาชีพทางทหาร รับราชการของเจ้านายดี",
        4: "ให้ทำเรือกสวน",
        5: "เป็นนักบวช เป็นแพทย์ เป็นครู นักประพันธ์ หรือเป็นช่างดี",
        6: "รับราชการเข้าเฝ้าเจ้านายดี",
        0: "นิสัยใจคอไม่แน่นอน ทำงานเป็นพักๆ นานเข้าชักเบื่อหน่ายละทิ้งงาน"
    };
    res1 = `เศษ ${remain12} : ${text1[remain12]}`;

    // พยากรณ์แบบที่ ๒
    const text2 = {
        1: "ดีทางราชการจะมียศศักดิ์ชื่อเสียง",
        2: "เป็นพ่อบ้านแม่เรือนดี",
        3: "ทำการอาสาเจ้านายดี",
        4: "ทำเรือกสวนดี",
        5: "เป็นครู เป็นหมอ หรือเป็นสมณะดี",
        6: "ค้าขายดี (ทางบกดี แต่ทางเรือไม่ดี)",
        0: "ทำได้ทุกอย่าง พอปานกลางแล"
    };
    res2 = `เศษ ${remain12} : ${text2[remain12]}`;

    // --- แบบที่ ๓ (ใช้ค่า cs ที่คำนวณได้จาก พ.ศ.) ---
    let res3 = "";
    if (cs > 0) {
        // สูตรตามตำรา: (((จ.ศ. * 40) + ปี + เดือน) * 3 + วัน) / 7
        const step3 = (((cs * 40) + year + month) * 3) + day;
        const remain3 = step3 % 7;
        
        const text3 = {
            1: "โชคคนตัดฟืน ทำแต่พออยู่พอกิน มักได้รับความเหนื่อยยากมาก",
            2: "ทำเรือกสวนไร่นาค้าขายดี",
            3: "ทำราชการมียศศักดิ์ชื่อเสียง",
            4: "เป็นพ่อค้าดีนักจะร่ำรวยเป็นเศรษฐี",
            5: "เป็นสมณะชีพราหมณ์ หรือแพทย์ดี",
            6: "เป็นคนมีวาสนาดีจะทำสิ่งใดก็ปรากฏ มักจะได้เป็นหัวหน้าเขาทุกอย่าง",
            0: "เป็นคนใจคอห้าวหาญ ดีทางอาสาผู้คน"
        };
        res3 = `(จ.ศ. ${cs}) เศษ ${remain3} : ${text3[remain3]}`;
    }

    // แสดงผล
    document.getElementById('fortune-res-1').innerText = `เศษ ${remain12} : ${text1[remain12]}`;
    document.getElementById('fortune-res-2').innerText = `เศษ ${remain12} : ${text2[remain12]}`;
    document.getElementById('fortune-res-3').innerText = res3;
    display.style.display = "block";
}