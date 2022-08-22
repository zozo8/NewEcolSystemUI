import { MenuItem } from "primeng/api";

export const AppMenu: MenuItem[] =
[
  {
    label: "app_menu.equipment_tree",
    icon:"pi pi-align-left",
    routerLink:""
  },
  {
    label:"app_menu.orders_header",
    icon:"pi pi-align-justify",
    items:[
      {
        label:"app_menu.orders.orders",
        routerLink:"/dashboard/orders"
      },
      {
        label:"app_menu.orders.order_cards",
        routerLink:"/dashboard/order-cards"
      }
    ]
  },
  {
      label: "app_menu.browsers_header",
      icon:"pi pi-align-justify",
      items: [{
              label: "app_menu.browsers.tree_elements_header",
              items: [
                  {
                    label: "app_menu.browsers.tree_elements.objects",
                    routerLink: "/dashboard/objects",
                  },
                  {
                    label: "app_menu.browsers.tree_elements.nodes",
                    routerLink: "/dashboard/nodes",
                  },
                  {
                    label: "app_menu.browsers.tree_elements.equipments",
                    routerLink: "/dashboard/equipments",
                  },
                  {
                    label: "app_menu.browsers.tree_elements.lubricant_points",
                    routerLink: "/dashboard/lubricant-points",
                  }
              ]
          }
      ]
  },
  {
      label: "app_menu.dictionaries_header",
      icon: "pi pi-fw pi-align-justify",
      items: [
          {
            label: "app_menu.dictionaries.task_types"
          },
          {
            label: "app_menu.dictionaries.task_groups"
          }
      ]
  },
  {
    label:"app_menu.admin_header",
    icon:"pi pi-fw pi-lock",
    items:[
      {
        label:"app_menu.admin.users",
        icon:"pi pi-user",
        routerLink:"/dashboard/admin/users"
      }
    ]

  }
];
