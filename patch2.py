import glob
import re

for f in glob.glob("*.html"):
    with open(f, 'r') as file:
        content = file.read()
    
    # Remove max-width constraints on inline styles to allow filling
    content = re.sub(r'max-width:\s*\d+px;\s*', '', content)
    # Also reduce any huge padding inline
    content = re.sub(r'padding-top:\s*var\(--space-32\);?', 'padding-top: var(--space-12);', content)
    content = re.sub(r'padding-bottom:\s*var\(--space-32\);?', 'padding-bottom: var(--space-12);', content)
    content = re.sub(r'padding-bottom:\s*var\(--space-16\);?', 'padding-bottom: var(--space-8);', content)
    content = re.sub(r'margin-bottom:\s*var\(--space-32\);?', 'margin-bottom: var(--space-12);', content)
    content = re.sub(r'margin-bottom:\s*var\(--space-16\);?', 'margin-bottom: var(--space-8);', content)
    # Also reduce min-height on sections like hero to 30vh instead of 100vh or 50vh
    content = re.sub(r'min-height:\s*100vh;', 'min-height: 40vh;', content)
    content = re.sub(r'min-height:\s*80vh;', 'min-height: 40vh;', content)
    content = re.sub(r'min-height:\s*50vh;', 'min-height: 30vh;', content)

    with open(f, 'w') as file:
        file.write(content)
