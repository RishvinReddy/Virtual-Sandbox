import re

with open('assets/css/variables.css', 'r') as f:
    css = f.read()

# Typography Scale Updates
css = re.sub(r'--text-hero: .*?;', '--text-hero: clamp(5rem, 8vw, 8.5rem);', css)
css = re.sub(r'--text-h1: .*?;', '--text-h1: clamp(4rem, 6vw, 6rem);', css)
css = re.sub(r'--text-h2: .*?;', '--text-h2: clamp(3rem, 5vw, 5rem);', css)
css = re.sub(r'--text-body: .*?;', '--text-body: 1.2rem;', css)

# Line Heights
css = re.sub(r'--line-height-base: 1.4;', '--line-height-base: 1.8;', css)

with open('assets/css/variables.css', 'w') as f:
    f.write(css)

