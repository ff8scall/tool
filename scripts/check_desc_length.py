import os
import re

pages_dir = r'c:\AI\Antigravity\First\utility-hub\src\pages'
issues = []

# Regex to find description prop in SEO component
# It can be a simple string or a ternary operator
description_pattern = re.compile(r'description=\{([^}]+)\}', re.MULTILINE)

for filename in os.listdir(pages_dir):
    if filename.endswith('.jsx'):
        path = os.path.join(pages_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = description_pattern.findall(content)
            for raw_desc in matches:
                # Find Korean strings like "..." or '...'
                ko_strings = re.findall(r'["\']([^"\']*[가-힣]+[^"\']*)["\']', raw_desc)
                for ko_str in ko_strings:
                    length = len(ko_str)
                    if length < 50 or length > 160:
                        issues.append((filename, ko_str, length))

print("Korean SEO description length issues (<50 or >160):")
for page, text, length in issues:
    print(f"{page} ({length} chars): {text}")
