// ========================================
// NAVIGATION SYSTEM
// ========================================

document.documentElement.style.scrollBehavior = 'smooth';

function setupNavigation() {
    const sections = {
        home: 0,
        about: 873,
        experience: 2011
    };

    const navLinks = document.querySelectorAll('[style*="left: 838px"], [style*="left: 1009px"], [style*="left: 1163px"]');
    
    navLinks.forEach((link, index) => {
        link.style.cursor = 'pointer';
        link.style.transition = 'opacity 0.3s';
        
        link.addEventListener('mouseenter', () => {
            link.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.opacity = '1';
        });
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            let targetPosition;
            
            if (index === 0) {
                targetPosition = sections.home;
            } else if (index === 1) {
                targetPosition = sections.about;
            } else if (index === 2) {
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
// POKEBALL ABOUT ME BUTTON
// ========================================

function createPokeballAboutButton() {
    // Buat container untuk tombol pokeball
    const pokeballBtn = document.createElement('button');
    pokeballBtn.id = 'pokeball-about-btn';
    pokeballBtn.style.cssText = `
        position: absolute;
        left: 350px;
        top: 640px;
        width: 80px;
        height: 80px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 20;
        transition: all 0.4s ease;
        padding: 0;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    `;

    pokeballBtn.innerHTML = `
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" fill="white"/>
            <path d="M40 2C20.67 2 4 18.67 4 38h27c0-4.97 4.03-9 9-9s9 4.03 9 9h27C76 18.67 59.33 2 40 2z" fill="#EE1515"/>
            <path d="M40 47c-4.97 0-9-4.03-9-9H4c0 19.33 16.67 36 36 36s36-16.67 36-36H49c0 4.97-4.03 9-9 9z" fill="white"/>
            <rect x="4" y="36" width="72" height="4" fill="#333"/>
            <circle cx="40" cy="38" r="12" fill="white" stroke="#333" stroke-width="3"/>
            <circle cx="40" cy="38" r="7" fill="#f0f0f0"/>
            <circle cx="40" cy="38" r="4" fill="#ddd"/>
        </svg>
    `;

    // Hover effect
    pokeballBtn.addEventListener('mouseenter', () => {
        pokeballBtn.style.transform = 'scale(1.15) rotate(360deg)';
        pokeballBtn.style.filter = 'drop-shadow(0 8px 16px rgba(238, 21, 21, 0.6))';
    });

    pokeballBtn.addEventListener('mouseleave', () => {
        pokeballBtn.style.transform = 'scale(1) rotate(0deg)';
        pokeballBtn.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
    });

    // Click event - buka modal About Me
    pokeballBtn.addEventListener('click', () => {
        openAboutMeModal();
    });

    // Tambahkan ke main container
    const mainContainer = document.querySelector('[style*="width: 1440px"]') || document.body;
    mainContainer.appendChild(pokeballBtn);
}

// ========================================
// MODAL ABOUT ME
// ========================================

function openAboutMeModal() {
    // Buat overlay modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'about-me-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
        backdrop-filter: blur(5px);
    `;

    // Buat modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
        border-radius: 25px;
        width: 90%;
        max-width: 800px;
        max-height: 85vh;
        position: relative;
        box-shadow: 0 25px 70px rgba(0,0,0,0.6);
        overflow: hidden;
        animation: slideUp 0.4s ease-out;
    `;

    // Header modal dengan gradient Pokemon theme
    const modalHeader = document.createElement('div');
    modalHeader.style.cssText = `
        background: linear-gradient(135deg, #EE1515 0%, #D51013 100%);
        padding: 30px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
    `;

    // Dekorasi pokeball di header
    modalHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px; z-index: 2;">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="23" fill="white"/>
                <path d="M25 2C13.42 2 4 11.42 4 23h15c0-3.31 2.69-6 6-6s6 2.69 6 6h15C46 11.42 36.58 2 25 2z" fill="white" opacity="0.3"/>
                <path d="M25 29c-3.31 0-6-2.69-6-6H4c0 11.58 9.42 21 21 21s21-9.42 21-21H31c0 3.31-2.69 6-6 6z" fill="white" opacity="0.5"/>
                <rect x="4" y="22" width="42" height="2" fill="white" opacity="0.4"/>
                <circle cx="25" cy="23" r="7" fill="white" opacity="0.6"/>
            </svg>
            <h2 style="color: white; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">About Me</h2>
        </div>
        <button id="close-about-modal-btn" style="background: white; border: none; border-radius: 50%; width: 45px; height: 45px; font-size: 28px; cursor: pointer; font-weight: bold; color: #D51013; z-index: 2; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: all 0.3s;">×</button>
        <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; z-index: 1;"></div>
        <div style="position: absolute; bottom: -40px; left: -40px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%; z-index: 1;"></div>
    `;

    // Body modal dengan scroll
    const modalBody = document.createElement('div');
    modalBody.style.cssText = `
        padding: 40px;
        max-height: calc(85vh - 120px);
        overflow-y: auto;
        font-family: Arial, sans-serif;
    `;

    // Konten About Me (SESUAIKAN DENGAN DATA ANDA)
    modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 25px;">
            
            <!-- Profile Card -->
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid #EE1515;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #EE1515, #D51013); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px;">
                        👤
                    </div>
                    <div>
                        <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Alvian Ditya</h3>
                        <p style="color: #666; font-size: 16px; margin: 5px 0 0 0;">Mahasiswa Sistem Informasi</p>
                    </div>
                </div>
                <p style="color: #555; line-height: 1.8; font-size: 15px; margin: 0;">
                    Saya adalah mahasiswa yang passionate dalam bidang teknologi dan programming. 
                    Saat ini sedang menempuh pendidikan di Universitas Pendidikan Ganesha dengan fokus 
                    pada pengembangan web, mobile apps, dan database systems.
                </p>
            </div>

            <!-- Skills Section -->
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid #FFB31B;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FFB31B, #FFA622); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        💻
                    </div>
                    <h3 style="color: #333; font-size: 22px; font-weight: 700; margin: 0;">Skills & Expertise</h3>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">Java Programming</span>
                    </div>
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">C Programming</span>
                    </div>
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">Web Development</span>
                    </div>
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">Database Management</span>
                    </div>
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">Project Management</span>
                    </div>
                    <div style="background: #f8f9fa; padding: 12px 18px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="color: #EE1515; font-size: 20px;">▪</span>
                        <span style="color: #555; font-size: 15px; font-weight: 600;">Team Leadership</span>
                    </div>
                </div>
            </div>

            <!-- Interests -->
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid #2196F3;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #2196F3, #1976D2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        ⭐
                    </div>
                    <h3 style="color: #333; font-size: 22px; font-weight: 700; margin: 0;">Hobi & Minat</h3>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 12px 24px; border-radius: 25px; font-size: 15px; color: #555; font-weight: 600; border: 2px solid #e0e0e0;">
                        📚 Reading
                    </div>
                    <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 12px 24px; border-radius: 25px; font-size: 15px; color: #555; font-weight: 600; border: 2px solid #e0e0e0;">
                        💭 Thinking
                    </div>
                    <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 12px 24px; border-radius: 25px; font-size: 15px; color: #555; font-weight: 600; border: 2px solid #e0e0e0;">
                        💻 Coding
                    </div>
                    <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 12px 24px; border-radius: 25px; font-size: 15px; color: #555; font-weight: 600; border: 2px solid #e0e0e0;">
                        🎮 Gaming
                    </div>
                </div>
            </div>

            <!-- Quote -->
            <div style="background: linear-gradient(135deg, #EE1515, #D51013); border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(238, 21, 21, 0.3); text-align: center;">
                <p style="color: white; font-size: 18px; font-style: italic; line-height: 1.8; margin: 0; font-weight: 500; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
                    "Through the darkest night you will always find the brightest day"
                </p>
            </div>

        </div>
    `;

    // Tambahkan animasi CSS
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Custom scrollbar */
        #about-me-modal-overlay div::-webkit-scrollbar {
            width: 8px;
        }

        #about-me-modal-overlay div::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        #about-me-modal-overlay div::-webkit-scrollbar-thumb {
            background: #EE1515;
            border-radius: 10px;
        }

        #about-me-modal-overlay div::-webkit-scrollbar-thumb:hover {
            background: #D51013;
        }

        /* Hover effect untuk close button */
        #close-about-modal-btn:hover {
            background: #EE1515 !important;
            color: white !important;
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(modalStyle);

    // Function untuk close modal
    function closeModal() {
        modalOverlay.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modalOverlay.remove();
            modalStyle.remove();
        }, 300);
    }

    // Event listeners
    const closeBtn = modalHeader.querySelector('#close-about-modal-btn');
    closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Keyboard escape
    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyPress);
        }
    });

    // Tambahkan animasi fadeOut
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);

    // Assemble modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// ========================================
// SISTEM 3 IKON DENGAN CAROUSEL
// ========================================

function createIconMenu() {
    const certificates = [
        { image: 'Sertifkat_DICODING_Java.png', title: 'Sertifikat Java Programming' },
        { image: 'Sertifkat_DICODING_C.png', title: 'Sertifikat C Programming' },
        { image: 'Sertifkat_DICODING_Manajemen.png', title: 'Sertifikat Project Management' },
        { image: 'Sertifikat_DICODING_Haksell.png', title: 'Sertifikat Haksell' },
        { image: 'Sertifikat_MPK.png', title: 'Sertifikat Sie Operator' },
        { image: 'Sertifikat_Beach.png', title: 'Sertifikat Beach Clean Up' },
        { image: 'Sertifikat_PKM.png', title: 'Sertifikat Pelatihan PKM' }
    ];

    const projects = [
        { image: 'Screenshot 2025-10-02 183448.png', title: 'Project 1 - Website Portfolio' },
        { image: 'Screenshot 2025-10-02 183750.png', title: 'Project 2 - Mobile App' },
        { image: 'Screenshot 2025-10-02 183959.png', title: 'Project 3 - System Laundry Cleanzy' },
        { image: 'WhatsApp Image 2024-12-18 at 18.22.52.jpeg', title: 'Project 4 - Jaringan' },
        { image: 'WhatsApp Image 2024-12-19 at 13.53.41.jpeg', title: 'Project 5 - Game Development' }
    ];

    const documentation = [
        { image: 'WhatsApp Image 2025-10-09 at 13.10.50.jpeg', title: 'Beach Clean Up 2025' },
        { image: 'WhatsApp Image 2025-08-30 at 21.04.52.jpeg', title: 'MPK 2025 - Sie Operator' },
        { image: 'WhatsApp Image 2025-10-02 at 18.32.51.jpeg', title: 'Dokumentasi Acara' }
    ];

    const iconContainer = document.createElement('div');
    iconContainer.id = 'icon-menu-container';
    iconContainer.style.cssText = `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 2400px;
        display: flex;
        gap: 80px;
        z-index: 15;
    `;

    const icons = [
        { id: 'certificate-icon', title: 'Sertifikat', color: '#FFD700', icon: '📜', data: certificates },
        { id: 'project-icon', title: 'Proyek', color: '#4CAF50', icon: '💼', data: projects },
        { id: 'documentation-icon', title: 'Dokumentasi', color: '#2196F3', icon: '📸', data: documentation }
    ];

    icons.forEach(iconData => {
        const iconBtn = document.createElement('button');
        iconBtn.className = 'menu-icon-btn';
        iconBtn.style.cssText = `
            background: white;
            border: 5px solid ${iconData.color};
            border-radius: 20px;
            width: 200px;
            height: 200px;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
        `;

        iconBtn.innerHTML = `
            <div style="font-size: 60px;">${iconData.icon}</div>
            <div style="font-size: 20px; font-weight: 700; color: #333; font-family: Arial;">${iconData.title}</div>
        `;

        iconBtn.addEventListener('mouseenter', () => {
            iconBtn.style.transform = 'scale(1.1) translateY(-10px)';
            iconBtn.style.boxShadow = `0 10px 30px ${iconData.color}80`;
        });

        iconBtn.addEventListener('mouseleave', () => {
            iconBtn.style.transform = 'scale(1) translateY(0)';
            iconBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });

        iconBtn.addEventListener('click', () => {
            openCarouselModal(iconData.title, iconData.data, iconData.color);
        });

        iconContainer.appendChild(iconBtn);
    });

    const mainContainer = document.querySelector('[style*="width: 1440px"]') || document.body;
    mainContainer.appendChild(iconContainer);
}

// ========================================
// MODAL CAROUSEL
// ========================================

function openCarouselModal(title, dataArray, themeColor) {
    let currentSlide = 0;

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'carousel-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 1000px;
        height: 80%;
        max-height: 700px;
        position: relative;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        overflow: hidden;
    `;

    const modalHeader = document.createElement('div');
    modalHeader.style.cssText = `
        background: ${themeColor};
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    modalHeader.innerHTML = `
        <h2 style="color: white; font-size: 28px; font-weight: 700; margin: 0; font-family: Arial;">${title}</h2>
        <button id="close-modal-btn" style="background: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; font-weight: bold; color: #333;">×</button>
    `;

    const carouselContainer = document.createElement('div');
    carouselContainer.style.cssText = `
        position: relative;
        height: calc(100% - 80px);
        overflow: hidden;
    `;

    const slidesContainer = document.createElement('div');
    slidesContainer.id = 'modal-slides-container';
    slidesContainer.style.cssText = `
        display: flex;
        transition: transform 0.5s ease-in-out;
        height: 100%;
    `;

    dataArray.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.style.cssText = `
            min-width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
        `;

        slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="max-width: 100%; max-height: 450px; object-fit: contain; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="color: #333; font-size: 24px; font-weight: 700; margin-top: 20px; font-family: Arial; text-align: center;">${item.title}</h3>
            <p style="color: #666; font-size: 16px; margin-top: 10px;">${index + 1} / ${dataArray.length}</p>
        `;

        slidesContainer.appendChild(slide);
    });

    carouselContainer.appendChild(slidesContainer);

    const prevBtn = document.createElement('button');
    prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: ${themeColor};
        border: none;
        color: white;
        font-size: 30px;
        font-weight: bold;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10;
    `;
    prevBtn.textContent = '‹';

    const nextBtn = document.createElement('button');
    nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: ${themeColor};
        border: none;
        color: white;
        font-size: 30px;
        font-weight: bold;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10;
    `;
    nextBtn.textContent = '›';

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    `;

    dataArray.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'modal-indicator';
        indicator.dataset.slide = index;
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.3s;
        `;
        indicatorsContainer.appendChild(indicator);
    });

    function updateSlide() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        const indicators = indicatorsContainer.querySelectorAll('.modal-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.style.background = themeColor;
                indicator.style.width = '30px';
            } else {
                indicator.style.background = 'rgba(0, 0, 0, 0.3)';
                indicator.style.width = '12px';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + dataArray.length) % dataArray.length;
        updateSlide();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % dataArray.length;
        updateSlide();
    });

    indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.dataset.slide) {
            currentSlide = parseInt(e.target.dataset.slide);
            updateSlide();
        }
    });

    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-50%) scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(-50%) scale(1)';
        });
    });

    function closeModal() {
        modalOverlay.remove();
    }

    modalHeader.querySelector('#close-modal-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyPress);
        } else if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + dataArray.length) % dataArray.length;
            updateSlide();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % dataArray.length;
            updateSlide();
        }
    });

    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);
    carouselContainer.appendChild(indicatorsContainer);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(carouselContainer);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    updateSlide();
}

// ========================================
// CSS ANIMATION
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ========================================
// BACK TO HOME BUTTON (POKEBALL)
// ========================================

function createBackToHomeButton() {
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
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.loop = true;
    audio.volume = 0.3;
    
    audio.innerHTML = `<source src="web_theme.mp3" type="audio/mpeg">`;
    document.body.appendChild(audio);
    
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
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            isPlaying = true;
        }
        updateButtonIcon();
    });
    
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
// PERFECT CIRCLE PERCENTAGE CHART
// ========================================

function createPerfectCircleChart() {
    // Cari elemen SVG lingkaran yang ada
    const orangeCircle = document.querySelector('[style*="left: 574px"][style*="top: 1398px"]');
    const redCircle = document.querySelector('[style*="left: 430px"][style*="top: 1398px"]');
    
    if (!orangeCircle || !redCircle) {
        console.log('Circle elements not found, creating from scratch...');
        createCircleChartFromScratch();
        return;
    }

    // Sembunyikan lingkaran lama
    orangeCircle.style.display = 'none';
    redCircle.style.display = 'none';

    // Buat container untuk chart baru
    const chartContainer = document.createElement('div');
    chartContainer.id = 'perfect-circle-chart';
    chartContainer.style.cssText = `
        position: absolute;
        left: 450px;
        top: 1420px;
        width: 300px;
        height: 300px;
        z-index: 10;
    `;

    // SVG untuk circle chart yang sempurna
    chartContainer.innerHTML = `
        <svg width="300" height="300" viewBox="0 0 300 300" style="transform: rotate(-90deg);">
            <!-- Background Circle (Abu-abu tipis) -->
            <circle 
                cx="150" 
                cy="150" 
                r="120" 
                fill="none" 
                stroke="#e0e0e0" 
                stroke-width="40"
            />
            
            <!-- Red Circle (49%) -->
            <circle 
                cx="150" 
                cy="150" 
                r="120" 
                fill="none" 
                stroke="#FF2929" 
                stroke-width="40"
                stroke-dasharray="368.7 751.5"
                stroke-linecap="round"
                style="transition: stroke-dasharray 1s ease-in-out;"
            />
            
            <!-- Orange Circle (51%) -->
            <circle 
                cx="150" 
                cy="150" 
                r="120" 
                fill="none" 
                stroke="#FB700E" 
                stroke-width="40"
                stroke-dasharray="383.8 751.5"
                stroke-dashoffset="-368.7"
                stroke-linecap="round"
                style="transition: stroke-dasharray 1s ease-in-out;"
            />
            
            <!-- Center White Circle -->
            <circle 
                cx="150" 
                cy="150" 
                r="80" 
                fill="white"
            />
        </svg>
        
        <!-- Label 49% (Merah) -->
        <div style="
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            font-size: 36px;
            font-weight: 700;
            color: #FF2929;
            font-family: Arial;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            z-index: 15;
        ">49%</div>
        
        <!-- Label 51% (Oranye) -->
        <div style="
            position: absolute;
            left: 50%;
            top: 60%;
            transform: translate(-50%, -50%);
            font-size: 36px;
            font-weight: 700;
            color: #FB700E;
            font-family: Arial;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            z-index: 15;
        ">51%</div>
        
        <!-- Legend -->
        <div style="
            position: absolute;
            left: 50%;
            bottom: -60px;
            transform: translateX(-50%);
            display: flex;
            gap: 30px;
            font-family: Arial;
        ">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 20px; height: 20px; background: #FF2929; border-radius: 50%;"></div>
                <span style="font-size: 16px; font-weight: 600; color: #333;">Introvert</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 20px; height: 20px; background: #FB700E; border-radius: 50%;"></div>
                <span style="font-size: 16px; font-weight: 600; color: #333;">Extrovert</span>
            </div>
        </div>
    `;

    // Tambahkan ke main container
    const mainContainer = document.querySelector('[style*="width: 1440px"]') || document.body;
    mainContainer.appendChild(chartContainer);

    // Animasi saat chart muncul
    setTimeout(() => {
        const circles = chartContainer.querySelectorAll('circle[stroke-dasharray]');
        circles.forEach(circle => {
            circle.style.strokeDasharray = circle.getAttribute('stroke-dasharray');
        });
    }, 100);

    // Sembunyikan text percentage yang lama
    const oldPercentTexts = document.querySelectorAll('[style*="left: 475px"][style*="top: 1539px"], [style*="left: 638px"][style*="top: 1527px"]');
    oldPercentTexts.forEach(text => text.style.display = 'none');
}

// Fungsi alternatif jika elemen tidak ditemukan
function createCircleChartFromScratch() {
    const chartContainer = document.createElement('div');
    chartContainer.id = 'perfect-circle-chart-new';
    chartContainer.style.cssText = `
        position: absolute;
        left: 470px;
        top: 1380px;
        width: 320px;
        height: 320px;
        z-index: 10;
    `;

    chartContainer.innerHTML = `
        <svg width="320" height="320" viewBox="0 0 320 320">
            <defs>
                <!-- Gradient untuk efek glossy -->
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF3F3F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF2929;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FC8831;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FB700E;stop-opacity:1" />
                </linearGradient>
                
                <!-- Shadow filter -->
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                    <feOffset dx="0" dy="4" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Outer Ring Background -->
            <circle 
                cx="160" 
                cy="160" 
                r="130" 
                fill="none" 
                stroke="#f0f0f0" 
                stroke-width="45"
                filter="url(#shadow)"
            />
            
            <!-- Red Segment (49%) -->
            <circle 
                cx="160" 
                cy="160" 
                r="130" 
                fill="none" 
                stroke="url(#redGradient)" 
                stroke-width="45"
                stroke-dasharray="400 817"
                stroke-linecap="round"
                transform="rotate(-90 160 160)"
                class="animated-circle"
            />
            
            <!-- Orange Segment (51%) -->
            <circle 
                cx="160" 
                cy="160" 
                r="130" 
                fill="none" 
                stroke="url(#orangeGradient)" 
                stroke-width="45"
                stroke-dasharray="417 817"
                stroke-dashoffset="-400"
                stroke-linecap="round"
                transform="rotate(-90 160 160)"
                class="animated-circle"
            />
            
            <!-- Inner White Circle with Shadow -->
            <circle 
                cx="160" 
                cy="160" 
                r="95" 
                fill="white"
                filter="url(#shadow)"
            />
            
            <!-- Center Decoration Circle -->
            <circle 
                cx="160" 
                cy="160" 
                r="85" 
                fill="none"
                stroke="#f8f8f8"
                stroke-width="2"
            />
        </svg>
        
        <!-- Percentage Labels dengan style modern -->
        <div style="
            position: absolute;
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%);
            text-align: center;
        ">
            <div style="
                font-size: 42px;
                font-weight: 700;
                color: #FF2929;
                font-family: Arial;
                text-shadow: 0 2px 8px rgba(255, 41, 41, 0.3);
                margin-bottom: 5px;
            ">49%</div>
            <div style="
                font-size: 14px;
                font-weight: 600;
                color: #666;
                font-family: Arial;
            ">Introvert</div>
        </div>
        
        <div style="
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ddd 20%, #ddd 80%, transparent);
        "></div>
        
        <div style="
            position: absolute;
            left: 50%;
            top: 65%;
            transform: translate(-50%, -50%);
            text-align: center;
        ">
            <div style="
                font-size: 42px;
                font-weight: 700;
                color: #FB700E;
                font-family: Arial;
                text-shadow: 0 2px 8px rgba(251, 112, 14, 0.3);
                margin-bottom: 5px;
            ">51%</div>
            <div style="
                font-size: 14px;
                font-weight: 600;
                color: #666;
                font-family: Arial;
            ">Extrovert</div>
        </div>
    `;

    // CSS Animation
    const style = document.createElement('style');
    style.textContent = `
        .animated-circle {
            animation: drawCircle 2s ease-in-out forwards;
        }
        
        @keyframes drawCircle {
            from {
                stroke-dasharray: 0 817;
            }
        }
        
        #perfect-circle-chart-new:hover svg circle[stroke*="Gradient"] {
            filter: brightness(1.1);
            transition: filter 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    const mainContainer = document.querySelector('[style*="width: 1440px"]') || document.body;
    mainContainer.appendChild(chartContainer);
}

// ========================================
// INITIALIZE SEMUA FUNGSI
// ========================================

function initializeAll() {
    setupNavigation();
    createIconMenu(); 
    createBackToHomeButton();
    createMusicPlayer();
    createPokeballAboutButton();
    createPerfectCircleChart();
    console.log('✅ Semua fitur berhasil diinisialisasi!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}
