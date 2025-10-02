// ========================================
// NAVIGATION SYSTEM
// ========================================

// Tambahkan smooth scrolling ke HTML
document.documentElement.style.scrollBehavior = 'smooth';

// Fungsi untuk menambahkan event listener ke navigation links
function setupNavigation() {
    // Definisikan section positions berdasarkan kode HTML Anda
    const sections = {
        home: 0,
        about: 873,
        experience: 2011
    };

    // Cari semua elemen navigation
    const navLinks = document.querySelectorAll('[style*="left: 838px"], [style*="left: 1009px"], [style*="left: 1163px"]');
    
    navLinks.forEach((link, index) => {
        link.style.cursor = 'pointer';
        link.style.transition = 'opacity 0.3s';
        
        // Tambahkan hover effect
        link.addEventListener('mouseenter', () => {
            link.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.opacity = '1';
        });
        
        // Tambahkan click event
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let targetPosition;
            
            if (index === 0) { // Home
                targetPosition = sections.home;
            } else if (index === 1) { // About
                targetPosition = sections.about;
            } else if (index === 2) { // Experience
                targetPosition = sections.experience;
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ========================================
// CAROUSEL SYSTEM UNTUK SERTIFIKAT
// ========================================

function createCertificateCarousel() {
    // Data sertifikat (ganti dengan path gambar Anda yang sebenarnya)
    const certificates = [
        { id: 1, image: 'Sertifikat_MPK.png', title: 'Sertifikat 1' },
        { id: 2, image: 'Sertifikat_Beach.png', title: 'Sertifikat 2' },
        { id: 3, image: 'Sertifikat_PKM.png', title: 'Sertifikat 3' },
        { id: 4, image: 'Sertifkat_DICODING_C.png', title: 'Sertifikat 4' },
        { id: 5, image: 'Sertifkat_DICODING_Java.png', title: 'Sertifikat 5' },
        { id: 6, image: 'Sertifkat_DICODING_Manajemen.png', title: 'Sertifikat 6' }
    ];

    let currentSlide = 0;

    // Buat container carousel
    const carouselContainer = document.createElement('div');
    carouselContainer.id = 'certificate-carousel';
    carouselContainer.style.cssText = `
        position: absolute;
        left: 100px;
        top: 2250px;
        width: 1240px;
        height: 550px;
        z-index: 10;
    `;

    // Buat carousel HTML
    carouselContainer.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden; backdrop-filter: blur(10px);">
            <!-- Slides Container -->
            <div id="slides-container" style="display: flex; transition: transform 0.5s ease-in-out; height: 100%;">
                ${certificates.map((cert, index) => `
                    <div class="carousel-slide" style="min-width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 30px;">
                        <div style="text-align: center;">
                            <img src="${cert.image}" alt="${cert.title}" style="max-width: 800px; max-height: 250px; object-fit: contain; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <h3 style="color: white; font-size: 24px; font-weight: 700; margin-top: 15px; font-family: Arial;">${cert.title}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Previous Button -->
            <button id="prev-btn" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.3); border: none; color: white; font-size: 30px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; transition: all 0.3s; z-index: 20;">
                ‹
            </button>

            <!-- Next Button -->
            <button id="next-btn" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.3); border: none; color: white; font-size: 30px; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; transition: all 0.3s; z-index: 20;">
                ›
            </button>

            <!-- Indicators -->
            <div id="indicators" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 20;">
                ${certificates.map((_, index) => `
                    <div class="indicator" data-slide="${index}" style="width: 12px; height: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.5); cursor: pointer; transition: all 0.3s;"></div>
                `).join('')}
            </div>
        </div>
    `;

    // Tambahkan carousel ke dalam experience section
    const mainContainer = document.querySelector('[style*="width: 1440px; height: 2949px"]');
    mainContainer.appendChild(carouselContainer);

    // Fungsi untuk update slide
    function updateSlide() {
        const slidesContainer = document.getElementById('slides-container');
        const indicators = document.querySelectorAll('.indicator');
        
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.style.background = 'white';
                indicator.style.width = '30px';
            } else {
                indicator.style.background = 'rgba(255, 255, 255, 0.5)';
                indicator.style.width = '12px';
            }
        });
    }

    // Event listeners untuk tombol
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + certificates.length) % certificates.length;
        updateSlide();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % certificates.length;
        updateSlide();
    });

    // Event listeners untuk indicators
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currentSlide = parseInt(e.target.dataset.slide);
            updateSlide();
        });
    });

    // Hover effects untuk tombol
    const buttons = document.querySelectorAll('#prev-btn, #next-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.5)';
            btn.style.transform = 'translateY(-50%) scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(255, 255, 255, 0.3)';
            btn.style.transform = 'translateY(-50%) scale(1)';
        });
    });

    // Auto-play carousel (optional)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % certificates.length;
        updateSlide();
    }, 5000); // Ganti slide setiap 5 detik

    // Initialize
    updateSlide();
}

// ========================================
// BACK TO HOME BUTTON (POKEBALL)
// ========================================

function createBackToHomeButton() {
    // Buat tombol Pokeball floating
    const backToHomeBtn = document.createElement('button');
    backToHomeBtn.id = 'back-to-home-btn';
    backToHomeBtn.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        width: 70px;
        height: 70px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 0;
    `;

    backToHomeBtn.innerHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="37" r="32" fill="rgba(0,0,0,0.2)"/>
            <circle cx="35" cy="35" r="32" fill="white"/>
            <path d="M35 3C17.91 3 3 17.91 3 35h24c0-4.42 3.58-8 8-8s8 3.58 8 8h24C67 17.91 52.09 3 35 3z" fill="#EE1515"/>
            <path d="M35 43c-4.42 0-8-3.58-8-8H3c0 17.09 14.91 32 32 32s32-14.91 32-32H43c0 4.42-3.58 8-8 8z" fill="white"/>
            <rect x="3" y="33" width="64" height="4" fill="#333"/>
            <circle cx="35" cy="35" r="10" fill="white" stroke="#333" stroke-width="3"/>
            <circle cx="35" cy="35" r="6" fill="#f0f0f0"/>
            <path d="M35 30 L38 33 L36 33 L36 37 L34 37 L34 33 L32 33 Z" fill="#333"/>
        </svg>
    `;

    document.body.appendChild(backToHomeBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToHomeBtn.style.opacity = '1';
            backToHomeBtn.style.visibility = 'visible';
        } else {
            backToHomeBtn.style.opacity = '0';
            backToHomeBtn.style.visibility = 'hidden';
        }
    });

    backToHomeBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToHomeBtn.addEventListener('mouseenter', () => {
        backToHomeBtn.style.transform = 'scale(1.15) rotate(360deg)';
        backToHomeBtn.style.filter = 'drop-shadow(0 8px 20px rgba(238, 21, 21, 0.6))';
    });

    backToHomeBtn.addEventListener('mouseleave', () => {
        backToHomeBtn.style.transform = 'scale(1) rotate(0deg)';
        backToHomeBtn.style.filter = 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))';
    });
}

// ========================================
// BACKGROUND MUSIC PLAYER
// ========================================

function createMusicPlayer() {
    // Buat audio element
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.loop = true; // Loop musik
    audio.volume = 0.3; // Volume 30%
    
    // Tambahkan source musik (ganti dengan path file musik Anda)
    audio.innerHTML = `
        <source src="web_theme.mp3" type="audio/mpeg">

    `;
    
    document.body.appendChild(audio);
    
    // Buat tombol kontrol musik (Pokeball style)
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-control-btn';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 40px;
        width: 60px;
        height: 60px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        padding: 0;
    `;
    
    let isPlaying = false;
    
    // SVG untuk tombol musik (Pokeball dengan note)
    function updateButtonIcon() {
        musicBtn.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="white"/>
                <path d="M30 2C14.536 2 2 14.536 2 30h20c0-4.418 3.582-8 8-8s8 3.582 8 8h20C58 14.536 45.464 2 30 2z" fill="#EE1515"/>
                <path d="M30 38c-4.418 0-8-3.582-8-8H2c0 15.464 12.536 28 28 28s28-12.536 28-28H38c0 4.418-3.582 8-8 8z" fill="white"/>
                <rect x="2" y="28" width="56" height="4" fill="#333"/>
                <circle cx="30" cy="30" r="8" fill="white" stroke="#333" stroke-width="2"/>
                ${isPlaying ? 
                    '<path d="M26 26h3v8h-3V26zm5 0h3v8h-3V26z" fill="#333"/>' : 
                    '<path d="M27 26l6 4-6 4V26z" fill="#333"/>'
                }
            </svg>
        `;
    }
    
    updateButtonIcon();
    document.body.appendChild(musicBtn);
    
    // Event listener untuk tombol
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
        updateButtonIcon();
    });
    
    // Hover effect
    musicBtn.addEventListener('mouseenter', () => {
        musicBtn.style.transform = 'scale(1.1) rotate(15deg)';
        musicBtn.style.filter = 'drop-shadow(0 5px 15px rgba(238, 21, 21, 0.5))';
    });
    
    musicBtn.addEventListener('mouseleave', () => {
        musicBtn.style.transform = 'scale(1) rotate(0deg)';
        musicBtn.style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))';
    });
}

// ========================================
// INITIALIZE SEMUA FUNGSI
// ========================================

// Tunggu hingga DOM fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    createCertificateCarousel();
    createBackToHomeButton();
    createMusicPlayer()
    console.log('Navigation dan Carousel berhasil diinisialisasi!');
});

// Jika DOM sudah loaded (untuk kasus script dijalankan setelah page load)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupNavigation();
    createCertificateCarousel();
    createBackToHomeButton();
    console.log('Navigation, Carousel, dan Back to Home berhasil diinisialisasi!');
    
}