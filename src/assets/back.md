---
title: 使用 Gatsby 搭建一个自动部署的 Github 个人主页
date: "2020-06-23T20:26:03.284Z"
description: "This article will show you the simplest way to deploy Gatsby sites on github.io domain."
---

最近又在折腾个人博客 “三年一小更，五年一大更” 计划，于是用 Gatsby 新搭了一个 GitHub Pages 网站。所谓 GitHub Pages 网站就是 `username.github.io` 这种格式的静态网站。用它来做博客的优点就是免费、域名在 qiang 内可访问、有极客范。而且在简历上有一些 GitHub 活跃度也是一个不可小视的加分项。

这篇文章主要是记录一下最近利用最近 GitHub 自家开发的 CI 产品，GitHub actions，做了一个 “自动化部署” 的静态博客网站。

说到 CI，大家比较熟悉的有 Jenkins，Travis CI，Circle CI 等等。GitHub Actions 的优势也很明显：**无需安装第三方 app，而且配置起来非常“无脑”。**

### 1. 创建 Gatsby 项目

选用 Gatsby，除了它是基于 React.js 和 GraphQL 以外，它还有一个丰富而庞大的插件生态系统和模版库：https://www.gatsbyjs.org/starters

```
# 安装 gatsby CLI 工具
yarn global add gatsby-cli
```

安装好之后，就会有一个命令行工具

```
gatsby new my-blog-site https://github.com/gatsbyjs/gatsby-starter-blog
```

项目生成后，
