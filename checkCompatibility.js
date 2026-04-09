function calculateMarriageMatch() {
    const male = document.getElementById('maleYear').value;
    const female = document.getElementById('femaleYear').value;
    const display = document.getElementById('marriage-result-display');
    const textContent = document.getElementById('match-text-content');
    
    let result = {
        text: "ไม่พบข้อมูลในตำราโดยตรง (โดยทั่วไปถือเป็นมัธยมกลางๆ)",
        level: "neutral" // good, neutral, bad
    };

    // Helper function สำหรับเช็คคู่แบบไม่เกี่ยงเพศ
    const isMatch = (y1, y2) => (male === y1 && female === y2) || (male === y2 && female === y1);

    // 1. กลุ่มนาคตัวเดียวกัน/ดีมาก
    if (isMatch("ชวด", "มะเมีย") || isMatch("วอก", "มะแม") || isMatch("มะโรง", "มะเมีย") || isMatch("มะโรง", "มะแม")) {
        result = { text: "สมพงษ์อยู่นาคตัวเดียวกันดีนัก จะมีบุตรมากและรักใคร่กันมาก มีความสุขสำราญเป็นนิตย์", level: "good" };
    } 
    else if (isMatch("ชวด", "มะโรง") || isMatch("มะเมีย", "มะแม")) {
        result = { text: "คู่นี้อยู่กินด้วยกันแล้วเป็นมัธยมปานกลาง", level: "neutral" };
    }
    // 2. กลุ่มฉลู/เถาะ/กุน
    else if (isMatch("ฉลู", "เถาะ") || isMatch("ฉลู", "กุน")) {
        result = { text: "สมพงษ์อยู่นาคตัวเดียวกัน เป็นสุขทุกทิพาราตรีกาล", level: "good" };
    }
    else if (isMatch("มะเส็ง", "ฉลู") || isMatch("เถาะ", "กุน")) {
        result = { text: "คำทำนายเป็นมัธยมปานกลาง", level: "neutral" };
    }
    // 3. กลุ่มขาล/ระกา/วอก/จอ
    else if (isMatch("ขาล", "ระกา") || isMatch("ขาล", "วอก") || isMatch("ระกา", "วอก")) {
        result = { text: "เป็นคู่ที่ใช้ได้และเป็นสุขดีมาก", level: "good" };
    }
    else if (isMatch("จอ", "ระกา") || isMatch("วอก", "จอ")) {
        result = { text: "ดีนัก/ปานกลาง อยู่ด้วยกันได้", level: "good" };
    }
    else if (isMatch("ขาล", "จอ")) {
        result = { text: "มักแข่งฤทธิเดชกัน (ควรระวังการเอาชนะกัน)", level: "neutral" };
    }
    // 4. กลุ่มฉลู/มะเส็ง/มะเมีย/มะแม
    else if (isMatch("ฉลู", "มะเมีย") || isMatch("ฉลู", "มะแม") || isMatch("มะเส็ง", "มะเมีย") || isMatch("มะเส็ง", "มะแม")) {
        result = { text: "ดีนัก ท่านว่านิสัยใจคอเป็นอันเดียวกัน ดีชั่วด้วยกัน (โดยเฉพาะฝ่ายชายจะรักหญิงมาก)", level: "good" };
    }
    else if (isMatch("ฉลู", "มะโรง") || isMatch("ฉลู", "ชวด") || isMatch("มะเส็ง", "มะโรง") || isMatch("มะเส็ง", "ชวด")) {
        result = { text: "อยู่กินด้วยกันไม่ดีเลย มักหึงหวงและมีปากเสียงกัน", level: "bad" };
    }
    // 5. กลุ่มเถาะ/ปีกุน/มะโรง (พระราม-สีดา)
    else if (isMatch("ชวด", "เถาะ") || isMatch("มะโรง", "เถาะ") || isMatch("วอก", "กุน")) {
        result = { text: "สามคู่นี้ดีนัก", level: "good" };
    }
    else if (isMatch("มะโรง", "กุน")) {
        result = { text: "พอค่อยยังชั่ว แต่มักจะเป็นปากเสียงจะต้องพึงกันเหมือนพระรามกับสีดา", level: "neutral" };
    }
    else if (isMatch("เถาะ", "มะเมีย") || isMatch("กุน", "มะเมีย") || isMatch("เถาะ", "มะแม") || isMatch("กุน", "มะแม")) {
        result = { text: "ไม่ดีเลย ไม่ใคร่จะรักกันจริง หากอยู่ด้วยกันได้ก็เป็นมัธยม", level: "bad" };
    }
    // 6. กลุ่มขาล/จอ/ชวด (หึงหวง)
    else if (isMatch("ชวด", "ขาล")) {
        result = { text: "คู่นี้ดีนัก", level: "good" };
    }
    else if (isMatch("มะโรง", "จอ") || isMatch("จอ", "มะเมีย") || isMatch("จอ", "มะแม") || isMatch("ขาล", "มะเมีย") || isMatch("ขาล", "มะแม")) {
        result = { text: "ไม่ดี ไม่ค่อยเกรงใจกัน มักเกิดหึงหวงและวิวาทกัน", level: "bad" };
    }
    // 7. กลุ่มระกา/วอก (แข่งดี)
    else if (isMatch("ระกา", "มะเมีย") || isMatch("วอก", "มะเมีย") || isMatch("ระกา", "มะแม")) {
        result = { text: "อยู่ในเกณฑ์มัธยม พอใช้ได้", level: "neutral" };
    }
    else if (isMatch("ระกา", "มะโรง") || isMatch("ระกา", "ชวด") || isMatch("วอก", "มะโรง") || isMatch("วอก", "ชวด")) {
        result = { text: "ไม่ดีเลย มักแข่งดีกันเสมอ ไม่ยอมกัน", level: "bad" };
    }
    // 8. กลุ่มตกอับ (ปลายมือจากกัน)
    else if (isMatch("วอก", "เถาะ") || isMatch("ระกา", "กุน") || isMatch("วอก", "ฉลู") || isMatch("วอก", "มะเส็ง") || isMatch("ระกา", "ฉลู") || isMatch("ระกา", "มะเส็ง")) {
        result = { text: "ไม่ดีเลย มักตกอับขัดสน ต้นมือดีปลายมือต้องจากกัน หรือทะเลาะวิวาทเนืองๆ", level: "bad" };
    }
    // 9. กลุ่มหย่าร้าง (เมรี-พระรถ)
    else if (isMatch("ฉลู", "ขาล") || isMatch("มะเส็ง", "จอ") || isMatch("ฉลู", "จอ")) {
        result = { text: "พอใช้ได้ถึงปานกลาง", level: "neutral" };
    }
    else if (isMatch("มะเส็ง", "ขาล")) {
        result = { text: "ดีนัก", level: "good" };
    }
    else if (isMatch("ขาล", "เถาะ") || isMatch("ขาล", "กุน") || isMatch("จอ", "กุน")) {
        result = { text: "ไม่ดีเลย มักให้ร้ายแก่กัน และจะต้องหย่าจากกันเหมือนเมรีจากพระรถฯ", level: "bad" };
    }

    // อัปเดต UI
    display.style.display = "block";
    display.className = "result-card " + result.level;
    textContent.innerHTML = `<p>${result.text}</p>`;
}