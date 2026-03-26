"use strict";
// 1. ข้อมูลตามตำราเลขศาสตร์ไทย
const LOTTO_THEORY = {
    "อาทิตย์": { power: 6, friend: [1, 4], powerNum: 9 },
    "จันทร์": { power: 15, friend: [2, 5], powerNum: 2 },
    "อังคาร": { power: 8, friend: [3, 7], powerNum: 8 },
    "พุธ": { power: 17, friend: [4, 6], powerNum: 7 },
    "พฤหัสบดี": { power: 19, friend: [5, 9], powerNum: 1 },
    "ศุกร์": { power: 21, friend: [6, 3], powerNum: 3 },
    "เสาร์": { power: 10, friend: [7, 2], powerNum: 7 }
};

// ตารางเลขตามวันเกิด
const dayNumbers = {
    "อาทิตย์": [1,6],
    "จันทร์": [2,5],
    "อังคาร": [3,8],
    "พุธ": [4,7],
    "พฤหัสบดี": [5,9],
    "ศุกร์": [6,3],
    "เสาร์": [7,4]
};

// เลขพื้นฐานวันเกิด
const birthBase = {
    "อาทิตย์":1,
    "จันทร์":2,
    "อังคาร":3,
    "พุธ":4,
    "พฤหัสบดี":5,
    "ศุกร์":6,
    "เสาร์":7
};



function getNextLottoDate() {

    const today = new Date();

    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const sixteen = new Date(today.getFullYear(), today.getMonth(), 16);

    let target;

    if (today <= first) {
        target = first;
    } else if (today <= sixteen) {
        target = sixteen;
    } else {
        target = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }

    const days = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];

    return {
        date: target,
        dayName: days[target.getDay()],
        fullDate: target.toLocaleDateString("th-TH")
    };

}


// เปิดหน้าหวย
function showLottoPage() {

    if (typeof navigateTo === "function") {
        navigateTo('lottoPage');
    } else {
        document.querySelectorAll('.main-section').forEach(s => s.classList.add('hidden'));
        document.getElementById('lottoPage').classList.remove('hidden');
    }

    const resultDiv = document.getElementById('lottoResult');
    if (resultDiv) resultDiv.innerHTML = "";

    window.scrollTo(0, 0);
}



// 2. ฟังก์ชันหาปฏิทินหวยออกงวดหน้า (ต้องมีเพื่อให้ generateLuckyNumbers ทำงานได้)
function getNextLottoDate(){

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    let target;

    if(day < 16){
        target = new Date(year,month,16);
    }else{
        target = new Date(year,month+1,1);
    }

    const thaiDays = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
    const thaiMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

    return{
        date: target.getDate(),
        month: target.getMonth()+1,
        year: target.getFullYear(),
        fullDate:`${target.getDate()} ${thaiMonths[target.getMonth()]} ${target.getFullYear()+543}`,
        dayName:thaiDays[target.getDay()]
    }

}

// คำนวณเลขเด่นงวด
function calculateMainNumbers(birthDay){

    const next = getNextLottoDate();
    const base = birthBase[birthDay];

    const main = (base + next.date + next.month) % 10;
    const secondary = (main + next.month) % 10;
    const forbidden = (main + secondary + 3) % 10;

    return{
        main,
        secondary,
        forbidden
    }

}


// สุ่มเลข 2 ตัว (กันเลขซ้ำ + กันเลขกลับ)
function generateTwoDigits(main,secondary,count=6){

    const nums=[];

    while(nums.length < count){

        const d1 = Math.random()<0.5 ? main : secondary;
        const d2 = Math.floor(Math.random()*10);

        const num = `${d1}${d2}`;
        const rev = `${d2}${d1}`;

        if(!nums.includes(num) && !nums.includes(rev)){
            nums.push(num);
        }

    }

    return nums;

}


// สุ่มเลข 3 ตัว
function generateThreeDigits(main,secondary,count=6){

    const nums=[];

    while(nums.length < count){

        const d1 = Math.random()<0.5 ? main : secondary;
        const d2 = Math.floor(Math.random()*10);
        const d3 = Math.floor(Math.random()*10);

        const num=`${d1}${d2}${d3}`;

        if(!nums.includes(num)){
            nums.push(num);
        }

    }

    return nums;

}



// =============================
// วิเคราะห์วันเกิดผู้ใช้
// ต้องมี select id="birthDay"
// =============================
function analyzeBirthDay(){

    const day=document.getElementById("birthDay");

    if(!day) return "ไม่ได้ระบุวันเกิด";

    const value=day.value;

    if(!LOTTO_THEORY[value]) return "ไม่ได้ระบุวันเกิด";

    const data=LOTTO_THEORY[value];

    return `
    คนเกิดวัน${value}
    เลขมงคลของคุณคือ ${data.power} และ ${data.powerNum}
    เลขมิตรคือ ${data.friend.join(",")}
    `;
}


// 3. ฟังก์ชันหลักในการสร้างเลข
function generateLuckyNumbers(){

    const birthDay=document.getElementById("birthDay").value;
    const next=getNextLottoDate();
    const calc=calculateMainNumbers(birthDay);
    const twoDigits=generateTwoDigits(calc.main,calc.secondary,6);
    const threeDigits=generateThreeDigits(calc.main,calc.secondary,6);


    const html=`

    <div class="card shadow mt-4 border-0">
        <div class="card-body">
            <h4 class="text-gold">🔮 วิเคราะห์งวด ${next.fullDate}</h4>
            <p class="text-muted">งวดวัน${next.dayName}</p>
            <hr>
            <h5>⭐ เลขเด่น</h5>
            <h2 class="text-danger">${calc.main}</h2>
            <h5 class="mt-3">✨ เลขรอง</h5>
            <h3>${calc.secondary}</h3>
            <h5 class="mt-3">⚠ เลขกัน</h5>
            <h3>${calc.forbidden}</h3>
            <hr>
            <h5>🎯 เลข 2 ตัว</h5>
            <h3 class="text-primary">
            ${twoDigits.join("  ")}
            </h3>
            <h5 class="mt-4">🎯 เลข 3 ตัว</h5>
            <h3 class="text-success">
            ${threeDigits.join("  ")}
            </h3>
        </div>
    </div>
    `;
    document.getElementById("lottoResult").innerHTML=html;
}


// 4. ฟังก์ชันบันทึกภาพ (ต้องใช้ร่วมกับ html2canvas)
function downloadLottoResult() {

    const area = document.getElementById('lottoCaptureArea');

    if (!area) {
        alert("กรุณาคำนวณเลขก่อน");
        return;
    }

    html2canvas(area).then(canvas => {
        const link = document.createElement('a');
        link.download = "lotto-prediction.png";
        link.href = canvas.toDataURL();
        link.click();
    });

}