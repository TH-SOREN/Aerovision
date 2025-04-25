window.addEventListener('load', () => {
    gsap.to('.loader', { opacity: 0, duration: 1, delay: 1, onComplete: () => document.querySelector('.loader').style.display = 'none' });
});

gsap.from('.typing', { text: '', duration: 2, ease: 'none' });
gsap.from('.cta', { opacity: 0, y: 50, duration: 1, delay: 2 });

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: section, start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });
});

gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 50, duration: 1, delay: window.innerWidth <= 768 ? i * 0.05 : i * 0.1, scrollTrigger: { trigger: card, start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });
});

gsap.utils.toArray('.industry-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, scale: 0.9, duration: 1, delay: window.innerWidth <= 768 ? i * 0.05 : i * 0.1, scrollTrigger: { trigger: card, start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });
});

gsap.from('.video-container', { opacity: 0, scale: 0.9, duration: 1, scrollTrigger: { trigger: '.video-container', start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });

gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, { opacity: 0, y: 50, duration: 1, delay: window.innerWidth <= 768 ? i * 0.05 : i * 0.1, scrollTrigger: { trigger: item, start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });
});

gsap.from('.contact-grid', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.contact-grid', start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });
gsap.from('.map', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.map', start: window.innerWidth <= 768 ? 'top 95%' : 'top 90%' } });

function toggleTheme() {
    document.body.classList.toggle('light');
    const text = document.body.classList.contains('light') ? 'Dark' : 'Light';
    document.getElementById('theme-toggle').textContent = text;
    document.getElementById('theme-toggle-mobile').textContent = text;
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile').addEventListener('click', () => {
    toggleTheme();
    closeMenu();
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    const isOpen = hamburger.classList.contains('active');
    
    if (!isOpen) {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        
        // ریست کردن وضعیت آیتم‌ها قبل از انیمیشن
        gsap.set(navMenu.querySelectorAll('li'), { opacity: 0, x: -20 });
        gsap.to(navMenu, { x: 0, duration: 0.5, ease: 'power3.out' });
        gsap.to(navMenu.querySelectorAll('li'), { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: 'power2.out' });
    } else {
        closeMenu();
    }
}

function closeMenu() {
    gsap.to(navMenu.querySelectorAll('li'), { opacity: 0, x: -20, stagger: 0.1, duration: 0.3, ease: 'power2.in' });
    gsap.to(navMenu, { x: '-100%', duration: 0.5, ease: 'power3.in', onComplete: () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        // ریست کردن موقعیت منو
        gsap.set(navMenu, { x: '-100%' });
    } });
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// بستن خودکار منو بعد از کلیک روی آیتم‌ها
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

let currentTab = 0;
const tabs = document.querySelectorAll('.tech-content');
const tabButtons = document.querySelectorAll('.tech-tab');

function showTab(index) {
    tabs.forEach((tab, i) => {
        tab.classList.remove('active');
        tabButtons[i].classList.remove('active');
        gsap.to(tab, { opacity: 0, x: i < index ? -50 : 50, duration: 0.5 });
    });
    tabs[index].classList.add('active');
    tabButtons[index].classList.add('active');
    gsap.fromTo(tabs[index], { opacity: 0, x: index > currentTab ? 50 : -50 }, { opacity: 1, x: 0, duration: 0.5 });
    currentTab = index;
}

function openTab(evt, tabName) {
    const index = Array.from(tabButtons).findIndex(tab => tab.getAttribute('onclick').includes(tabName));
    showTab(index);
}

function openModal(title, text) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').textContent = text;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    gsap.fromTo('.modal-content', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 });
}

function closeModal() {
    gsap.to('.modal-content', { opacity: 0, y: -50, duration: 0.5, onComplete: () => document.getElementById('modal').style.display = 'none' });
}

document.querySelector('.contact-form').addEventListener('submit', e => {
    e.preventDefault();
    fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        if (response.ok) {
            notificationText.textContent = 'Message Sent Successfully!';
        } else {
            notificationText.textContent = 'Error Sending Message';
        }
        notification.style.display = 'block';
        gsap.fromTo(notification, { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
        gsap.to(notification, { opacity: 0, y: -20, scale: 0.8, duration: 0.5, delay: 3, onComplete: () => notification.style.display = 'none' });
        e.target.reset();
    }).catch(() => {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        notificationText.textContent = 'Error Sending Message';
        notification.style.display = 'block';
        gsap.fromTo(notification, { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
        gsap.to(notification, { opacity: 0, y: -20, scale: 0.8, duration: 0.5, delay: 3, onComplete: () => notification.style.display = 'none' });
    });
});