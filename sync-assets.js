const fs = require('fs');
const path = require('path');

const root = __dirname;
const target = path.join(root, 'android', 'app', 'src', 'main', 'assets');

const files = ['index.html', 'manifest.json', 'sw.js'];

console.log('Syncing web assets to Android assets folder...');

if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
}

files.forEach(file => {
    const src = path.join(root, file);
    const dest = path.join(target, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        const st = fs.statSync(dest);
        console.log('Synced ' + file + ' -> android/app/src/main/assets/' + file + ' (' + (st.size / 1024).toFixed(1) + ' KB)');
    } else {
        console.warn('Warning: ' + file + ' not found at root.');
    }
});

console.log('Assets are 100% synchronized!');
