/**
 * Consultation Wizard Logic
 * Handles the interactive multi-step funnel for contact.html
 */
document.addEventListener('DOMContentLoaded', () => {
    const wizardContainer = document.getElementById('consultation-wizard');
    if (!wizardContainer) return;

    let currentStep = 1;
    const totalSteps = 4;
    const formData = {
        domain: '',
        stage: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        details: ''
    };

    const steps = document.querySelectorAll('.wizard-step');
    const progressFill = document.getElementById('wizard-progress-fill');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    
    // UI Update functions
    function updateUI() {
        // Update Step Visibility
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
                step.style.display = 'block';
                // Trigger animation
                setTimeout(() => step.style.opacity = '1', 50);
            } else {
                step.classList.remove('active');
                step.style.opacity = '0';
                setTimeout(() => step.style.display = 'none', 300);
            }
        });

        // Update Progress Bar
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }

        // Update Step Indicators
        stepIndicators.forEach((ind, index) => {
            if (index + 1 === currentStep) {
                ind.classList.add('active');
            } else if (index + 1 < currentStep) {
                ind.classList.add('completed');
                ind.classList.remove('active');
            } else {
                ind.classList.remove('active', 'completed');
            }
        });
    }

    // Next Step Logic
    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    }

    // Previous Step Logic
    window.prevStep = function() {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    };

    // Option Selection Handlers
    const optionBtns = document.querySelectorAll('.wizard-option');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const field = btn.getAttribute('data-field');
            const value = btn.getAttribute('data-value');
            
            // Clear other active options in this group
            const siblings = document.querySelectorAll(`.wizard-option[data-field="${field}"]`);
            siblings.forEach(s => s.classList.remove('selected'));
            
            // Select this option
            btn.classList.add('selected');
            formData[field] = value;

            // Auto-advance for single-click steps
            setTimeout(() => {
                nextStep();
            }, 300);
        });
    });

    // Form Submission
    const wizardForm = document.getElementById('consultation-form');
    if (wizardForm) {
        wizardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect final inputs
            formData.name = document.getElementById('wizard-name').value;
            formData.email = document.getElementById('wizard-email').value;
            formData.details = document.getElementById('wizard-details').value;
            
            // Validate
            if (!formData.name || !formData.email) {
                alert('Please provide your name and email to proceed.');
                return;
            }

            // Simulate form submission
            const submitBtn = wizardForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '[ TRANSMITTING... ]';
            submitBtn.disabled = true;

            setTimeout(() => {
                wizardContainer.innerHTML = `
                    <div style="text-align: center; padding: var(--space-16) 0;" class="animate-fade-in">
                        <i data-lucide="check-circle" style="width: 48px; height: 48px; color: var(--text-primary); margin-bottom: var(--space-6);"></i>
                        <h2 style="font-size: var(--text-h2); margin-bottom: var(--space-4);">Transmission Received.</h2>
                        <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto var(--space-8);">
                            System architecture planning initiated. Our lead engineer will contact you within 24 hours.
                        </p>
                        <a href="index.html" class="btn btn-secondary">Return Home</a>
                    </div>
                `;
                lucide.createIcons();
            }, 1500);
        });
    }

    // Initialize UI
    updateUI();
});
