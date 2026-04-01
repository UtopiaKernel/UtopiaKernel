# 写文档的约定

## 建议的写法

- 标题层级从 `#` 开始
- 代码块写明语言（例如 `rust` / `toml` / `bash`）
- 外部链接直接写正常 URL（模板会自动让外链新开标签页）

## 示例：代码高亮

```rust
#![no_std]
#![no_main]

#[no_mangle]
pub extern "C" fn kmain() -> ! {
    loop {}
}
```

## 示例：表格

| 组件 | 作用 |
| --- | --- |
| `docs/nav.json` | 配置左侧导航 |
| `docs/*.md` | 文档正文 |
| `assets/app.js` | 路由、渲染、搜索 |
| `assets/styles.css` | UI 样式 |

