import re

with open('assets/css/style.css', 'r') as f:
    css = f.read()

# 1. Update paragraph max-width and line-height
css = re.sub(r'p \{\n  color: var\(--text-secondary\);\n  font-size: var\(--text-body\);\n  max-width: 65ch;\n\}',
             'p {\n  color: var(--text-secondary);\n  font-size: var(--text-body);\n  max-width: 850px;\n  line-height: 1.8;\n}', css)

# 2. Update Containers
css = re.sub(r'\.container \{\n  width: 100%;\n  max-width: 1500px;\n  margin: 0 auto;\n  padding: 0 var\(--space-6\);\n\}',
             '.container {\n  width: min(1600px, 92%);\n  margin-inline: auto;\n}\n\n.container-wide {\n  width: min(1700px, 94%);\n  margin-inline: auto;\n}\n\n.container-medium {\n  width: min(1400px, 90%);\n  margin-inline: auto;\n}', css)

# 3. Update section spacing (Remove the padding from .section and let media query handle it, or just rewrite it)
css = re.sub(r'\.section \{\n  padding: 100px 0;\n\}', '.section {\n  padding: 90px 0;\n}', css)
css = re.sub(r'@media \(max-width: 768px\) \{\n  .section \{\n    padding: 80px 0;\n  \}', 
             '@media (max-width: 768px) {\n  .section {\n    padding: 70px 0;\n  }', css)

with open('assets/css/style.css', 'w') as f:
    f.write(css)

