const fs = require('fs');
let src = fs.readFileSync('src/App.jsx', 'utf8');

// replace path="/ to path=" for all routes inside the layout
const lines = src.split('\n');
for (let i = 175; i < 370; i++) {
  if (lines[i] && lines[i].includes('<Route path="/')) {
    lines[i] = lines[i].replace(/<Route path="\//g, '<Route path="');
  }
}
fs.writeFileSync('src/App.jsx', lines.join('\n'));
console.log('Done replacing routes');
