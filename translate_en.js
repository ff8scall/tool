import fs from 'fs';

const enFile = './src/locales/en.json';
const data = JSON.parse(fs.readFileSync(enFile, 'utf8'));

const translations = {
    "length": { title: "Length Converter", description: "Convert between meters, feet, inches, centimeters, and miles easily." },
    "weight": { title: "Weight Converter", description: "Convert between kilograms, pounds, ounces, and grams accurately." },
    "currency": { title: "Currency Converter", description: "Real-time exchange rates for USD, EUR, JPY and more." },
    "temperature-converter": { title: "Temperature Converter", description: "Convert Celsius, Fahrenheit, and Kelvin." },
    "area-converter": { title: "Area Converter", description: "Convert square meters, acres, hectares, and pyeong." },
    "volume-converter": { title: "Volume Converter", description: "Convert liters, gallons, and cubic meters." },
    "speed-converter": { title: "Speed Converter", description: "Convert km/h, mph, and m/s." },
    "loan": { title: "Loan Calculator", description: "Calculate equal principal and interest loan payments." },
    "salary": { title: "Salary Net Pay", description: "Calculate net salary after taxes and insurance." },
    "severance": { title: "Severance Calculator", description: "Calculate your estimated severance pay." },
    "minimum-wage": { title: "Minimum Wage Calculator", description: "Check and calculate 2024/2025 minimum wage." },
    "compound-interest": { title: "Compound Interest", description: "Calculate compound interest and investment returns." },
    "percent-calculator": { title: "Percentage Calculator", description: "Calculate ratios, increase/decrease, and discounts." },
    "discount-calculator": { title: "Discount Calculator", description: "Calculate final prices after applying discount rates." },
    "work-hours": { title: "Work Hours Calculator", description: "Calculate working hours and wages." },
    "age-calc": { title: "Age Calculator", description: "Calculate chronological and international age." },
    "date": { title: "Date Calculator", description: "Calculate date differences and D-Days." },
    "lunch-recommender": { title: "Lunch Recommender", description: "Can't decide? Let us pick a random lunch menu for you!" },
    "word-count": { title: "Word Counter", description: "Count characters, words, and sentences." },
    "unicode": { title: "Unicode Converter", description: "Convert between text and unicode format." },
    "string-converter": { title: "String Format Converter", description: "Convert text case format like camelCase, PascalCase." },
    "base64": { title: "Base64 Encode/Decode", description: "Base64 encoder and decoder tool." },
    "html-encoder": { title: "HTML Entity Encoder", description: "Encode and decode HTML entities securely." },
    "morse-code": { title: "Morse Code Converter", description: "Translate text to Morse code and vice versa." },
    "base-converter": { title: "Numeric Base Converter", description: "Convert binary, octal, decimal, and hexadecimals." },
    "json-formatter": { title: "JSON Formatter", description: "Format and validate JSON data perfectly." },
    "markdown-editor": { title: "Markdown Editor", description: "Real-time preview markdown editor." },
    "html-view": { title: "HTML Formatter", description: "Format and preview HTML code cleanly." },
    "diff": { title: "Code Diff Checker", description: "Compare differences between two text or code files." },
    "web-editor": { title: "Web Editor", description: "Real-time HTML/CSS/JS editor and previewer." },
    "hash-gen": { title: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes." },
    "uuid-gen": { title: "UUID Generator", description: "Generate secure UUID v4 tokens." },
    "url-encoder": { title: "URL Encoder/Decoder", description: "URL encoding and decoding tool." },
    "jwt-decoder": { title: "JWT Decoder", description: "Decode and inspect JSON Web Tokens." },
    "regex-tester": { title: "Regex Tester", description: "Test and validate regular expressions." },
    "ascii-art": { title: "ASCII Art Generator", description: "Convert text to ASCII art beautifully." },
    "ascii-table": { title: "ASCII Table Reference", description: "Comprehensive ASCII code table reference." },
    "special-char": { title: "Special Characters", description: "Collection of frequently used special symbols." },
    "cron-generator": { title: "CRON Generator", description: "Generate CRON scheduling expressions." },
    "csv-json": { title: "CSV to JSON Converter", description: "Convert between CSV and JSON data formats." },
    "fraction-calculator": { title: "Fraction Calculator", description: "Perform operations on fractions." },
    "encryption-tool": { title: "AES Encryption Tool", description: "Encrypt text utilizing AES algorithms securely." },
    "qr-gen": { title: "QR Code Generator", description: "Convert URL or text to QR code formats." },
    "barcode-gen": { title: "Barcode Generator", description: "Generate standard barcodes from numbers." },
    "password-gen": { title: "Password Generator", description: "Generate secure, random passwords instantly." },
    "color-picker": { title: "Color Picker & Palette", description: "Pick colors and convert HEX/RGB codes." },
    "image-base64": { title: "Image to Base64", description: "Encode images to Base64 data natively." },
    "ip-address": { title: "My IP Address", description: "Check your public IP and location information." },
    "timer": { title: "Timer & Stopwatch", description: "Online timer, stopwatch, and alarm tool." },
    "pomodoro-timer": { title: "Pomodoro Timer", description: "25-minute focus, 5-minute break timer." },
    "checklist": { title: "Checklist / Todo", description: "Simple task checklist manager." },
    "flashlight": { title: "Flashlight", description: "Use your screen display as a flashlight." },
    "image-resize": { title: "Image Resizer", description: "Resize and compress images quickly." },
    "youtube-thumbnail": { title: "YouTube Thumbnail Downloader", description: "Extract and download thumbnails from YouTube videos." },
    "mandalart": { title: "Mandalart Planner", description: "Visual planner mimicking Shohei Ohtani's achievement method." },
    "color-extractor": { title: "Image Color Extractor", description: "Extract major color palettes from images." },
    "world-clock": { title: "World Clock", description: "Check current time across major cities globally." }
};

const categoryTranslations = {
    "unit": { title: "Unit Converters", description: "Convert length, weight, currency, temperature, and area quickly with live rates." },
    "finance": { title: "Finance & Life Calculators", description: "Calculate loans, salary nets, severance, and more with up-to-date data." },
    "text": { title: "Text Analysis & Tools", description: "Count words, convert cases, and manipulate strings perfectly." },
    "dev": { title: "Essential Developer Tools", description: "Format JSON, encode Base64, decode JWT, and test Regex on the browser directly." },
    "utility": { title: "Convenient Utilities", description: "Generate QR codes, check IP, make strong passwords, and manage timers." },
    "health": { title: "Health Metrics Calculators", description: "Check your BMI, calories, and biological rhythms seamlessly." },
    "games": { title: "Mini Games Collection", description: "Play 2048, Snake, Sudoku, and more without downloads." },
    "fun": { title: "Fun & Fortune Telling", description: "Check your fortune, daily tarot, MBTI type, and more fun stuff!" },
    "trivia": { title: "Trivia & Quizzes", description: "Test your common knowledge with spelling and text quizzes." }
};

for (const [id, t] of Object.entries(translations)) {
    if (data.tools[id]) {
        data.tools[id].title = t.title;
        data.tools[id].description = t.description;
    }
}

for (const [cat, t] of Object.entries(categoryTranslations)) {
    if (data.categoryData[cat]) {
        data.categoryData[cat].title = t.title;
        data.categoryData[cat].description = t.description;
    }
}

fs.writeFileSync(enFile, JSON.stringify(data, null, 2));
console.log('en.json translated texts injected!');
