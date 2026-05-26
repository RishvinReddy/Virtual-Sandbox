import os
import glob

footer_html = """            <div class="footer-bottom">
                <div>
                    <p style="margin-bottom: var(--space-1);">&copy; 2026 Rishvin Labs. All rights reserved.</p>
                    <p class="text-small" style="color: var(--text-secondary);">Last Updated &mdash; May 2026</p>
                </div>
                <div style="display: flex; gap: var(--space-4); align-items: center;">
                    <span class="text-small" style="color: var(--text-secondary); font-family: var(--font-mono); text-transform: uppercase;">Designed &amp; Engineered by Rishvin Labs</span>
                </div>
            </div>"""

for f in glob.glob("*.html"):
    with open(f, "r") as file:
        content = file.read()
    
    # Replace the existing footer-bottom
    start_str = '<div class="footer-bottom">'
    end_str = '</div>\n        </div>\n    </footer>'
    
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str)
        
        new_content = content[:start_idx] + footer_html + "\n        " + content[end_idx:]
        with open(f, "w") as file:
            file.write(new_content)
        print(f"Updated footer in {f}")
