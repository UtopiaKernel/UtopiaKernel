# 快速开始

本模板不需要构建步骤。只要把文件推到 GitHub，并开启 GitHub Pages 即可。

## 1. GitHub Pages 设置

在 GitHub 仓库设置中找到 Pages：

- **Source**：选择 `Deploy from a branch`
- **Branch**：选择 `main`（或你的默认分支）
- **Folder**：通常选 `/ (root)`（因为我们把 `index.html` 放在仓库根目录）

完成后站点地址一般是：

`https://<用户名>.github.io/UtopiaKernel/`

## 2. 新增一篇文档

1. 在 `docs/` 下新增一个 Markdown 文件，比如 `docs/faq.md`
2. 打开 `docs/nav.json`，新增一条导航：

```json
{ "route": "faq", "title": "FAQ" }
```

3. 访问 `#/faq` 或从侧边栏点击即可

## 3. 内部锚点跳转

由于站点用 hash 路由（`#/xxx`），常规的 `#标题` 锚点会与路由冲突。

本模板提供一个简单约定：

- `#/home::section-id`

其中 `section-id` 是渲染后标题的 id（通常是标题的 slug）。

