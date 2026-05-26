import re

with open('assets/css/style.css', 'r') as f:
    css = f.read()

# 1. Update .container width
css = re.sub(r'\.container \{\n  width: 100%;\n  max-width: 1280px;', '.container {\n  width: 100%;\n  max-width: 1500px;', css)
css = re.sub(r'\.container \{\n  width: 100%;\n  max-width: 1200px;', '.container {\n  width: 100%;\n  max-width: 1500px;', css)

# 2. Update .section spacing
css = re.sub(r'\.section \{\n  padding: var\(--space-section\) 0;', '.section {\n  padding: 100px 0;', css)

# Add responsive .section for mobile
css = re.sub(r'@media \(max-width: 768px\) \{', '@media (max-width: 768px) {\n  .section {\n    padding: 80px 0;\n  }', css)

# Add .hero-dense
hero_css = """
/* Hero Dense Layout */
.hero-dense {
    min-height: 72vh;
    padding-top: 120px;
    padding-bottom: 80px;
    display: flex;
    align-items: center;
}

@media (max-width: 992px) {
    .hero-container {
        grid-template-columns: 1fr !important;
        text-align: left;
    }
    
    .hero-dense {
        padding-top: 160px; /* account for navbar */
        min-height: auto;
    }
}
"""
css += hero_css

with open('assets/css/style.css', 'w') as f:
    f.write(css)
