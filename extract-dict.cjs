import fs from 'fs';
import { tools, toolCategories, toolCategoryData } from './src/data/tools.js';

const koData = JSON.parse(fs.readFileSync('./src/locales/ko.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf8'));

// Setup sections
koData.tools = koData.tools || {};
enData.tools = enData.tools || {};
koData.categoryData = koData.categoryData || {};
enData.categoryData = enData.categoryData || {};

// Categories
Object.entries(toolCategories).forEach(([key, val]) => {
  if (!koData.common.categories[key]) koData.common.categories[key] = val;
});

// Category Data
Object.entries(toolCategoryData).forEach(([key, val]) => {
  koData.categoryData[key] = {
     title: val.title,
     description: val.description
  };
  enData.categoryData[key] = enData.categoryData[key] || {
     title: val.title,
     description: val.description
  };
});

// Tools
tools.forEach(tool => {
  koData.tools[tool.id] = {
     title: tool.title,
     description: tool.description
  };
  enData.tools[tool.id] = enData.tools[tool.id] || {
     title: tool.title,  // fallback to korean for now
     description: tool.description
  };
});

fs.writeFileSync('./src/locales/ko.json', JSON.stringify(koData, null, 2));
fs.writeFileSync('./src/locales/en.json', JSON.stringify(enData, null, 2));
console.log('Dictionaries updated!');
