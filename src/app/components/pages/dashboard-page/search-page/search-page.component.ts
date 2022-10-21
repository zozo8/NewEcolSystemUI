import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MenuItem, TreeNode } from "primeng/api";
import { Tab } from "src/app/models/tab.model";
import { DashboardMenuService } from "../dashboard-menu.service";
import { LeftMenuService } from "../left-menu/left-menu.service";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {

  searchMenu: MenuItem[];
  selectedItem:TreeNode;
  pages:TreeNode[];

  @Output()
  refreshTabs = new EventEmitter<Tab>();

  constructor(
    private menuService:DashboardMenuService,
    private leftMenuService:LeftMenuService
  ) { }

  ngOnInit(): void {
    this.searchMenu = this.menuService.getSearchMenu();
  }

  search(ev:any):void{
    this.leftMenuService.getPages(ev).subscribe({
      next:(res:TreeNode[])=> this.pages = res
    });
  }

  select(item:any):void{
    console.log("selected item", item);
    var tab:Tab = {
      header:item.label,
      component:item.component,
      tooltip:item.data,
      icon:item.icon,
      parent: [{
        label:item.parent,
        icon:item.icon,
        tooltip:item.data
      }]
    };

    this.refreshTabs.emit(tab);
  }

}
