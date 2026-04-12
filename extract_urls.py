import re

with open(r'c:\AI\Antigravity\Tool\dist\sitemap.xml', 'r', encoding='utf-8') as f:
    content = f.read()
    urls = re.findall(r'<loc>(.*?)</loc>', content)

# Remove duplicates and take first 90
unique_urls = []
for url in urls:
    if url not in unique_urls:
        unique_urls.append(url)
    if len(unique_urls) >= 90:
        break

for url in unique_urls:
    print(url)
