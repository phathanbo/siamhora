"use strict";

/**
 * Logic: ฉัตร 9 ชั้น (ตำราหลวงทรงพล)
 * พัฒนาโดย: สยามโหรามงคล (ประธานโบ้)
 * อ้างอิง: ข้อมูลจากภาพหน้า 7-21 (นับเริ่มจากฐานวันเกิด)
 */

// 1. ลำดับการเดินตัวเลขฉัตร 9 ชั้น (ผังยันต์หน้า 8)
const chatraSequence = [1, 9, 2, 3, 4, 7, 5, 8, 6];

// 2. ข้อมูลเทพเจ้าและฝอยพยากรณ์แบบเต็ม (ถอดจากตำราหน้า 16-17)
const chatra9FullData = {
    1: { name: "สีหะโฉลก", god: "พระสุริยเทพ (ทรงพญาราชสีห์)", style: "glow-red", color: "#ff4d4d", desc: "แหล่งอิสาณ มักพาลผิดพ้องญาติ เกิดอาฆาตอัคคีภัย โลหิตไหลจากตน หนหน่ายกลบีทา กัดวัดถาแพรพรรณ์ วัตถุอันใดประหยัด เร่งระมัดจงดี" },
    9: { name: "สิทธิโชคนาโค", god: "พระเกตุบดีเทพ (ทรงนาคราช)", style: "glow-gold", color: "#d4af37", desc: "มัชฌิมภาค ลาภทุกข์ยากกล่าวทาย เป็นแต่ร้ายกึ่งดี ตลอดปีโชคอับ ครุ่นคิดคับใจครัน" },
    2: { name: "จันโทบูรพา", god: "พระโสมบดี (ทรงม้าขาว)", style: "glow-gold", color: "#d4af37", desc: "ภิมิบอก ตะวันออกร้ายมาก เกิดความเพราะปากเอง เป็นขี้เกรงจะสึก คฤหัสถ์นึกอยากบวช เจ็บปวดบาดแผลหาย แต่จะได้ดังความคิด เหตุบัณฑิตนารี มีศัตรูมาเป็นมิตร พาดผูกผิดให้โทษ ชายโหดผมหยิกหยอง หญิงอะล่องเหลืองขาว ทำให้เราข้องขุ่นอย่าหมกมุ่นคบหา" },
    3: { name: "มหิงษาภัยพิพิธ", god: "พระอังคารบดี (ทรงควาย)", style: "glow-red", color: "#ff4d4d", desc: "ประจำทิศอาคเณย์ โรคประเดเคืองเข็ญ เป็นทั้งในและนอก กับลาภงอกได้เมีย สินทรัพย์เสียก่ายกอง ริปูปองปรับทัณฑ์ ชายโสดพรรณพร่างสี่ หญิงอัปรีย์พิการ ทรัพย์สินทานเร่งรู้ อย่าให้กู้เกิดเข็ญ" },
    4: { name: "คชสิทธิชัยโย", god: "พระพุทธาธิบดี (ทรงช้าง)", style: "glow-green", color: "#28a745", desc: "เด่นแดนใต้ ห้ามมิให้กินเนื้อนก จักร้อนอกเจ็บท้อง หากความพ้องเราชนะ ลาภสการไกวลด พิพัฒน์ผลโสภี" },
    7: { name: "พยัคโฆภัยหลาก", god: "พระโสธรบดีเทพ (ทรงเสือ)", style: "glow-orange", color: "#ffa500", desc: "มีหรดีถิ่นเนา เกรงภัยเผาพอกตน ประหยัดสินจงหนัก เสียของรักยุ่งใหญ่ เหตุมูลนายเพื่อนฝูง ร้ายถลุงหลายทิศ อย่าเดินทางผิดเวลา ลาภตาส่ำมากมี" },
    5: { name: "มฤคมากลาภหลาย", god: "พระวิหับดีเทพ (ทรงกวาง)", style: "glow-gold", color: "#d4af37", desc: "ประจิมทิศถิ่น สวัสดีภิญโญทรัพย์ มั่งคับอักขู ทั้งผู้ใหญ่และบัณฑิต ทั้งบรรพชิตพราหมณา มากเมตตาดีครัน" },
    8: { name: "สุวรรณภัยพอกสิง", god: "พระราหูเทพ (ทรงครุฑ)", style: "glow-orange", color: "#ffa500", desc: "พายัพอิงแอบเนา จิตต์ร้อนเร่าวายวุ่น คิดข้องขุ่นผิดเป็นชอบ ทิ้งระบอบแบบแผน ความเก่าเล่นติดตน" },
    6: { name: "อุศุภอิงแอบลาภ", god: "พระศุกร์ (ทรงวัว)", style: "glow-blue", color: "#007bff", desc: "หนอุดร สถาพรโภคผล ระวังคนจงมาก ระวังปากจงดี อย่าสู่ความเขา เราจะเกิดร้อนรน อย่าเดินหนผิดกาล ภัยจักพาลติดตน" }
};

function calculateChatnine() {
    // ดึงค่าจาก ID ตาม HTML ล่าสุดของคุณ
    const ageInput = document.getElementById('chatranineAge');
    const birthDayInput = document.getElementById('chatraninebirthDaySelect');
    
    if (!ageInput || !birthDayInput) {
        console.error("หาองค์ประกอบ HTML ไม่เจอ ตรวจสอบ ID อีกครั้ง");
        return;
    }

    const age = parseInt(ageInput.value);
    const startDay = parseInt(birthDayInput.value); // ค่าเลขวันเกิด (1-7)

    if (!age || age <= 0) {
        alert("กรุณากรอกอายุย่างของท่าน");
        return;
    }

    // 1. สูตรหาจำนวนก้าว (หน้า 9): (อายุ - 1) % 9
    let steps = (age - 1) % 9;

    // 2. หาตำแหน่งเริ่มต้นในยันต์ตามวันเกิด (หน้า 10)
    let startIndex = chatraSequence.indexOf(startDay);
    
    // 3. นับเวียนไปตามจำนวนก้าว (ถ้าเศษ 0 จะได้ก้าวเดิม)
    let finalIndex = (startIndex + steps) % 9;
    let finalNumber = chatraSequence[finalIndex];

    const result = chatra9FullData[finalNumber];

    // 4. การแสดงผล UI
    const display = document.getElementById('chatranineDisplay');
    const tierName = document.getElementById('tier1Text'); 
    const predictionText = document.getElementById('chatraLongPrediction');
    const mainTier = document.getElementById('tier1');

    if (display && result) {
        // อัปเดตกราฟิกฉัตร
        mainTier.className = `chatra-tier ${result.style}`;
        tierName.innerText = result.name;
        tierName.style.color = result.color;
        
        // อัปเดตเนื้อหาคำทำนาย
        predictionText.innerHTML = `
            <div class="mb-3">
                <span class="badge bg-gold text-dark p-2" style="font-size: 1rem;">
                    💠 ${result.god}
                </span>
            </div>
            <div class="text-white fw-light" style="line-height: 1.8;">
                ${result.desc}
            </div>
        `;

        // แสดงผลด้วย Animation
        $(display).fadeIn(600);
        
        // เลื่อนหน้าจอไปที่ผลลัพธ์
        display.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ฟังก์ชันสำหรับบันทึกภาพ (ปรับแต่งให้สวยงาม)
function downloadChatnineImage() {
    const displayElement = document.getElementById('chatranineDisplay');
    if (!displayElement) return;

    html2canvas(displayElement, {
        backgroundColor: "#121212",
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `สยามโหรามงคล_ฉัตร9ชั้น_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}