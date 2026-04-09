function calculateElementMatch() {
    const maleYear = document.getElementById('maleYearElem').value;
    const femaleYear = document.getElementById('femaleYearElem').value;
    const maleAge = parseInt(document.getElementById('maleAge').value) || 0;
    const femaleAge = parseInt(document.getElementById('femaleAge').value) || 0;
    
    const display = document.getElementById('element-result-display');
    const elemContent = document.getElementById('element-text-content');
    const ageContent = document.getElementById('age-text-content');

    // 1. แปลงปีเป็นธาตุ
    const yearToElement = {
        "ชวด": "น้ำ", "กุน": "น้ำ",
        "ฉลู": "ดิน", "จอ": "ดิน",
        "ขาล": "ไม้", "เถาะ": "ไม้",
        "มะโรง": "ทอง", "มะแม": "ทอง",
        "มะเส็ง": "ไฟ", "มะเมีย": "ไฟ",
        "วอก": "เหล็ก", "ระกา": "เหล็ก"
    };

    const mElem = yearToElement[maleYear];
    const fElem = yearToElement[femaleYear];

    // 2. ตรวจสอบสมพงษ์ธาตุ (ตามกฎ 25 ข้อ)
    let elemResult = "";
    
    // กฎพิเศษ: ธาตุทองผสมกับอะไรก็ได้
    if (mElem === "ทอง" || fElem === "ทอง") {
        elemResult = "ธาตุทองนั้นไม่เลือกนิยม คือจะผสมเข้ากับธาตุใดๆ ก็ได้ (ถือว่าดี)";
    } else {
        const combo = `${mElem}-${fElem}`;
        switch (combo) {
            case "น้ำ-น้ำ": elemResult = "อยู่ด้วยกันจะเป็นสุขสบายใจ"; break;
            case "น้ำ-ดิน": elemResult = "จะมีความรักกันมาก"; break;
            case "น้ำ-ไม้": elemResult = "ดีนักจะบริบูรณ์ด้วยทรัพย์สมบัติ"; break;
            case "น้ำ-ไฟ": elemResult = "ดีแต่มักจะหึงส์กัน"; break;
            case "น้ำ-เหล็ก": elemResult = "ดีนักจะได้ยศถาบรรดาศักดิ์"; break;
            case "ดิน-ดิน": elemResult = "ดีจะมีบุตรด้วยกันและอายุยืน"; break;
            case "ดิน-น้ำ": elemResult = "อยู่ด้วยกันปีหนึ่งจะได้ดีจะมีผู้อุปถัมภ์ค้ำชู ชุบเลี้ยง"; break;
            case "ดิน-ไม้": elemResult = "อยู่ด้วยกันไม่ดี"; break;
            case "ดิน-ไฟ": elemResult = "จะได้ดีต่อภายแก่และมีทรัพย์มาก"; break;
            case "ดิน-เหล็ก": elemResult = "อยู่ด้วยกันจะมีบุตรหลายคน"; break;
            case "ไม้-ไม้": elemResult = "ไม่ดีอยู่กินด้วยกันอาภัพไม่เกิดลาภผลสักการเลย"; break;
            case "ไม้-น้ำ": elemResult = "มีความสุขมีทรัพย์แต่เลี้ยงบุตรยาก"; break;
            case "ไม้-ดิน": elemResult = "รักกันแต่จะต้องจากกัน"; break;
            case "ไม้-ไฟ": elemResult = "ดีจะมีบุตรชายก่อนแต่มักจะกำพร้า"; break;
            case "ไม้-เหล็ก": elemResult = "ไม่ดีอยู่ด้วยกันไม่นาน"; break;
            case "ไฟ-ไฟ": elemResult = "ไม่ดีอาภัพจะเข็ญใจ"; break;
            case "ไฟ-น้ำ": elemResult = "เมื่อต้นไม่ดีภายหลังดีอายุยืนแต่มักจะเกิดเป็นปากเสียงกัน"; break;
            case "ไฟ-ดิน": elemResult = "อยู่ด้วยกันไม่นานจะต้องทิ้งหย่ากัน"; break;
            case "ไฟ-ไม้": elemResult = "ไม่ดีจะวิวาทเป็นปากเสียง"; break;
            case "ไฟ-เหล็ก": elemResult = "ไม่ดีไร้ทรัพย์สมบัติ"; break;
            case "เหล็ก-เหล็ก": elemResult = "ดีนักจะอยู่เย็นเป็นสุขด้วยกันทั้งสอง"; break;
            case "เหล็ก-น้ำ": elemResult = "ดีนักจะอยู่กินด้วยกันมีความสุขเปรมใจ"; break;
            case "เหล็ก-ดิน": elemResult = "อยู่กินด้วยกันดีจะเจริญด้วยทรัพย์สิน"; break;
            case "เหล็ก-ไม้": elemResult = "จะได้เป็นใหญ่เป็นโตมีผู้นับหน้าถือตามาก"; break;
            default: elemResult = "คำทำนายเป็นมัธยม (กลางๆ)";
        }
    }

    // 3. คำนวณสมพงษ์อายุ (สูตร: ((ชาย+หญิง) * 12) / 7)
    let ageResult = "";
    if (maleAge > 0 && femaleAge > 0) {
        const totalAge = maleAge + femaleAge;
        const remainder = (totalAge * 12) % 7;
        
        if ([3, 5, 6].includes(remainder)) {
            ageResult = `เศษ ${remainder}: จะประกอบไปด้วยทรัพย์สมบัติรักกันดีนัก`;
        } else if ([2, 4, 0, 7].includes(remainder) || remainder === 1) { // 0 หรือ 7 คือลงตัว
            ageResult = `เศษ ${remainder}: จะเจ็บไข้ได้ป่วย ทรัพย์สมบัติไม่มั่นคงถาวร ทรัพย์ร้อนและที่อยู่ก็ร้อน`;
        } else {
            ageResult = `เศษ ${remainder}: อยู่ในเกณฑ์ปานกลาง`;
        }
    } else {
        ageResult = "กรุณากรอกอายุของทั้งสองฝ่ายเพื่อคำนวณเศษ";
    }

    // แสดงผล
    display.style.display = "block";
    elemContent.innerHTML = `<strong>สมพงษ์ธาตุ (${mElem} - ${fElem}):</strong><br>${elemResult}`;
    ageContent.innerHTML = `<strong>สมพงษ์อายุ:</strong><br>${ageResult}`;
}