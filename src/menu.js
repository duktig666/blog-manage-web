const menus = [
  {
    action: "home",
    title: "首页",
    path: "/index",
  },
  {
    action: "home",
    title: "文章管理",
    path:"/blogs",
    items: [
      { title: "博客管理", path: "/manage" },
      { title: "写博客", path: "/write" },
      { title: "回收站", path: "/recycle" },
    ]
  },
  {
    action: "people",
    title: "类别管理",
    path:"/type",
  },
  {
    action: "home",
    title: "标签管理",
    path:"/label",
  },
  {
    action: "attach_money",
    title: "评论管理",
    path: "/observe",
  },
  {
    action: "settings",
    title: "信息管理",
    path: "/user",
  }
];

export default menus;
