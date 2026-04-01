# 站点结构

建议按下面结构维护（你也可以自行调整）：

```
/
  index.html
  404.html
  .nojekyll
  site.webmanifest
  assets/
    app.js
    styles.css
    icons.svg
    favicon.svg
  docs/
    nav.json
    home.md
    getting-started.md
    structure.md
    writing.md
    404.md
```

## 路由与文件的对应关系

- `#/home` → `docs/home.md`
- `#/getting-started` → `docs/getting-started.md`

也就是说，导航里的 `route` 会被映射为 `docs/<route>.md`。

## BasePath 处理

GitHub Pages 项目站点一般会挂在 `/<repo>/` 下面（比如 `/UtopiaKernel/`）。

本模板会自动从 `location.pathname` 推断 `basePath`，因此静态资源与文档的加载路径不需要你手工改成绝对路径。

