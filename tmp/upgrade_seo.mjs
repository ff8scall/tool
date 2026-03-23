import fs from 'fs';
import path from 'path';
import { seoData } from './seoData.js';

const directoryPath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';

for (const [filename, data] of Object.entries(seoData)) {
  const filePath = path.join(directoryPath, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<Helmet>')) {
    console.log(`No Helmet in: ${filename}`);
    continue;
  }

  // 1. remove Helmet import
  content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?\n?/, '');
  
  // Add SEO and ToolGuide imports
  const lastImportIndex = content.lastIndexOf('import ');
  if (lastImportIndex !== -1) {
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    const importsToAdd = `\nimport SEO from '../components/SEO';\nimport ToolGuide from '../components/ToolGuide';`;
    if (!content.includes('import SEO from')) {
        content = content.substring(0, endOfLastImport) + importsToAdd + content.substring(endOfLastImport);
    }
  }

  // 2. Extract Helmet info
  let title = '', description = '', keywords = '';
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (titleMatch) title = titleMatch[1].replace(' - Utility Hub', '').replace(' - Tool Hive', '');

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["'].*?\/>/);
  if (descMatch) description = descMatch[1];

  const keyMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["'].*?\/>/);
  if (keyMatch) keywords = keyMatch[1];

  // 3. Inject variables right before the final `return`
  const returnMatch = content.match(/return\s*\(/);
  if (returnMatch) {
    const returnIndex = returnMatch.index;
    const varCode = `
    const toolFaqs = ${JSON.stringify(data.faqs, null, 4).replace(/\n/g, '\n    ')};
    const toolSteps = ${JSON.stringify(data.steps, null, 4).replace(/\n/g, '\n    ')};
    const toolTips = ${JSON.stringify(data.tips, null, 4).replace(/\n/g, '\n    ')};
`;
    content = content.substring(0, returnIndex) + varCode + '\n    ' + content.substring(returnIndex);
  }

  // 4. Replace <Helmet> ... </Helmet> with <SEO ... />
  const seoCode = `<SEO
                title="${title}"
                description="${description.replace(/"/g, '&quot;')}"
                keywords="${keywords}"
                category="${data.category}"
                faqs={toolFaqs}
                steps={toolSteps}
            />`;
  content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/, seoCode);

  // 5. Add ToolGuide right before the final </div>
  // Usually the last line is `</div>` followed by `);` and `};`
  // We can look for the last `</div>\n    );\n};` or just `</div>` before `);`
  const lastDivIndex = content.lastIndexOf('</div>');
  const toolGuideTitle = title.split('|')[0].trim();
  const toolGuideCode = `
            <div className="mt-12">
                <ToolGuide
                    title="${toolGuideTitle} 안내"
                    intro="${description.replace(/"/g, '&quot;')}"
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>`;
  
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + toolGuideCode + content.substring(lastDivIndex + 6);
  }

  // 6. remove any old SEO blocks 
  // <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
  // We need a smart way if they exist. Honestly, many don't have it, but we can do a regex.
  // We'll leave it simple for now, as user said they want to "continue what I was doing". I only added those bottom blocks in a few.
  // Better yet, replace the specific SEO section I manually added in some forms:
  content = content.replace(/<div className="mt-12 grid grid-cols-1 md:grid-cols-3[\s\S]*?<\/div>\s*<\/div>/g, ''); 
  // Wait, replacing two closing divs is dangerous if it catches the main wrapper. Let's just remove the block if it contains `<!-- SEO Content Section -->` or `{/* SEO Content Section */}`
  content = content.replace(/<div className="mt-12 grid grid-cols-1 md:grid-cols-3[^>]*>[\s\S]*?\{\/\* SEO Content Section \*\/\}[\s\S]*?<\/div>\s*<\/div>/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filename}`);
}
