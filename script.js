// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const fromCity = document.getElementById('fromCity');
const toCity = document.getElementById('toCity');
const travelDate = document.getElementById('travelDate');
const passengers = document.getElementById('passengers');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
travelDate.setAttribute('min', today);

searchBtn.addEventListener('click', () => {
    if (!fromCity.value || !toCity.value || !travelDate.value) {
        showToast('Please fill in all search fields');
        return;
    }
    
    showToast(`Searching buses from ${fromCity.value} to ${toCity.value}...`);
    
    // Simulate search delay
    setTimeout(() => {
        showToast(`Found 12 buses available for your route!`);
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

// Booking Form
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const seatType = document.querySelector('input[name="seatType"]:checked').value;
    const prices = { economy: 29, premium: 49, business: 79 };
    
    showToast(`Booking confirmed! Total: $${prices[seatType]}`);
    bookingForm.reset();
});

// Seat type selection visual feedback
document.querySelectorAll('.seat-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.seat-option').forEach(opt => {
            opt.style.borderColor = '#e0e0e0';
        });
        option.style.borderColor = '#e94560';
    });
});

// Schedule Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const scheduleTable = document.querySelector('.schedule-table tbody');

const scheduleData = {
    today: [
        { route: 'New York → Boston', departure: '06:00 AM', arrival: '10:00 AM', duration: '4h', price: '$29', status: 'on-time' },
        { route: 'Los Angeles → San Francisco', departure: '07:30 AM', arrival: '01:30 PM', duration: '6h', price: '$45', status: 'delayed' },
        { route: 'Chicago → Detroit', departure: '08:00 AM', arrival: '01:00 PM', duration: '5h', price: '$35', status: 'on-time' },
        { route: 'Miami → Orlando', departure: '09:00 AM', arrival: '01:00 PM', duration: '4h', price: '$32', status: 'on-time' },
        { route: 'Washington DC → New York', departure: '10:00 AM', arrival: '02:30 PM', duration: '4.5h', price: '$38', status: 'on-time' },
        { route: 'Seattle → Portland', departure: '11:00 AM', arrival: '02:30 PM', duration: '3.5h', price: '$28', status: 'on-time' }
    ],
    tomorrow: [
        { route: 'Boston → New York', departure: '06:30 AM', arrival: '10:30 AM', duration: '4h', price: '$29', status: 'on-time' },
        { route: 'San Francisco → Los Angeles', departure: '08:00 AM', arrival: '02:00 PM', duration: '6h', price: '$45', status: 'on-time' },
        { route: 'Detroit → Chicago', departure: '09:00 AM', arrival: '02:00 PM', duration: '5h', price: '$35', status: 'on-time' },
        { route: 'Orlando → Miami', departure: '10:00 AM', arrival: '02:00 PM', duration: '4h', price: '$32', status: 'on-time' },
        { route: 'New York → Washington DC', departure: '11:00 AM', arrival: '03:30 PM', duration: '4.5h', price: '$38', status: 'on-time' },
        { route: 'Portland → Seattle', departure: '12:00 PM', arrival: '03:30 PM', duration: '3.5h', price: '$28', status: 'on-time' }
    ],
    week: [
        { route: 'New York → Philadelphia', departure: '07:00 AM', arrival: '09:30 AM', duration: '2.5h', price: '$25', status: 'on-time' },
        { route: 'Houston → Dallas', departure: '08:00 AM', arrival: '11:00 AM', duration: '3h', price: '$30', status: 'on-time' },
        { route: 'Atlanta → Nashville', departure: '09:00 AM', arrival: '12:30 PM', duration: '3.5h', price: '$35', status: 'on-time' },
        { route: 'Denver → Colorado Springs', departure: '10:00 AM', arrival: '11:30 AM', duration: '1.5h', price: '$20', status: 'on-time' },
        { route: 'Phoenix → Tucson', departure: '11:00 AM', arrival: '01:30 PM', duration: '2.5h', price: '$28', status: 'on-time' },
        { route: 'Las Vegas → Grand Canyon', departure: '07:00 AM', arrival: '11:00 AM', duration: '4h', price: '$45', status: 'on-time' }
    ]
};

function renderSchedule(data) {
    scheduleTable.innerHTML = data.map(item => `
        <tr>
            <td>${item.route}</td>
            <td>${item.departure}</td>
            <td>${item.arrival}</td>
            <td>${item.duration}</td>
            <td>${item.price}</td>
            <td><span class="status ${item.status}">${item.status === 'on-time' ? 'On Time' : 'Delayed'}</span></td>
            <td><button class="book-btn" onclick="bookSchedule('${item.route}')">Book</button></td>
        </tr>
    `).join('');
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tab = btn.getAttribute('data-tab');
        renderSchedule(scheduleData[tab]);
    });
});

function bookSchedule(route) {
    showToast(`Booking ${route}...`);
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill booking form
    const routeParts = route.split(' → ');
    const fromInput = document.querySelector('#bookingForm input[placeholder="Departure City"]');
    const toInput = document.querySelector('#bookingForm input[placeholder="Destination City"]');
    
    if (fromInput && toInput) {
        fromInput.value = routeParts[0];
        toInput.value = routeParts[1];
    }
}

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonial = index;
    if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;
    if (currentTestimonial < 0) currentTestimonial = testimonialCards.length - 1;
    
    testimonialCards[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Book Route Buttons
document.querySelectorAll('.book-route-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const routeCard = this.closest('.route-card');
        const route = routeCard.querySelector('h3').textContent;
        showToast(`Booking ${route}...`);
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill booking form
        const routeParts = route.split(' → ');
        const fromInput = document.querySelector('#bookingForm input[placeholder="Departure City"]');
        const toInput = document.querySelector('#bookingForm input[placeholder="Destination City"]');
        
        if (fromInput && toInput) {
            fromInput.value = routeParts[0];
            toInput.value = routeParts[1];
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Login and Signup Buttons
document.querySelector('.login-btn').addEventListener('click', () => {
    showToast('Login feature coming soon!');
});

document.querySelector('.signup-btn').addEventListener('click', () => {
    showToast('Sign up feature coming soon!');
});

// Toast Notification
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const toastClose = document.getElementById('toastClose');
let toastTimeout;

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
    clearTimeout(toastTimeout);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.route-card, .feature-card, .testimonial-card, .info-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Hero Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const value = parseInt(stat.textContent.replace(/\D/g, ''));
                animateCounter(stat, value);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Dynamic date display in search form
const dateInput = document.getElementById('travelDate');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
}

// Add hover effect to table rows
document.querySelectorAll('.schedule-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = '#f8f9fa';
    });
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = '';
    });
});

// Prevent form submission on Enter key for search
document.querySelectorAll('.search-field input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchBtn.click();
        }
    });
});

console.log('BusGo website loaded successfully!');
