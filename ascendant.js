const ZODIAC_DATA = [
    { name: "เมษ", icon: "♈", desc: "เป็นคนกระตือรือร้น มีความเป็นผู้นำ กล้าหาญ และชอบความท้าทาย" },
    { name: "พฤษภ", icon: "♉", desc: "เป็นคนหนักแน่น อดทน รักสวยรักงาม และให้ความสำคัญกับความมั่นคง" },
    { name: "เมถุน", icon: "♊", desc: "เป็นคนฉลาด มีไหวพริบ ช่างพูดช่างเจรจา และปรับตัวเก่ง" },
    { name: "กรกฎ", icon: "♋", desc: "เป็นคนรักครอบครัว มีเมตตา อ่อนโยน และมีสัญชาตญาณแรงกล้า" },
    { name: "สิงห์", icon: "♌", desc: "เป็นคนสง่างาม มั่นใจในตัวเอง มีบารมี และชอบความเป็นที่หนึ่ง" },
    { name: "กันย์", icon: "♍", desc: "เป็นคนละเอียดรอบคอบ มีระเบียบวินัย และเก่งในการวิเคราะห์" },
    { name: "ตุลย์", icon: "♎", desc: "เป็นคนรักความยุติธรรม มีเสน่ห์ เข้ากับคนง่าย และชอบความสมดุล" },
    { name: "พิจิก", icon: "♏", desc: "เป็นคนมีความลึกลับ มีพลังอำนาจในตัว และมีความมุ่งมั่นสูง" },
    { name: "ธนู", icon: "♐", desc: "เป็นคนรักอิสระ มองโลกในแง่ดี ชอบเรียนรู้สิ่งใหม่ๆ และมีคุณธรรม" },
    { name: "มังกร", icon: "♑", desc: "เป็นคนมีความรับผิดชอบสูง มุ่งมั่นสร้างฐานะ และมีความอดทนเป็นเลิศ" },
    { name: "กุมภ์", icon: "♒", desc: "เป็นคนมีวิสัยทัศน์ รักพวกพ้อง มีความคิดสร้างสรรค์และล้ำสมัย" },
    { name: "มีน", icon: "♓", desc: "เป็นคนมีจินตนาการสูง มีเมตตา อ่อนน้อม และมีซิกซ์เซนส์" }
];

const HOUSE_PREDICTIONS = {
    "ตนุ": {
        "เมษ": "เป็นคนสู้ชีวิต มักต้องพึ่งพาตนเองเป็นหลัก กล้าหาญและบ้าบิ่น",
        "พฤษภ": "เป็นคนรักสงบ หนักแน่น มีความอดทนสูง รักสวยรักงาม",
        "เมถุน": "เป็นคนปรับตัวเก่ง มีปฏิภาณไหวพริบดี ช่างพูดช่างเจรจา",
        "กรกฎ": "เป็นคนรักครอบครัว อารมณ์อ่อนไหวง่าย มีเมตตาสูง",
        "สิงห์": "เป็นคนมีอำนาจวาสนา ชอบเป็นผู้นำ มีเกียรติยศศักดิ์ศรี",
        "กันย์": "เป็นคนละเอียดรอบคอบ ช่างสังเกต มักเจ้านะเจ้าระเบียบ",
        "ตุลย์": "เป็นคนรักความยุติธรรม มีเสน่ห์ต่อผู้พบเห็น เข้าสังคมเก่ง",
        "พิจิก": "เป็นคนมีความลับ มีพลังอำนาจลึกลับในตัว มุ่งมั่นลึกซึ้ง",
        "ธนู": "เป็นคนใฝ่รู้ ชอบอิสระ มองโลกในแง่ดี มีคุณธรรม",
        "มังกร": "เป็นคนจริงจังกับชีวิต ทะเยอทะยานสูง อดทนต่ออุปสรรค",
        "กุมภ์": "เป็นคนใจกว้าง รักพวกพ้อง มีความคิดแปลกใหม่ล้ำสมัย",
        "มีน": "เป็นคนมีจินตนาการสูง มีเมตตา อ่อนน้อมและมีสัมผัสพิเศษ"
    },
    "กดุมพะ": {
        "เมษ": "หาเงินเก่งจากการบุกเบิก แข่งขัน หรือต้องเหนื่อยก่อนจึงจะได้มา",
        "พฤษภ": "การเงินมั่นคง มีโอกาสร่ำรวยจากทรัพย์สินมรดกหรือของสวยงาม",
        "เมถุน": "เงินไหลเข้าจากหลายทาง มักมาจากการติดต่อสื่อสารและการเจรจา",
        "กรกฎ": "รายได้สัมพันธ์กับครอบครัว หรืออาชีพที่เกี่ยวกับของกินของใช้",
        "สิงห์": "หาเงินได้มากจากตำแหน่งหน้าที่การงาน มักใช้จ่ายมือเติบ",
        "กันย์": "การเงินต้องจัดการอย่างเป็นระบบ มักได้ลาภจากงานบริการ",
        "ตุลย์": "การเงินได้มาจากการร่วมหุ้นส่วน หรือความสัมพันธ์ส่วนตัว",
        "พิจิก": "โชคลาภมักมาจากมรดก การประกัน หรือรายได้ที่ปกปิด",
        "ธนู": "การเงินหลั่งไหลมาจากการศึกษา การต่างประเทศ หรือความศรัทธา",
        "มังกร": "เก็บเงินเก่ง มักสร้างฐานะด้วยความเหนื่อยยากและประหยัด",
        "กุมภ์": "หาเงินได้จากเทคโนโลยี นวัตกรรม หรือโชคลาภไม่คาดฝัน",
        "มีน": "รายได้มักมาแบบไม่เปิดเผย หรือได้ลาภจากการทำกุศล"
    },
    "กัมมะ": {
        "เมษ": "เหมาะกับงานที่ต้องใช้พลังกาย การตัดสินใจที่รวดเร็ว หรืองานเสี่ยงภัย",
        "พฤษภ": "เหมาะกับงานธนาคาร อสังหาริมทรัพย์ หรือเกษตรกรรมที่มั่นคง",
        "เมถุน": "เหมาะกับงานประชาสัมพันธ์ งานเขียน การสอน หรือการเป็นนายหน้า",
        "กรกฎ": "เหมาะกับงานโรงแรม ร้านอาหาร งานบริการ หรือธุรกิจเกี่ยวกับน้ำ",
        "สิงห์": "เหมาะกับงานบริหาร ข้าราชการระดับสูง หรือธุรกิจที่ต้องโชว์ตัว",
        "กันย์": "เหมาะกับงานวิจัย บัญชี แพทย์ หรือพยาบาลที่ต้องใช้ความละเอียด",
        "ตุลย์": "เหมาะกับงานที่ปรึกษา ทนายความ งานศิลปะ หรือการเจรจาไกล่เกลี่ย",
        "พิจิก": "เหมาะกับงานสืบสวน ของเก่า ของขลัง หรือธุรกิจเกี่ยวกับความตาย",
        "ธนู": "เหมาะกับงานวิชาการ ศาสนา กฎหมาย หรือการค้าขายต่างประเทศ",
        "มังกร": "เหมาะกับงานอุตสาหกรรม งานโครงสร้าง หรืองานที่ต้องรับผิดชอบสูง",
        "กุมภ์": "เหมาะกับงานไอที วิทยาศาสตร์ เอ็นจีโอ หรืออาชีพที่ทันสมัย",
        "มีน": "เหมาะกับงานศิลปิน กวี การกุศล หรืออาชีพที่ต้องอยู่เบื้องหลัง"
    },
    "ปัตนิ": {
        "เมษ": "คู่ครองเป็นคนคล่องแคล่ว ใจร้อน ชอบนำหน้า หรือพบรักจากการแข่งขัน",
        "พฤษภ": "คู่ครองเป็นคนหน้าตาดี รูปร่างมั่นคง รักสงบ และช่วยสร้างฐานะได้ดี",
        "เมถุน": "คู่ครองเป็นคนช่างพูด มีมนุษย์สัมพันธ์ดี หรืออาจได้คู่ที่อายุน้อยกว่า",
        "กรกฎ": "คู่ครองเป็นคนอ่อนโยน รักครอบครัว ดูแลเอาใจใส่เหมือนญาติสนิท",
        "สิงห์": "คู่ครองเป็นคนมีเกียรติ มั่นใจในตัวเองสูง หรือเป็นคนที่มีชื่อเสียง",
        "กันย์": "คู่ครองเป็นคนเจ้าระเบียบ ช่างเลือก มีเหตุผล และช่วยจัดการชีวิตได้ดี",
        "ตุลย์": "คู่ครองเป็นคนมีเสน่ห์ รักความยุติธรรม และให้เกียรติซึ่งกันและกัน",
        "พิจิก": "คู่ครองเป็นคนมีความลึกลับ อารมณ์รุนแรงแต่รักจริง หรือพบรักในเหตุการณ์ไม่คาดฝัน",
        "ธนู": "คู่ครองเป็นคนมีความรู้ มีคุณธรรม หรืออาจเป็นคนต่างชาติต่างภาษา",
        "มังกร": "คู่ครองเป็นคนวัยผู้ใหญ่ มีความรับผิดชอบสูง มักทำงานเก่งและจริงจัง",
        "กุมภ์": "คู่ครองเป็นคนมีความคิดอิสระ เป็นทั้งเพื่อนและคนรักในเวลาเดียวกัน",
        "มีน": "คู่ครองเป็นคนช่างฝัน มีเมตตา อ่อนน้อม หรือพบรักแบบพรหมลิขิต"
    },
    "ลาภะ": {
        "เมษ": "โชคลาภมักได้มาอย่างรวดเร็วจากการเสี่ยง หรือการกล้าตัดสินใจ",
        "พฤษภ": "ลาภผลมีความมั่นคง มักได้โชคจากอสังหาริมทรัพย์หรือของมีค่า",
        "เมถุน": "ลาภผลมาจากการเจรจา นายหน้า หรือการติดต่อประสานงานหลายๆ ด้าน",
        "กรกฎ": "โชคลาภมาจากผู้หญิงในครอบครัว หรือธุรกิจที่เกี่ยวกับบ้านและที่ดิน",
        "สิงห์": "ลาภผลมาจากผู้ใหญ่ที่มีอำนาจ หรือโชคจากชื่อเสียงและตำแหน่ง",
        "กันย์": "ลาภผลมาจากการทำงานที่ละเอียด หรือการแก้ปัญหาให้ผู้อื่น",
        "ตุลย์": "โชคลาภมาจากการร่วมลงทุน การทำสัญญา หรือจากคนรักหุ้นส่วน",
        "พิจิก": "โชคลาภมาแบบไม่คาดฝัน หรือได้ลาภจากสิ่งที่ผู้อื่นทิ้งแล้ว",
        "ธนู": "โชคลาภมาจากแดนไกล การศึกษา หรือการต่างประเทศ",
        "มังกร": "ลาภผลมาช้าแต่ชัวร์ ต้องใช้ความอดทนสะสมจึงจะเกิดความสำเร็จ",
        "กุมภ์": "ลาภผลมาจากเทคโนโลยี เครือข่ายสังคม หรือการเสี่ยงโชคแบบฟลุคๆ",
        "มีน": "โชคลาภมาแบบลับๆ หรือได้ลาภจากการเดินทางไกลและการทำบุญ"
    }
};

window.calculateAscendant = function() {
    const timeVal = document.getElementById('ascBirthTime').value;
    const dateVal = document.getElementById('ascBirthDate').value;

    if (!timeVal || !dateVal) {
        alert("กรุณาระบุวันและเวลาเกิดให้ครบถ้วนครับประธาน");
        return;
    }

    const birthDate = new Date(dateVal);
    const month = birthDate.getMonth() + 1; // 1-12
    const [hours, minutes] = timeVal.split(':').map(Number);
    const totalMinutes = (hours * 60) + minutes;

    // สูตรคำนวณลัคนาโดยประมาณตามหลักโหราศาสตร์ไทย
    // (ปรับจูนตามเวลาพระอาทิตย์ขึ้นในแต่ละเดือน)
    let ascIdx = 0;
    
    // ตารางคำนวณหาลัคนาพื้นฐาน
    if (totalMinutes >= 360 && totalMinutes < 480) ascIdx = 0; // 06.00-08.00
    else if (totalMinutes >= 480 && totalMinutes < 600) ascIdx = 1; // 08.00-10.00
    else if (totalMinutes >= 600 && totalMinutes < 720) ascIdx = 2; // 10.00-12.00
    else if (totalMinutes >= 720 && totalMinutes < 840) ascIdx = 3; // 12.00-14.00
    else if (totalMinutes >= 840 && totalMinutes < 960) ascIdx = 4; // 14.00-16.00
    else if (totalMinutes >= 960 && totalMinutes < 1080) ascIdx = 5; // 16.00-18.00
    else if (totalMinutes >= 1080 && totalMinutes < 1200) ascIdx = 6; // 18.00-20.00
    else if (totalMinutes >= 1200 && totalMinutes < 1320) ascIdx = 7; // 20.00-22.00
    else if (totalMinutes >= 1320 && totalMinutes < 1440) ascIdx = 8; // 22.00-00.00
    else if (totalMinutes >= 0 && totalMinutes < 120) ascIdx = 9; // 00.00-02.00
    else if (totalMinutes >= 120 && totalMinutes < 240) ascIdx = 10; // 02.00-04.00
    else if (totalMinutes >= 240 && totalMinutes < 360) ascIdx = 11; // 04.00-06.00

    // ปรับเลื่อนลัคนาตามเดือนเกิด (Offset)
    // ทุกๆ 1 เดือน ลัคนาจะเลื่อนไป 1 ราศี
    const monthOffset = [0, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const finalAscIdx = (ascIdx + monthOffset[month]) % 12;

    // 1. แสดงราศีหลัก
    const result = ZODIAC_DATA[finalAscIdx];
    document.getElementById('ascResult').style.display = 'block';
    document.getElementById('ascSign').innerHTML = `${result.icon} ลัคนาราศี${result.name}`;
    document.getElementById('ascDescription').innerText = result.desc;

    // 2. สร้างตาราง 12 ภพเรือน
    const houseNames = [
        "ตนุ (ตัวตน/นิสัย)", "กดุมพะ (การเงิน)", "สหัชชะ (สังคม)", 
        "พันธุ (ครอบครัว)", "ปุตตะ (โชคลาภ)", "อริ (อุปสรรค)",
        "ปัตนิ (คนรัก)", "มรณะ (สุขภาพ)", "ศุภะ (ความสำเร็จ)",
        "กัมมะ (การงาน)", "ลาภะ (รายได้พิเศษ)", "วินาศ (เรื่องไม่คาดฝัน)"
    ];

    // 1. ระบุราศีของ 3 ภพหลัก
    const tanuZodiac = ZODIAC_DATA[finalAscIdx].name; // ภพที่ 1
    const gadumpaZodiac = ZODIAC_DATA[(finalAscIdx + 1) % 12].name; // ภพที่ 2
    const kammaZodiac = ZODIAC_DATA[(finalAscIdx + 9) % 12].name; // ภพที่ 10 (กัมมะ)
    const patniZodiac = ZODIAC_DATA[(finalAscIdx + 6) % 12].name; // ภพที่ 7 (ปัตนิ)
    const labhaZodiac = ZODIAC_DATA[(finalAscIdx + 10) % 12].name; // ภพที่ 11 (ลาภะ)

    // 2. ดึงคำทำนายจากตาราง HOUSE_PREDICTIONS
    const tanuDesc = HOUSE_PREDICTIONS["ตนุ"][tanuZodiac];
    const gadumpaDesc = HOUSE_PREDICTIONS["กดุมพะ"][gadumpaZodiac];
    const kammaDesc = HOUSE_PREDICTIONS["กัมมะ"][kammaZodiac];
    const patniDesc = HOUSE_PREDICTIONS["ปัตนิ"][patniZodiac];
    const labhaDesc = HOUSE_PREDICTIONS["ลาภะ"][labhaZodiac];

    
    const analysisBox = document.getElementById('deepAnalysis');
    const analysisContent = document.getElementById('analysisContent');

    // 3. ฉีดเข้า HTML (ต้องมี id="analysisContent" ในหน้า HTML ด้วยนะครับ)
    let analysisHtml = `
        <div class="mb-3 border-bottom border-secondary pb-2">
            <strong class="text-gold">✨ ตัวตน (ตนุ) - ราศี${tanuZodiac}</strong><br>
            <span class="text-white small">${tanuDesc}</span>
        </div>
        <div class="mb-3 border-bottom border-secondary pb-2">
            <strong class="text-gold">💰 การเงิน (กดุมพะ) - ราศี${gadumpaZodiac}</strong><br>
            <span class="text-white small">${gadumpaDesc}</span>
        </div>
        <div class="mb-3 border-bottom border-secondary pb-2">
            <strong class="text-gold">💼 การงาน (กัมมะ) - ราศี${kammaZodiac}</strong><br>
            <span class="text-white small">${kammaDesc}</span>
        </div>
        <div class="mb-3 border-bottom border-secondary pb-2">
            <strong class="text-gold">❤️ ความรัก (ปัตนิ) - ราศี${patniZodiac}</strong><br>
            <span class="text-white small">${patniDesc}</span>
        </div>
        <div class="mb-0">
            <strong class="text-gold">🎁 โชคลาภ (ลาภะ) - ราศี${labhaZodiac}</strong><br>
            <span class="text-white small">${labhaDesc}</span>
        </div>
    `;

    let tableHtml = "";
    for (let i = 0; i < 12; i++) {
        const currentZodiacIdx = (finalAscIdx + i) % 12; // ใช้ finalAscIdx ที่ประกาศไว้ข้างบน
        const zodiac = ZODIAC_DATA[currentZodiacIdx];
        
        tableHtml += `
            <tr>
                <td class="text-left small text-white-50">${houseNames[i]}</td>
                <td class="text-gold" style="font-weight:bold;">${zodiac.icon} ราศี${zodiac.name}</td>
            </tr>
        `;
    }

    // --- สั่งแสดงตารางภพเรือน (ที่มีอยู่แล้ว) ---
    document.getElementById('houseTableBody').innerHTML = tableHtml;      
    if (analysisBox && analysisContent) {
        analysisBox.style.display = 'block'; // เปิดกล่องแสดงผล
        analysisContent.innerHTML = analysisHtml; // ฉีดคำทำนายเข้าไป
        console.log("🔮 วิเคราะห์เจาะลึก 5 ภพเรียบร้อย!");
    }
};

// --- ฟังก์ชันบันทึกภาพดวงชะตาเป็นไฟล์ .png ---
window.saveAscendantImage = function() {
    console.log("📸 กำลังจัดเตรียมภาพดวงชะตา...");

    const captureArea = document.getElementById('ascResult'); // ระบุพื้นที่ที่จะแคป (ทั้งกล่องผลลัพธ์)
    const deepAnalysis = document.getElementById('deepAnalysis'); // ระบุพื้นที่คำทำนายเจาะลึก
    const houseTableBody = document.getElementById('houseTableBody'); // ระบุตารางภพเรือน

    if (!captureArea || captureArea.style.display === 'none') {
        alert("กรุณาคำนวณลัคนาก่อนบันทึกภาพครับประธาน");
        return;
    }

    // 1. ซ่อนปุ่ม "บันทึกภาพ" ชั่วคราว (เพื่อไม่ให้โผล่ในรูป)
    const saveButton = document.querySelector('.btn-outline-gold');
    if (saveButton) saveButton.style.display = 'none';

    // 2. เรียกใช้ html2canvas เพื่อแปลง HTML เป็น Canvas
    html2canvas(captureArea, {
        backgroundColor: '#000000', // ตั้งพื้นหลังรูปเป็นสีดำ (เหมือนหน้าเว็บ)
        scale: 2, // เพิ่มความละเอียดภาพ (x2)
        useCORS: true // รองรับการโหลดไอคอนราศี (ถ้าจำเป็น)
    }).then(canvas => {
        // 3. แปลง Canvas เป็น Base64 String ของรูปภาพ
        const imageData = canvas.toDataURL("image/png");

        // 4. สร้าง Link ล่องหนเพื่อดาวน์โหลดภาพ
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        
        // ตั้งชื่อไฟล์ภาพ: ลัคนา_ราศี[ชื่อราศี].png
        const zodiacName = document.getElementById('ascSign').innerText.replace('ลัคนาราศี', '');
        downloadLink.download = `ลัคนา_ราศี${zodiacName}.png`; 
        
        // 5. สั่งกด Link อัตโนมัติเพื่อดาวน์โหลด
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // 6. ลบ Link ที่สร้างขึ้น และแสดงปุ่ม "บันทึกภาพ" กลับมา
        document.body.removeChild(downloadLink);
        if (saveButton) saveButton.style.display = 'block';

        console.log("✅ บันทึกภาพสำเร็จ ราศี:", zodiacName);
    });
};