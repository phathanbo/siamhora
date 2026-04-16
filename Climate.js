"use strict";

function calculateWeatherFortune(csYear, zodiac) {
    // 1. เกณฑ์พิรุณศาสตร์ (จำนวนน้ำฝนในแต่ละโลก)
    let pirusaTemp = (csYear - 2) % 7; 
    // เศษเทพเจ้าเป็นอธิบดี: 0=เสาร์, 1=อาทิตย์, 2=จันทร์, 3=อังคาร, 4=พุธ, 5=พฤหัสบดี, 6=ศุกร์
    let totalRain = 0;
    const rainMap = { 0: 300, 1: 400, 2: 500, 3: 600, 4: 400, 5: 500, 6: 600 };
    totalRain = rainMap[pirusaTemp] || 500;

    const rainDist = {
        universe: (totalRain / 10) * 4,
        himmapan: (totalRain / 10) * 3,
        ocean: (totalRain / 10) * 2,
        human: (totalRain / 10) * 1
    };

    // 2. เกณฑ์น้ำมาก-น้อย (คำนวณจากอายุ/จ.ศ.)
    // สมมติใช้อายุปีปัจจุบันเทียบกับปีที่คำนวณ (หรือรับค่าอายุผู้ถาม)
    let currentAge = 31; // ตัวอย่างอายุ
    let waterScore = (84 % csYear) * currentAge % 16;
    let waterLevel = "";
    if (waterScore <= 5) waterLevel = "น้ำน้อยแล";
    else if (waterScore <= 10) waterLevel = "น้ำปานกลาง";
    else waterLevel = "น้ำมากแล";

    // 3. เกณฑ์ธาราธิคุณ (ปฐวี, เตโช, วาโย, อาโป)
    const tharaList = ["อาโป (น้ำมาก-น้ำท่วม)", "ปฐวี (น้ำพองาม)", "เตโช (น้ำน้อย-อากาศร้อน)", "วาโย (น้ำน้อย-พายุจัด)"];
    // นับจากพฤษภไปเท่าเศษ (จ.ศ. % 12) 
    let tharaIndex = csYear % 12;
    let tharaResult = tharaList[tharaIndex % 4]; 

    // 4. เกณฑ์ธัญญาหาร (ความอุดมสมบูรณ์ของข้าวปลา)
    let cropTemp = (csYear + 12) % 7;
    let cropResult = "";
    if (cropTemp === 1) cropResult = "ปาปะ: ข้าวกล้าได้ 1 ส่วน เสีย 10 ส่วน กันดารอาหารและฉิบหายมาก";
    else if (cropTemp === 6) cropResult = "ลาภะ: ข้าวกล้าได้ 10 ส่วน เสีย 1 ส่วน อยู่เย็นเป็นสุข ธัญญาหารบริบูรณ์";
    else if (cropTemp === 2 || cropTemp === 4) cropResult = "มัชฌิมา: ข้าวกล้าได้ครึ่งเสียครึ่ง ประชาชนได้สุขปานกลาง";
    else if (cropTemp === 3 || cropTemp === 5) cropResult = "วิบัติ: เกิดกิมิชาติ(แมลง)รบกวน ข้าวเสียมาก เมืองเกิดยุทธสงคราม";
    else cropResult = "ปานกลางตามเกณฑ์ชะตาโลก";

    // 5. นาคให้น้ำ (ตามปีนักษัตร)
    const nagaRainMap = {
        rat: { count: 3, note: "ฝนแรกน้อย กลางงาม ปลายงามแล" },
        ox: { count: 6, note: "ฝนต้น-กลาง-ปลายปีเสมอกันแล" },
        tiger: { count: 7, note: "ฝนต้นปีงาม กลางปีน้อย ปลายปีมากแล" },
        rabbit: { count: 2, note: "ฝนต้นปีน้อย กลางปีงาม ปลายปีอุดมดีแล" },
        dragon: { count: 3, note: "ฝนต้นปีมาก กลางปีงาม ปลายปีน้อยแล" },
        snake: { count: 5, note: "ฝนต้นปีมีมาก กลางปีงาม ปลายปีน้อยแล" },
        horse: { count: 4, note: "ฝนต้นปีงาม กลางปีงาม ปลายปีก็งามแล" },
        goat: { count: 2, note: "ฝนต้น-กลาง-ปลายปีเสมอกันแล" },
        monkey: { count: 3, note: "ฝนต้นปีน้อย กลางปีงาม ปลายปีมากแล" },
        rooster: { count: 3, note: "ฝนต้นปีน้อย กลางปีงาม ปลายปีมากแล" },
        dog: { count: 6, note: "ฝนต้นปีน้อย กลางปีงาม ปลายปีงามแล" },
        pig: { count: 5, note: "ฝนต้นปีงาม กลางปีน้อย ปลายปีมากแล" }
    };
    let nagaInfo = nagaRainMap[zodiac] || { count: 0, note: "ไม่ระบุ" };

    return {
        rainDist, waterLevel, tharaResult, cropResult, nagaInfo
    };
}

// รายชื่อปีนักษัตรเรียงตามลำดับโหราศาสตร์ไทย
const thaiZodiacs = ["มะโรง", "มะเส็ง", "มะเมีย", "มะแม", "วอก", "ระกา", "จอ", "กุน", "ชวด", "ฉลู", "ขาล", "เถาะ"];
const zodiacKeys = ["dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig", "rat", "ox", "tiger", "rabbit"];

function getZodiacFromBE(beYear) {
    // ตามตำราที่คุณให้: 2510 / 12 เหลือเศษ 2 (ในระบบคอมพิวเตอร์) 
    // แต่เพื่อให้ตรงกับ Logic "นับจากมะเมีย" ที่คุณให้มา
    // เราจะใช้การ Mapping Array โดยตรงจากเศษที่ได้ครับ
    
    const remainder = beYear % 12;
    
    // ผลลัพธ์ที่ได้จะเป็น Key (ภาษาอังกฤษ) เพื่อไปใช้ต่อในฟังก์ชัน calculateWeatherFortune
    return {
        key: zodiacKeys[remainder],
        name: thaiZodiacs[remainder]
    };
}

function getCSYear(beYear) {
    // สูตรมาตรฐาน: จ.ศ. = พ.ศ. - 1181
    return beYear - 1181;
}

function calculateClimate() {
    const beYearInput = document.getElementById('beYearInput').value;
    if (!beYearInput) return;

    const beYear = parseInt(beYearInput);

    // 1. หาปีนักษัตรอัตโนมัติจาก พ.ศ.
    const zodiacData = getZodiacFromBE(beYear);
    
    // 2. แปลง พ.ศ. เป็น จ.ศ.
    const csYear = getCSYear(beYear);
    
    // แสดงผลข้อมูลเบื้องต้นบนหน้าจอ
    document.getElementById('displayCSYear').innerText = `(จุลศักราช: ${csYear} | ปี${zodiacData.name})`;

    // 3. เรียกฟังก์ชันพยากรณ์พิรุณศาสตร์ (ส่งค่าปีนักษัตรที่คำนวณได้เข้าไป)
    const data = calculateWeatherFortune(csYear, zodiacData.key);
    
    // 4. แสดงผลบน UI
    renderClimateResult(data);

}

 document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('beYearInput');
    if (phoneInput) {
        phoneInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                calculateClimate();
            }
        });
    }
});

function renderClimateResult(data) {
    const box = document.getElementById('climate-result-box');
    box.classList.remove('d-none');

    // น้ำฝน
    document.getElementById('rain-uni').innerText = data.rainDist.universe + " ห่า";
    document.getElementById('rain-him').innerText = data.rainDist.himmapan + " ห่า";
    document.getElementById('rain-ocean').innerText = data.rainDist.ocean + " ห่า";
    document.getElementById('rain-human').innerText = data.rainDist.human + " ห่า";
    document.getElementById('rain-total').innerText = (data.rainDist.universe + data.rainDist.himmapan + data.rainDist.ocean + data.rainDist.human) + " ห่า";

    // คำทำนาย
    document.getElementById('res-crop-text').innerHTML = `<b>เกณฑ์ธัญญาหาร:</b> ${data.cropResult}`;
    document.getElementById('res-thara-text').innerHTML = `<b>เกณฑ์ธาราธิคุณ:</b> ${data.tharaResult} (${data.waterLevel})`;
    document.getElementById('res-naga-text').innerHTML = `ปีนี้มีนาคให้น้ำ <b>${data.nagaInfo.count} ตัว</b> : ${data.nagaInfo.note}`;
}



// เรียกใช้เมื่อ Load หน้าเว็บ
window.onload = () => {
    calculateClimate();
};