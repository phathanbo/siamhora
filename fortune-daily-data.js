// ข้อมูลไพ่ยิปซี (Major Arcana 22 ใบ)
const tarotCards = [
    { id: 0, name: "The Fool", meaning: "การเริ่มต้นใหม่ ความอิสระ การผจญภัยที่ไม่ได้คาดคิด ปล่อยวางความกังวลแล้วก้าวเดินต่อไป", img: "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg" },
    { id: 1, name: "The Magician", meaning: "ความคิดสร้างสรรค์ พรสวรรค์ การสื่อสาร คุณมีศักยภาพครบถ้วนในการจัดการทุกปัญหา", img: "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg" },
    { id: 2, name: "The High Priestess", meaning: "ลางสังหรณ์ ความเร้นลับ สัญชาตญาณ ช่วงนี้ควรเชื่อความรู้สึกลึกๆ ของตัวเองมากกว่าเหตุผล", img: "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg" },
    { id: 3, name: "The Empress", meaning: "ความอุดมสมบูรณ์ ความเป็นแม่ ความรักที่อบอุ่น การเจริญเติบโตของธุรกิจหรือครอบครัว", img: "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg" },
    { id: 4, name: "The Emperor", meaning: "อำนาจ ความมั่นคง ระเบียบวินัย ความสำเร็จที่เกิดจากความเด็ดขาดและการวางแผนที่ดี", img: "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg" },
    { id: 5, name: "The Hierophant", meaning: "สิ่งศักดิ์สิทธิ์คุ้มครอง ครูบาอาจารย์ การยึดมั่นในประเพณี ศีลธรรม และการขอคำปรึกษาจากผู้ใหญ่", img: "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg" },
    { id: 6, name: "The Lovers", meaning: "ความรัก ทางเลือก ความกลมเกลียว คุณอาจต้องตัดสินใจเลือกทางใดทางหนึ่งที่สำคัญในชีวิต", img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg" },
    { id: 7, name: "The Chariot", meaning: "การต่อสู้ ชัยชนะ การเดินทาง ความสำเร็จจะมาถึงหากคุณมีความมุ่งมั่นและไม่ยอมแพ้", img: "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg" },
    { id: 8, name: "Strength", meaning: "ความเข้มแข็ง ความอดทน การเอาชนะอุปสรรคด้วยความอ่อนโยนและเมตตา", img: "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg" },
    { id: 9, name: "The Hermit", meaning: "การปลีกวิเวก การทบทวนตัวเอง แสวงหาความสงบ ช่วงนี้ควรอยู่คนเดียวเพื่อค้นหาคำตอบ", img: "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg" },
    { id: 10, name: "Wheel of Fortune", meaning: "โชคชะตา โอกาสใหม่ๆ การเปลี่ยนแปลงไปสู่สิ่งที่ดีกว่า กงล้อแห่งชีวิตกำลังหมุนขึ้น", img: "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
    { id: 11, name: "Justice", meaning: "ความยุติธรรม กฎหมาย ความสมดุล ทุกอย่างจะได้รับการตัดสินอย่างเป็นธรรมตามความเป็นจริง", img: "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg" },
    { id: 12, name: "The Hanged Man", meaning: "การเสียสละ การหยุดนิ่ง การมองมุมกลับ ช่วงนี้ควรอยู่นิ่งๆ ปล่อยวาง แล้วจะค้นพบทางออก", img: "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
    { id: 13, name: "Death", meaning: "การสิ้นสุดเพื่อเริ่มต้นใหม่ การเปลี่ยนแปลงครั้งใหญ่ ไม่ใช่ความตาย แต่คือการเปลี่ยนผ่าน", img: "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg" },
    { id: 14, name: "Temperance", meaning: "การประนีประนอม ความพอดี การโยกย้ายเปลี่ยนแปลง ค่อยๆ ปรับตัวให้เข้ากับสถานการณ์", img: "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg" },
    { id: 15, name: "The Devil", meaning: "กิเลส ตัณหา การยึดติด ความลุ่มหลง ระวังการหลอกลวงหรือการทำอะไรตามใจตัวเองเกินไป", img: "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg" },
    { id: 16, name: "The Tower", meaning: "เหตุการณ์ไม่คาดฝัน การพังทลาย สิ่งที่สร้างมาอาจถูกทำลายลงอย่างรวดเร็ว ระวังอุบัติเหตุ", img: "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg" },
    { id: 17, name: "The Star", meaning: "ความหวัง แรงบันดาลใจ การเยียวยา ฟ้าหลังฝนกำลังมาถึง ทุกอย่างจะค่อยๆ ดีขึ้น", img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg" },
    { id: 18, name: "The Moon", meaning: "ความวิตกกังวล ความสับสน ภาพลวงตา ระวังเรื่องปิดบังซ่อนเร้น อย่าเพิ่งด่วนตัดสินใจใดๆ", img: "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg" },
    { id: 19, name: "The Sun", meaning: "ความสุขสมหวัง ความสำเร็จ พลังงานบวก สิ่งที่หวังไว้จะสำเร็จลุล่วงอย่างงดงามที่สุด", img: "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg" },
    { id: 20, name: "Judgement", meaning: "ผลแห่งกรรม การตื่นรู้ การได้รับข่าวดีที่รอคอย สิ่งที่ทำไว้ในอดีตกำลังส่งผลในทางที่ดี", img: "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg" },
    { id: 21, name: "The World", meaning: "ความสำเร็จอันสูงสุด ความสมบูรณ์แบบ การจบรอบเพื่อเริ่มใหม่ในระดับที่สูงกว่าเดิม", img: "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg" }
];

// ข้อมูลเซียมซี (10 ใบ)
const siamsiSticks = [
    { num: 1, text: "ใบที่หนึ่ง ดีล้น พ้นประมาณ เหมือนดอกไม้ บานรับ แสงตะวัน สิ่งที่หวัง ตั้งใจ จะได้พลัน โชคลาภนั้น มีมา ไม่ขาดเอย", type: "ดีมาก" },
    { num: 2, text: "ใบที่สอง หมองมัว ระวังหน่อย อย่าเพิ่งปล่อย ใจลอย ไปไกลนัก ทำอะไร ให้คิดพินิจนัก ระวังมัก เสียทรัพย์ เพราะคนลวง", type: "ปานกลาง" },
    { num: 3, text: "ใบที่สาม ความรัก สดใสยิ่ง ใครถูกทิ้ง จะพบ คนดามใจ การงานก้าว กิจการ ก็ก้าวไกล ผู้ใหญ่ให้ ความเมตตา อุปถัมภ์", type: "ดี" },
    { num: 4, text: "ใบที่สี่ ชีวิต ติดขัดบ้าง เหมือนเรือขวาง กลางน้ำ คลื่นซัดสาด อดทนไว้ ให้ดี อย่าเพิ่งขลาด สิ้นพายุ ฟ้าสว่าง รุ่งเรืองรอง", type: "รอคอย" },
    { num: 5, text: "ใบที่ห้า ลาภยศ ปรากฏแน่ ที่ย่ำแย่ จะกลับ กลายเป็นดี เจ็บป่วยไข้ หายพลัน ในทันที ทุกข์ที่มี มลาย หายไปพลัน", type: "ดีมาก" },
    { num: 6, text: "ใบที่หก ตกที่นั่ง ลำบากนัก ระวังคน รู้จัก จะหักหลัง ทำอะไร อย่าเพิ่ง หวังจริงจัง ให้ระวัง คำพูด จะบาดใจ", type: "ระวังตัว" },
    { num: 7, text: "ใบที่เจ็ด สำเร็จ ดั่งใจนึก เหมือนจารึก ทองคำ งามอร่าม จะทำอะไร มีคน คอยทำตาม ชื่อเสียงงาม ก้องไกล ไปทั่วทิศ", type: "ดีเลิศ" },
    { num: 8, text: "ใบที่แปด เหนื่อยนัก พักเสียหน่อย อย่าเพิ่งปล่อย ร่างกาย ให้ทรุดโทรม การเงินติด ขัดบ้าง อย่าเพิ่งโวย ผ่านเดือนนี้ ไปได้ จะผ่อนคลาย", type: "เหนื่อย" },
    { num: 9, text: "ใบที่เก้า ก้าวหน้า อย่างมั่นคง เหมือนนกหลง รังเก่า พบรังใหม่ ได้โชคลาภ จากทาง แดนห่างไกล ศัตรูพ่าย แพ้พัง ย่อยยับไป", type: "ดี" },
    { num: 10, text: "ใบที่สิบ สิ้นสุด ความทุกข์โศก รับโชคใหญ่ เข้ามา อย่างคาดฝัน ทั้งการงาน การเงิน ดีผูกพัน เป็นใบที่ ดีครบ จบสมบูรณ์", type: "ดีที่สุด" }
];
