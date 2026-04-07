const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const FormData = require('form-data');
const fetch = require('node-fetch');

// 配置
const UPLOAD_URL = 'http://39.170.31.244:8108/biz/modularityUpload/project1723274963761854/uploadOss';
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

// 文件匹配规则
const FILE_PATTERNS = [
  'dist/mp/rtCom*',     // dist/mp 下的 rtCom 文件
  'dist/lib/**'         // dist/lib 下的所有文件
];

/**
 * 获取 package.json 中的版本号
 */
function getVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    console.error('读取 package.json 失败:', error.message);
    process.exit(1);
  }
}

/**
 * 递归获取目录下的所有文件
 * @param {string} dir - 目录路径
 * @param {string[]} files - 文件列表
 * @returns {string[]} - 所有文件的相对路径
 */
function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const relativePath = path.relative(__dirname, fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * 获取需要上传的文件列表
 */
function getFilesToUpload() {
  const filesToUpload = [];

  for (const pattern of FILE_PATTERNS) {
    // 处理通配符目录
    const parts = pattern.split('/');
    const baseDir = parts[0];
    const subPattern = parts.slice(1).join('/');
    const fullBaseDir = path.join(__dirname, baseDir);

    if (!fs.existsSync(fullBaseDir)) {
      console.warn(`目录不存在: ${fullBaseDir}`);
      continue;
    }

    // 如果是直接文件模式（如 dist/mp/rtCom*）
    if (pattern.startsWith('dist/mp/')) {
      const mpDir = path.join(__dirname, 'dist', 'mp');
      if (fs.existsSync(mpDir)) {
        const files = fs.readdirSync(mpDir);
        for (const file of files) {
          const relativePath = path.join('dist', 'mp', file);
          if (minimatch(relativePath, pattern)) {
            filesToUpload.push(relativePath);
          }
        }
      }
    }
    // 如果是递归目录模式（如 dist/lib/**）
    else if (pattern.includes('/**')) {
      const libDir = path.join(__dirname, 'dist', 'lib');
      if (fs.existsSync(libDir)) {
        const allFiles = getAllFiles(libDir);
        for (const file of allFiles) {
          if (minimatch(file, pattern)) {
            filesToUpload.push(file);
          }
        }
      }
    }
  }

  // 去重
  return [...new Set(filesToUpload)];
}

/**
 * 上传单个文件
 * @param {string} filePath - 相对路径
 * @param {string} version - 版本号
 */
async function uploadFile(filePath, version) {
  const fullPath = path.join(__dirname, filePath);
  const fileName = path.basename(filePath);

  const form = new FormData();
  form.append('file', fs.createReadStream(fullPath), fileName);
  form.append('version', version);

  try {
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: form
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ 上传成功: ${filePath}`);
    return result;
  } catch (error) {
    console.error(`❌ 上传失败: ${filePath}`, error.message);
    throw error;
  }
}

/**
 * 主函数
 */
async function main() {
  const version = getVersion();
  console.log(`📦 版本号: ${version}`);
  console.log('🔍 扫描文件...\n');

  const files = getFilesToUpload();

  if (files.length === 0) {
    console.log('⚠️ 没有找到匹配的文件');
    return;
  }

  console.log(`📁 找到 ${files.length} 个文件:\n`);
  files.forEach(f => console.log(`  - ${f}`));
  console.log('');

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    try {
      await uploadFile(file, version);
      successCount++;
    } catch (error) {
      failCount++;
    }
  }

  console.log('\n📊 上传结果:');
  console.log(`  ✅ 成功: ${successCount}`);
  console.log(`  ❌ 失败: ${failCount}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('程序执行失败:', error);
  process.exit(1);
});
