"use strict";

/**
 * ระบบตรวจสอบรหัสผ่าน - สยามโหรามงคล
 * ===========================================
 * เปลี่ยนรหัสผ่านได้ที่ USERS ด้านล่าง
 * password จะถูกเปรียบเทียบแบบ hash (SHA-256)
 */

const AUTH_CONFIG = {
    // กำหนดอายุ session (ชั่วโมง) - 0 = ต้องล็อกอินทุกครั้ง
    sessionHours: 8,
    // ชื่อ key ที่บันทึกใน localStorage
    storageKey: 'siamhora_auth_session',
    // จำนวนครั้งที่พิมพ์ผิดก่อนล็อค (นาที)
    maxAttempts: 5,
    lockMinutes: 15
};

// ===================================================
// 📌 กำหนดรหัสผ่านที่นี่
// ใช้ SHA-256 hash เพื่อความปลอดภัย
// สร้าง hash ได้ที่: https://emn178.github.io/online-tools/sha256.html
// รหัสผ่านเริ่มต้น: "hora2024" (เปลี่ยนได้ทันที)
// ===================================================
const USERS = [
    {
        username: "admin",
        // รหัสผ่าน: hora2024
        passwordHash: "1035cdf4255b95ca16f9240a9cd8c13b8415d5bc3575ea8b20116296655486e8",
        displayName: "ประธานโบ้",    
        role: "admin"
    },
    {
        username: "user",
        // รหัสผ่าน: 1234
        passwordHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
        displayName: "ผู้ใช้งาน",
        role: "user"
    }
];

// ===================================================
// ฟังก์ชัน SHA-256 (ใช้ Web Crypto API)
// ===================================================
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===================================================
// จัดการ Session
// ===================================================
function getSession() {
    try {
        const raw = localStorage.getItem(AUTH_CONFIG.storageKey);
        if (!raw) return null;
        const session = JSON.parse(raw);
        if (!session || !session.expiry) return null;
        if (Date.now() > session.expiry) {
            localStorage.removeItem(AUTH_CONFIG.storageKey);
            return null;
        }
        return session;
    } catch {
        return null;
    }
}

function saveSession(user) {
    const expiry = AUTH_CONFIG.sessionHours > 0
        ? Date.now() + AUTH_CONFIG.sessionHours * 3600 * 1000
        : Date.now() + 365 * 24 * 3600 * 1000; // ถ้า 0 = ไม่หมดอายุ
    const session = {
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        expiry: expiry,
        loginAt: new Date().toISOString()
    };
    localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(session));
    return session;
}

function clearSession() {
    localStorage.removeItem(AUTH_CONFIG.storageKey);
}

// ===================================================
// จัดการ Login Attempts (กันเดารหัส)
// ===================================================
function getAttempts() {
    try {
        const raw = localStorage.getItem('siamhora_auth_attempts');
        if (!raw) return { count: 0, lockUntil: 0 };
        return JSON.parse(raw);
    } catch {
        return { count: 0, lockUntil: 0 };
    }
}

function saveAttempts(data) {
    localStorage.setItem('siamhora_auth_attempts', JSON.stringify(data));
}

function resetAttempts() {
    localStorage.removeItem('siamhora_auth_attempts');
}

function isLocked() {
    const attempts = getAttempts();
    if (attempts.lockUntil && Date.now() < attempts.lockUntil) {
        return Math.ceil((attempts.lockUntil - Date.now()) / 60000);
    }
    return 0;
}

// ===================================================
// UI Functions
// ===================================================
function showLoginOverlay() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
    }
    // ซ่อน body content
    document.body.style.overflow = 'hidden';
}

function hideLoginOverlay() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 400);
    }
    document.body.style.overflow = '';
}

function showAuthError(message) {
    const errorEl = document.getElementById('authError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        errorEl.style.animation = 'none';
        setTimeout(() => { errorEl.style.animation = 'authShake 0.4s ease'; }, 10);
    }
}

function clearAuthError() {
    const errorEl = document.getElementById('authError');
    if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
    }
}

function setLoginLoading(isLoading) {
    const btn = document.getElementById('authSubmitBtn');
    const spinner = document.getElementById('authSpinner');
    const btnText = document.getElementById('authBtnText');
    if (btn) btn.disabled = isLoading;
    if (spinner) spinner.style.display = isLoading ? 'inline-block' : 'none';
    if (btnText) btnText.textContent = isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ';
}

// ===================================================
// ฟังก์ชันหลัก: Login
// ===================================================
async function doLogin() {
    clearAuthError();

    // เช็คว่าถูกล็อคอยู่หรือไม่
    const lockMin = isLocked();
    if (lockMin > 0) {
        showAuthError(`⛔ ระบบถูกล็อค กรุณารออีก ${lockMin} นาที`);
        return;
    }

    const usernameInput = document.getElementById('authUsername');
    const passwordInput = document.getElementById('authPassword');
    const username = (usernameInput?.value || '').trim().toLowerCase();
    const password = passwordInput?.value || '';

    if (!username || !password) {
        showAuthError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        return;
    }

    setLoginLoading(true);

    try {
        const hash = await sha256(password);
        const user = USERS.find(u => u.username === username && u.passwordHash === hash);

        if (user) {
            // ✅ Login สำเร็จ
            resetAttempts();
            const session = saveSession(user);
            showWelcomeMessage(session.displayName);

            setTimeout(() => {
                hideLoginOverlay();
                updateUserBadge(session);
            }, 1200);

        } else {
            // ❌ Login ล้มเหลว
            const attempts = getAttempts();
            attempts.count = (attempts.count || 0) + 1;

            if (attempts.count >= AUTH_CONFIG.maxAttempts) {
                attempts.lockUntil = Date.now() + AUTH_CONFIG.lockMinutes * 60 * 1000;
                saveAttempts(attempts);
                showAuthError(`⛔ พิมพ์ผิดเกิน ${AUTH_CONFIG.maxAttempts} ครั้ง ระบบล็อค ${AUTH_CONFIG.lockMinutes} นาที`);
            } else {
                saveAttempts(attempts);
                const remaining = AUTH_CONFIG.maxAttempts - attempts.count;
                showAuthError(`❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (เหลืออีก ${remaining} ครั้ง)`);
            }

            // ล้างรหัสผ่าน
            if (passwordInput) passwordInput.value = '';
        }
    } catch (err) {
        console.error('Login error:', err);
        showAuthError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
        setLoginLoading(false);
    }
}

function showWelcomeMessage(name) {
    const box = document.getElementById('authFormBox');
    if (!box) return;
    box.innerHTML = `
        <div style="text-align:center; padding: 20px 0;">
            <div style="font-size: 64px; margin-bottom: 16px; animation: authPop 0.5s ease;">✨</div>
            <h3 style="color:#d4af37; margin-bottom: 8px;">ยินดีต้อนรับ</h3>
            <p style="color:#fff; font-size: 1.2rem;">${name}</p>
            <p style="color:#aaa; font-size: 0.9rem;">กำลังเข้าสู่ระบบ...</p>
        </div>
    `;
}

function updateUserBadge(session) {
    const badge = document.getElementById('authUserBadge');
    if (badge) {
        badge.innerHTML = `
            <span style="color:#d4af37; font-size:0.85rem;">
                <i class="fas fa-user-circle mr-1"></i>${session.displayName}
                <button onclick="doLogout()" class="btn btn-link btn-sm p-0 ml-2"
                    style="color:#ff6b6b; font-size:0.75rem; text-decoration:none; vertical-align:middle;">
                    <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
                </button>
            </span>
        `;
        badge.style.display = 'inline-block';
    }
}

// ===================================================
// Logout
// ===================================================
function doLogout() {
    if (!confirm('ต้องการออกจากระบบใช่หรือไม่?')) return;
    clearSession();
    location.reload();
}

// ===================================================
// ตรวจสอบการล็อกอิน ณ เวลาโหลดหน้า
// ===================================================
function checkAuth() {
    const session = getSession();
    if (session) {
        // มี session ที่ยังไม่หมดอายุ → ซ่อน overlay ทันที
        hideLoginOverlay();
        updateUserBadge(session);
    } else {
        // ไม่มี session → แสดง overlay
        showLoginOverlay();
    }
}

// ===================================================
// Event Listeners
// ===================================================
document.addEventListener('DOMContentLoaded', function () {
    checkAuth();

    // Enter key บน form
    const passInput = document.getElementById('authPassword');
    const userInput = document.getElementById('authUsername');

    if (passInput) {
        passInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doLogin();
        });
    }
    if (userInput) {
        userInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const passEl = document.getElementById('authPassword');
                if (passEl) passEl.focus();
            }
        });
    }

    // แสดงการนับถอยหลังถ้าถูกล็อค
    const lockMin = isLocked();
    if (lockMin > 0) {
        showLoginOverlay();
        showAuthError(`⛔ ระบบถูกล็อค กรุณารออีก ${lockMin} นาที`);
        startLockCountdown();
    }
});

function startLockCountdown() {
    const interval = setInterval(() => {
        const lockMin = isLocked();
        if (lockMin <= 0) {
            clearInterval(interval);
            clearAuthError();
            resetAttempts();
        } else {
            showAuthError(`⛔ ระบบถูกล็อค กรุณารออีก ${lockMin} นาที`);
        }
    }, 10000);
}

// Export สำหรับ global scope
window.doLogin = doLogin;
window.doLogout = doLogout;
window.checkAuth = checkAuth;
