"use strict";
/**
 * personalFortune.js 
 * ระบบวิเคราะห์ดวงชะตาเฉพาะบุคคล (Personalized Fortune)
 * ผสานหลักทักษาปกรณ์ร่วมกับยามอัฏฐกาลและช่วงเวลาที่แม่นยำ
 */

const PersonalFortune = {
    // ตารางทักษา (0=อาทิตย์, 1=จันทร์, 2=อังคาร, 3=พุธกลางวัน, 4=เสาร์, 5=พฤหัส, 6=ศุกร์, 7=ราหู)
    TAKSA_MAP: {
        0: { sri: 6, montri: 5, kali: 6 }, // เกิดวันอาทิตย์
        1: { sri: 2, montri: 3, kali: 5 }, // เกิดวันจันทร์
        2: { sri: 3, montri: 4, kali: 1 }, // เกิดวันอังคาร
        3: { sri: 5, montri: 0, kali: 2 }, // เกิดวันพุธ (กลางวัน)
        4: { sri: 1, montri: 2, kali: 3 }, // เกิดวันเสาร์
        5: { sri: 0, montri: 1, kali: 7 }, // เกิดวันพฤหัสบดี
        6: { sri: 4, montri: 7, kali: 0 }, // เกิดวันศุกร์
        7: { sri: 2, montri: 3, kali: 5 }  // เกิดวันพุธกลางคืน (ราหู)
    },

    // ช่วงเวลามาตรฐานของยาม 8 (กลางวัน)
    TIME_LABELS: [
        "06:00 - 07:30", "07:30 - 09:00", "09:00 - 10:30", "10:30 - 12:00",
        "12:00 - 13:30", "13:30 - 15:00", "15:00 - 16:30", "16:30 - 18:00"
    ],

    getUserData: function() {
        const birthdate = localStorage.getItem('userBirthdate');
        if (!birthdate || birthdate === "undefined") return null;
        
        const dateObj = new Date(birthdate);
        return {
            dayOfWeek: dateObj.getDay()
        };
    },

    // ฟังก์ชันคำนวณหา "ช่วงเวลา" ที่ยามนั้นๆ จะปรากฏในวันนี้
    getYarmTime: function(starId) {
        const today = new Date().getDay();
        // ดึงลำดับดาวของวันนี้จาก YARM_CHART ที่อยู่ใน yarmPage.js
        const dayYarms = YARM_CHART.day[today]; 
        const index = dayYarms.indexOf(starId);
        
        // ถ้าเจอในยามกลางวัน ให้ส่งคืนช่วงเวลา ถ้าไม่เจอให้บอกว่าเป็นยามจร
        return index !== -1 ? this.TIME_LABELS[index] : "ช่วงกลางคืน (18:00+)";
    },

    getAdvice: function() {
        const user = this.getUserData();
        if (!user) return null;

        const myTaksa = this.TAKSA_MAP[user.dayOfWeek] || this.TAKSA_MAP[0];

        return {
            love: this.formatAdvice(myTaksa.sri, "ความรัก & เมตตา", "ช่วงเวลา 'ศรี' มหาเสน่ห์ เหมาะแก่นัดพบหรือเจรจาให้คนรักใคร่"),
            work: this.formatAdvice(myTaksa.montri, "การงาน & ผู้ใหญ่", "ยาม 'มนตรี' มีคนสนับสนุน เหมาะเข้าหาผู้ใหญ่หรือเริ่มงานใหม่"),
            money: this.formatAdvice(6, "โชคลาภเงินทอง", "ยามศุกร์ (คลังสมบัติ) เหมาะแก่การเสี่ยงโชคหรือจัดการเรื่องเงิน"),
            caution: this.formatAdvice(myTaksa.kali, "ข้อควรระวัง", "ยาม 'กาลกิณี' ประจำตัว ควรเลี่ยงการตัดสินใจหรือการปะทะ", true)
        };
    },

    formatAdvice: function(starId, title, note, isWarning = false) {
        const info = YARM_INFO[starId];
        return {
            title: title,
            starId: starId,
            yarmName: info.name,
            time: this.getYarmTime(starId),
            note: note,
            isWarning: isWarning
        };
    },

    renderProfileFortune: function() {
        const container = document.getElementById('personalFortuneArea');
        if (!container) return;

        const data = this.getAdvice();
        if (!data) {
            container.innerHTML = `
                <div class="card bg-dark border-warning p-3 text-center animate__animated animate__fadeIn">
                    <p class="mb-0 text-warning"><i class="fas fa-info-circle"></i> กรุณาระบุวันเกิดในหน้าโปรไฟล์เพื่อเปิดระบบดวงเฉพาะบุคคล</p>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="m-0 text-gold"><i class="fas fa-user-check"></i> ดวงเฉพาะคุณวันนี้</h5>
                <span class="badge badge-outline-gold small">คำนวณตามทักษา</span>
            </div>
            <div class="row">
                ${this.createCard(data.love, 'heart', 'text-danger')}
                ${this.createCard(data.work, 'briefcase', 'text-info')}
                ${this.createCard(data.money, 'coins', 'text-warning')}
                ${this.createCard(data.caution, 'exclamation-triangle', 'text-secondary')}
            </div>
        `;
    },

    createCard: function(item, icon, colorClass) {
        const starColor = getStarColor(item.starId);
        const borderStyle = item.isWarning 
            ? 'border-left: 5px solid #ff4444 !important; opacity: 0.9;' 
            : `border-left: 5px solid ${starColor} !important;`;

        return `
            <div class="col-12 mb-2 animate__animated animate__fadeInUp">
                <div class="card bg-dark border-secondary" style="${borderStyle}">
                    <div class="card-body p-2 d-flex align-items-center">
                        <div class="text-center mr-3" style="width: 50px;">
                            <i class="fas fa-${icon} ${item.isWarning ? 'text-danger' : colorClass} fa-2x"></i>
                        </div>
                        <div style="flex: 1;">
                            <div class="d-flex justify-content-between">
                                <small class="font-weight-bold ${item.isWarning ? 'text-danger' : 'text-white-50'}">${item.title}</small>
                                <small class="text-warning font-weight-bold"><i class="far fa-clock"></i> ${item.time}</small>
                            </div>
                            <div class="h5 mb-0" style="color:${starColor}">ยาม${item.yarmName}</div>
                            <div class="small" style="color: #bbb; line-height: 1.2;">${item.note}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};