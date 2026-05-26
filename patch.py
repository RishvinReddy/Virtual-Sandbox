import re

with open('assets/css/variables.css', 'r') as f:
    css = f.read()

# Reduce large spacing variables
css = re.sub(r'--space-12: 3rem;', '--space-12: 2rem;', css)
css = re.sub(r'--space-16: 4rem;', '--space-16: 2.5rem;', css)
css = re.sub(r'--space-24: 6rem;', '--space-24: 3rem;', css)
css = re.sub(r'--space-32: 8rem;', '--space-32: 4rem;', css)
css = re.sub(r'--space-40: 10rem;', '--space-40: 5rem;', css)
css = re.sub(r'--space-section: 180px;', '--space-section: 60px;', css)

with open('assets/css/variables.css', 'w') as f:
    f.write(css)

with open('assets/css/style.css', 'r') as f:
    style = f.read()

# Increase container max-width to fill more space horizontally
style = re.sub(r'max-width: 1200px;', 'max-width: 1400px;', style)
style = re.sub(r'max-width: 900px;', 'max-width: 1400px;', style)

with open('assets/css/style.css', 'w') as f:
    f.write(style)

