class RecommendationEngine {
    constructor() {
        this.mountPoint = document.getElementById('recommendation-engine-mount');
        this.roles = [
            { id: 'student', title: 'I’m a Student', icon: 'graduation-cap', needs: ['Resume', 'Portfolio', 'Projects', 'Placement help'] },
            { id: 'startup', title: 'I’m a Startup', icon: 'rocket', needs: ['Landing page', 'MVP', 'Branding', 'Growth support'] },
            { id: 'business', title: 'I’m a Small Business', icon: 'store', needs: ['Website', 'Online presence', 'WhatsApp integration', 'Growth'] },
            { id: 'creator', title: 'I’m a Creator / Freelancer', icon: 'pen-tool', needs: ['Personal branding', 'Portfolio', 'Creator website'] },
            { id: 'developer', title: 'I’m a Developer', icon: 'terminal', needs: ['GitHub', 'Portfolio', 'README', 'Deployment'] },
            { id: 'professional', title: 'I’m Looking for a Job', icon: 'briefcase', needs: ['Resume', 'LinkedIn', 'Portfolio', 'Career guidance'] },
            { id: 'academic', title: 'I Need Academic Project Help', icon: 'book-open', needs: ['IoT', 'Documentation', 'UML', 'Reports'] },
            { id: 'custom', title: 'I Need Something Custom', icon: 'settings', needs: ['Custom software', 'Automation', 'AI', 'Enterprise solutions'] }
        ];

        this.recommendationLogic = {
            'student': {
                services: [
                    { name: 'ATS Resume', price: '₹399' },
                    { name: 'LinkedIn Optimization', price: '₹399' },
                    { name: 'GitHub Profile Optimization', price: '₹399' }
                ],
                bundle: { name: 'Placement Readiness Package', price: '₹999' }
            },
            'startup': {
                services: [
                    { name: 'Startup Landing Page', price: '₹999' },
                    { name: 'Startup Consultation', price: '₹499' },
                    { name: 'WhatsApp Integration', price: '₹199' }
                ],
                bundle: { name: 'Startup Lite Package', price: '₹1,499' }
            },
            'business': {
                services: [
                    { name: 'Business Website', price: '₹999' },
                    { name: 'Google Maps Setup', price: '₹199' },
                    { name: 'WhatsApp Setup', price: '₹299' }
                ],
                bundle: { name: 'Local Business Starter', price: '₹999' }
            },
            'creator': {
                services: [
                    { name: 'Creator Portfolio', price: '₹999' },
                    { name: 'Bio Optimization', price: '₹199' },
                    { name: 'Social Media Profile Audit', price: '₹299' }
                ],
                bundle: { name: 'Creator Starter', price: '₹799' }
            },
            'developer': {
                services: [
                    { name: 'GitHub Setup', price: '₹299' },
                    { name: 'README Creation', price: '₹199' },
                    { name: 'Portfolio Deployment', price: '₹299' }
                ],
                bundle: { name: 'Developer Starter', price: '₹499' }
            },
            'professional': {
                services: [
                    { name: 'Resume Review', price: '₹199' },
                    { name: 'LinkedIn Optimization', price: '₹499' },
                    { name: 'Interview Guidance', price: '₹299' }
                ],
                bundle: { name: 'Job Ready Package', price: '₹999' }
            },
            'academic': {
                services: [
                    { name: 'Mini Project Guidance', price: '₹299' },
                    { name: 'Documentation', price: '₹499' },
                    { name: 'UML Diagrams', price: '₹499' }
                ],
                bundle: { name: 'Mini Project Package', price: '₹799' }
            },
            'custom': {
                services: [
                    { name: 'Custom Web Apps', price: 'Starts ₹4,999' },
                    { name: 'AI Integrations', price: 'Starts ₹4,999' },
                    { name: 'Automation Systems', price: 'Starts ₹4,999' }
                ],
                bundle: { name: 'Enterprise Consultation', price: '₹999' }
            }
        };

        if (this.mountPoint) {
            this.init();
        }
    }

    init() {
        this.renderMainSection();
        this.attachEventListeners();
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    renderMainSection() {
        let cardsHtml = this.roles.map(role => `
            <div class="card reveal" style="padding: var(--space-6); display: flex; flex-direction: column; height: 100%;">
                <div class="icon-wrapper" style="margin-bottom: var(--space-4);">
                    <i data-lucide="${role.icon}"></i>
                </div>
                <h3 style="font-size: var(--text-h4); margin-bottom: var(--space-4);">${role.title}</h3>
                <div style="margin-bottom: var(--space-6); flex-grow: 1;">
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-2); font-size: 0.9rem;">Need:</p>
                    <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem;">
                        ${role.needs.map(need => `<li style="margin-bottom: 4px; display: flex; align-items: center; gap: 8px;"><i data-lucide="check" style="width: 14px; height: 14px; color: var(--accent-blue);"></i>${need}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn btn-outline" style="width: 100%; justify-content: center;" data-role="${role.id}">Get Recommendation</button>
            </div>
        `).join('');

        this.mountPoint.innerHTML = `
            <section class="section reveal" id="not-sure" style="padding-top: var(--space-20); padding-bottom: var(--space-20); background: linear-gradient(to bottom, transparent, rgba(37,99,235,0.02)); border-top: 1px solid var(--border);">
                <div class="container container-wide">
                    <div style="text-align: center; margin-bottom: var(--space-12);">
                        <h2 style="font-size: var(--text-h2); margin-bottom: var(--space-4);">Not Sure What You Need?</h2>
                        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">Tell us your goals and we'll recommend the best services, packages, and pricing for you — completely free.</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6);">
                        ${cardsHtml}
                    </div>
                </div>

                <!-- Form Modal -->
                <div id="recommendation-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(8px); z-index: 1000; overflow-y: auto; padding: var(--space-4);">
                    <div style="min-height: 100%; display: flex; align-items: center; justify-content: center;">
                        <div class="card" style="width: 100%; max-width: 600px; padding: var(--space-8); position: relative; border: 1px solid var(--border);">
                            <button id="close-modal" style="position: absolute; top: var(--space-4); right: var(--space-4); background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 8px;">
                                <i data-lucide="x"></i>
                            </button>
                            
                            <div id="modal-content">
                                <h3 style="font-size: var(--text-h3); margin-bottom: var(--space-6); text-align: center;">Get Your Free Recommendation</h3>
                                
                                <form id="recommendation-form" style="display: flex; flex-direction: column; gap: var(--space-5);">
                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary); font-size: 0.9rem;">What best describes you?</label>
                                        <select id="form-role" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 1rem; appearance: none;">
                                            ${this.roles.map(r => `<option value="${r.id}" style="background: var(--bg-primary);">${r.title.replace('I’m a ', '').replace('I Need ', '')}</option>`).join('')}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary); font-size: 0.9rem;">What are you trying to achieve?</label>
                                        <select id="form-goal" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 1rem; appearance: none;">
                                            <option value="" disabled selected>Select a goal...</option>
                                            <option value="Get placement">Get placement / job</option>
                                            <option value="Build online presence">Build online presence</option>
                                            <option value="Launch startup">Launch startup / MVP</option>
                                            <option value="Improve branding">Improve personal branding</option>
                                            <option value="Build a website">Build a custom website</option>
                                            <option value="Project help">Academic project help</option>
                                            <option value="Automate workflow">Automate workflow</option>
                                            <option value="Other">Other goal</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary); font-size: 0.9rem;">Budget Range</label>
                                        <select id="form-budget" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 1rem; appearance: none;">
                                            <option value="" disabled selected>Select budget...</option>
                                            <option value="₹199–₹499">₹199–₹499</option>
                                            <option value="₹500–₹999">₹500–₹999</option>
                                            <option value="₹1,000–₹2,000">₹1,000–₹2,000</option>
                                            <option value="₹2,000–₹5,000">₹2,000–₹5,000</option>
                                            <option value="Custom">Custom / Higher</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary); font-size: 0.9rem;">Timeline</label>
                                        <select id="form-timeline" required style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 1rem; appearance: none;">
                                            <option value="" disabled selected>Select timeline...</option>
                                            <option value="Urgent">Urgent (ASAP)</option>
                                            <option value="1 Week">1 Week</option>
                                            <option value="2 Weeks">2 Weeks</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-2); color: var(--text-secondary); font-size: 0.9rem;">Describe Your Requirement (Optional)</label>
                                        <textarea id="form-desc" rows="3" placeholder="Tell us a bit more about what you need..." style="width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 1rem; resize: vertical;"></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-2);">Get My Recommendation</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    attachEventListeners() {
        const buttons = this.mountPoint.querySelectorAll('button[data-role]');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const roleId = e.target.getAttribute('data-role');
                this.openModal(roleId);
            });
        });

        const closeModalBtn = document.getElementById('close-modal');
        const modal = document.getElementById('recommendation-modal');
        const form = document.getElementById('recommendation-form');

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }

    openModal(roleId) {
        const modal = document.getElementById('recommendation-modal');
        const roleSelect = document.getElementById('form-role');
        
        if (roleSelect && roleId) {
            roleSelect.value = roleId;
        }
        
        if (modal) {
            modal.style.display = 'block';
        }
    }

    handleFormSubmit() {
        const role = document.getElementById('form-role').value;
        const goal = document.getElementById('form-goal').value;
        const budget = document.getElementById('form-budget').value;
        const timeline = document.getElementById('form-timeline').value;
        const desc = document.getElementById('form-desc').value;

        const recommendation = this.recommendationLogic[role] || this.recommendationLogic['custom'];
        this.renderRecommendationResult(recommendation, { role, goal, budget, timeline, desc });
    }

    renderRecommendationResult(rec, formData) {
        const modalContent = document.getElementById('modal-content');
        
        const textMessage = \`Hi Rishvin Labs! 👋
I'd like to get started with a project.
Here are my details:
*Role:* \${formData.role}
*Goal:* \${formData.goal}
*Budget:* \${formData.budget}
*Timeline:* \${formData.timeline}
*Details:* \${formData.desc || 'N/A'}

*I'm interested in:* \${rec.bundle.name}
Can we discuss this?\`;
        
        const whatsappUrl = \`https://wa.me/919000000000?text=\${encodeURIComponent(textMessage)}\`;

        modalContent.innerHTML = `
            <div style="text-align: center; margin-bottom: var(--space-6);">
                <div style="width: 48px; height: 48px; background: rgba(124, 58, 237, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4); color: var(--accent-violet);">
                    <i data-lucide="sparkles"></i>
                </div>
                <h3 style="font-size: var(--text-h3); margin-bottom: var(--space-2);">Your Custom Recommendation</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">Based on your goals, here is what we recommend to get you the best results.</p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 12px; padding: var(--space-5); margin-bottom: var(--space-6);">
                <h4 style="font-size: 1.1rem; margin-bottom: var(--space-4); color: var(--text-primary);">Recommended Services</h4>
                <ul style="list-style: none; padding: 0; margin-bottom: 0;">
                    ${rec.services.map(s => `
                        <li style="display: flex; justify-content: space-between; margin-bottom: var(--space-3); padding-bottom: var(--space-3); border-bottom: 1px solid var(--border); last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--accent-blue);"></i>
                                <span style="color: var(--text-secondary);">${s.name}</span>
                            </div>
                            <span style="color: var(--text-primary); font-weight: 500;">${s.price}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 12px; padding: var(--space-5); margin-bottom: var(--space-6); text-align: center;">
                <div class="tech-label" style="margin-bottom: var(--space-3); color: var(--accent-violet); justify-content: center;">[ BEST VALUE ]</div>
                <h4 style="font-size: 1.2rem; margin-bottom: var(--space-2); color: var(--text-primary);">${rec.bundle.name}</h4>
                <div style="font-size: 1.5rem; font-weight: 600; color: #fff; margin-bottom: var(--space-4);">${rec.bundle.price}</div>
                <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center; background: #25D366; border-color: #25D366; color: #fff;">
                    <i data-lucide="message-circle" style="margin-right: 8px;"></i>
                    Discuss on WhatsApp
                </a>
            </div>
            
            <button onclick="document.getElementById('recommendation-modal').style.display = 'none'" class="btn btn-outline" style="width: 100%; justify-content: center;">Close</button>
        `;
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RecommendationEngine();
});
