"use strict";

/**
 * 📱 ระบบสร้างคอนเทนต์ดวงรายวันสำหรับ Admin (Daily Fortune Generator)
 * สร้าง Text สำหรับนำไปโพสต์ Facebook โดยอิงหลักโหราศาสตร์
 */

// ฐานข้อมูลคำทำนาย 300+ คำ (จำลองเพื่อความกระชับ สามารถเพิ่มได้)
window.DAILY_FORTUNE_DB = {
    work: [
        "วันนี้มีเกณฑ์ได้รับข่าวดีเรื่องงาน โปรเจกต์ที่ทำอยู่จะประสบความสำเร็จเกินคาด 💼✨",
        "เป็นวันที่ต้องใช้ความอดทนสูง อาจมีอุปสรรคเล็กน้อย แต่จะผ่านไปได้ด้วยดี 🧱",
        "ผู้ใหญ่ให้การสนับสนุน หรือมีเกณฑ์ได้แสดงฝีมือให้เป็นที่ประจักษ์ 🌟",
        "งานล้นมือ ต้องจัดสรรเวลาให้ดี ระวังการสื่อสารผิดพลาดกับเพื่อนร่วมงาน 🗣️",
        "มีเกณฑ์ชีพจรลงเท้า ต้องเดินทางเรื่องงาน หรือรับผิดชอบงานนอกสถานที่ 🚶‍♂️",
        "เจรจาต่อรองประสบความสำเร็จ ลูกค้าหรือพาร์ทเนอร์ตอบรับข้อเสนอเป็นอย่างดี 🤝"
    ],
    finance: [
        "มีโชคลาภลอยแบบไม่คาดฝัน หรือได้เงินคืนจากลูกหนี้เก่า 💰💸",
        "การเงินสะพัด แต่ก็มีรายจ่ายจุกจิกเข้ามาตลอดวัน ระวังการใช้จ่ายตามอารมณ์ 💳",
        "มีเกณฑ์ได้ทรัพย์สินชิ้นใหญ่ หรือการลงทุนเริ่มผลิดอกออกผล 📈",
        "ระวังคนแปลกหน้ามาหยิบยืมเงิน หรือทำของมีค่าสูญหาย ⚠️",
        "ได้รับโชคจากผู้ใหญ่ หรือเพศตรงข้ามนำความโชคดีมาให้ 🎁",
        "การเงินมั่นคง แต่อาจต้องเสียเงินเพื่อสุขภาพหรือซ่อมแซมยานพาหนะ 🛠️"
    ],
    love: [
        "คนโสด: มีโอกาสพบเจอคนถูกใจจากการทำงาน หรือคนรู้จักแนะนำให้ ❤️\nคนมีคู่: ความรักหวานชื่น เข้าอกเข้าใจกันดี",
        "คนโสด: ยังต้องโฟกัสเรื่องงานไปก่อน รักไม่ยุ่งมุ่งแต่รวย 💼\nคนมีคู่: ระวังคำพูดที่ตรงเกินไปจนผิดใจกัน 🤐",
        "คนโสด: เสน่ห์แรงเป็นพิเศษ มีคนเข้ามาให้ความสนใจหลายคน 🌹\nคนมีคู่: มีเกณฑ์ได้เดินทางท่องเที่ยว หรือใช้เวลาดีๆ ร่วมกัน ✈️",
        "คนโสด: ระวังเจอคนมีเจ้าของเข้ามาพัวพัน เช็คให้ดีก่อนสานต่อ 🕵️‍♀️\nคนมีคู่: อาจมีเรื่องงอนกันเล็กๆ น้อยๆ แต่เคลียร์กันได้ 💖",
        "คนโสด: คนรักเก่าอาจวนเวียนกลับมา หรือนึกถึงความทรงจำเก่าๆ 🕰️\nคนมีคู่: ดูแลเอาใจใส่กันเป็นพิเศษ ความรักมั่นคงดี 🥰"
    ]
};

// ข้อมูล 12 ราศี
const ZODIAC_LIST = [
    { name: "ราศีเมษ", icon: "♈", element: "ไฟ" },
    { name: "ราศีพฤษภ", icon: "♉", element: "ดิน" },
    { name: "ราศีเมถุน", icon: "♊", element: "ลม" },
    { name: "ราศีกรกฎ", icon: "♋", element: "น้ำ" },
    { name: "ราศีสิงห์", icon: "♌", element: "ไฟ" },
    { name: "ราศีกันย์", icon: "♍", element: "ดิน" },
    { name: "ราศีตุลย์", icon: "♎", element: "ลม" },
    { name: "ราศีพิจิก", icon: "♏", element: "น้ำ" },
    { name: "ราศีธนู", icon: "♐", element: "ไฟ" },
    { name: "ราศีมังกร", icon: "♑", element: "ดิน" },
    { name: "ราศีกุมภ์", icon: "♒", element: "ลม" },
    { name: "ราศีมีน", icon: "♓", element: "น้ำ" }
];

const DAYS_LIST = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const CONTENT_DAY_COLORS = ["🔴", "🟡", "🩷", "🟢", "🟠", "🔵", "🟣"];

/**
 * เปิดหน้าต่างสร้างคอนเทนต์ (เรียกจาก adminDashboard.js)
 */
function openContentGeneratorModal() {
    // ลบอันเก่าทิ้งถ้ามี
    const existing = document.getElementById('contentGenModal');
    if (existing) existing.remove();

    const todayStr = new Date().toISOString().split('T')[0];

    const html = `
    <div id="contentGenModal" class="admin-modal" style="display:flex;">
        <div class="admin-modal-content" style="max-width: 600px; padding: 20px;">
            <div class="modal-header d-flex justify-content-between align-items-center mb-4">
                <h3 class="m-0 text-gold">📱 สร้างคอนเทนต์ดวงรายวัน</h3>
                <span class="close-modal" onclick="closeContentGeneratorModal()" style="font-size: 1.5rem; cursor: pointer;">&times;</span>
            </div>
            
            <div class="form-group">
                <label>📅 เลือกวันที่ทำนาย:</label>
                <div class="input-group">
                    <button class="btn btn-outline-warning" onclick="changeGenDate(-1)" type="button" style="border-color: #D4AF37; color: #D4AF37; padding: 4px 12px !important; border-radius: 8px 0 0 8px !important; font-size: 0.9rem !important; height: auto !important;"><i class="fas fa-chevron-left"></i></button>
                    <input type="date" id="genDate" class="form-control bg-dark text-gold border-gold text-center" value="${todayStr}" style="border-radius: 0 !important; height: auto !important;">
                    <button class="btn btn-outline-warning" onclick="changeGenDate(1)" type="button" style="border-color: #D4AF37; color: #D4AF37; padding: 4px 12px !important; border-radius: 0 8px 8px 0 !important; font-size: 0.9rem !important; height: auto !important;"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>

            <div class="form-group mt-3">
                <label>🔮 ประเภทการทำนาย:</label>
                <select id="genType" class="form-control bg-dark text-white border-gold">
                    <option value="day">ดวงรายวัน (ตามวันเกิด 7 วัน)</option>
                    <option value="zodiac">ดวงรายวัน (ตาม 12 ราศี)</option>
                </select>
            </div>

            <div class="form-group mt-3">
                <label>🎭 โทนข้อความ (Tone of Voice):</label>
                <select id="genTone" class="form-control bg-dark text-white border-gold">
                    <option value="casual">วัยรุ่น เป็นกันเอง (มี Emoji เยอะ)</option>
                    <option value="formal">สุภาพ เป็นทางการ</option>
                    <option value="mystic">ขลัง แม่นยำ ดุดัน (ฟันธง!)</option>
                </select>
            </div>

            <button class="btn btn-gold btn-block mt-4" onclick="generateDailyContent()">✨ สร้างข้อความ (Generate)</button>

            <div id="genResultContainer" class="mt-4" style="display: none;">
                <label class="text-gold">📝 ผลลัพธ์สำหรับนำไปโพสต์:</label>
                <textarea id="genResultText" class="form-control bg-dark text-white" rows="10" readonly style="font-size: 14px; white-space: pre-wrap; resize: vertical; border: 1px solid #d4af37;"></textarea>
                <button class="btn btn-primary btn-block mt-2" onclick="copyGenResult()">📋 คัดลอกข้อความ (Copy)</button>
                <div class="d-flex mt-2" style="gap: 10px;">
                    <button class="btn btn-outline-gold flex-fill" onclick="downloadSeparateImages()">🖼️ โหลดรูปแยก</button>
                    <button class="btn btn-outline-gold flex-fill" onclick="downloadSummaryImage()">🖼️ โหลดรูปรวม</button>
                </div>
                <div id="canvasExportArea" style="position: fixed; left: -9999px; top: 0; background: #000; color: #fff;"></div>
            </div>
        </div>
    </div>
    <style>
        .admin-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; align-items: center; justify-content: center; }
        .admin-modal-content { background: #1a1a1a; border: 1px solid #d4af37; border-radius: 10px; width: 100%; max-height: 90vh; overflow-y: auto; color: white; }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
}

function closeContentGeneratorModal() {
    const modal = document.getElementById('contentGenModal');
    if (modal) modal.remove();
}

/**
 * ระบบสุ่มแบบมี Seed โดยใช้วันที่เป็นตัวตั้ง
 * เพื่อให้กดสุ่มวันเดียวกันกี่ครั้งก็ได้ผลเหมือนเดิม (ความสม่ำเสมอ)
 */
function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getRandomFromDB(array, seed) {
    const index = Math.floor(seededRandom(seed) * array.length);
    return array[index];
}

/**
 * ฟังก์ชันหลักในการสร้างเนื้อหา
 */
function generateDailyContent() {
    const dateVal = document.getElementById('genDate').value;
    const type = document.getElementById('genType').value;
    const tone = document.getElementById('genTone').value;
    
    if(!dateVal) {
        alert("กรุณาเลือกวันที่");
        return;
    }

    const dateObj = new Date(dateVal);
    const dateSeedBase = parseInt(dateVal.replace(/-/g, ''));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateThStr = dateObj.toLocaleDateString('th-TH', options);
    const currentDayOfWeek = dateObj.getDay(); // 0=อาทิตย์, 1=จันทร์...

    window.lastGeneratedCards = [];

    // ดึงค่ากาลโยคของจริง (อิงจาก AuspiciousDays.js)
    let kala = null;
    if (typeof calculateKalaYok === 'function') {
        kala = calculateKalaYok(dateObj);
    }

    let outputText = "";

    // ปรับ Header ตาม Tone และแนบกาลโยคประจำวันปัจจุบัน
    let todayKalaText = "";
    if (kala) {
        if (currentDayOfWeek === kala.thongChai) todayKalaText = "🚩 วันนี้ตรงกับ **วันธงชัย** ฤกษ์งามยามดีที่สุด!\n";
        else if (currentDayOfWeek === kala.athibadi) todayKalaText = "👑 วันนี้ตรงกับ **วันอธิบดี** เหมาะแก่การปกครอง สั่งการ\n";
        else if (currentDayOfWeek === kala.ubart) todayKalaText = "⚠️ วันนี้ตรงกับ **วันอุบาทว์** ระวังเรื่องติดขัด หงุดหงิด\n";
        else if (currentDayOfWeek === kala.lokawinat) todayKalaText = "❌ วันนี้ตรงกับ **วันโลกาวินาศ** งดเริ่มการใหญ่!\n";
    }

    if (tone === "casual") {
        outputText += `🌟 ดวงรายวัน แม่นๆ มาแล้วจ้า! 🌟\nประจำ${dateThStr}\n${todayKalaText}เช็คดวงด่วนๆ ก่อนเริ่มวันใหม่กันเลย! 👇\n\n`;
    } else if (tone === "formal") {
        outputText += `📋 คำทำนายดวงชะตารายวัน 📋\nประจำ${dateThStr}\n${todayKalaText.replace(/\*\*|🚩|👑|⚠️|❌/g, '')}ขอให้ทุกท่านประสบพบเจอแต่สิ่งดีงามในวันนี้ครับ\n\n`;
    } else if (tone === "mystic") {
        outputText += `🔮 เปิดชะตาฟ้าลิขิต ฟันธงดวงรายวัน! 🔮\nประจำ${dateThStr}\n${todayKalaText}ชะตากำหนดไว้แล้ว มาดูกันว่าวันนี้ใครรุ่ง ใครต้องระวัง!\n\n`;
    }

    if (type === "day") {
        // วนลูป 7 วัน
        for (let i = 0; i < 7; i++) {
            const dayName = DAYS_LIST[i];
            const dColor = CONTENT_DAY_COLORS[i];
            
            // Seed เฉพาะสำหรับ วันที่ + วันเกิด
            const seed = dateSeedBase + i;
            
            let wText = getRandomFromDB(window.DAILY_FORTUNE_DB.work, seed + 1);
            let fText = getRandomFromDB(window.DAILY_FORTUNE_DB.finance, seed + 2);
            let lText = getRandomFromDB(window.DAILY_FORTUNE_DB.love, seed + 3);

            // ปรับคำตามโทน
            if (tone === "formal") {
                wText = wText.replace(/จ้า|กันเลย|ๆ|✨|💼|🧱|🌟|🗣️|🚶‍♂️|🤝/g, '');
                fText = fText.replace(/💸|💰|💳|📈|⚠️|🎁|🛠️/g, '');
                lText = lText.replace(/❤️|💼|🤐|🌹|✈️|🕵️‍♀️|💖|🕰️|🥰/g, '');
            } else if (tone === "mystic") {
                wText = `ฟันธง! ` + wText;
                fText = `ชะตาการเงิน: ` + fText;
            }

            // สุ่มเลขมงคล 2 ตัว และสีมงคล (ดึงจากอาทิตย์-เสาร์ อิงกาลโยคเทียม)
            const luckyNum1 = Math.floor(seededRandom(seed + 4) * 10);
            const luckyNum2 = Math.floor(seededRandom(seed + 5) * 10);
            // เสริมคำทำนายตามกาลโยคประจำปีของ "วันเกิด" นั้นๆ
            let kalaAddon = "";
            if (kala) {
                if (i === kala.thongChai) kalaAddon = " (ดวงแข็งเป็นพิเศษ เพราะวันเกิดของคุณตกเกณฑ์ 'วันธงชัย' ประจำปี! ทำการใหญ่มีโอกาสสำเร็จสูง)";
                else if (i === kala.athibadi) kalaAddon = " (ดวงมีเกณฑ์ได้เป็นใหญ่ ผู้คนเกรงใจ เพราะตกเกณฑ์ 'วันอธิบดี' ประจำปี)";
                else if (i === kala.ubart) kalaAddon = " (ช่วงนี้ต้องระวังเรื่องหงุดหงิดใจเป็นพิเศษ เพราะวันเกิดตกเกณฑ์ 'วันอุบาทว์' ประจำปี)";
                else if (i === kala.lokawinat) kalaAddon = " (ต้องดำเนินชีวิตด้วยความมีสติ ระวังอุบัติเหตุ เพราะวันเกิดตกเกณฑ์ 'วันโลกาวินาศ' ของปีนี้)";
            }

            outputText += `${dColor} คนเกิดวัน${dayName} ${dColor}\n`;
            if (kalaAddon) outputText += `🔮 ฐานดวงปีนี้: ${kalaAddon}\n`;
            outputText += `💼 การงาน: ${wText}\n`;
            outputText += `💰 การเงิน: ${fText}\n`;
            outputText += `❤️ ความรัก: \n${lText}\n`;

            const luckyColorIdx = Math.floor(seededRandom(seed + 6) * 7);
            const luckyColor = ["แดง", "เหลือง", "ชมพู", "เขียว", "ส้ม", "ฟ้า", "ม่วง", "ขาว", "ดำ"][luckyColorIdx];

            outputText += `🌟 ทริคเสริมดวง: เลขมงคล ${luckyNum1}${luckyNum2} | สีมงคล: ${luckyColor}\n`;
            outputText += `---------------------------------\n\n`;
            
            window.lastGeneratedCards.push({
                type: 'day', icon: dColor, title: dayName, wText, fText, lText, luckyNum1, luckyNum2, luckyColor, kalaAddon
            });
        }
    } else if (type === "zodiac") {
        // วนลูป 12 ราศี
        for (let i = 0; i < 12; i++) {
            const z = ZODIAC_LIST[i];
            const seed = dateSeedBase + i * 10;

            let wText = getRandomFromDB(window.DAILY_FORTUNE_DB.work, seed + 1);
            let fText = getRandomFromDB(window.DAILY_FORTUNE_DB.finance, seed + 2);
            let lText = getRandomFromDB(window.DAILY_FORTUNE_DB.love, seed + 3);

            // ปรับคำตามโทน
            if (tone === "formal") {
                wText = wText.replace(/จ้า|กันเลย|ๆ|✨|💼|🧱|🌟|🗣️|🚶‍♂️|🤝/g, '');
                fText = fText.replace(/💸|💰|💳|📈|⚠️|🎁|🛠️/g, '');
                lText = lText.replace(/❤️|💼|🤐|🌹|✈️|🕵️‍♀️|💖|🕰️|🥰/g, '');
            } else if (tone === "mystic") {
                wText = `ดวงดาวบ่งชี้ว่า ` + wText;
            }

            const luckyNum1 = Math.floor(seededRandom(seed + 4) * 10);
            const luckyNum2 = Math.floor(seededRandom(seed + 5) * 10);

            outputText += `${z.icon} ${z.name} (ธาตุ${z.element})\n`;
            outputText += `💼 งาน: ${wText}\n`;
            outputText += `💰 เงิน: ${fText}\n`;
            outputText += `❤️ รัก: ${lText.replace(/\n/g, ' ')}\n`; // รวมบรรทัดเพื่อความกระชับ
            outputText += `🌟 เลขมงคลพารวย: ${luckyNum1}, ${luckyNum2}\n`;
            outputText += `---------------------------------\n\n`;

            window.lastGeneratedCards.push({
                type: 'zodiac', icon: z.icon, title: z.name, wText, fText, lText, luckyNum1, luckyNum2, luckyColor: "ทอง"
            });
        }
    }

    // Hashtags
    outputText += `อย่าลืมกดไลก์ กดแชร์ เพื่อเป็นสะพานบุญและรับความโชคดีกันนะครับ 🙏✨\n`;
    outputText += `#ดูดวง #ดวงรายวัน #ดวงวันนี้ #สยามโหรามงคล #ดวงแม่นๆ`;

    const resContainer = document.getElementById('genResultContainer');
    const resText = document.getElementById('genResultText');
    
    resText.value = outputText;
    resContainer.style.display = "block";
    
    window.lastGeneratedDateStr = dateThStr;
    window.lastGeneratedType = type;
}

// ============================================
// ฟังก์ชันสร้างและดาวน์โหลดรูปภาพ (html2canvas)
// ============================================

const HEX_COLORS = {
    "🔴": "#E53935", // อาทิตย์
    "🟡": "#FDD835", // จันทร์
    "🩷": "#F48FB1", // อังคาร
    "🟢": "#4CAF50", // พุธ
    "🟠": "#FF9800", // พฤหัส
    "🔵": "#2196F3", // ศุกร์
    "🟣": "#9C27B0", // เสาร์
    "♈": "#D32F2F", "♌": "#D32F2F", "♐": "#D32F2F", // ไฟ
    "♉": "#795548", "♍": "#795548", "♑": "#795548", // ดิน
    "♊": "#607D8B", "♎": "#607D8B", "♒": "#607D8B", // ลม
    "♋": "#0288D1", "♏": "#0288D1", "♓": "#0288D1"  // น้ำ
};

async function downloadSeparateImages() {
    if (!window.lastGeneratedCards || window.lastGeneratedCards.length === 0) return alert('ยังไม่มีข้อมูล กรุณากดสร้างข้อความก่อน');
    if (typeof html2canvas === 'undefined') return alert('กำลังโหลดไลบรารีรูปภาพ กรุณารอสักครู่...');

    const container = document.getElementById('canvasExportArea');
    
    for (let i = 0; i < window.lastGeneratedCards.length; i++) {
        const card = window.lastGeneratedCards[i];
        const bgColor = HEX_COLORS[card.icon] || "#333333";
        
        // HTML ของ 1 รูป (1080x1080)
        container.innerHTML = `
            <div id="exportCard_${i}" style="width: 1080px; height: 1080px; background: linear-gradient(135deg, #111, #000); padding: 60px; font-family: 'Sarabun', sans-serif; box-sizing: border-box; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 20px; background: ${bgColor};"></div>
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 20px; background: ${bgColor};"></div>
                <div style="border: 2px solid #D4AF37; border-radius: 30px; height: 100%; padding: 60px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; background: rgba(0,0,0,0.6);">
                    
                    <div>
                        <h2 style="color: #D4AF37; font-size: 40px; margin-bottom: 10px;">ดวงรายวันประจำวันที่</h2>
                        <h3 style="color: #FFF; font-size: 32px; margin-bottom: 50px;">${window.lastGeneratedDateStr}</h3>
                        
                        <div style="display: flex; align-items: center; justify-content: center; gap: 30px; margin-bottom: 50px;">
                            <span style="font-size: 100px;">${card.icon}</span>
                            <span style="font-size: 80px; color: ${bgColor}; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${card.title}</span>
                        </div>
                        
                        ${card.kalaAddon ? `<div style="background: rgba(212,175,55,0.1); border: 1px solid #D4AF37; color: #D4AF37; padding: 20px; border-radius: 15px; font-size: 28px; margin-bottom: 40px;">${card.kalaAddon}</div>` : ''}
                        
                        <div style="text-align: left; background: rgba(255,255,255,0.05); padding: 40px; border-radius: 20px;">
                            <div style="font-size: 34px; color: #FFF; margin-bottom: 20px;">💼 <strong style="color: #D4AF37;">การงาน:</strong> ${card.wText.substring(0, 45)}...</div>
                            <div style="font-size: 34px; color: #FFF; margin-bottom: 20px;">💰 <strong style="color: #D4AF37;">การเงิน:</strong> ${card.fText.substring(0, 45)}...</div>
                            <div style="font-size: 34px; color: #FFF;">❤️ <strong style="color: #D4AF37;">ความรัก:</strong> ${card.lText.substring(0, 45)}...</div>
                        </div>
                    </div>
                    
                    <div style="font-size: 30px; color: #CCC; margin-top: 40px; border-top: 1px dashed #555; padding-top: 30px;">
                        🌟 เลขมงคล: <span style="color: #D4AF37;">${card.luckyNum1}${card.luckyNum2}</span> | สีมงคล: <span style="color: ${bgColor};">${card.luckyColor}</span>
                        <div style="font-size: 24px; color: #888; margin-top: 20px;">อ่านคำทำนายฉบับเต็มได้ที่แคปชั่น! #สยามโหรามงคล</div>
                    </div>
                </div>
            </div>
        `;

        // รอ DOM วาดเสร็จเล็กน้อย
        await new Promise(r => setTimeout(r, 100));
        
        const el = document.getElementById(`exportCard_${i}`);
        const canvas = await html2canvas(el, { scale: 1 });
        const dataUrl = canvas.toDataURL('image/png');
        
        // โหลด
        const link = document.createElement('a');
        link.download = `ดวงรายวัน_${card.title.replace(/ /g, '')}.png`;
        link.href = dataUrl;
        link.click();
    }
    
    container.innerHTML = '';
}

async function downloadSummaryImage() {
    if (!window.lastGeneratedCards || window.lastGeneratedCards.length === 0) return alert('ยังไม่มีข้อมูล กรุณากดสร้างข้อความก่อน');
    if (typeof html2canvas === 'undefined') return alert('กำลังโหลดไลบรารีรูปภาพ กรุณารอสักครู่...');

    const container = document.getElementById('canvasExportArea');
    const cards = window.lastGeneratedCards;
    
    // คำนวณตาราง (ถ้า 7 วันให้เรียง 2x4, ถ้า 12 ราศีให้เรียง 3x4)
    const isDay = cards.length === 7;
    const cols = isDay ? 2 : 3;
    
    let itemsHtml = '';
    for(let card of cards) {
        const bgColor = HEX_COLORS[card.icon] || "#333333";
        // ย่อข้อความ
        let wShort = card.wText.substring(0, 25) + '...';
        let fShort = card.fText.substring(0, 25) + '...';
        let lShort = card.lText.substring(0, 25) + '...';
        
        itemsHtml += `
            <div style="background: rgba(255,255,255,0.05); border: 1px solid #444; border-radius: 15px; padding: 20px; display: flex; flex-direction: column;">
                <div style="font-size: 32px; font-weight: bold; color: ${bgColor}; margin-bottom: 15px; border-bottom: 1px solid #444; padding-bottom: 10px;">
                    ${card.icon} ${card.title}
                </div>
                <div style="font-size: 22px; color: #FFF; line-height: 1.4;">
                    <div>💼 ${wShort}</div>
                    <div>💰 ${fShort}</div>
                    <div>❤️ ${lShort}</div>
                </div>
                <div style="margin-top: auto; padding-top: 15px; font-size: 20px; color: #D4AF37;">
                    เลข: ${card.luckyNum1}${card.luckyNum2} | สี: ${card.luckyColor}
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div id="exportSummary" style="width: 1080px; min-height: 1080px; background: #111; padding: 40px; font-family: 'Sarabun', sans-serif; box-sizing: border-box;">
            <div style="border: 2px solid #D4AF37; border-radius: 20px; padding: 40px; text-align: center;">
                <style>
                    #exportSummary h2, #exportSummary h3 {
                        background: none !important;
                        -webkit-text-fill-color: currentcolor !important;
                        -webkit-background-clip: border-box !important;
                    }
                </style>
                <h2 style="color: #D4AF37 !important; font-size: 48px; margin-bottom: 10px;">สรุปดวงรายวัน</h2>
                <h3 style="color: #FFF !important; font-size: 32px; margin-bottom: 40px;">${window.lastGeneratedDateStr}</h3>
                
                <div style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 20px; text-align: left;">
                    ${itemsHtml}
                </div>
                
                <div style="margin-top: 40px; font-size: 24px; color: #888;">
                    อ่านคำทำนายแบบเจาะลึก 100% ได้ที่แคปชั่น! #สยามโหรามงคล
                </div>
            </div>
        </div>
    `;

    await new Promise(r => setTimeout(r, 100));
    const el = document.getElementById('exportSummary');
    const canvas = await html2canvas(el, { scale: 1 });
    const dataUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = `สรุปดวงรายวัน_${window.lastGeneratedDateStr}.png`;
    link.href = dataUrl;
    link.click();
    
    container.innerHTML = '';
}

function copyGenResult() {
    const resText = document.getElementById('genResultText');
    resText.select();
    resText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    
    // แจ้งเตือน
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: 'คัดลอกข้อความสำเร็จ!',
            text: 'นำไปโพสต์ลง Facebook หรือช่องทางอื่นได้เลย',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        alert("คัดลอกข้อความสำเร็จ!");
    }
}

window.changeGenDate = function(offset) {
    const input = document.getElementById('genDate');
    if (!input || !input.value) return;
    const date = new Date(input.value);
    date.setDate(date.getDate() + offset);
    input.value = date.toISOString().split('T')[0];
};
