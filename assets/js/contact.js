// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
});

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById('formStatus');
    
    // Validate all fields
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLanguage === 'pt-BR' ? 'Enviando...' : 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success simulation
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showFormStatus(
                currentLanguage === 'pt-BR' ? 
                'Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.' : 
                'Message sent successfully! We will contact you within 24 hours.',
                'success'
            );
            form.reset();
        } else {
            showFormStatus(
                currentLanguage === 'pt-BR' ? 
                'Erro ao enviar mensagem. Tente novamente ou entre em contato por e-mail.' : 
                'Error sending message. Please try again or contact us by email.',
                'error'
            );
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = currentLanguage === 'pt-BR' ? 
            'Este campo é obrigatório' : 
            'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = currentLanguage === 'pt-BR' ? 
                'Digite um e-mail válido' : 
                'Enter a valid email';
            isValid = false;
        }
    }
    
    // Name validation (only letters and spaces)
    if (field.name === 'name' && value) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!nameRegex.test(value)) {
            errorMessage = currentLanguage === 'pt-BR' ? 
                'Nome deve conter apenas letras' : 
                'Name should contain only letters';
            isValid = false;
        }
    }
    
    // Message minimum length
    if (field.name === 'message' && value && value.length < 10) {
        errorMessage = currentLanguage === 'pt-BR' ? 
            'Mensagem deve ter pelo menos 10 caracteres' : 
            'Message should have at least 10 characters';
        isValid = false;
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
    field.classList.add('error');
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    
    // Remove error styling and message
    field.classList.remove('error');
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show form status message
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Hide after 10 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 10000);
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers
        answer.style.display = 'none';
        
        // Add click handler
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                const otherQuestion = otherItem.querySelector('h3');
                otherAnswer.style.display = 'none';
                otherQuestion.classList.remove('active');
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
        
        // Add cursor pointer style
        question.style.cursor = 'pointer';
        question.style.transition = 'color 0.3s ease';
        
        question.addEventListener('mouseenter', () => {
            question.style.color = '#0066cc';
        });
        
        question.addEventListener('mouseleave', () => {
            if (!question.classList.contains('active')) {
                question.style.color = '';
            }
        });
    });
}

// Auto-fill form based on URL parameters (if coming from specific action buttons)
function autoFillForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    
    if (subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            subjectSelect.value = subject;
        }
    }
}

// Call auto-fill on page load
document.addEventListener('DOMContentLoaded', autoFillForm);

// Export functions for use in HTML onclick handlers
window.contactFormFunctions = {
    validateField,
    clearFieldError,
    handleFormSubmission
};