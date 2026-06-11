document.addEventListener("DOMContentLoaded", () => {
    const servicesContainer = document.getElementById("services-container");
    const categoryNavContainer = document.getElementById("categories-nav");
    
    // Check if we are on a page that should render data dynamically
    if (!servicesContainer) return;

    // Helper: Build WhatsApp URL
    const buildWhatsAppUrl = (serviceName) => {
        const phone = "919000000000"; // Placeholder phone number
        const text = encodeURIComponent(`Hi, I'm interested in ${serviceName}`);
        return `https://wa.me/${phone}?text=${text}`;
    };

    // Load Sections Master File
    fetch('data/sections.json')
        .then(res => res.json())
        .then(data => {
            renderCategoryNav(data.sections);
            
            // Determine which category to load based on URL params
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category') || data.sections[0].id;
            
            const activeSection = data.sections.find(s => s.id === categoryId && s.enabled);
            if (activeSection) {
                loadCategoryData(activeSection);
            } else {
                servicesContainer.innerHTML = "<p>Category not found or disabled.</p>";
            }
        })
        .catch(err => {
            console.error("Error loading sections:", err);
            if (window.location.protocol === 'file:') {
                servicesContainer.innerHTML = `
                    <div style="padding: 2rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; text-align: center; max-width: 600px; margin: 0 auto;">
                        <h3 style="color: #ef4444; margin-bottom: 1rem; font-family: var(--font-heading);">⚠️ Local File Protocol Detected</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">The dynamic data engine uses <strong>fetch()</strong> to load the service catalog. Modern browsers block this for security reasons when you open the file directly (using <code>file:///</code>).</p>
                        <p style="color: var(--text-secondary); font-weight: 600;">How to fix it:</p>
                        <ul style="color: var(--text-secondary); text-align: left; margin: 1rem auto; max-width: 400px; line-height: 1.6;">
                            <li><strong>VS Code:</strong> Install the "Live Server" extension and click "Go Live" at the bottom right.</li>
                            <li><strong>Terminal:</strong> Run <code>python -m http.server</code> or <code>npx serve</code> in the project folder.</li>
                        </ul>
                    </div>
                `;
            } else {
                servicesContainer.innerHTML = "<p>Error loading sections data. Please try again later.</p>";
            }
        });

    // Render Navigation for categories (Premium UX)
    function renderCategoryNav(sections) {
        if (!categoryNavContainer) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category') || sections[0].id;

        let navHTML = `
        <div class="category-tabs-wrapper">
            <div class="category-tabs-container" id="category-scroll-container">
        `;
        
        sections.filter(s => s.enabled).forEach(section => {
            const isActive = section.id === currentCategory;
            const activeClass = isActive ? 'active' : '';
            navHTML += `
            <a href="?category=${section.id}" class="category-tab ${activeClass}">
                <i data-lucide="${section.icon}"></i>
                ${section.title}
            </a>`;
        });
        
        navHTML += `
            </div>
        </div>`;
        
        categoryNavContainer.innerHTML = navHTML;
        
        // Re-initialize lucide icons for newly added elements
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Load specific category data
    function loadCategoryData(section) {
        servicesContainer.innerHTML = `<div class="loader-spinner" style="text-align: center; padding: 2rem;">Loading...</div>`;
        
        fetch(`data/${section.file}`)
            .then(res => res.json())
            .then(data => {
                renderServices(data);
            })
            .catch(err => {
                console.error("Error loading category data:", err);
                servicesContainer.innerHTML = "<p>Error loading services data.</p>";
            });
    }

    // Render the services and packages
    function renderServices(data) {
        let html = `
            <div style="margin-bottom: 2rem;">
                <h2 style="font-size: var(--text-h2); margin-bottom: 0.5rem;">${data.category}</h2>
                <p style="color: var(--text-secondary);">${data.description}</p>
            </div>
        `;

        const renderServicesGrid = (servicesArray) => {
            let gridHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-6); margin-bottom: 3rem;">`;
            servicesArray.forEach((service, index) => {
                const delay = (index % 3 + 1) * 100;
                let featuresHtml = '';
                if (service.features) {
                    featuresHtml = `<ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; flex-grow: 1; margin-bottom: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">`;
                    service.features.forEach(feature => {
                        featuresHtml += `
                            <li style="font-size: 0.85rem; display: flex; gap: 8px; align-items: center; color: var(--text-secondary);">
                                <i data-lucide="check" style="width: 14px; height: 14px; color: var(--accent-blue);"></i>
                                ${feature}
                            </li>
                        `;
                    });
                    featuresHtml += `</ul>`;
                }

                gridHtml += `
                    <div class="card reveal delay-${delay}" style="padding: 0; display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden; border-radius: var(--radius-xl); background: var(--surface); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid var(--border);">
                        
                        <!-- Top Accent Bar -->
                        <div style="height: 4px; background: ${service.popular ? 'var(--gradient-primary)' : 'var(--bg-secondary)'}; width: 100%;"></div>
                        
                        <div style="padding: var(--space-8); flex-grow: 1; display: flex; flex-direction: column;">
                            <!-- Badges -->
                            <div style="display: flex; gap: 8px; margin-bottom: var(--space-4); min-height: 24px;">
                                ${service.popular ? `<span style="font-size: 0.65rem; background: rgba(37,99,235,0.1); color: var(--accent-blue); padding: 4px 12px; font-family: var(--font-mono); font-weight: 700; border-radius: var(--radius-full); border: 1px solid rgba(37,99,235,0.2); letter-spacing: 0.05em;">MOST POPULAR</span>` : ''}
                                ${service.offer ? `<span style="font-size: 0.65rem; background: rgba(124,58,237,0.1); color: var(--accent-violet); padding: 4px 12px; font-family: var(--font-mono); font-weight: 700; border-radius: var(--radius-full); border: 1px solid rgba(124,58,237,0.2); letter-spacing: 0.05em;">${service.offer.label}</span>` : ''}
                            </div>

                            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.01em; color: var(--text-primary);">${service.name}</h3>
                            
                            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-6); line-height: 1.5; flex-grow: 0;">${service.description || ''}</p>
                            
                            <div style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-heading); margin-bottom: var(--space-6); letter-spacing: -0.03em; color: var(--text-primary); display: flex; align-items: baseline; gap: 8px;">
                                <span style="font-size: 1.2rem; color: var(--text-muted); font-weight: 600;">${service.currency === 'INR' ? '₹' : service.currency}</span>${service.price} 
                                ${service.startingAt ? `<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-mono);">/ starting</span>` : ''}
                            </div>
                            
                            ${featuresHtml}
                            
                            <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: var(--space-6);">
                                <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Delivery Timeline</span>
                                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary);">${service.delivery || 'TBD'}</span>
                            </div>
                            
                            <a href="${buildWhatsAppUrl(service.name)}" target="_blank" class="btn ${service.popular ? 'btn-primary' : 'btn-outline'}" style="text-align: center; width: 100%; padding: 16px; font-size: 1rem; border-radius: var(--radius-md); box-shadow: ${service.popular ? '0 8px 20px rgba(37,99,235,0.2)' : 'none'};">
                                Get Started <i data-lucide="arrow-right" style="width: 16px; height: 16px; margin-left: 8px;"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            gridHtml += `</div>`;
            return gridHtml;
        };

        if (data.subcategories && data.subcategories.length > 0) {
            data.subcategories.forEach(sub => {
                html += `<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">${sub.name}</h3>`;
                if (sub.services && sub.services.length > 0) {
                    html += renderServicesGrid(sub.services);
                }
            });
        } else if (data.services && data.services.length > 0) {
            html += `<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem;">Services</h3>`;
            html += renderServicesGrid(data.services);
        }

        if (data.packages && data.packages.length > 0) {
            html += `<h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1.5rem; margin-top: 2rem;">Bundled Packages</h3>`;
            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-6); margin-bottom: 3rem;">`;
            
            data.packages.forEach((pkg, index) => {
                const delay = (index % 3 + 1) * 100;
                
                let includesHtml = '';
                if (pkg.includes) {
                    includesHtml = `<ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; flex-grow: 1; margin-bottom: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">`;
                    pkg.includes.forEach(item => {
                        includesHtml += `
                            <li style="font-size: 0.85rem; display: flex; gap: 8px; align-items: center; color: var(--text-secondary);">
                                <i data-lucide="plus" style="width: 14px; height: 14px; color: var(--accent-violet);"></i>
                                ${item}
                            </li>
                        `;
                    });
                    includesHtml += `</ul>`;
                }

                html += `
                    <div class="card reveal delay-${delay}" style="padding: var(--space-6); display: flex; flex-direction: column; height: 100%; position: relative; border-color: ${pkg.popular ? 'var(--accent-violet)' : 'var(--border)'};">
                        ${pkg.popular ? `<span style="position: absolute; top: -10px; right: 20px; font-size: 0.62rem; background: var(--accent-violet); color: white; padding: 2px 8px; font-family: var(--font-mono); font-weight: 600; border-radius: 2px;">POPULAR BUNDLE</span>` : ''}
                        
                        <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">${pkg.name}</h3>
                        
                        <div style="font-size: 1.8rem; font-weight: 700; font-family: var(--font-mono); margin-bottom: 0.5rem;">
                            ${pkg.currency === 'INR' ? '₹' : pkg.currency}${pkg.price}
                        </div>
                        
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${pkg.description}</p>
                        
                        ${includesHtml}
                        
                        <a href="${buildWhatsAppUrl(pkg.name)}" target="_blank" class="btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}" style="text-align: center; width: 100%; ${pkg.popular ? 'background: var(--accent-violet); border-color: var(--accent-violet);' : ''}">
                            Get Started &rarr;
                        </a>
                    </div>
                `;
            });
            html += `</div>`;
        }

        servicesContainer.innerHTML = html;
        
        // Re-initialize lucide icons for newly added elements
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Re-trigger scroll reveal animations if applicable
        
        if (typeof window.checkReveal === 'function') {
            setTimeout(window.checkReveal, 100);
        }

    }
});
