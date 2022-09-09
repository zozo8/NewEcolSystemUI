import { Component, OnInit } from "@angular/core";
import { TreeNode } from "primeng/api";
import { DashboardMenuService } from "../../../dashboard-page/dashboard-menu.service";

@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styleUrls: ["./modules.component.css"]
})
export class ModulesComponent implements OnInit {
  menuTree:TreeNode[] = [];

  constructor(
    private dashboardMenuService:DashboardMenuService,
  ) { }

  ngOnInit(): void {
    this.convertMenuItemToTreeNode();
  }

  convertMenuItemToTreeNode():void {
    var n = 0;
    var menuItem = this.dashboardMenuService.getLeftMenu();

    this.menuTree.push({
      label:menuItem[0].label,
      expanded:true,
      children:menuItem.filter((el,i)=> i>0)
    });


    // children:[{
    //   label:menuItem[1].label,
    //   type:"leaf",
    //   key:menuItem[1].routerLink,
    //   expanded:true
    // }]
  }

}
