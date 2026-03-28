"use strict";
const TAKSA_MASTER = [
    { id: 0, name: "อาทิตย์", color: "#e63946", icon: "fa-sun" },
    { id: 1, name: "จันทร์", color: "#ffb703", icon: "fa-moon" },
    { id: 2, name: "อังคาร", color: "#ff85a1", icon: "fa-fire" },
    { id: 3, name: "พุธ", color: "#2a9d8f", icon: "fa-book-open" },
    { id: 4, name: "เสาร์", color: "#7209b7", icon: "fa-mountain" },
    { id: 5, name: "พฤหัสบดี", color: "#f4a261", icon: "fa-star" },
    { id: 6, name: "ศุกร์", color: "#a2d2ff", icon: "fa-heart" },
    { id: 7, name: "ราหู", color: "#495057", icon: "fa-dragon" }
];

const DIRECTION_MASTER = ["ตะวันออกเฉียงเหนือ", "ตะวันออก", "ตะวันออกเฉียงใต้", "ใต้", "ตะวันตกเฉียงใต้", "ตะวันตก", "ตะวันตกเฉียงเหนือ", "เหนือ"];

// คำทำนายจัดเต็ม + สวยงาม
const TAKSA_DETAILED_MEANINGS = {
    "บริวาร": {
        title: "บริวาร (คนรอบกาย · สายสัมพันธ์ · ผู้ติดตาม)",
        summary: "ผู้คนที่อยู่เคียงข้าง ครอบครัว ลูกหลาน คู่ครอง เพื่อนสนิท ลูกน้อง คนที่ต้องอุปการะเลี้ยงดู เป็นภาพสะท้อนความสัมพันธ์และการเป็นที่พึ่งพิงในชีวิต",
        positive: "คนรอบตัวภักดี เกื้อกูล ครอบครัวอบอุ่น ลูกหลานกตัญญู มีคนคอยหนุนหลังทั้งในยามทุกข์และสุข เป็นที่รักใคร่ของผู้ใต้บังคับบัญชา ทีมงานจงรักภักดี",
        negative: "ความขัดแย้งในครอบครัว เพื่อนหักหลัง ลูกน้องทรยศ ญาติพี่น้องไม่ลงรอย ถูกคนใกล้ชิดเอาเปรียบหรือนินทาเบื้องหลัง",
        realLifeExamples: [
            "ลูกน้องทำงานด้วยใจ จนโปรเจกต์ประสบความสำเร็จเกินคาด",
            "คู่ครอง/ลูกหลานเป็นกำลังใจสำคัญ ช่วยเหลือครอบครัวในยามลำบาก",
            "ถูกเพื่อนสนิทหักหลังจนเสียหายทั้งชื่อเสียงและทรัพย์สิน",
            "ลูกน้องไม่ภักดี นำปัญหามาสร้างความเดือดร้อน ต้องเปลี่ยนทีมงานใหม่"
        ],
        advice: "ทำบุญอุทิศส่วนกุศลให้ญาติผู้ใหญ่ที่ล่วงลับ สร้างสัมพันธภาพด้วยการเอาใจใส่ ไหว้พระขอพรให้ครอบครัวอยู่เย็นเป็นสุข บริจาคอาหารให้คนยากไร้และสัตว์",
        lucky: { color: "ชมพู/แดง", number: "6, 15", direction: "ทิศใต้" }
    },
    "อายุ": {
        title: "อายุ (สุขภาพกายใจ · อายุยืน · พลังชีวิต)",
        summary: "สุขภาพร่างกาย ความแข็งแรง พลังชีวิต ความเป็นอยู่ประจำวัน รวมถึงอายุขัยและความสมดุลระหว่างกาย-ใจ",
        positive: "สุขภาพแข็งแรง อายุยืนยาว พลังงานดี ไม่เจ็บป่วยรุนแรง ชีวิตเรียบง่ายแต่สุขกายสบายใจ มีวินัยดูแลตนเองดีเยี่ยม",
        negative: "เจ็บป่วยบ่อย โรคเรื้อรังกำเริบ อายุอาจสั้นกว่าที่ควร เกิดอุบัติเหตุซ้ำซาก สุขภาพจิตแปรปรวน หมดเรี่ยวแรง",
        realLifeExamples: [
            "สุขภาพดีตลอดปี วิ่งมาราธอนได้สบาย ๆ อายุยืนแบบปู่ย่าถึง 90+",
            "ป่วยเรื้อรัง เช่น เบาหวาน-ความดัน ต้องนอนโรงพยาบาลบ่อยครั้ง",
            "เกิดอุบัติเหตุเล็กน้อยซ้ำ ๆ จนต้องพักงานนานและเสียค่าใช้จ่ายมาก",
            "สุขภาพจิตแย่ ซึมเศร้า วิตกกังวล ชีวิตไม่มีความสุขแม้ร่างกายไม่ป่วย"
        ],
        advice: "ออกกำลังกายสม่ำเสมอ กินอาหารครบหมู่ ทำบุญปล่อยสัตว์ บริจาคเลือด สวดมนต์บทอายุวัฒนะ ไหว้พระขอพรอายุยืนยาว",
        lucky: { color: "เขียว/ฟ้า", number: "4, 7", direction: "ทิศเหนือ" }
    },
    "เดช": {
        title: "เดช (บารมี · อำนาจวาสนา · ชื่อเสียง)",
        summary: "บารมี อำนาจ ความยำเกรง ชื่อเสียงเกียรติยศ วาสนาเก่าที่สะสมมา เป็นสิ่งที่ทำให้คนเกรงใจและยอมรับ",
        positive: "บารมีสูง คนเกรงขาม ได้รับการยอมรับ เลื่อนยศเลื่อนตำแหน่ง ชื่อเสียงดี เป็นผู้นำโดยธรรมชาติ มีผู้ใหญ่ยกย่อง",
        negative: "บารมีเสื่อม ถูกหมิ่นเหม่า อำนาจลดลง ถูกใส่ร้ายป้ายสี เสื่อมเสียชื่อเสียง ตำแหน่งสั่นคลอน ถูกกดทับ",
        realLifeExamples: [
            "ได้เลื่อนตำแหน่งกะทันหัน คนเกรงใจขึ้นอย่างเห็นได้ชัด",
            "ได้รับรางวัลหรือเกียรติยศจากสังคม/องค์กร",
            "ถูกใส่ร้ายจนเสียชื่อเสียง โดนย้ายตำแหน่งหรือถูกตรวจสอบ",
            "สูญเสียอำนาจการตัดสินใจ ถูกเบียดเบียนจากผู้ใหญ่หรือคู่แข่ง"
        ],
        advice: "ทำบุญใหญ่ ปล่อยนกปล่อยปลา บริจาคให้วัด สร้างเจดีย์ ไหว้ครูบาอาจารย์ ขอพรจากผู้ใหญ่ สวมเครื่องประดับเสริมบารมี (พระ, หยก, ทองคำ)",
        lucky: { color: "แดง/ทอง", number: "1, 9", direction: "ทิศตะวันออก" }
    },
    "ศรี": {
        title: "ศรี (โชคลาภ · สิริมงคล · เสน่ห์ · ความรุ่งเรือง)",
        summary: "โชคลาภเงินทอง ความสำเร็จ สิริมงคล เสน่ห์เมตตามหานิยม ความงาม ความสุข ความสมบูรณ์พูนผล",
        positive: "โชคลาภมหาศาล ได้ลาภลอย ธุรกิจรุ่งเรือง มีเสน่ห์แรง คนเอ็นดูนิยม สิ่งที่หวังสมหวัง ชีวิตสุขสบาย",
        negative: "ขาดโชค เสียเงิน เสียของ เสน่ห์ตก ความงามลดลง ชีวิตขาดความสุข สิ่งดี ๆ ที่หวังมักไม่สมหวัง",
        realLifeExamples: [
            "ถูกหวยก้อนโต หรือได้โบนัส/เงินรางวัลไม่คาดฝัน",
            "ขายของออนไลน์ยอดพุ่ง คนนิยมมากจนสินค้าขาดตลาด",
            "ลงทุนผิดพลาด เสียเงินก้อนใหญ่ หรือซื้อของแล้วของปลอม",
            "เสน่ห์ตก คนไม่ค่อยเอ็นดู ความรักหรือหน้าที่การงานสะดุด"
        ],
        advice: "ทำบุญตักบาตรเที่ยงวัน สวดบทชินบัญชร บริจาคของใช้ให้คนยากไร้ ปลูกต้นไม้ทำบุญ สวมใส่สีมงคลประจำวัน (ชมพู/ฟ้า)",
        lucky: { color: "ชมพู/ม่วง", number: "6, 15", direction: "ทิศใต้" }
    },
    "มูละ": {
        title: "มูละ (หลักฐาน · มรดก · ความมั่นคง · ที่อยู่อาศัย)",
        summary: "ฐานะมั่นคง มรดก ทรัพย์สินเดิม ที่ดิน บ้านเรือน ความมั่นคงทางการเงินและชีวิต",
        positive: "ฐานะมั่นคง ได้มรดกตกทอด ที่ดิน/บ้านราคาขึ้น ทรัพย์สินเพิ่มพูน ไม่โยกย้ายบ่อย ชีวิตมั่นคงยั่งยืน",
        negative: "เสียหลักฐาน เสียทรัพย์เดิม บ้านชำรุด มรดกมีปัญหา ฐานะสั่นคลอน ถูกยึดทรัพย์หรือมีปัญหาเอกสาร",
        realLifeExamples: [
            "ได้มรดกบ้าน/ที่ดิน หรือซื้อบ้านแล้วราคาพุ่งสูงในไม่กี่ปี",
            "ฐานะมั่นคง ไม่ต้องย้ายที่อยู่บ่อย ชีวิตราบรื่น",
            "บ้านทรุดโทรม ต้องเสียเงินซ่อมแซมก้อนโต หรือมีปัญหาเอกสารที่ดิน",
            "ถูกยึดทรัพย์บางส่วน หรือมรดกจากญาติมีปัญหาคดีความ"
        ],
        advice: "ทำบุญสร้างวัด บริจาคที่ดินให้วัด ปลูกต้นไม้ใหญ่ ไหว้พระที่บ้าน สร้างกองทรายทำบุญ",
        lucky: { color: "เขียว/น้ำตาล", number: "4, 5", direction: "ทิศตะวันตกเฉียงเหนือ" }
    },
    "อุตสาหะ": {
        title: "อุตสาหะ (ความขยัน · ความพยายาม · ผลงานด้วยน้ำพักน้ำแรง)",
        summary: "ความขยัน อดทน มานะพากเพียร งานที่ทำด้วยน้ำพักน้ำแรง ความสำเร็จจากการต่อสู้ด้วยตนเอง",
        positive: "ขยัน อดทน งานสำเร็จด้วยน้ำพักน้ำแรง ได้ผลตอบแทนคุ้มค่า ความพยายามนำมาซึ่งความสำเร็จใหญ่หลวง",
        negative: "ขี้เกียจ งานไม่สำเร็จ เหนื่อยแต่ไม่เห็นผล หมดกำลังใจ เรียนไม่จบ งานสะดุดขาดตอน",
        realLifeExamples: [
            "เปิดร้านแล้วลูกค้าแน่น จากความขยันและทุ่มเท",
            "เรียนจบด้วยเกียรตินิยม จากการตั้งใจจริงและไม่ยอมแพ้",
            "ทุ่มเทเต็มที่แต่เงินเดือนไม่ขึ้น งานสะดุดหรือถูกเลิกจ้าง",
            "เหนื่อยมากแต่ผลลัพธ์ไม่เป็นอย่างหวัง หมดไฟในการทำงาน"
        ],
        advice: "ทำบุญด้วยแรงกาย เช่น กวาดวัด ล้างพื้น ช่วยงานบุญ สวดมนต์บทอิติปิโส บริจาคแรงงาน",
        lucky: { color: "ส้ม/แดง", number: "3, 8", direction: "ทิศตะวันออกเฉียงใต้" }
    },
    "มนตรี": {
        title: "มนตรี (ผู้ใหญ่ · ที่ปรึกษา · เจ้านาย · ผู้ปกป้อง)",
        summary: "ผู้ใหญ่ ที่ปรึกษา เจ้านาย ผู้มีอำนาจที่ให้การอุปถัมภ์ ค้ำชู เป็นที่พึ่งพิงในยามลำบาก",
        positive: "มีผู้ใหญ่ค้ำชู เจ้านายดี ได้รับการอุปถัมภ์ มีที่ปรึกษาที่เฉลียวฉลาด ช่วยให้ผ่านพ้นวิกฤตได้",
        negative: "ขาดผู้ใหญ่ช่วย เจ้านายไม่ดี ถูกกดทับ ถูกหักหลังจากคนที่ไว้ใจ โดนเบียดเบียนจนต้องลาออก",
        realLifeExamples: [
            "ได้เจ้านายดี คอยหนุนหลังจนเลื่อนตำแหน่งเร็ว",
            "มีที่ปรึกษาช่วยผ่านวิกฤตธุรกิจหรือปัญหาชีวิตได้",
            "เจ้านายกดทับ ถูกเบียดเบียนจนต้องลาออกหรือย้ายงาน",
            "ขาดคนค้ำชู ต้องต่อสู้ด้วยตัวคนเดียวจนเหนื่อยล้า"
        ],
        advice: "ไหว้ครูบาอาจารย์ ทำบุญกับผู้ใหญ่ในครอบครัว สวดมนต์บทพระพุทธคุณ บริจาคหนังสือธรรมะ",
        lucky: { color: "เหลือง/ส้ม", number: "5, 1", direction: "ทิศตะวันออกเฉียงเหนือ" }
    },
    "กาลกิณี": {
        title: "กาลกิณี (เคราะห์ร้าย · อุปสรรคใหญ่ · สิ่งอัปมงคล)",
        summary: "สิ่งอัปมงคล อุปสรรค เคราะห์ซ้ำซ้อน ปัญหาที่ทำให้ชีวิตสะดุดหรือเสียหายรุนแรง",
        positive: "เมื่อผ่านพ้นกาลกิณีแล้ว มักเกิดการเปลี่ยนแปลงครั้งใหญ่ไปในทางที่ดี (ตายแล้วเกิดใหม่) ชีวิตพลิกผันดีขึ้นอย่างก้าวกระโดด",
        negative: "เคราะห์ร้ายรุมเร้า เสียหายทั้งเงินทอง ชื่อเสียง สุขภาพ ถูกขโมย ถูกหักหลัง เกิดคดีความ อุบัติเหตุใหญ่ ชีวิตตกต่ำ",
        realLifeExamples: [
            "หลังหย่ากลับมาเจอคู่แท้ ชีวิตดีขึ้นอย่างน่าอัศจรรย์",
            "หลังล้มละลายแล้วสร้างธุรกิจใหม่จนร่ำรวยกว่าเดิม",
            "โดนขโมยรถ/ทรัพย์สิน ถูกหักหลังหนัก หรือป่วยต้องผ่าตัดใหญ่",
            "เกิดคดีความ อุบัติเหตุรุนแรง หรือปัญหาต่อเนื่องหลายเดือน"
        ],
        advice: "ทำพิธีแก้เคล็ดหนัก ๆ (บุญ 9 วัด, สวดชินบัญชร 108 จบ, ปล่อยสัตว์น้ำจำนวนมาก) หลีกเลี่ยงเริ่มงานใหญ่ ทำบุญอุทิศส่วนกุศลให้สิ่งศักดิ์สิทธิ์และวิญญาณ",
        lucky: { color: "ดำ/เทา (หลีกเลี่ยง)", number: "หลีกเลี่ยงเลขคู่", direction: "หลีกเลี่ยงทิศกาลกิณี" }
    }
};

function showTaksaPage() {
    navigateTo('taksaPage');
    resetTaksa();
}

function getPhumiMeaning(type) {
    const meanings = {
        boriwan: "บริวาร: ส่งผลถึงคนรอบข้าง ครอบครัว บุตร บริวาร และผู้ใต้บังคับบัญชา",
        ayu: "อายุ: ส่งผลถึงสุขภาพร่างกาย วิถีชีวิต และความเป็นอยู่ปกติสุข",
        det: "เดช: ส่งผลถึงอำนาจ วาสนา บารมี ชื่อเสียง และความยำเกรง",
        sri: "ศรี: ส่งผลถึงโชคลาภ เงินทอง สิริมงคล ความสำเร็จ และเมตตามหานิยม",
        moola: "มูละ: ส่งผลถึงมรดก ทรัพย์สิน ความมั่นคง และหลักฐานบ้านเรือน",
        utsaha: "อุตสาหะ: ส่งผลถึงความขยัน ความพยายาม และความสำเร็จจากน้ำพักน้ำแรง",
        montri: "มนตรี: ส่งผลถึงความอุปถัมภ์ค้ำชูจากผู้ใหญ่และผู้มีอำนาจ",
        kalakini: "กาลกิณี: สิ่งอัปมงคล อุปสรรค ปัญหา และสิ่งที่ควรหลีกเลี่ยงเป็นพิเศษ"
    };
    return meanings[type] || "";
}

function getDetailedPredict(id) {
    const database = {
        0: { // อาทิตย์
            power: "เกียรติยศเด่นชัด มีออร่าดั่งพญาราชสีห์",
            work: "มีโอกาสได้เลื่อนตำแหน่ง หรือได้รับโปรเจกต์ใหญ่ที่สร้างชื่อเสียง",
            wealth: "เงินทองมาพร้อมกับบารมี ยิ่งให้ยิ่งได้รับคืน",
            love: "คนโสดจะเจอคนโปรไฟล์ดีเข้ามาหา คนมีคู่จะส่งเสริมบารมีกัน",
            remedy: "ถวายหลอดไฟ หรือร่วมทำบุญเกี่ยวกับแสงสว่างเพื่อแก้เคล็ด"
        },
        1: { // จันทร์
            power: "เสน่ห์เมตตามหานิยม มีคนเอ็นดูอุปถัมภ์",
            work: "งานบริการหรืองานประสานงานจะรุ่งเรืองมาก ผู้ใหญ่จะหยิบยื่นโอกาสทอง",
            wealth: "ไหลมาดั่งสายน้ำ ไม่ขาดมือแต่ต้องระวังเรื่องอารมณ์ในการใช้เงิน",
            love: "มีความเข้าใจกันมากขึ้น เป็นปีที่เหมาะแก่การเริ่มต้นชีวิตคู่",
            remedy: "บริจาคค่าน้ำ หรือร่วมสร้างห้องน้ำวัด เสริมดวงการเงินให้ลื่นไหล"
        },
        2: { // อังคาร
            power: "พลังขับเคลื่อนมหาศาล เอาชนะอุปสรรคทั้งปวงได้",
            work: "งานที่ต้องแข่งขันหรือบุกเบิกจะสำเร็จลุล่วงด้วยความเพียร",
            wealth: "ลาภลอยจากการเสี่ยงโชคหรือความกล้าได้กล้าเสีย",
            love: "ความสัมพันธ์คึกคัก มีไฟในการสร้างอนาคตร่วมกัน",
            remedy: "บริจาคเลือด หรือร่วมทำบุญกับโรงพยาบาลทหารผ่านศึก"
        },
        3: { // พุธ
            power: "วาจาเป็นประกาศิต เจรจาสิ่งใดเป็นเงินเป็นทอง",
            work: "การค้าขายออนไลน์ การเจรจาธุรกิจต่างแดนจะสัมฤทธิ์ผล",
            wealth: "กำไรจากการลงทุนระยะสั้นโดดเด่นมาก",
            love: "การสื่อสารคือหัวใจหลักปีนี้ ยิ่งพูดดียิ่งรักกันมาก",
            remedy: "ร่วมพิมพ์หนังสือสวดมนต์ หรือบริจาคอุปกรณ์การศึกษา"
        },
        4: { // เสาร์
            power: "ความอดทนคืออาวุธ มั่นคงดั่งขุนเขา",
            work: "งานอสังหาริมทรัพย์หรืองานโปรเจกต์ระยะยาวจะผลิดอกออกผล",
            wealth: "เก็บเล็กผสมน้อยจนเป็นเงินก้อนใหญ่ เป็นปีแห่งการสะสมทรัพย์",
            love: "รักที่มั่นคง ต้องอาศัยเวลาและความเข้าใจลึกซึ้ง",
            remedy: "ร่วมทำบุญสร้างอุโบสถ หรือถวายกระเบื้องมุงหลังคาวัด"
        },
        5: { // พฤหัสบดี
            power: "ปัญญาคือแสงสว่าง มีเทวดาคุ้มครองดวงชะตา",
            work: "ผลงานทางวิชาการ หรือการสอบแข่งขันจะได้รับชัยชนะเด็ดขาด",
            wealth: "ลาภผลจากผู้ใหญ่ที่เคารพรัก หรือมรดกตกทอด",
            love: "คู่ครองจะนำพาความเจริญมาให้ มีเกณฑ์ได้บุตรมงคล",
            remedy: "จัดสังฆทานด้วยอาหารดีๆ หรือร่วมเป็นเจ้าภาพบวชพระ"
        },
        6: { // ราหู
            power: "ปฏิภาณไหวพริบยอดเยี่ยม พลิกวิกฤตเป็นโอกาส",
            work: "งานเบื้องหลัง หรืองานที่เกี่ยวข้องกับต่างชาติจะประสบความสำเร็จสูง",
            wealth: "เงินทองเข้าเร็วเคลมเร็ว มีลาภก้อนโตจากคนทางไกล",
            love: "ความรักที่ตื่นเต้นท้าทาย แต่อย่าหลงลืมสติในการใช้ชีวิต",
            remedy: "ไหว้พระราหูด้วยของดำ หรือบริจาคเงินให้มูลนิธิคนตาบอด"
        },
        7: { // ศุกร์
            power: "สุนทรียภาพและความสุข บันดาลทรัพย์ด้วยรอยยิ้ม",
            work: "วงการบันเทิง ความงาม หรือศิลปะจะรุ่งเรืองถึงขีดสุด",
            wealth: "รายได้สะพัดจากการใช้ความคิดสร้างสรรค์",
            love: "เสน่ห์ล้นเหลือ เป็นปีที่หัวใจจะเบ่งบานดั่งดอกไม้",
            remedy: "ถวายดอกไม้หอมพระประธาน หรือร่วมบุญวิวาห์มงคล"
        }
    };
    return database[id];
}

function getStarNature(id) {
    const natures = {
        0: { title: "อาทิตย์", trait: "เน้นเกียรติยศ ความเป็นผู้นำ และการปรากฏตัวต่อสังคม (ดั่งราชา)" },
        1: { title: "จันทร์", trait: "เน้นการดูแลเอาใจใส่ ความอ่อนโยน และการใช้อารมณ์ความรู้สึก (ดั่งราชินี)" },
        2: { title: "อังคาร", trait: "เน้นความขยัน การบุกเบิก พละกำลัง และการเอาชนะอุปสรรค (ดั่งนักรบ)" },
        3: { title: "พุธ", trait: "เน้นการสื่อสาร การเจรจา ปัญญาไหวพริบ และการค้าขาย (ดั่งพ่อค้า/ทูต)" },
        4: { title: "เสาร์", trait: "เน้นความอดทน ทรัพย์สินก้อนใหญ่ และการวางแผนระยะยาว (ดั่งกสิกร)" },
        5: { title: "พฤหัสบดี", trait: "เน้นความถูกต้อง ปัญญาทางวิชาการ และความเมตตาจากผู้ใหญ่ (ดั่งครูบาอาจารย์)" },
        6: { title: "ราหู", trait: "เน้นความพลิกแพลง ไหวพริบในเงามืด และการเปลี่ยนแปลงที่รวดเร็ว (ดั่งนักเลง)" },
        7: { title: "ศุกร์", trait: "เน้นความสุข ความบันเทิง ศิลปะ และโชคลาภทางการเงิน (เปรียบดั่งเศรษฐี)" }
    };
    return natures[id] || { title: "", trait: "" };
}

// ฟังก์ชันสร้าง HTML การ์ดสำหรับแต่ละภูมิ
// ฟังก์ชันสร้างการ์ดแต่ละภูมิ (อลังการเวอร์ชัน)
function createTaksaCard(geoKey, taksaStar) {
    const m = TAKSA_DETAILED_MEANINGS[geoKey];
    if (!m) return '';

    const star = TAKSA_MASTER[taksaStar.id] || { name: "ไม่ทราบ", color: "#ffffff", icon: "fa-question" };

    return `
        <div class="card taksa-card mb-4 shadow-lg border-0 overflow-hidden" style="border-radius: 16px; background: linear-gradient(135deg, #1a1a1a 0%, #2d1b47 100%);">
            <div class="card-header text-white py-4 text-center" style="background: linear-gradient(90deg, ${star.color}44, transparent); border-bottom: 3px solid ${star.color};">
                <i class="fas ${star.icon} fa-3x mb-2 d-block" style="color: ${star.color}; filter: drop-shadow(0 0 10px ${star.color});"></i>
                <h4 class="mb-1 fw-bold">${m.title}</h4>
                <div class="badge bg-dark text-white px-3 py-2 mt-2" style="font-size: 1.1rem; border: 1px solid ${star.color};">
                    ดาวครอง: ${star.name}
                </div>
            </div>
            <div class="card-body p-4 text-white">
                <div class="alert alert-light bg-white bg-opacity-10 border-0 mb-4">
                    <h5 class="text-gold mb-3"><i class="fas fa-scroll mr-2"></i>ภาพรวม</h5>
                    <p class="mb-0">${m.summary}</p>
                </div>

                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="alert alert-success bg-success bg-opacity-25 border-0 h-100">
                            <h6 class="text-success fw-bold"><i class="fas fa-thumbs-up mr-2"></i>เมื่อดาวส่งผลดี</h6>
                            <p>${m.positive}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="alert alert-danger bg-danger bg-opacity-25 border-0 h-100">
                            <h6 class="text-danger fw-bold"><i class="fas fa-exclamation-triangle mr-2"></i>เมื่อดาวส่งผลร้าย</h6>
                            <p>${m.negative}</p>
                        </div>
                    </div>
                </div>

                <div class="alert alert-warning bg-warning bg-opacity-25 text-dark mt-4 border-0">
                    <h6 class="fw-bold"><i class="fas fa-lightbulb mr-2"></i>ตัวอย่างสถานการณ์จริงที่พบบ่อย</h6>
                    <ul class="mb-0 ps-4 small">
                        ${m.realLifeExamples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>

                <div class="alert alert-info bg-info bg-opacity-25 mt-4 border-0">
                    <h6 class="fw-bold"><i class="fas fa-pray mr-2"></i>เคล็ดเสริมดวง / แก้เคล็ด</h6>
                    <p class="mb-2">${m.advice}</p>
                    <div class="d-flex flex-wrap gap-2 mt-3">
                        <span class="badge bg-dark text-white">สีเสริม: ${m.lucky.color}</span>
                        <span class="badge bg-dark text-white">เลขนำโชค: ${m.lucky.number}</span>
                        <span class="badge bg-dark text-white">ทิศแนะนำ: ${m.lucky.direction}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ฟังก์ชันสร้างสรุปดวงปีนี้แบบยาว ๆ จาก object taksa
// ฟังก์ชันสร้างสรุปดวงปีนี้ (เวอร์ชันแก้แล้ว return string ถูกต้อง)
function generateYearSummary(taksa, age = null, gender = 'male') {
    try {
        // เปลี่ยนการเช็คให้ยืดหยุ่นขึ้น
        if (!taksa) return "";

        // ดึงชื่อดาวแบบปลอดภัย
        const getStarName = (key) => {
            const starData = taksa[key];
            if (!starData) return "ไม่ทราบ";
            // รองรับทั้ง taksa["ศรี"].id หรือถ้าเก็บเป็นตัวเลขโดยตรง
            const id = (typeof starData === 'object') ? starData.id : starData;
            return TAKSA_MASTER[id]?.name || "ไม่ทราบ";
        };

        const boriwanName = getStarName("บริวาร");
        const sriName = getStarName("ศรี");
        const kalaName = getStarName("กาลกิณี");
        const detName = getStarName("เดช");

        if (boriwanName === "ไม่ทราบ") {
            return `<div class="p-3 text-center text-white-50">-- ไม่สามารถสร้างคำทำนายรายปีได้ --</div>`;
        }

        const boriwanStar = TAKSA_MASTER[taksa.บริวาร.id];
        const sriStar = sriName === "ไม่ทราบ" ? "ไม่ทราบ" : TAKSA_MASTER[taksa.ศรี.id].name;
        const kalaStar = kalaName === "ไม่ทราบ" ? "ไม่ทราบ" : TAKSA_MASTER[taksa.กาลกิณี.id].name;
        const detStar = detName === "ไม่ทราบ" ? "ไม่ทราบ" : TAKSA_MASTER[taksa.เดช.id].name;

        const ageText = age ? `อายุย่าง ${age} ปี` : "ในช่วงวัยปัจจุบัน";
        const genderAdj = gender === 'female' ? "สาว" : "หนุ่ม";
        const tone = gender === 'female' ? "อ่อนโยนแต่เฉียบคม" : "มั่นคงและเด็ดขาด";

        let paragraph1 = `
            ปี ${new Date().getFullYear() + 543} นี้ ดวงชะตาของ${genderAdj}เกิด${boriwanStar.name}จร ดูเหมือนจะเป็นปีที่ชีวิตเริ่มแสดงพลังออกมาอย่างชัดเจน 
            ด้วยดาว${boriwanStar.name}เป็นตัวนำทางหลัก ทำให้เรื่องราวเกี่ยวกับคนรอบข้าง ความสัมพันธ์ 
            และการเป็นที่พึ่งพิงของกันและกันกลายเป็นประเด็นสำคัญที่สุดของปีนี้ 
            ครอบครัว เพื่อนสนิท ลูกหลาน หรือลูกน้อง/ทีมงาน จะมีบทบาทเด่นมากขึ้น
        `;

        if (sriStar !== "ไม่ทราบ") {
            paragraph1 += `
                พร้อมกันนั้น ดาว${sriStar}เข้ามาครองศรี ทำให้โชคลาภ สิริมงคล และความเมตตาจากผู้อื่นไหลมาไม่ขาดสาย 
                งานที่ทำมีแนวโน้มราบรื่น มีคนเอ็นดูนิยม หรือได้รับการสนับสนุนจากผู้ใหญ่ 
                เงินทองที่เข้ามาจะไม่ใช่แค่ลาภลอย แต่เป็นผลจากการที่คุณ${tone}และทุ่มเทมาตลอด
            `;
        }

        let paragraph2 = `
            อย่างไรก็ตาม ต้องระวังเงาของดาว${kalaStar}ที่ครองกาลกิณีในปีนี้ 
            ซึ่งอาจนำพาอุปสรรคหรือเหตุการณ์ไม่คาดฝันมาให้ต้องจัดการบ้างเป็นระยะ 
            ไม่ว่าจะเป็นความขัดแย้งเล็กน้อย การถูกเข้าใจผิด ปัญหาสุขภาพ หรือเรื่องที่ต้องใช้ความอดทน 
            แต่หากผ่านด่านนี้ไปได้ ปีนี้จะกลายเป็นจุดเปลี่ยนครั้งใหญ่ที่ทำให้ชีวิตก้าวไปอีกขั้น
        `;

        if (detStar !== "ไม่ทราบ") {
            paragraph2 += `
                โชคดีที่ดาว${detStar}ยังส่งพลังบารมีมาช่วยประคอง ทำให้แม้จะมีคลื่นลม 
                คุณก็ยังคงได้รับการยอมรับ เคารพ และเกรงใจจากคนรอบข้างอยู่ดี
            `;
        }

        paragraph2 += `
            <br><br>โดยรวมแล้ว ปีนี้เป็นปีที่${tone}และมีโอกาสเติบโตสูงมาก 
            หากหมั่นทำบุญ ดูแลสุขภาพ และรักษาความสัมพันธ์กับคนรอบตัวให้ดี 
            สิ่งดี ๆ ที่หวังไว้หลายอย่างมีแนวโน้มจะสมหวังเกินคาดแน่นอน
            ${age >= 40 ? "วัยนี้คือช่วงเก็บเกี่ยวผลบุญที่เคยทำมา" : age >= 25 ? "วัยนี้คือช่วงสร้างฐานะและบารมีให้แข็งแกร่ง" : "วัยนี้คือช่วงวางรากฐานชีวิตที่ดีที่สุด"}
            ขอให้${gender === 'female' ? "สาวน้อย" : "หนุ่มใหญ่"}คนนี้ผ่านปีนี้ไปอย่างรุ่งโรจน์นะคะ/ครับ
        `;

        return `
            <div id="yearSummarySection" class="card bg-gradient-taksa border-gold mt-4 mb-4 shadow-lg">
                <div class="card-header text-center py-3" style="background: rgba(212, 175, 55, 0.2);">
                    <h4 class="mb-0 text-gold">บทสรุปดวงชะตาปี ${new Date().getFullYear() + 543}</h4>
                    <small class="text-white-50">${age ? 'อายุย่าง ' + age + ' ปี' : ''}</small>
                </div>
                <div class="card-body p-4 text-white" style="line-height: 1.8; font-size: 1.05rem;">
                    <p class="mb-3">${paragraph1.trim()}</p>
                    <p class="mb-0">${paragraph2.trim()}</p>
                </div>
            </div>
        `;
    } catch (err) {
        console.error("Summary Error:", err);
        return "";
    }
}




// ฟังก์ชันแสดงผลทั้งหมด
function renderTaksaResult(taksa) {
    const order = ["บริวาร", "อายุ", "เดช", "ศรี", "มูละ", "อุตสาหะ", "มนตรี", "กาลกิณี"];


    // --- ส่วนหัว ---
    let html = `
        <div class="text-center mb-4">
            <h3 class="text-gold fw-bold mb-1">ผลผูกดวงทักษา 8 ภูมิ</h3>
            <p class="text-white-50 small">สยามโหรามงคล</p>
        </div>
    `;

    // --- ส่วนที่ 1: ตารางทักษา (ใส่ ID: taksaWheel เพื่อแคปภาพเฉพาะส่วนนี้) ---
    // --- ก้อนที่ 1: ทักษาชุดมงคล (4 ใบแรก) ---
    html += `<div id="taksaPart1" class="p-3 mb-4 rounded shadow-sm" style="background: #0f0c1a; border: 1px solid #d4af37;">`;
    html += `<h5 class="text-center text-gold mb-3 small"><i class="fas fa-star mr-2"></i> ทักษาชุดที่ 1 (บริวาร - ศรี)</h5>`;
    html += `<div class="row no-gutters">`;
    order.slice(0, 4).forEach(key => {
        if (taksa[key]) {
            html += `<div class="col-6 p-1">${createTaksaCard(key, taksa[key])}</div>`;
        }
    });
    html += `</div></div>`; // ปิด Part 1

    // --- ก้อนที่ 2: ทักษาชุดอุปสรรค/หนุนดวง (4 ใบหลัง) ---
    html += `<div id="taksaPart2" class="p-3 mb-4 rounded shadow-sm" style="background: #0f0c1a; border: 1px solid #d4af37;">`;
    html += `<h5 class="text-center text-gold mb-3 small"><i class="fas fa-shield-alt mr-2"></i> ทักษาชุดที่ 2 (มูละ - กาลกิณี)</h5>`;
    html += `<div class="row no-gutters">`;
    order.slice(4, 8).forEach(key => {
        if (taksa[key]) {
            html += `<div class="col-6 p-1">${createTaksaCard(key, taksa[key])}</div>`;
        }
    });
    html += `</div></div>`; // ปิด Part 2

    // --- ส่วนที่ 2: ทิศมงคลและคำสรุป (ใส่ ID: taksaDetails เพื่อแคปภาพสรุปดวง) ---
    html += `<div id="taksaDetails" class="p-3 rounded" style="background: rgba(26, 26, 46, 0.8);">`;

    if (taksa.sri && taksa.kalakini) {
        html += `
            <div class="card bg-gradient-taksa border-gold mb-4 shadow-xl">
                <div class="card-body text-center p-4">
                    <div class="row align-items-center">
                        <div class="col-6">
                            <i class="fas fa-location-arrow fa-2x text-success mb-2"></i>
                            <h5 class="text-success small">ทิศมงคล</h5>
                            <p class="h5 fw-bold text-white">${DIRECTION_MASTER[taksa.sri.id] || "ไม่ทราบ"}</p>
                        </div>
                        <div class="col-6">
                            <i class="fas fa-ban fa-2x text-danger mb-2"></i>
                            <h5 class="text-danger small">ทิศต้องห้าม</h5>
                            <p class="h5 fw-bold text-white">${DIRECTION_MASTER[taksa.kalakini.id] || "ไม่ทราบ"}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ... โค้ดส่วนบนของฟังก์ชัน ...

    // --- ก้อนที่ 3: สรุปดวงปี ---
    const age = document.getElementById('userAge')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';

    html += `<div id="taksaDetails">`; // เริ่มก้อนที่จะแคปภาพ
    html += generateYearSummary(taksa, age, gender);
    html += `</div>`; // จบก้อนที่จะแคปภาพ (ปุ่มต้องอยู่นอก div นี้)

    // --- กลุ่มปุ่มกด (อยู่นอก taksaDetails แล้ว จะไม่ติดในภาพแน่นอน) ---
    html += `
        <div class="share-buttons-container mt-4 p-3 rounded bg-white bg-opacity-10">
            <p class="text-gold text-center small mb-3">📸 บันทึกภาพคำทำนาย</p>
            <div class="row no-gutters">
                <div class="col-4 p-1">
                    <button class="btn btn-outline-gold btn-block btn-sm py-2" onclick="downloadSpecificPart('taksaPart1', 'ผังทักษา_1')">
                        ส่วนที่ 1
                    </button>
                </div>
                <div class="col-4 p-1">
                    <button class="btn btn-outline-gold btn-block btn-sm py-2" onclick="downloadSpecificPart('taksaPart2', 'ผังทักษา_2')">
                        ส่วนที่ 2
                    </button>
                </div>
                <div class="col-4 p-1">
                    <button class="btn btn-outline-gold btn-block btn-sm py-2" onclick="downloadSpecificPart('taksaDetails', 'สรุปดวงปี')">
                        สรุปดวง
                    </button>
                </div>
            </div>
            <button class="btn btn-gold btn-block mt-3 py-3 fw-bold" onclick="resetTaksa()">
                <i class="fas fa-redo-alt mr-2"></i> ผูกดวงใหม่
            </button>
        </div>
    `;

    // ... ส่วนท้ายฟังก์ชัน ...

    const resultEl = document.getElementById('taksaResult');
    if (resultEl) {
        resultEl.innerHTML = html;
        resultEl.style.display = 'block';

        setTimeout(() => {
            document.querySelectorAll('.taksa-card, .bg-gradient-year').forEach((el, i) => {
                el.classList.add('animate__animated', 'animate__fadeInUp');
                el.style.animationDelay = `${i * 0.15}s`;
            });
        }, 300);
    }
}

async function downloadSpecificPart(elementId, fileName) {
    const area = document.getElementById(elementId);
    if (!area) return;

    // 1. ซ่อนปุ่มทั้งหมดในหน้าจอชั่วคราว (กันพลาด)
    const shareBtns = document.querySelector('.share-buttons-container');
    if (shareBtns) shareBtns.style.display = 'none';

    try {
        // ปรับแต่ง Style ชั่วคราวให้สวย (เอาขอบออก หรือเพิ่ม Padding)
        const originalStyle = area.style.cssText;
        area.style.padding = "25px";
        area.style.borderRadius = "0px";

        const canvas = await html2canvas(area, {
            scale: 2.5,
            backgroundColor: '#0f0c1a',
            useCORS: true,
            logging: false
        });

        const link = document.createElement('a');
        link.download = `${fileName}_สยามโหรา.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // คืนค่า Style เดิม
        area.style.cssText = originalStyle;

    } catch (e) {
        console.error("Capture error", e);
        alert("ไม่สามารถบันทึกภาพได้");
    } finally {
        // 2. แสดงปุ่มกลับมาเหมือนเดิม
        if (shareBtns) shareBtns.style.display = 'block';
    }
}



// ฟังก์ชันหลักที่ถูกเรียกเมื่อกดปุ่ม "ผูกดวงทักษา"
function calculateAndShowTaksa() {
    const btn = document.getElementById('taksaBtn');
    const ageInput = document.getElementById('userAge');
    const daySelect = document.getElementById('birthDaySelect');
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';

    if (!ageInput.value || parseInt(ageInput.value) < 1) {
        alert("กรุณากรอกอายุย่างให้ถูกต้อง (อย่างน้อย 1 ปี)");
        ageInput.focus();
        return;
    }

    // สมมติ birthDaySelect เป็น 0=อาทิตย์, 1=จันทร์, ..., 7=ศุกร์
    // ถ้า select เป็น 1-8 ให้ใช้ parseInt(daySelect.value) - 1;
    let birthDay = parseInt(daySelect.value);
    const age = parseInt(ageInput.value);

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังผูกดวง...';

    // ลำดับดาวเวียนขวา (ตามเข็มนาฬิกา) - มาตรฐานส่วนใหญ่
    const starOrder = [0, 1, 2, 3, 7, 5, 6, 4]; // อาทิตย์ → จันทร์ → อังคาร → พุธ → เสาร์ → พฤหัส → ราหู → ศุกร์

    // จำนวนก้าว = อายุย่าง - 1
    const steps = (age - 1) % 8;

    // ตำแหน่งบริวารจร
    let boriwanPos = (birthDay + steps) % 8;
    let taksa = {};

    const geoOrder = ["บริวาร", "อายุ", "เดช", "ศรี", "มูละ", "อุตสาหะ", "มนตรี", "กาลกิณี"];

    for (let i = 0; i < 8; i++) {
        let pos = (boriwanPos + i) % 8;
        let starId = starOrder[pos];

        // ข้ามตาอาทิตย์ (id 0) แบบง่าย ๆ - ถ้าตกอาทิตย์ ให้ขยับไป 1 ช่อง
        if (starId === 0) {
            pos = (pos + 1) % 8;
            starId = starOrder[pos];
        }

        taksa[geoOrder[i]] = { id: starId };
    }

    taksa.sri = taksa["ศรี"];
    taksa.kalakini = taksa["กาลกิณี"];

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '✨ ผูกดวงทักษา';

        document.getElementById('taksaInput').style.display = 'none';
        document.getElementById('taksaResult').style.display = 'block';

        renderTaksaResult(taksa);

        document.getElementById('taksaResult').scrollIntoView({ behavior: 'smooth' });
    }, 800);
}



// ฟังก์ชันดาวน์โหลดภาพ (ใช้ html2canvas - ต้อง include library)
async function downloadTaksaImage() {
    const element = document.getElementById('taksaResult');
    if (!element || element.style.display === 'none') {
        alert("กรุณาผูกดวงทักษาก่อนทำการบันทึกภาพครับ");
        return;
    }

    // 1. หาปุ่มแชร์เพื่อเปลี่ยนสถานะและซ่อน
    const btn = document.querySelector('.btn-download-taksa') || document.querySelector('button[onclick="downloadTaksaImage()"]');
    const originalHTML = btn ? btn.innerHTML : "";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังเตรียมภาพ...';
    }

    try {
        // 2. ซ่อนปุ่มต่างๆ ไม่ให้ติดไปในรูปภาพ
        // สมมติว่าปุ่มอยู่ใน div class "mt-4" หรือมีปุ่ม "กลับหน้าหลัก"
        const actionButtons = element.querySelectorAll('button, .btn, .no-export');
        actionButtons.forEach(el => el.style.visibility = 'hidden');

        // 3. ปรับแต่ง Style ชั่วคราวเพื่อให้ภาพออกมาดูขลัง
        const originalStyle = element.style.cssText;
        element.style.padding = "30px";
        element.style.background = "linear-gradient(135deg, #0f0c1a 0%, #1a1a2e 100%)";
        element.style.borderRadius = "0px"; // ให้เป็นแผ่นเหมือนใบประกาศ

        const options = {
            scale: 2.2,
            backgroundColor: '#0f0c1a',
            useCORS: true,
            logging: false,
            scrollY: -window.scrollY
        };

        const canvas = await html2canvas(element, options);

        // 4. คืนค่าปุ่มและ Style กลับมา
        actionButtons.forEach(el => el.style.visibility = 'visible');
        element.style.cssText = originalStyle;

        // 5. ดาวน์โหลดไฟล์
        const link = document.createElement('a');
        link.download = `ทักษาพยากรณ์_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

    } catch (err) {
        console.error("Taksa Download Error:", err);
        alert("ไม่สามารถบันทึกภาพได้");
    } finally {
        if (btn) {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    }
}