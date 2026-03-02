/* ===================================================
   BUSINESS CARD — Interactions
   Click-to-flip + City Scramble Effect
   =================================================== */

(function () {
    'use strict';

    const card = document.getElementById('businessCard');
    const hint = document.getElementById('hint');
    const cityEl = document.getElementById('cityScramble');

    if (!card) return;

    /* ---------- Click to Flip ---------- */
    card.addEventListener('click', function () {
        card.classList.toggle('flipped');
        if (hint) hint.classList.add('hidden');
    });

    /* ---------- Vietnamese Provinces (post-merger, no diacritics) ---------- */
    const provinces = [
        'Ha Noi', 'Ho Chi Minh', 'Hai Phong', 'Da Nang', 'Can Tho',
        'Thanh Hoa', 'Nghe An', 'Ha Tinh', 'Quang Binh', 'Quang Tri',
        'Thua Thien Hue', 'Quang Nam', 'Quang Ngai', 'Binh Dinh',
        'Phu Yen', 'Khanh Hoa', 'Ninh Thuan', 'Binh Thuan',
        'Dak Lak', 'Gia Lai', 'Kon Tum', 'Lam Dong',
        'Binh Phuoc', 'Tay Ninh', 'Binh Duong', 'Dong Nai',
        'Ba Ria Vung Tau', 'Long An', 'Tien Giang', 'Ben Tre',
        'Tra Vinh', 'Vinh Long', 'Dong Thap', 'An Giang',
        'Kien Giang', 'Hau Giang', 'Soc Trang', 'Bac Lieu', 'Ca Mau',
        'Thai Nguyen', 'Bac Giang', 'Phu Tho', 'Vinh Phuc',
        'Bac Ninh', 'Hai Duong', 'Hung Yen', 'Ha Nam',
        'Nam Dinh', 'Thai Binh', 'Ninh Binh',
        'Quang Ninh', 'Lang Son', 'Cao Bang', 'Bac Kan',
        'Tuyen Quang', 'Ha Giang', 'Lao Cai', 'Yen Bai',
        'Lai Chau', 'Dien Bien', 'Son La', 'Hoa Binh',
        'Dak Nong'
    ];

    /* ---------- Scramble Engine ---------- */
    const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const SCRAMBLE_DURATION = 1200;  // ms for full resolve
    const PAUSE_DURATION = 3000;     // ms to stay on resolved text
    const FRAME_INTERVAL = 40;       // ms between scramble frames

    let currentIndex = provinces.indexOf('Ho Chi Minh');
    if (currentIndex === -1) currentIndex = 0;

    function scrambleTo(targetText, element, callback) {
        const length = Math.max(element.textContent.length, targetText.length);
        const totalFrames = Math.floor(SCRAMBLE_DURATION / FRAME_INTERVAL);
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            let result = '';
            for (let i = 0; i < targetText.length; i++) {
                if (targetText[i] === ' ') {
                    result += ' ';
                } else if (progress > (i / targetText.length) * 0.8 + 0.2) {
                    // Character resolved
                    result += targetText[i];
                } else {
                    // Still scrambling
                    result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }
            }

            element.textContent = result;

            if (frame >= totalFrames) {
                clearInterval(interval);
                element.textContent = targetText;
                if (callback) callback();
            }
        }, FRAME_INTERVAL);
    }

    function nextScramble() {
        // Pick a random province, different from current
        var nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * provinces.length);
        } while (nextIndex === currentIndex && provinces.length > 1);
        currentIndex = nextIndex;

        scrambleTo(provinces[currentIndex], cityEl, function () {
            setTimeout(nextScramble, PAUSE_DURATION);
        });
    }

    /* ---------- Start Scramble Loop ---------- */
    if (cityEl) {
        // Start after initial pause
        setTimeout(nextScramble, PAUSE_DURATION);
    }

    /* ---------- Disable right-click ---------- */
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

})();