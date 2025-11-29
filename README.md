# 挑战雅思 & GRE 1500词

一个交互式的英语词汇学习应用，帮助您高效学习雅思和 GRE 核心词汇。

## 功能特性

### 📚 词汇学习
- **1500 个核心词汇**：涵盖雅思和 GRE 考试高频词汇
- **单词卡片**：每个单词包含英文定义、中文释义、音标和例句
- **选择题练习**：通过选择题形式测试词汇理解，加深记忆

### 🎯 学习统计
- **全局统计**：实时追踪已学习单词数量、首次正确数和正确率
- **卡片统计**：每个单词卡片独立记录正确和错误次数

### 🎨 个性化体验
- **16 种主题**：支持多种视觉主题，包括森林、日落、樱花、石板、靛蓝、珊瑚、单色、黄昏、午夜、德古拉、石墨、深红、深空、极北、经典、夜枭等
- **随机图片**：每个单词配有随机图片，点击可更换，增强视觉记忆

### 🔊 交互功能
- **语音播放**：点击扬声器图标听取单词发音
- **音效反馈**：答对或答错时播放相应音效
- **卡片翻转**：答对后自动翻转卡片，查看完整单词信息
- **重置功能**：可随时重置单词卡片，重新练习

## 使用方法

1. 查看单词定义和图片
2. 从三个选项中选择正确的单词
3. 答对后卡片自动翻转，显示完整信息
4. 点击扬声器图标听取发音
5. 点击重置图标重新练习该单词

## 技术栈

- React 19
- Create React App
- Bootstrap

## 部署说明

项目支持同时部署到 GitHub Pages 和 Cloudflare Pages。

### GitHub Pages 部署

```bash
npm run deploy
```

这将使用 `build:github` 脚本构建（路径为 `/vocabflow/`），并自动推送到 `gh-pages` 分支。

### Cloudflare Pages 部署

在 Cloudflare Pages 中配置：
- **分支**: `main`
- **构建命令**: `npm run build` 或 `npm run build:cloudflare`
- **构建输出目录**: `build`
- **Node.js 版本**: 18 或 20

默认的 `npm run build` 命令已配置为 Cloudflare Pages（根路径部署）。

### 构建脚本说明

- `npm run build` - 默认构建（Cloudflare Pages，根路径）
- `npm run build:cloudflare` - 明确指定 Cloudflare Pages 构建
- `npm run build:github` - GitHub Pages 构建（子路径 `/vocabflow/`）

---

Created by Steven
