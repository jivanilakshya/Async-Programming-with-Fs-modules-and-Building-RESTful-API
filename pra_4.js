const fs = require('fs').promises;
const path = require('path');

const categories = {
  Images: ['.jpg', '.jpeg', '.png', '.gif'],
  Documents: ['.pdf', '.doc', '.docx', '.txt', '.xlsx'],
  Videos: ['.mp4', '.mkv', '.avi'],
  Others: []
};

async function organizeFiles(directoryPath) {
  try {
    const dirExists = await fs.stat(directoryPath).catch(() => null);
    if (!dirExists) return console.error('Invalid directory path.');

    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStat = await fs.stat(filePath);
      if (fileStat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        const category = Object.keys(categories).find(key => categories[key].includes(ext)) || 'Others';
        const categoryPath = path.join(directoryPath, category);
        await fs.mkdir(categoryPath, { recursive: true });
        const destPath = path.join(categoryPath, file);
        await fs.rename(filePath, destPath);
      }
    }

    const summary = Object.keys(categories).map(category => `${category}: ${categories[category].join(', ')}`).join('\n');
    await fs.writeFile(path.join(directoryPath, 'summary.txt'), summary);
    console.log('Files organized successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const directoryPath = process.argv[2];
if (!directoryPath) {
  console.error('Please provide a directory path.');
  process.exit(1);
}
organizeFiles(directoryPath);
