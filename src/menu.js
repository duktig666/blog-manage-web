const menus = [
  {
    action: "home",
    title: "首页",
    path: "/home",
  },
  {
    action: "home",
    title: "文章管理",
    items: [
      {action: "home", title: "博客管理", path: "/blog/manage" },
      {action: "home", title: "写博客", path: "/blog/write" },
      {action: "home", title: "回收站", path: "/blog/recycle" },
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
    title: "留言管理",
    path: "/leaveWord",
  },
  {
    action: "settings",
    title: "信息管理",
    path: "/user",
  }
];

export default menus;
