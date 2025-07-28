// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.trip-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Smooth scroll to top of section
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add scroll indicator
    createScrollIndicator();
    
    // Add birthday special effects
    addBirthdayEffects();
    
    // Initialize intersection observer for animations
    initAnimationObserver();
});

// Map functionality
function openMap(location) {
    const encodedLocation = encodeURIComponent(location);
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Try to open native maps app first
        const googleMapsUrl = `https://maps.google.com/maps?q=${encodedLocation}`;
        const appleMapsUrl = `http://maps.apple.com/?q=${encodedLocation}`;
        
        // For iOS devices, try Apple Maps first
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            window.open(appleMapsUrl, '_blank');
        } else {
            window.open(googleMapsUrl, '_blank');
        }
    } else {
        // For desktop, open Google Maps
        window.open(`https://maps.google.com/maps?q=${encodedLocation}`, '_blank');
    }
}

// Scroll indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<i class="fas fa-chevron-up"></i>';
    indicator.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(indicator);

    // Show/hide indicator based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            indicator.style.opacity = '1';
            indicator.style.transform = 'scale(1)';
        } else {
            indicator.style.opacity = '0';
            indicator.style.transform = 'scale(0.8)';
        }
    });
    
    // Initially hide
    indicator.style.opacity = '0';
    indicator.style.transform = 'scale(0.8)';
    indicator.style.transition = 'all 0.3s ease';
}

// Birthday special effects
function addBirthdayEffects() {
    // Find birthday celebration elements
    const birthdayElements = document.querySelectorAll('[class*="birthday"], [data-birthday]');
    
    birthdayElements.forEach(element => {
        element.classList.add('birthday-special');
    });

    // Add special styling to birthday dinner
    const activities = document.querySelectorAll('.activity-details h4');
    activities.forEach(activity => {
        if (activity.textContent.toLowerCase().includes('birthday')) {
            activity.closest('.day-card').classList.add('birthday-special');
        }
    });

    // Create floating birthday emojis
    createFloatingEmojis();
}

// Floating birthday emojis animation
function createFloatingEmojis() {
    const emojis = ['🎉', '🎂', '🎈', '🎁', '🥳', '✨'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: 100vh;
                animation: floatUp 4s linear forwards;
            `;
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 4000);
        }
    }, 2000);

    // Add CSS for float animation
    if (!document.getElementById('float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animation observer for cards
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all day cards
    document.querySelectorAll('.day-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Share functionality
function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: "David's 60th Birthday Adventure",
            text: "Check out this amazing 15-day birthday trip itinerary!",
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard!');
        });
    }
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        animation: toastSlide 3s ease forwards;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);

    // Add toast animation CSS if not exists
    if (!document.getElementById('toast-animation')) {
        const style = document.createElement('style');
        style.id = 'toast-animation';
        style.textContent = `
            @keyframes toastSlide {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Weather integration (optional - placeholder for API)
function getWeatherInfo(location, date) {
    // This would integrate with a weather API
    // For now, return mock data
    return {
        temperature: '82°F',
        condition: 'Sunny',
        icon: 'fas fa-sun'
    };
}

// Currency converter (for international destinations)
function convertCurrency(amount, fromCurrency, toCurrency) {
    // This would integrate with a currency API
    // For now, return mock conversion
    const rates = {
        'USD_MXN': 18.5,
        'USD_JMD': 155.0,
        'USD_KYD': 0.83,
        'USD_HNL': 24.5
    };
    
    const rate = rates[`${fromCurrency}_${toCurrency}`] || 1;
    return (amount * rate).toFixed(2);
}

// Activity rating system
function rateActivity(activityElement, rating) {
    const stars = activityElement.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#ffd700';
        } else {
            star.classList.remove('active');
            star.style.color = '#ccc';
        }
    });
    
    // Save rating to localStorage
    const activityName = activityElement.querySelector('h4').textContent;
    localStorage.setItem(`rating_${activityName}`, rating);
}

// Load saved ratings
function loadSavedRatings() {
    document.querySelectorAll('.activity-details').forEach(activity => {
        const activityName = activity.querySelector('h4').textContent;
        const savedRating = localStorage.getItem(`rating_${activityName}`);
        
        if (savedRating) {
            rateActivity(activity, parseInt(savedRating));
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadSavedRatings);

// Countdown timer to trip start
function updateCountdown() {
    const tripStart = new Date('2024-10-05T14:00:00');
    const now = new Date();
    const difference = tripStart - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownText = `${days}d ${hours}h ${minutes}m until departure!`;
        
        // Update countdown if element exists
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.textContent = countdownText;
        }
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown(); // Initial call

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.map-link').forEach(link => {
        const location = link.previousElementSibling?.textContent || 'location';
        link.setAttribute('aria-label', `Open ${location} in maps`);
    });
    
    // Add keyboard navigation
    document.querySelectorAll('.activity-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                item.click();
                e.preventDefault();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', improveAccessibility); 