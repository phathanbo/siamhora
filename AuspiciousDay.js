function renderAuspiciousTable() {
    const waxingData = {
        "1": "ทำการมงคลดี ไปทางบกดี ทางเรือไม่ดี", "2": "ห้ามทำการมงคลไม่ดี",
        "3": "ห้ามทำการมงคลไม่ดีจะตายจากกัน ไปหาขุนนางดี ไปค้าขายดีมีลาภ",
        "4": "ทำการมงคลดีมีลาภ ไปทางบกดี ทางเรือไม่ดี", "5": "ห้ามทำการมงคล (ตำราเว้นไว้)",
        "6": "ทำการมงคลดี ไปทางบกดี ทางเรือไม่ดี", "7": "ห้ามทำการมงคลไม่ดีเลย",
        "8": "ทำการมงคลดี", "9": "ทำการมงคลดีมีลาภ เข้าหาท่านผู้ใหญ่ไม่ดี",
        "10": "ทำการมงคลดี ผู้ใหญ่จะให้ลาภ", "11": "ทำการมงคลดีทุกประการ",
        "12": "ทำการมงคลไม่ดี ไปทางอื่นมีลาภ", "13": "ทำการมงคลไม่ดี ร้ายมาก",
        "14": "ทำการมงคลไม่ดี ร้ายมาก", "15": "ทำการมงคลดี ไปค้าขายดีมีลาภเพราะผู้ใหญ่"
    };

    const waningData = {
        "1": "ทำการมงคลดี ไปค้าขายมีลาภ", "2": "ห้ามทำการมงคลไม่ดี",
        "3": "ทำการมงคลไม่ดี อย่าทำเลย", "4": "ทำการมงคลดี ไปหาขุนนางไม่ดี",
        "5": "ทำการมงคลไม่ดี", "6": "ทำการมงคลมีลาภ",
        "7": "ทำการมงคลมีลาภ เข้าหาขุนนางดี", "8": "ทำการมงคลไม่ดี ไปค้าขายดีมีลาภ",
        "9": "ทำการมงคลดี ไปทางเรือไม่ดี", "10": "ทำการมงคลไม่ดีจะป่วยไข้",
        "11": "ทำการมงคลดี ไปค้าขายจะมีโชค", "12": "ทำการมงคลไม่ดี ไปค้าขายจะพบโชคเหมาะ",
        "13": "ทำการมงคลดีจะได้เป็นใหญ่", "14": "ทำการมงคลดี ไถ่ข้าคนดีจะมีลาภ",
        "15": "ทำการมงคลไปค้าขายจะมีลาภ"
    };

    const waxBody = document.getElementById('waxingTableBody');
    const wanBody = document.getElementById('waningTableBody');

    // Render ข้างขึ้น
    let waxHTML = "";
    for (let i = 1; i <= 15; i++) {
        let text = waxingData[i.toString()];
        let statusClass = text.includes("มงคลดี") || text.includes("มีลาภ") ? "text-success" : (text.includes("ห้าม") || text.includes("ไม่ดี") ? "text-danger" : "");
        waxHTML += `<tr><td>ขึ้น ${i} ค่ำ</td><td class="${statusClass}">${text}</td></tr>`;
    }
    waxBody.innerHTML = waxHTML;

    // Render ข้างแรม
    let wanHTML = "";
    for (let i = 1; i <= 15; i++) {
        let text = waningData[i.toString()];
        let statusClass = text.includes("มงคลดี") || text.includes("มีลาภ") ? "text-success" : (text.includes("ห้าม") || text.includes("ไม่ดี") ? "text-danger" : "");
        wanHTML += `<tr><td>แรม ${i} ค่ำ</td><td class="${statusClass}">${text}</td></tr>`;
    }
    wanBody.innerHTML = wanHTML;
}

// เรียกใช้งานทันที
document.addEventListener('DOMContentLoaded', renderAuspiciousTable);