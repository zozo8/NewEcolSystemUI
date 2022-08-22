import { MenuItem } from "primeng/api";

export const UserMenu:MenuItem[] = [
    {
      label:"user_menu.settings",
      icon:"pi pi-fw pi-sliders-h",
    },
    {
      label:"user_menu.user_profile",
      icon:"pi pi-fw pi-user",
    },
    {
      separator:true
    },
    {
      label:"user_menu.logout",
      icon:"pi pi-fw pi-power-off",
      command:()=> {
       // this.logout();
      }
    }
]
