# Cloudflare KV 配置指南

既然您已经创建了 KV 空间（Namespace），请按照以下步骤完成项目绑定和初始化：

## 1. 修改 `wrangler.json`
在项目根目录的 `wrangler.json` 中添加 `kv_namespaces` 配置。请将 `YOUR_NAMESPACE_ID` 替换为您在 Cloudflare 控制台看到的 ID。

```json
{
  "name": "ainew2026",
  "compatibility_date": "2025-10-08",
  "compatibility_flags": ["nodejs_compat"],
  "main": "./dist/_worker.js/index.js",
  "kv_namespaces": [
    {
      "binding": "NEWS_KV",
      "id": "YOUR_NAMESPACE_ID"
    }
  ],
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

## 2. 更新类型定义
运行以下命令以生成 KV 绑定的 TypeScript 类型定义，这样在代码中就可以获得代码提示：

```bash
npm run cf-typegen
```

## 3. 上传初始测试数据
您可以使用 Wrangler 命令行工具将我们之前准备的 `mock_news.json` 上传到 KV 的 `latest` 键：

```bash
npx wrangler kv:key put --binding=NEWS_KV "latest" --path=./src/data/mock_news.json
```

## 4. 本地开发与线上部署
- **本地开发**：目前代码已设置为：如果找不到 KV 绑定，则自动读取 `./src/data/mock_news.json`。
- **线上部署**：在使用 `npm run deploy` 部署后，线上版本将自动通过 `NEWS_KV` 绑定读取 Cloudflare 数据库中的实时内容。

> [!TIP]
> 如果您希望在本地开发时也连接远程 KV，可以运行 `npx wrangler dev --remote`。
