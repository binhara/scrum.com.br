// Language Management
const languages = {
    'pt-BR': {
        code: 'pt-BR',
        name: 'Português'
    },
    'en': {
        code: 'en',
        name: 'English'
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt-BR';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    setupMobileMenu();
    setupNewsletterForm();
    setupScrollEffects();
});

function initializeLanguage() {
    // Set language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // Set HTML lang attribute
    document.getElementById('html-root').lang = currentLanguage;
    
    // Apply translations
    applyTranslations(currentLanguage);
}

function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    document.getElementById('html-root').lang = language;
    applyTranslations(language);
}

function applyTranslations(language) {
    const elements = document.querySelectorAll('[data-pt], [data-en]');
    
    elements.forEach(element => {
        const key = language === 'pt-BR' ? 'data-pt' : 'data-en';
        const text = element.getAttribute(key);
        
        if (text) {
            element.textContent = text;
        }
    });
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-pt-placeholder], [data-en-placeholder]');
    placeholderElements.forEach(element => {
        const key = language === 'pt-BR' ? 'data-pt-placeholder' : 'data-en-placeholder';
        const placeholder = element.getAttribute(key);
        
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update meta description for SEO
    updateMetaDescription(language);
}

function updateMetaDescription(language) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const descriptions = {
            'pt-BR': 'Portal Scrum: Aprenda sobre a metodologia Scrum, conheça a ferramenta TaskTracker e descubra cursos de IA e eventos de Big Data.',
            'en': 'Scrum Portal: Learn about Scrum methodology, discover TaskTracker tool and explore AI courses and Big Data events.'
        };
        
        metaDescription.content = descriptions[language];
    }
}

// Mobile Menu
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Newsletter Form
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate newsletter subscription
                showNotification(
                    currentLanguage === 'pt-BR' ? 
                    'Obrigado! Você foi inscrito com sucesso.' : 
                    'Thank you! You have been successfully subscribed.',
                    'success'
                );
                
                this.reset();
            } else {
                showNotification(
                    currentLanguage === 'pt-BR' ? 
                    'Por favor, insira um e-mail válido.' : 
                    'Please enter a valid email address.',
                    'error'
                );
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#0066cc',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        maxWidth: '300px',
        animation: 'slideInRight 0.3s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll Effects
function setupScrollEffects() {
    // Smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .partner-card, .blog-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add transition to header
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }
}

// Search functionality (for blog pages)
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query, searchResults);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

function performSearch(query, resultsContainer) {
    // Mock search results - in a real implementation, this would query your backend
    const mockResults = [
        {
            title: currentLanguage === 'pt-BR' ? 'O que é Scrum e como funciona?' : 'What is Scrum and how does it work?',
            url: 'blog/o-que-e-scrum.html',
            excerpt: currentLanguage === 'pt-BR' ? 
                'Entenda os fundamentos da metodologia ágil mais popular do mundo' : 
                'Understand the fundamentals of the world\'s most popular agile methodology'
        },
        {
            title: 'TaskTracker',
            url: 'pages/tasktracker.html',
            excerpt: currentLanguage === 'pt-BR' ? 
                'Ferramenta completa para gestão de projetos Scrum' : 
                'Complete tool for Scrum project management'
        }
    ];
    
    const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(filteredResults, resultsContainer);
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = `<div class="search-no-results">${
            currentLanguage === 'pt-BR' ? 'Nenhum resultado encontrado' : 'No results found'
        }</div>`;
    } else {
        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}">${result.title}</a></h4>
                <p>${result.excerpt}</p>
            </div>
        `).join('');
        
        container.innerHTML = resultsHTML;
    }
    
    container.style.display = 'block';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Social sharing
function shareArticle(url, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification(
                currentLanguage === 'pt-BR' ? 
                'Link copiado para a área de transferência!' : 
                'Link copied to clipboard!',
                'success'
            );
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and search
    if (e.key === 'Escape') {
        const nav = document.querySelector('.nav.active');
        const searchResults = document.querySelector('.search-results');
        
        if (nav) {
            nav.classList.remove('active');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        }
        
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
        display: none;
    }
    
    .search-result-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-item h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
    }
    
    .search-result-item p {
        margin: 0;
        color: #666;
        font-size: 14px;
    }
    
    .search-no-results {
        padding: 15px;
        text-align: center;
        color: #666;
    }
`;
document.head.appendChild(style);