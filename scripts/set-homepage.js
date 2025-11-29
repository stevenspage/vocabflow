const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const backupPath = path.join(__dirname, '..', 'package.json.backup');

// 如果存在备份文件，说明之前构建被中断，先恢复
if (fs.existsSync(backupPath)) {
  fs.copyFileSync(backupPath, packagePath);
  fs.unlinkSync(backupPath);
  console.log('Restored package.json from backup');
}

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 从环境变量获取 homepage，默认为 '.' (Cloudflare Pages)
const homepage = process.env.HOMEPAGE || '.';

// 备份原始文件
fs.copyFileSync(packagePath, backupPath);

// 修改 homepage
packageJson.homepage = homepage;

// 保存修改后的文件
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Set homepage to: ${homepage}`);

