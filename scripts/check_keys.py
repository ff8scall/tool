import json
import os
import re

# Load locale files
with open(r'c:\AI\Antigravity\Tool\src\locales\ko.json', 'r', encoding='utf-8') as f:
    ko_data = json.load(f)

with open(r'c:\AI\Antigravity\Tool\src\locales\en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

ko_keys = set(ko_data.get('tools', {}).keys())
en_keys = set(en_data.get('tools', {}).keys())

pages_dir = r'c:\AI\Antigravity\Tool\src\pages'
mismatches = []

for filename in os.listdir(pages_dir):
    if filename.endswith('.jsx'):
        path = os.path.join(pages_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find all t('tools.XXX.something') or t("tools.XXX.something")
            matches = re.findall(r"t\(['\"]tools\.([\w-]+)\.", content)
            for key in matches:
                if key not in ko_keys:
                    mismatches.append((filename, key))

print("Mismatched keys found in pages:")
for page, key in mismatches:
    print(f"{page}: {key}")
