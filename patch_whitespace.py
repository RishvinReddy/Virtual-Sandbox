import re

with open('assets/css/variables.css', 'r') as f:
    css = f.read()

# Moderately reduce large spacing variables to remove extreme "free spaces"
css = re.sub(r'--space-16: 4rem;', '--space-16: 3rem;', css)
css = re.sub(r'--space-24: 6rem;', '--space-24: 4rem;', css)
css = re.sub(r'--space-32: 8rem;', '--space-32: 5rem;', css)
css = re.sub(r'--space-40: 10rem;', '--space-40: 6rem;', css)
css = re.sub(r'--space-section: 180px;', '--space-section: 100px;', css)

with open('assets/css/variables.css', 'w') as f:
    f.write(css)

with open('assets/css/style.css', 'r') as f:
    style = f.read()

# Ensure container uses a reasonable max-width but stretches to fill more
style = re.sub(r'max-width: 1200px;', 'max-width: 1280px;', style)
style = re.sub(r'max-width: 65ch;', 'max-width: 85ch;', style) # Allow paragraphs to be a bit wider to fill space

with open('assets/css/style.css', 'w') as f:
    f.write(style)

