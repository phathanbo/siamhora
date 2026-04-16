"use strict";

const fortuneWealthData = {
    rat: { name: "ชวด", matches: { rat: "คนโหด", ox: "พ่อค้าเป็ด", tiger: "พ่อค้าถ่าน", rabbit: "เศรษฐี", dragon: "เรือจ้าง", snake: "พ่อค้าหาปลา", horse: "เศรษฐี", goat: "พ่อค้ายา", monkey: "นายทวาร", rooster: "หัวหมื่น", dog: "พระยา", pig: "เทวดา" } },
    ox: { name: "ฉลู", matches: { ox: "เจ้าสำเภา", rat: "ตลาด", tiger: "เศรษฐี", rabbit: "ขุนคลัง", dragon: "ลูกขุน", snake: "นายเมือง", horse: "เศรษฐี", goat: "คนโหด", monkey: "เรือจ้าง", rooster: "พระอินทร์", dog: "พระอินทร์", pig: "คนเลี้ยงม้า" } },
    tiger: { name: "ขาล", matches: { tiger: "เข็ญใจ", rat: "พ่อค้าปลา", ox: "เศรษฐี", rabbit: "พ่อค้า", dragon: "เจ้าสำเภา", snake: "ขุนคลัง", horse: "พ่อค้า", goat: "เทวดา", monkey: "พ่อค้าทอง", rooster: "เทวดา", dog: "พ่อค้า", pig: "เทวดา" } },
    rabbit: { name: "เถาะ", matches: { rabbit: "แม่ค้า", rat: "เศรษฐี", ox: "ขุนคลัง", tiger: "พ่อค้า", dragon: "ขุนคลัง", snake: "เทวดา", horse: "เศรษฐี", goat: "คนโหด", monkey: "เจ้าพระยา", rooster: "ราชกุมาร", dog: "ช่างเรือนหลวง", pig: "ลูกค้า" } },
    dragon: { name: "มะโรง", matches: { dragon: "เทวดา", rat: "ค้าเรือ", ox: "ขุนคลัง", tiger: "เจ้าสำเภา", rabbit: "ขุนคลัง", snake: "อสูร", horse: "เทวดา", goat: "มนตรี", monkey: "ยักษ์", rooster: "พระอินทร์", dog: "คนโหด", pig: "พระไพศรพณ์" } },
    snake: { name: "มะเส็ง", matches: { snake: "เลี้ยงช้าง", rat: "ค้าปลา", ox: "พระอินทร์", tiger: "ขุนคลัง", rabbit: "พรานเนื้อ", dragon: "มนตรี", horse: "เลี้ยงม้า", goat: "ขุนคลัง", monkey: "พระยา", rooster: "เทวดา", dog: "พระอินทร์", pig: "เศรษฐี" } },
    horse: { name: "มะเมีย", matches: { horse: "เข็ญใจ", rat: "ค้าปลา", ox: "เศรษฐี", tiger: "เทวดา", rabbit: "ค้าวัว", dragon: "หัวเมือง", snake: "ขุนคลัง", goat: "ลูกค้า", monkey: "หัวหมื่น", rooster: "พระยา", dog: "คนโหด", pig: "ราชครู (ดี)" } },
    goat: { name: "มะแม", matches: { goat: "เข็ญใจ", rat: "ค้าปลา", ox: "เศรษฐี", tiger: "ช่างทอง", rabbit: "คนโหด", dragon: "เจ้าสำเภา", snake: "ขุนช้าง", horse: "เจ้าเรือ", monkey: "เศรษฐี", rooster: "ขุนคลัง", dog: "เลี้ยงวัว", pig: "ขุนช้าง" } },
    monkey: { name: "วอก", matches: { monkey: "หัวสิบ", rat: "นายประตู", ox: "เรือจ้าง", tiger: "ค้าทอง", rabbit: "พระยา", dragon: "ยักษ์", snake: "เทวดา", horse: "นักเรียน", goat: "เทวดา", rooster: "เศรษฐี", dog: "หมอช้าง", pig: "พระอินทร์" } },
    rooster: { name: "ระกา", matches: { rooster: "เข็ญใจ", rat: "ค้าวัว", ox: "หัวพัน", tiger: "ลูกขุน", rabbit: "เศรษฐี", dragon: "ขุนคลัง", snake: "เศรษฐี", horse: "ขุนช้าง", goat: "ค้าปลา", monkey: "เศรษฐี", dog: "พระอินทร์", pig: "คนโหด" } },
    dog: { name: "จอ", matches: { dog: "คนโหด", rat: "หัวหมื่น, พัน", ox: "พระอินทร์", tiger: "นายประตู", rabbit: "ช่างเรือ", dragon: "คนโหด", snake: "อุปราช", horse: "ขุนคลัง", goat: "พ่อค้าวัว", monkey: "หมอช้าง", rooster: "พระยา", pig: "เศรษฐี" } },
    pig: { name: "กุน", matches: { pig: "ค้าผ้า", rat: "หัวเมือง", ox: "เลี้ยงม้า", tiger: "เทวดา", rabbit: "คนโหด", dragon: "ไพศรพณ์", snake: "ทำนา", horse: "ขุนนาง", goat: "ขายยา", monkey: "ขุนนาง", rooster: "เศรษฐี", dog: "มัชฌิมา" } }
};

const raceMapping = {
    rat: { race: "เทวดา", gender: "ผู้ชาย" },     // ชวด
    dragon: { race: "เทวดา", gender: "ผู้ชาย" },  // มะโรง
    horse: { race: "เทวดา", gender: "ผู้หญิง" },  // มะเมีย
    goat: { race: "เทวดา", gender: "ผู้หญิง" },   // มะแม
    monkey: { race: "ยักษ์", gender: "ผู้ชาย" },   // วอก
    rooster: { race: "ยักษ์", gender: "ผู้ชาย" },  // ระกา
    dog: { race: "ยักษ์", gender: "ผู้หญิง" },    // จอ
    tiger: { race: "ยักษ์", gender: "ผู้หญิง" },   // ขาล
    snake: { race: "มนุษย์", gender: "ผู้ชาย" },   // มะเส็ง
    ox: { race: "มนุษย์", gender: "ผู้ชาย" },      // ฉลู
    rabbit: { race: "มนุษย์", gender: "ผู้หญิง" },  // เถาะ
    pig: { race: "มนุษย์", gender: "ผู้หญิง" }      // กุน
};

const marriageFortune = {
    "เทวดาผู้ชาย-เทวดาผู้ชาย": "ดีพอปานกลาง เริ่มต้นรักใคร่กันดีมีความสุขราบรื่นมาก แต่พอมีลูกมักมีการทะเลาะวิวาทกัน บั้นปลายชีวิตไม่สู้ราบรื่นนักเพราะไม่ค่อยเกรงใจกัน",
    "เทวดาผู้ชาย-เทวดาผู้หญิง": "ดีมาก อยู่ด้วยกันอย่างราบรื่นร่มเย็นเป็นสุข เป็นที่อิจฉาแก่คนทั่วไป บริบูรณ์ด้วยโภคทรัพย์สมบัติ จะอยู่กินกันตราบเท่าถือไม้เท้ายอดทองกระบองยอดเพชร",
    "เทวดาผู้หญิง-เทวดาผู้หญิง": "ฐานะปานกลาง ไม่สู้ราบรื่นนัก มักชิงดีชิงเด่นกัน มีเรื่องระหองระแหงเล็กน้อย หาความสุขที่แท้จริงได้ยาก",
    "เทวดาผู้ชาย-ยักษ์ผู้ชาย": "ไม่สู้ดี มักทะเลาะวิวาทข่มเหงกันเสมอ ไม่ลดหย่อนผ่อนปรนให้กัน ทัศนะต่างกัน มักอยู่กินด้วยกันไม่กี่ปี",
    "เทวดาผู้ชาย-ยักษ์ผู้หญิง": "ดี แม้จะทะเลาะกันบ้างแต่อีกฝ่ายจะนิ่งเฉย ปรับความเข้าใจกันได้ เป็นสามีภรรยาที่ดีมีทรัพย์สมบัติในชีวิตสมรส",
    "เทวดาผู้ชาย-มนุษย์ผู้ชาย": "ไม่สู้ดีนัก มีความหึงหวง วางอำนาจใส่กัน มักหย่าร้างกันในเวลาอันรวดเร็ว (ก้นหม้อข้าวยังไม่ทันดำ)",
    "เทวดาผู้ชาย-มนุษย์ผู้หญิง": "มีความสุขราบรื่นดีที่สุด ประสบความสำเร็จรุ่งโรจน์ที่สุดตลอดชีวิต",
    "เทวดาผู้หญิง-ยักษ์ผู้ชาย": "ไม่ดีเลย ไม่ปรองดองกัน ทะเลาะกันเรื่องไร้สาระตลอดเวลา ต่างฝ่ายมากชู้หลายคู่ครอง หาความสุขไม่ได้",
    "เทวดาผู้หญิง-มนุษย์ผู้หญิง": "อยู่ด้วยกันไม่ได้เลย มักเกิดจากการคลุมถุงชนโดยที่ไม่ได้รักกันจริง มักนอกใจกันในระยะเวลาอันสั้น",
    "มนุษย์ผู้ชาย-มนุษย์ผู้ชาย": "ไม่สู้ราบรื่นนัก มักทะเลาะกันเสมอและถูกชาวบ้านตำหนิติเตียน หึงหวงกันมาก ดีสุดแค่ระดับปานกลาง",
    "มนุษย์ผู้ชาย-มนุษย์ผู้หญิง": "ดีมาก รักใคร่กลมเกลียว อายุยืน บุตรบริวารมาก ได้เกียรติยศจากคนทั่วไป อยู่กันจนถือไม้เท้ายอดทองกระบองยอดเพชร",
    "มนุษย์ผู้ชาย-ยักษ์ผู้ชาย": "ไม่ดี ชีวิตสมรสไม่ราบรื่น หาความสุขน้อย ต้องอดกลั้นอย่างสาหัส มักทะเลาะและหย่าร้างแล้วคืนดีกัน",
    "มนุษย์ผู้ชาย-ยักษ์ผู้หญิง": "ดีพอประมาณ ถ้าหญิงเป็นมนุษย์และชายเป็นยักษ์จะอยู่กันยืด ฝ่ายหญิงจะปรนนิบัติเอาใจดีมาก",
    "ยักษ์ผู้ชาย-ยักษ์ผู้ชาย": "ดีนัก อยู่กันเหมือนเพื่อนสนิท มีความสุขราบรื่น การดำเนินชีวิตโลดโผน ไม่มีใครได้เปรียบเสียเปรียบกัน",
    "ยักษ์ผู้หญิง-ยักษ์ผู้หญิง": "ดีนัก อยู่กันเหมือนเพื่อนสนิท มีความสุขราบรื่น การดำเนินชีวิตโลดโผน ไม่มีใครได้เปรียบเสียเปรียบกัน",
    "ยักษ์ผู้ชาย-มนุษย์ผู้หญิง": "ไม่ดี มักข่มเหงน้ำใจและดูหมิ่นตระกูลกัน หาความสุขได้น้อย นานไปจะระทมทุกข์และยากจน",
    "ยักษ์ผู้หญิง-มนุษย์ผู้หญิง": "ดีแค่ช่วงแรก พออยู่ไปไม่นานจะพลัดพรากจากกันเพราะทัศนะเข้ากันไม่ได้ ต้องหย่าร้างกันโดยไม่มีใครประนีประนอม"
};

// ตารางความสมพงศ์ระหว่างธาตุ (Element Compatibility)
const elementCompatibility = {
    // กลุ่มที่ส่งเสริมกัน (ดี)
    "ดิน-ดิน": { result: "ดี", detail: "ธาตุเดียวกัน ส่งเสริมความมั่นคง" },
    "น้ำ-น้ำ": { result: "ดี", detail: "ธาตุเดียวกัน อยู่ด้วยกันร่มเย็น" },
    "ไม้-ไม้": { result: "ดี", detail: "ธาตุเดียวกัน ช่วยกันสร้างฐานะ" },
    "ไฟ-ไฟ": { result: "ดี", detail: "ธาตุเดียวกัน แต่อาจจะต้องระวังเรื่องอารมณ์ในบางครั้ง" },
    "ดิน-น้ำ": { result: "ดี", detail: "ธาตุเกื้อหนุน ดินชุ่มชื้น น้ำมีที่พัก" },
    "ดิน-ไม้": { result: "ดี", detail: "ธาตุเกื้อหนุน ไม้ได้อาศัยดินในการเติบโต" },
    "น้ำ-ไม้": { result: "ดี", detail: "ธาตุเกื้อหนุน น้ำช่วยให้ไม้เขียวขจี" },

    // กลุ่มที่เป็นอริหรือขัดแย้งกัน (ไม่ดี)
    "เหล็ก-เหล็ก": { result: "ไม่ดี", detail: "เหล็กกับเหล็กมักกระทบกระทั่งกัน แข็งต่อแข็งเจอกัน" },
    "ไฟ-ไม้": { result: "ไม่ดี", detail: "ไฟมักเผาผลาญไม้ให้หมดไป อยู่ด้วยกันแล้วร้อนรน" },
    "ไฟ-เหล็ก": { result: "ไม่ดี", detail: "ไฟหลอมละลายเหล็ก ทำให้สูญเสียทรัพย์หรืออำนาจ" }
};

// ข้อมูลธาตุประจำปีนักษัตร (อ้างอิงจากข้อมูลเดิมที่คุณให้มา)
const zodiacElements = {
    rat: "น้ำ",      // ชวด
    ox: "ดิน",       // ฉลู
    tiger: "ไม้",     // ขาล
    rabbit: "ไม้",    // เถาะ
    dragon: "ทอง",    // มะโรง (ในตำราสมพงศ์มหาสมบัติคุณระบุเป็นทอง)
    snake: "ไฟ",     // มะเส็ง
    horse: "ไฟ",     // มะเมีย
    goat: "ทอง",     // มะแม
    monkey: "เหล็ก",  // วอก
    rooster: "เหล็ก", // ระกา
    dog: "ดิน",      // จอ
    pig: "น้ำ"       // กุน
};


// ตำแหน่งนาค (12 ปีนักษัตร)
// ชาย: ชวดเริ่มหัว (0) -> กุนจบหาง (11)
// หญิง: ชวดเริ่มหาง (11) -> กุนจบหัว (0)
const nagaPositions = ["หัว", "หัว", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "หาง", "หาง"];

const zodiacIndex = { 
    rat: 0, ox: 1, tiger: 2, rabbit: 3, dragon: 4, snake: 5, 
    horse: 6, goat: 7, monkey: 8, rooster: 9, dog: 10, pig: 11 
};

// ข้อมูลเกณฑ์เศษ
const remainderFortune = {
    1: "มีทรัพย์สมบัติมาก อยู่ด้วยกันร่มเย็นเป็นสุข",
    2: "ฝ่ายชายจะตายก่อน (ตามเกณฑ์โบราณ)",
    3: "ฝ่ายหญิงจะตายก่อน (ตามเกณฑ์โบราณ)",
    4: "มักเจ็บไข้ได้ป่วยทั้งคู่",
    5: "ดีทุกอย่าง ดีนักแล",
    6: "ดีทุกอย่าง ดีนักแล",
    0: "ไม่มีอะไรดีเลย (ตกเกณฑ์ศูนย์)"
};




// ฟังก์ชันคำนวณรายคู่ครองและแสดงผล
function calculateWealth() {
    const u = document.getElementById('userYear').value;
    const p = document.getElementById('partnerYear').value;
    const resDiv = document.getElementById('wealthResult'); // ผลสมบัติเดิม 
   
    
    // ส่วนแสดงผลสมพงศ์แต่งงานใหม่
    const resWealth = document.getElementById('wealthResult');
    const userRaceDisp = document.getElementById('user-race-display');
    const partnerRaceDisp = document.getElementById('partner-race-display');    
    const marriageBox = document.getElementById('marriage-result-box');
    const marriageText = document.getElementById('marriage-text');
    const partnerElementDisp = document.getElementById('pElement-display');
    const userElementDisp = document.getElementById('uElement-display');


    if(u && p) {
        // 1. คำนวณสมบัติ (ของเดิม)
        const res = fortuneWealthData[u].matches[p];
        resDiv.innerHTML = `<span class="text-dark">ตกสมบัติ : สมบัติ${res}</span>`;

        // 2. คำนวณสมพงศ์แต่งงาน (ของใหม่)
        const uInfo = raceMapping[u];
        const pInfo = raceMapping[p];
        
        userRaceDisp.innerText = `${uInfo.race}${uInfo.gender}`;
        partnerRaceDisp.innerText = `${pInfo.race}${pInfo.gender}`;

        // สร้าง Key สำหรับค้นหา (เช่น "เทวดาผู้ชาย-เทวดาผู้หญิง")
        let pairKey = `${uInfo.race}${uInfo.gender}-${pInfo.race}${pInfo.gender}`;
        let reverseKey = `${pInfo.race}${pInfo.gender}-${uInfo.race}${uInfo.gender}`;

        // ค้นหาคำทำนาย (เช็คทั้งสองฝั่งเผื่อ Data ใน Object วางไว้ด้านเดียว)
        let prediction = marriageFortune[pairKey] || marriageFortune[reverseKey];

        partnerElementDisp.innerText = zodiacElements[p];
        userElementDisp.innerText = zodiacElements[u];
        // แสดงผลธาตุสมพงศ์
        const uElement = zodiacElements[u];
        const pElement = zodiacElements[p];
         // เรียงลำดับชื่อธาตุตามตัวอักษรเพื่อให้ตรงกับ Key ใน Object
        const pair = [uElement, pElement].sort().join('-');
        const match = elementCompatibility[pair];
        
        document.getElementById('element-compatibility-text').innerText =` ${uElement} กับ ${pElement} ${match.result} - ${match.detail}`; 

        // --- Logic สมพงศ์นาคคู่ ---
        const maleIdx = zodiacIndex[u]; // ชาย: ชวด(0) -> กุน(11)
        const femaleIdx = 11 - zodiacIndex[p]; // หญิง: ชวด(11) -> กุน(0)
    
    // กำหนดตำแหน่ง หัว-กลาง-หาง
    const nagaPositions = ["หัว", "หัว", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "กลาง", "หาง", "หาง"];
    const malePos = nagaPositions[maleIdx];
    const femalePos = nagaPositions[femaleIdx];
    
    // กำหนดตัวนาค (นาคตัวที่ 1: ชวด-มะเส็ง / นาคตัวที่ 2: มะเมีย-กุน)
    const maleNagaNum = maleIdx < 6 ? 1 : 2;
    const femaleNagaNum = femaleIdx < 6 ? 1 : 2;

    let nagaComment = `ชายตก${malePos}นาค, หญิงตก${femalePos}นาค: `;

    // --- เริ่ม Logic การทำนายแบบละเอียด ---
    
    if (maleNagaNum === femaleNagaNum) {
        // กรณี: ตกนาคตัวเดียวกัน
        if (maleIdx === femaleIdx) {
            // ตกจุดเดียวกันเป๊ะๆ
            if (malePos === "หัว") {
                nagaComment += "ดีนักแล อยู่ร่วมสุขร่วมทุกข์กันจนแก่เฒ่า มีความสุขทั้งกายและใจ";
            } else if (malePos === "หาง") {
                nagaComment += "อยู่กินกันอย่างร่มเย็นเป็นสุข รักใคร่ปรองดองไม่ทอดทิ้งกัน";
            } else if (malePos === "กลาง") {
                nagaComment += "รักใคร่สามัคคีกันดี แต่จะลำบากมากกว่าสุข (ตกกลางนาคร่วมจุดเดียวกัน)";
            }
        } 
        else if (malePos === femalePos) {
            // ตกส่วนเดียวกัน (กลาง) แต่คนละจุดบนนาคตัวเดิม
            if (malePos === "กลาง") {
                nagaComment += "ดี จะมีทรัพย์สินเงินทองโภคสมบัติ อยู่กันเป็นสุข";
            }
        }
        else if ((malePos === "หัว" && femalePos === "หาง") || (malePos === "หาง" && femalePos === "หัว")) {
            // ฝ่ายหนึ่งตกหัว อีกฝ่ายตกหาง บนนาคตัวเดียวกัน
            nagaComment += "เป็นคู่ผัวตัวเมียที่ปานกลาง";
        }
        else {
            // กรณีอื่นๆ บนนาคตัวเดียวกัน
            nagaComment += "อาจตกทุกข์ได้ยาก เดือดร้อนใจ หาความเจริญได้ยาก";
        }
    } 
    else {
        // กรณี: ตกนาคคนละตัว
        if (malePos === "หัว" && femalePos === "หัว") {
            nagaComment += "มักหย่าร้างกัน หรือเป็นหม้ายในไม่ช้า (ตกหัวนาคคนละตัว)";
        } else if (malePos === "หาง" && femalePos === "หาง") {
            nagaComment += "มักหย่าร้างกัน ไม่ดีเลย (ตกหางนาคคนละตัว)";
        } else if (malePos === "กลาง" && femalePos === "กลาง") {
            nagaComment += "อยู่กินกันไม่ยืด (ไม่ทันหม้อข้าวจะดำ) ต้องจากกัน (ตกกลางตัวนาคคนละตัว)";
        } else {
            // ตกคนละตำแหน่งและคนละตัว
            nagaComment += "ไม่สู้ดีนัก มักหย่าร้างกัน หรือหาความเจริญได้ยากแล";
        }
    }
        // --- เกณฑ์คำนวณเศษ ---
        // นับจุดที่เหลือจากหัว/หาง (ใช้ Index เป็นตัวแทนระยะ)
        const malePoints = maleIdx + 1;
        const femalePoints = (11 - femaleIdx) + 1;
        const totalRemainder = ((malePoints + femalePoints) * 3) % 7;
        const remainderText = remainderFortune[totalRemainder] || remainderFortune[0];

        // --- แสดงผล ---
        // document.getElementById('naga-result-box').classList.remove('d-none');
        document.getElementById('naga-text').innerText = nagaComment;
        document.getElementById('remainder-text').innerText = `ตกเศษ ${totalRemainder}: ${remainderText}`;
    

        if(prediction) {
            marriageBox.classList.remove('d-none');
            marriageText.innerText = prediction;
        }
    } else {
        resDiv.innerHTML = "";
        marriageBox.classList.add('d-none');
        userRaceDisp.innerText = "-";
        partnerRaceDisp.innerText = "-";

    }
}



// เรียกใช้เมื่อ Load หน้าเว็บ
window.onload = () => {
    calculateWealth();
};