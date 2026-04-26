"use strict";

/**
 * ข้อมูลราศีและคำนิยามลัคนา
 */
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
    { name: "มังกร", icon: "♑", desc: "เป็นคนมีความรับผิดชอบสูง มุ่งมั่นในความสำเร็จ และมีความอดทนเป็นเลิศ" },
    { name: "กุมภ์", icon: "♒", desc: "เป็นคนมีเอกลักษณ์ ชอบอิสระ มีความคิดสร้างสรรค์ และรักพวกพ้อง" },
    { name: "มีน", icon: "♓", desc: "เป็นคนอ่อนไหว มีเมตตา มีจินตนาการสูง และชอบช่วยเหลือผู้อื่น" }
];

/**
 * ฟังก์ชันหลัก: คำนวณลัคนาราศี
 */
function calculateAscendant() {
    const dateInput = document.getElementById('ascBirthDate');
    const timeInput = document.getElementById('ascBirthTime');
    const resDiv = document.getElementById('ascendantResult');

    if (!dateInput || !dateInput.value || !timeInput || !timeInput.value) {
        alert("กรุณาระบุวันเกิดและเวลาเกิดให้ครบถ้วนครับ");
        return;
    }

    const [hours, mins] = timeInput.value.split(':').map(Number);
    const totalMinutes = (hours * 60) + mins;

    /**
     * คำนวณหาลัคนาแบบประมาณการ (อิงตามเวลาเกิดมาตรฐาน)
     * ลำดับราศีเริ่มที่ เมษ (06:00-07:59 โดยประมาณ)
     */
    let adjustedMinutes = totalMinutes - 360; // เริ่มนับจาก 06:00 น.
    if (adjustedMinutes < 0) adjustedMinutes += 1440; // กรณีเกิดหลังเที่ยงคืน

    // ราศีหนึ่งใช้เวลาประมาณ 120 นาที (2 ชม.)
    let zodiacIndex = Math.floor(adjustedMinutes / 120);
    zodiacIndex = Math.min(Math.max(zodiacIndex, 0), 11); // คุมให้อยู่ใน 0-11
    generateHouseTable(zodiacIndex); // <--- เพิ่มบรรทัดนี้

    const result = ZODIAC_DATA[zodiacIndex];
    displayAscendantResult(result);
}

/**
 * ฟังก์ชันสร้างตารางภพเรือน 12 ภพ
 * @param {number} startZodiacIndex - ดัชนีราศีที่เป็นลัคนา (0-11)
 */
function generateHouseTable(startZodiacIndex) {
    const tableBody = document.getElementById('houseTableBody');
    if (!tableBody) return;

    const houseNames = [
        "ตนุ (ตัวตน)", "กดุมพะ (การเงิน)", "สหัชชะ (สังคม)", 
        "พันธุ (ครอบครัว)", "ปุตตะ (บุตร/บริวาร)", "อริ (อุปสรรค)", 
        "ปัตนิ (คู่ครอง)", "มรณะ (ความสูญเสีย)", "ศุภะ (ความสุข/ความสำเร็จ)", 
        "กัมมะ (การงาน)", "ลาภะ (โชคลาภ)", "วินาศ (ความลับ/เบื้องหลัง)"
    ];

    let html = '';
    for (let i = 0; i < 12; i++) {
        // คำนวณราศีที่เวียนไปตามภพเรือน
        const currentZodiacIndex = (startZodiacIndex + i) % 12;
        const zodiac = ZODIAC_DATA[currentZodiacIndex];

        html += `
            <tr>
                <td class="text-gold">${houseNames[i]}</td>
                <td>${zodiac.icon} ราศี${zodiac.name}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = html;
}

/**
 * แสดงผลลัพธ์ลงบนหน้าจอ
 */
function displayAscendantResult(data) {
    const resDiv = document.getElementById('ascendantResult');
    const signEl = document.getElementById('ascSign');
    const iconEl = document.getElementById('ascIcon');
    const descEl = document.getElementById('ascDesc');

    if (!resDiv) return;

    if (signEl) signEl.innerText = `ลัคนาราศี${data.name}`;
    if (iconEl) iconEl.innerText = data.icon;
    if (descEl) descEl.innerText = data.desc;

    resDiv.style.display = 'block';
    resDiv.classList.add('animate__animated', 'animate__fadeIn');
    
    // เลื่อนหน้าจอไปที่ผลลัพธ์
    resDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * บันทึกรูปภาพผลลัพธ์ (Capture)
 */
async function saveAscendantImg() {
    if (typeof html2canvas === "undefined") {
        alert("ระบบไม่พบ Library สำหรับสร้างภาพ");
        return;
    }

    const captureArea = document.getElementById('ascendantResult');
    if (!captureArea || captureArea.style.display === 'none') {
        alert("กรุณาคำนวณลัคนาก่อนบันทึกภาพครับ");
        return;
    }

    // เตรียมปุ่มแชร์เพื่อซ่อน
    const saveButton = document.querySelector('.btn-outline-gold');
    const originalDisplay = saveButton ? saveButton.style.display : '';

    if (saveButton) saveButton.style.display = 'none';

    try {
        const canvas = await html2canvas(captureArea, {
            backgroundColor: '#000000',
            scale: 2,
            useCORS: true,
            logging: false,
            onclone: (clonedDoc) => {
                // ปรับแต่ง UI ใน Clone ก่อนถ่ายภาพให้ดูสวยงาม
                const clonedArea = clonedDoc.getElementById('ascendantResult');
                if (clonedArea) {
                    clonedArea.style.padding = '30px';
                    clonedArea.style.border = '2px solid #d4af37';
                    clonedArea.style.borderRadius = '15px';
                }
            }
        });

        const imageData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        
        const zodiacName = document.getElementById('ascSign')?.innerText.replace('ลัคนาราศี', '') || 'Zodiac';
        downloadLink.download = `ลัคนา_ราศี${zodiacName}.png`;
        downloadLink.click();

    } catch (error) {
        console.error("Capture Error:", error);
        alert("ไม่สามารถบันทึกภาพได้ โปรดลองอีกครั้ง");
    } finally {
        if (saveButton) saveButton.style.display = originalDisplay;
    }
}

// ผูกฟังก์ชันเข้ากับ DOM
document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('btnCalculateAsc');
    if (calcBtn) calcBtn.addEventListener('click', calculateAscendant);
});