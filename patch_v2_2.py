import re

with open('assets/css/components.css', 'r') as f:
    css = f.read()

# Update buttons
css = re.sub(r'\.btn \{\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: var\(--space-3\) var\(--space-6\);\n  font-family: var\(--font-mono\);\n  font-size: var\(--text-small\);', 
             '.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 40px;\n  font-family: var(--font-mono);\n  font-size: 0.95rem;', css)

# Update navbar spacing
css = re.sub(r'\.navbar-links \{\n  display: flex;\n  gap: var\(--space-8\);', 
             '.navbar-links {\n  display: flex;\n  gap: var(--space-12);', css)

with open('assets/css/components.css', 'w') as f:
    f.write(css)

