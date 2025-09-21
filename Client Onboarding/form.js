// Form fields configuration with weights
const formFields = [
    { id: 'companyName', required: true, weight: 5 },
    { id: 'keyContact', required: true, weight: 5 },
    { id: 'financeContact', required: true, weight: 5 },
    { id: 'website', required: true, weight: 5 },
    { id: 'instagram', required: false, weight: 3 },
    { id: 'facebook', required: false, weight: 3 },
    { id: 'twitter', required: false, weight: 3 },
    { id: 'youtube', required: false, weight: 3 },
    { id: 'tiktok', required: false, weight: 3 },
    { id: 'linkedin', required: false, weight: 3 },
    { id: 'twitch', required: false, weight: 3 },
    { id: 'otherHandles', required: false, weight: 2 },
    { id: 'brandDescription', required: true, weight: 8 },
    { id: 'primaryMessage', required: true, weight: 8 },
    { id: 'targetAudience', required: true, weight: 8 },
    { id: 'customerPersonas', required: false, weight: 5 },
    { id: 'audiencePlatforms', required: true, weight: 5 }
];

// Calculate form completion percentage
function calculateCompletion() {
    let totalWeight = 0;
    let completedWeight = 0;
    
    formFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            // Add to total weight if field is required or has value
            if (field.required || element.value.trim() !== '') {
                totalWeight += field.weight;
                
                // Add to completed weight if field has value
                if (element.value.trim() !== '') {
                    completedWeight += field.weight;
                }
            }
        }
    });
    
    // Calculate percentage
    const percentage = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    
    // Update progress bar and percentage text
    document.getElementById('progress').style.width = percentage + '%';
    document.querySelector('.progress-percentage').textContent = percentage + '%';
    
    return percentage;
}

// Initialize form tracking
function initFormTracking() {
    // Add event listeners to all form fields
    formFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.addEventListener('input', calculateCompletion);
            element.addEventListener('change', calculateCompletion);
        }
    });
    
    // Initial calculation
    calculateCompletion();
}

// Form submission handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Basic validation
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Redirect to submit.html on successful submission
        window.location.href = "submit.html";
    } else {
        alert('Please fill in all required fields.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFormTracking();
    
    // Add submit event listener
    document.getElementById('onboardingForm').addEventListener('submit', handleFormSubmit);
    
    // Remove the scroll-based progress tracking
    window.removeEventListener('scroll', scrollHandler);
});
  // Tooltip for billing info (show on hover/focus, hide on mouseleave/blur)
    document.addEventListener('DOMContentLoaded', function() {
                var icon = document.getElementById('billingInfoIcon');
                var tooltip = document.getElementById('billingTooltip');
                if(icon && tooltip) {
                    icon.addEventListener('mouseenter', function(e) {
                        tooltip.style.display = 'inline-block';
                    });
                    icon.addEventListener('focus', function(e) {
                        tooltip.style.display = 'inline-block';
                    });
                    icon.addEventListener('mouseleave', function(e) {
                        tooltip.style.display = 'none';
                    });
                    icon.addEventListener('blur', function(e) {
                        tooltip.style.display = 'none';
                    });
                }
            });
// Remove the existing scroll-based progress tracking
const scrollHandler = function() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    document.getElementById('progress').style.width = scrollPercent + '%';
    document.querySelector('.progress-percentage').textContent = Math.round(scrollPercent) + '%';
};

window.removeEventListener('scroll', scrollHandler);