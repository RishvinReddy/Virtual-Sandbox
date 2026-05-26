import re

with open('assets/css/components.css', 'r') as f:
    css = f.read()

# 1. Navbar Resize
css = re.sub(r'\.navbar-container \{\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 80px;\n\}',
             '.navbar-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 28px 0;\n}', css)

css = re.sub(r'\.navbar-links \{\n  display: flex;\n  gap: var\(--space-12\);\n  align-items: center;\n\}',
             '.navbar-links {\n  display: flex;\n  gap: 3rem;\n  align-items: center;\n}', css)

# 2. Cards
css = re.sub(r'\.card \{\n  background-color: var\(--surface\);\n  border: 1px solid var\(--border\);\n  padding: var\(--space-8\);\n  border-radius: var\(--radius-lg\);\n  transition: all 0.3s ease;\n  height: 100%;\n\}',
             '.card {\n  background-color: var(--surface);\n  border: 1px solid var(--border);\n  padding: 50px;\n  min-height: 350px;\n  display: flex;\n  flex-direction: column;\n  border-radius: var(--radius-lg);\n  transition: all 0.3s ease;\n  height: 100%;\n}', css)

# 3. Footer
css = re.sub(r'\.footer \{\n  background-color: var\(--bg-primary\);\n  padding: var\(--space-24\) 0 var\(--space-8\);\n  border-top: 1px solid var\(--border\);\n\}',
             '.footer {\n  background-color: var(--bg-primary);\n  padding: 90px 0;\n  border-top: 1px solid var(--border);\n}', css)

with open('assets/css/components.css', 'w') as f:
    f.write(css)

# Also update logo image height in style.css
with open('assets/css/style.css', 'r') as f:
    style = f.read()

style = re.sub(r'\.logo-img \{\n    width: 32px;\n    height: 32px;',
               '.logo-img {\n    width: 44px;\n    height: 44px;', style)
style = re.sub(r'\.footer-brand \.logo-img \{\n    width: 40px;\n    height: 40px;\n\}',
               '.footer-brand .logo-img {\n    width: 56px;\n    height: 56px;\n}', style)

with open('assets/css/style.css', 'w') as f:
    f.write(style)

