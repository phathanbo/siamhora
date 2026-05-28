"use strict";

function showmainpage() {
    const contianer = document.getElementById('mainContentpage');

    if (contianer) {
        contianer.style.display = 'block';
    }

    const html = `
    
        <span id="userGreeting" class="text-center font-weight-bold mb-4 d-block" style="font-size: 50px;">✨
            ยินดีต้อนรับท่านเจ้าชะตา ✨</span>
        <section id="form" class="card shadow-sm mb-4">
            <div class="card-body">
                <h2 style="color: #1a1a1a;" class="text-center">กรอกข้อมูลเพื่อทำนายดวง</h2>
                <div class="form-group">
                    <label>ชื่อผู้รับคำทำนาย:</label>
                    <input type="text" class="form-control" id="targetName" placeholder="กรุณากรอกชื่อ" required>
                </div>
                <div class="form-group">
                    <label>นามสกุล:</label>
                    <input type="text" class="form-control" id="targetLastName" placeholder="กรุณากรอกนามสกุล" required>
                </div>
                <div class="form-group">
                    <label class="control-label" for="targetGender">เพศ:</label>
                    <select class="form-control" id="targetGender" placeholder="กรุณาเลือกเพศ" required>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="birthdate">วันเกิด (ปี ค.ศ.):</label>
                    <input type="text" class="form-control" id="birthdate" placeholder="วว/ดด/ปปปป" required
                        autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="dayjanta">ขึ้น/แรม:</label>
                    <select class="form-control" id="dayjanta" placeholder="กรุณาเลือกวันขึ้น/แรม" required>
                        <option value="1">ขึ้น 1 ค่ำ</option>
                        <option value="2">ขึ้น 2 ค่ำ</option>
                        <option value="3">ขึ้น 3 ค่ำ</option>
                        <option value="4">ขึ้น 4 ค่ำ</option>
                        <option value="5">ขึ้น 5 ค่ำ</option>
                        <option value="6">ขึ้น 6 ค่ำ</option>
                        <option value="7">ขึ้น 7 ค่ำ</option>
                        <option value="8">ขึ้น 8 ค่ำ</option>   
                        <option value="9">ขึ้น 9 ค่ำ</option>
                        <option value="10">ขึ้น 10 ค่ำ</option>
                        <option value="11">ขึ้น 11 ค่ำ</option>
                        <option value="12">ขึ้น 12 ค่ำ</option>
                        <option value="13">ขึ้น 13 ค่ำ</option>
                        <option value="14">ขึ้น 14 ค่ำ</option>
                        <option value="15">ขึ้น 15 ค่ำ</option>
                        <option value="16">แรม 1 ค่ำ</option>
                        <option value="17">แรม 2 ค่ำ</option>
                        <option value="18">แรม 3 ค่ำ</option>
                        <option value="19">แรม 4 ค่ำ</option>
                        <option value="20">แรม 5 ค่ำ</option>
                        <option value="21">แรม 6 ค่ำ</option>
                        <option value="22">แรม 7 ค่ำ</option>
                        <option value="23">แรม 8 ค่ำ</option>
                        <option value="24">แรม 9 ค่ำ</option>
                        <option value="25">แรม 10 ค่ำ</option>
                        <option value="26">แรม 11 ค่ำ</option>
                        <option value="27">แรม 12 ค่ำ</option>
                        <option value="28">แรม 13 ค่ำ</option>
                        <option value="29">แรม 14 ค่ำ</option>
                        <option value="30">แรม 15 ค่ำ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="birthMonththai">เดือนเกิด(ไทย):</label>
                    <input type="number" class="form-control" id="birthMonththai" max="12" min="1" placeholder="1-12"
                        required>
                </div>
                <div class="form-group">
                    <label for="ThaiId">เลขที่บัตรประชาชน:</label>
                    <input type="number" class="form-control" id="ThaiId" max="13" min="13" placeholder="13"
                        required>
                </div>
                <div class="form-group">
                    <label for="birthtime">เวลาเกิด:</label>
                    <input type="time" class="form-control" id="birthtime" required>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-gold btn-block" onclick="calculateEsh()">ดูดวงชะตา</button>
                </div>
            </div>
        </section>   
    `;
    contianer.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () =>{
    showmainpage();
});
