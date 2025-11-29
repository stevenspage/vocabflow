const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const backupPath = path.join(__dirname, '..', 'package.json.backup');

// 恢复 package.json
if (fs.existsSync(backupPath)) {
  fs.copyFileSync(backupPath, packagePath);
  fs.unlinkSync(backupPath);
  console.log('Restored package.json from backup');
} else {
  console.log('No backup found, package.json unchanged');
}

