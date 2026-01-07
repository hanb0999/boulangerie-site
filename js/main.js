// LOADER
window.addEventListener('DOMContentLoaded', function() {
    const percentDisplay = document.getElementById('load-percentage');
    const loaderLine = document.querySelector('.loader-line');
    let currentPercent = 0;
    
    const progressInterval = setInterval(() => {
        if (currentPercent < 85) {
            currentPercent += Math.floor(Math.random() * 3) + 1;
        } else if (currentPercent < 99) {
            currentPercent += 0.2;
        }

        if (percentDisplay) {
            percentDisplay.textContent = Math.floor(currentPercent);
        }
        if (loaderLine) {
            loaderLine.style.width = Math.floor(currentPercent) + "%";
        }
    }, 50);

    window.addEventListener('load', function() {
        clearInterval(progressInterval);
        
        if (percentDisplay) percentDisplay.textContent = "100";
        if (loaderLine) loaderLine.style.width = "100%";

        setTimeout(() => {
            document.body.classList.add('loaded');
            
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) loader.style.display = 'none';
            }, 1200);
        }, 500);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // NAVIGATION
    window.addEventListener('scroll', function() {
        const stickyNav = document.getElementById('sticky-nav');
        const heroHeight = window.innerHeight; 
        if (window.scrollY >= heroHeight) {
            stickyNav.classList.add('is-visible');
        } else {
            stickyNav.classList.remove('is-visible');
        }
    });

    // SLIDER
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    if(slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(nextSlide, 5000);
    }

    // ROLL LINK
    document.querySelectorAll('.roll-link').forEach(link => {
        const text = link.textContent.trim();
        link.textContent = '';
        [...text].forEach(letter => {
            const span = document.createElement('span');
            span.classList.add('letter');
            span.textContent = letter === ' ' ? '\u00A0' : letter;

            span.setAttribute('data-letter', letter === ' ' ? '\u00A0' : letter);
            
            link.appendChild(span);
        });
    });

    //NAV LOGO BACK TO TOP
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const easing = "cubic-bezier(0.2, 0, 0.2, 1)";

    // ABOUT US
    const animateAboutSection = () => {
        const topRow = document.querySelector('.top-row');
        const bottomRow = document.querySelector('.bottom-row');

        const topImg = document.querySelector('.top-row .about-image-wrapper');
        const topText = document.querySelector('.top-row .v-jp-text');
        const topIcon = document.querySelector('.floating-pastry');

        [topImg, topText, topIcon].forEach(el => el.style.opacity = "0");
        topImg.style.transform = "translateY(40px)";
        topText.style.transform = "translateX(30px)";
        topIcon.style.transform = "scale(0.8) translateY(20px)";

        const botText = document.querySelector('.bottom-row .v-jp-text');
        const botIcon = document.querySelector('.floating-bread');
        const botImg = document.querySelector('.bottom-row .about-image-wrapper');

        [botText, botIcon, botImg].forEach(el => el.style.opacity = "0");
        botText.style.transform = "translateX(-30px)";
        botIcon.style.transform = "scale(0.8) translateY(20px)";
        botImg.style.transform = "translateY(40px)";

        const observerOptions = { threshold: 0.2 };

        const topObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                topImg.style.transition = `opacity 1.5s ${easing} 0s, transform 1.5s ${easing} 0s`;
                topText.style.transition = `opacity 1.5s ${easing} 0.6s, transform 1.5s ${easing} 0.6s`;
                topIcon.style.transition = `opacity 1.2s ${easing} 1.2s, transform 1.2s ${easing} 1.2s`;
                
                topImg.style.opacity = "1"; topImg.style.transform = "translateY(0)";
                topText.style.opacity = "1"; topText.style.transform = "translateX(0)";
                topIcon.style.opacity = "1"; topIcon.style.transform = "scale(1) translateY(0)";
                topObserver.unobserve(topRow);
            }
        }, observerOptions);

        const botObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                botText.style.transition = `opacity 1.5s ${easing} 0s, transform 1.5s ${easing} 0s`;
                botIcon.style.transition = `opacity 1.2s ${easing} 0.6s, transform 1.2s ${easing} 0.6s`;
                botImg.style.transition = `opacity 1.5s ${easing} 1.2s, transform 1.5s ${easing} 1.2s`;
                
                botText.style.opacity = "1"; botText.style.transform = "translateX(0)";
                botIcon.style.opacity = "1"; botIcon.style.transform = "scale(1) translateY(0)";
                botImg.style.opacity = "1"; botImg.style.transform = "translateY(0)";
                botObserver.unobserve(bottomRow);
            }
        }, observerOptions);

        if (topRow) topObserver.observe(topRow);
        if (bottomRow) botObserver.observe(bottomRow);
    };

    const titleWrapper = document.querySelector('.about-title-wrapper');
    const title = document.querySelector('.about-title');
    if (titleWrapper && title) {
        title.style.opacity = "0";
        title.style.transform = "translateY(20px)";
        
        title.style.transition = `opacity 0.6s ${easing} 0.1s, transform 0.6s ${easing} 0.1s`;
        
        const titleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                title.style.opacity = "1"; 
                title.style.transform = "translateY(0)";
                titleObserver.unobserve(titleWrapper);
            }
        }, { threshold: 0.2 }); 
        titleObserver.observe(titleWrapper);
    }

    animateAboutSection();

    // NEWS
    const newsSection = document.querySelector('.news-section');
    if (newsSection) {
        const newsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                newsSection.classList.add('is-animated');
                newsObserver.unobserve(newsSection);
            }
        }, { threshold: 0.2 });
        newsObserver.observe(newsSection);
    }

    // MENU
    const menuGridSection = document.querySelector('.menu-grid-section');
    if (menuGridSection) {
        const headerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                menuGridSection.classList.add('is-animated');
                headerObserver.unobserve(menuGridSection);
            }
        }, { threshold: 0 });
        headerObserver.observe(menuGridSection);
    }

    const menuSection = document.querySelector('.menu-intro-section');
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                menuObserver.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.5, 
        rootMargin: "0px 0px -50px 0px" 
    }); 

    if (menuSection) menuObserver.observe(menuSection);

    const animateMenuSequentially = () => {
        const cards = document.querySelectorAll('.menu-card');
        const footer = document.querySelector('.menu-footer');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        cards.forEach(card => cardObserver.observe(card));

        if (footer) {
            const footerObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    footer.classList.add('is-visible');
                    footerObserver.unobserve(footer);
                }
            }, { 
                threshold: 0, 
                rootMargin: "0px 0px 50px 0px" 
            });
            footerObserver.observe(footer);
        }
    };

    animateMenuSequentially();

    // ADDRESS
    const addressSection = document.querySelector('.address-section');

    if (addressSection) {
        const title = addressSection.querySelector('.address-title');
        const logo = addressSection.querySelector('.info-logo-img');
        const slideshow = addressSection.querySelector('.address-slideshow');
        const infoLines = addressSection.querySelectorAll('.jp-address, .time-tel p, .extra-info');
        const mapLink = addressSection.querySelector('.google-map-link-wrapper');

        const addressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addressSection.classList.add('is-animated');

                    if (title) title.style.transitionDelay = "0.1s";

                    if (logo) logo.style.transitionDelay = "0.4s";

                    if (slideshow) slideshow.style.transitionDelay = "0.7s";

                    infoLines.forEach((line, index) => {
                        line.style.transitionDelay = (1.0 + (index * 0.2)) + "s";
                    });

                    if (mapLink) {
                        mapLink.style.transitionDelay = (1.0 + (infoLines.length * 0.2)) + "s";
                    }

                    addressObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2 
        });

        addressObserver.observe(addressSection);
    }  
    
    const startAddressSlideshow = () => {
        const slides = document.querySelectorAll('.address-slide');
        let current = 0;

        if (slides.length > 0) {
            setInterval(() => {
                slides[current].classList.remove('active');
                current = (current + 1) % slides.length;
                slides[current].classList.add('active');
            }, 4000); 
        }
    };

    startAddressSlideshow();

    // FOOTER
    const footerTopBtn = document.querySelector('.back-to-top');
    if (footerTopBtn) {
        footerTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
});

// BREAD SLIDER BEFORE NEWS SECTION
window.addEventListener('load', function() {
    const track = document.getElementById('bread-track');
    if (!track) return;

    const originalSlides = Array.from(track.children);
    const slideCount = originalSlides.length; 
    track.innerHTML = '';
    
    for(let i=0; i<3; i++) {
        originalSlides.forEach(slide => track.appendChild(slide.cloneNode(true)));
    }

    let isMoving = false;
    let counter = slideCount; 

    function getPosition() {
        const vw = window.innerWidth;
        const imgW = vw * 0.3; 
        const centerOffset = (vw - (imgW * 2)) / 2;
        return (-imgW * counter) + centerOffset;
    }

    track.style.transition = "none";
    track.style.transform = `translateX(${getPosition()}px)`;

    function updateSlider() {
        isMoving = true;
        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(${getPosition()}px)`;
    }

    track.addEventListener('transitionend', () => {
        isMoving = false;
        if (counter >= slideCount * 2 || counter <= 0) {
            track.style.transition = "none";
            counter = slideCount;
            track.style.transform = `translateX(${getPosition()}px)`;
        }
    });

    document.getElementById('bread-next').addEventListener('click', () => {
        if (isMoving) return;
        counter++; updateSlider();
    });

    document.getElementById('bread-prev').addEventListener('click', () => {
        if (isMoving) return;
        counter--; updateSlider();
    });

    window.addEventListener('resize', () => {
        track.style.transition = "none";
        track.style.transform = `translateX(${getPosition()}px)`;
    });
});
