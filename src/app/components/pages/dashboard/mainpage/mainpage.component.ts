import { Component, OnInit} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TreeNode } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";
import { DashboardMenuService } from "../../dashboard-page/dashboard-menu.service";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.css"]
})
export class MainpageComponent implements OnInit {
  menuTree:TreeNode[] = [];
  loading:boolean;

  constructor(
    private dashboardMenuService:DashboardMenuService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.convertMenuItemToTreeNode();
    console.log("menu",this.menuTree, this.menuTree.length);
    this.loading = false;
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
