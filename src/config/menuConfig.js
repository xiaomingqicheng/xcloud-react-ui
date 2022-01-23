/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles:["admin","editor","guest"]
  },
  {
    title: "应用交付中心",
    path: "/appdeliver",
    icon: "lock",
    children: [
      {
        title: "容器治理",
        path: "/appdeliver/container",
        icon: "home",
        children: [
          {
            title: "应用管理",
            path: "/appdeliver/containermanage/appmanage",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "服务管理",
            path: "/appdeliver/container/service",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "容器管理",
            path: "/appdeliver/container/container",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "配置管理",
            path: "/appdeliver/containermanage/configmanage",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          }
        ]
      },
      {
        title: "服务编排",
        path: "/appdeliver/serivemakeup",
        icon: "home",
        children: [
          {
            title: "应用摸板",
            path: "/appdeliver/serivemakeup/apptemplate",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "编排历史",
            path: "/appdeliver/serivemakeup/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
        ]
      },
      {
        title: "镜像中心",
        path: "/appdeliver/imagecenter",
        icon: "home",
        children: [
          {
            title: "镜像仓库",
            path: "/appdeliver/imagecenter/registry",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "registry证书",
            path: "/appdeliver/imagecenter/registrycert",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "镜像仓库组",
            path: "/appdeliver/imagecenter/registrygroup",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "基础镜像",
            path: "/appdeliver/imagecenter/basicimage",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "权限管理",
            path: "/appdeliver/imagecenter/power",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "镜像同步",
            path: "/appdeliver/imagecenter/imagesync",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "历史记录",
            path: "/appdeliver/imagecenter/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
        ],
      },
      {
        title: "持续集成",
        path: "/appdeliver/projectbuild",
        icon: "home",
        children: [
          {
            title: "代码仓库",
            path: "/appdeliver/projectbuild/coderegistry",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "Dockerfile",
            path: "/appdeliver/projectbuild/dockerfile",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "构建项目",
            path: "/appdeliver/ci/projectbuild",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "构建历史",
            path: "/appdeliver/projectbuild/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
        ]
      },
      {
        title: "服务部署",
        path: "/appdeliver/servicedeploy",
        icon: "home",
        children: [
          {
            title: "权限配置",
            path: "/appdeliver/servicedeploy/power",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "服务发布",
            path: "/appdeliver/servicedeploy/deploy",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "发布历史",
            path: "/appdeliver/servicedeploy/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "操作日志",
            path: "/appdeliver/servicedeploy/operatelog",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
        ]
      },
      {
        title: "流水线",
        path: "/appdeliver/pipeline",
        icon: "home",
        children: [
          {
            title: "流水线项目",
            path: "/appdeliver/pipeline/pipelineitem",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "运行历史",
            path: "/appdeliver/pipeline/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          }
        ]
      },
      {
        title: "批量部署",
        path: "/appdeliver/batchdeploy",
        icon: "home",
        children: [
          {
            title: "部署配置",
            path: "/appdeliver/batchdeploy/config",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          },
          {
            title: "部署历史",
            path: "/appdeliver/batchdeploy/history",
            icon: "home",
            roles: ["admin", "editor", "guest"]
          }
        ]
      }
    ]
  },
  {
    title: "基础设施",
    path: "/basic",
    icon: "lock",
    children: [
      {
        title: "集群管理",
        path: "/basic/cluster",
        icon: "home",
        roles: ["admin", "editor", "guest"]
      },]
  },
  {
    title: "系统配置",
    path: "/system",
    icon: "lock",
    children: [
      {
        title: "环境",
        path: "/system/env",
        icon: "home",
        roles: ["admin", "editor", "guest"]
      },]
  },
  {
    title: "开发文档",
    path: "/doc",
    icon: "file",
    roles:["admin","editor","guest"]
  },
  {
    title: "引导页",
    path: "/guide",
    icon: "key",
    roles:["admin","editor"]
  },
  {
    title: "权限测试",
    path: "/permission",
    icon: "lock",
    children: [
      {
        title: "权限说明",
        path: "/permission/explanation",
        roles:["admin"]
      },
      {
        title: "admin页面",
        path: "/permission/adminPage",
        roles:["admin"]
      },
      {
        title: "guest页面",
        path: "/permission/guestPage",
        roles:["guest"]
      },
      {
        title: "editor页面",
        path: "/permission/editorPage",
        roles:["editor"]
      },
    ],
  },
  {
    title: "组件",
    path: "/components",
    icon: "appstore",
    roles:["admin","editor"],
    children: [
      {
        title: "富文本",
        path: "/components/richTextEditor",
        roles:["admin","editor"],
      },
      {
        title: "Markdown",
        path: "/components/Markdown",
        roles:["admin","editor"],
      },
      {
        title: "拖拽列表",
        path: "/components/draggable",
        roles:["admin","editor"],
      },
    ],
  },
  {
    title: "图表",
    path: "/charts",
    icon: "area-chart",
    roles:["admin","editor"],
    children: [
      {
        title: "键盘图表",
        path: "/charts/keyboard",
        roles:["admin","editor"],
      },
      {
        title: "折线图",
        path: "/charts/line",
        roles:["admin","editor"],
      },
      {
        title: "混合图表",
        path: "/charts/mix-chart",
        roles:["admin","editor"],
      },
    ],
  },
  {
    title: "路由嵌套",
    path: "/nested",
    icon: "cluster",
    roles:["admin","editor"],
    children: [
      {
        title: "菜单1",
        path: "/nested/menu1",
        children: [
          {
            title: "菜单1-1",
            path: "/nested/menu1/menu1-1",
            roles:["admin","editor"],
          },
          {
            title: "菜单1-2",
            path: "/nested/menu1/menu1-2",
            children: [
              {
                title: "菜单1-2-1",
                path: "/nested/menu1/menu1-2/menu1-2-1",
                roles:["admin","editor"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "表格",
    path: "/table",
    icon: "table",
    roles:["admin","editor"]
  },
  {
    title: "Excel",
    path: "/excel",
    icon: "file-excel",
    roles:["admin","editor"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles:["admin","editor"]
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles:["admin","editor"]
      }
    ],
  },
  {
    title: "Zip",
    path: "/zip",
    icon: "file-zip",
    roles:["admin","editor"]
  },
  {
    title: "剪贴板",
    path: "/clipboard",
    icon: "copy",
    roles:["admin","editor"]
  },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add",
    roles:["admin"]
  },
  {
    title: "关于作者",
    path: "/about",
    icon: "user",
    roles:["admin","editor","guest"]
  },
  {
    title: "Bug收集",
    path: "/bug",
    icon: "bug",
    roles:["admin"]
  },
];
export default menuList;
