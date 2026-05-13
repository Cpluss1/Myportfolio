// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Animate hamburger menu
hamburger.addEventListener('click', () => {
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                  index === 1 ? 'opacity: 0' :
                                  'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Intersection Observer for animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Staggered reveal for cards and key content blocks
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .edu-item, .certifications-section li, .contact-info, .contact-form').forEach((item, index) => {
    item.classList.add('reveal-item');
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px) scale(0.98)';
    item.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 0.07}s`;
    observer.observe(item);
});

// Send contact form details to WhatsApp
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.elements.name.value.trim();
        const email = contactForm.elements.email.value.trim();
        const message = contactForm.elements.message.value.trim();

        const whatsappMessage = `Hello Godwin, I visited your portfolio and would like to contact you.%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
        const whatsappUrl = `https://wa.me/2348079756690?text=${whatsappMessage}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Typing effect for hero text (optional enhancement)
const heroText = document.querySelector('.hero p:nth-child(3)');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}

// Skill bars animation (if we add progress bars later)
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// Call animateSkillBars when skills section is in view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    skillsObserver.observe(skillsSection);
}

// Dark mode toggle (optional feature)
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.textContent = '🌙';
    toggle.style.position = 'fixed';
    toggle.style.top = '20px';
    toggle.style.right = '20px';
    toggle.style.zIndex = '1001';
    toggle.style.background = 'rgba(255, 255, 255, 0.9)';
    toggle.style.border = 'none';
    toggle.style.borderRadius = '50%';
    toggle.style.width = '50px';
    toggle.style.height = '50px';
    toggle.style.cursor = 'pointer';
    toggle.style.fontSize = '20px';
    toggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    toggle.style.transition = 'all 0.3s';

    let isDark = false;
    toggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-mode');
        toggle.textContent = isDark ? '☀️' : '🌙';
    });

    document.body.appendChild(toggle);
};

// Uncomment to add dark mode toggle
// createDarkModeToggle();

// Add some CSS for dark mode if toggle is enabled
const darkModeStyles = `
.dark-mode {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: #e2e8f0;
}

.dark-mode header {
    background: rgba(45, 55, 72, 0.95);
}

.dark-mode .nav-links a {
    color: #e2e8f0;
}

.dark-mode .about,
.dark-mode .projects,
.dark-mode .skill-category,
.dark-mode .project-card {
    background: #2d3748;
    color: #e2e8f0;
}

.dark-mode .skills {
    background: #1a202c;
}

.dark-mode footer {
    background: #2d3748;
}
`;

// If dark mode toggle is enabled, inject styles
// const styleSheet = document.createElement('style');
// styleSheet.textContent = darkModeStyles;
// document.head.appendChild(styleSheet);
