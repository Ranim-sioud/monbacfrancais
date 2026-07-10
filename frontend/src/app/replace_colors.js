const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../frontend/src');

const replacements = [
  // Hex Colors
  { search: /#00cfe8/gi, replace: '#ef4135' }, // --cyan-main -> --fr-red
  { search: /#b8f5ff/gi, replace: '#ffebeb' }, // --cyan-soft -> very light red
  { search: /#67e8f9/gi, replace: '#ff7a70' }, // Tailwind cyan-300 hex -> red-300 hex equivalent
  { search: /#ecfeff/gi, replace: '#ffebeb' }, // Tailwind cyan-50 hex -> red-50 hex equivalent
  { search: /#dff3ff/gi, replace: '#ffebeb' }, // Very light blue -> very light red
  { search: /#9beeff/gi, replace: '#ffc5c2' }, // Light blue -> light red
  
  // Tailwind color names
  { search: /cyan-100/g, replace: 'red-100' },
  { search: /cyan-200/g, replace: 'red-200' },
  { search: /cyan-300/g, replace: 'red-300' },
  { search: /cyan-400/g, replace: 'red-400' },
  { search: /cyan-500/g, replace: 'red-500' },
  { search: /cyan-800/g, replace: 'red-800' },
  { search: /cyan-900/g, replace: 'red-900' },
  { search: /hover:border-cyan-300/g, replace: 'hover:border-red-300' },
  { search: /border-cyan-300/g, replace: 'border-red-300' },
  { search: /border-cyan-200/g, replace: 'border-red-200' },
  { search: /bg-cyan-300/g, replace: 'bg-red-300' },
  { search: /text-cyan-200/g, replace: 'text-red-200' },
  
  // rgba values matching 0, 207, 232 (cyan) -> 239, 65, 53 (red)
  { search: /0,\s*207,\s*232/g, replace: '239, 65, 53' },
  { search: /0,207,232/g, replace: '239,65,53' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      for (const rep of replacements) {
        content = content.replace(rep.search, rep.replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.relative(srcDir, filePath)}`);
      }
    }
  }
}

console.log("Starting color replacement...");
processDirectory(srcDir);
console.log("Color replacement complete.");
