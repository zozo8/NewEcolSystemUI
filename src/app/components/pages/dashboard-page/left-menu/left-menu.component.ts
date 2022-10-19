import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Event } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { TreeNode } from "primeng/api";
import { Tab } from "src/app/models/tab.model";
import { LeftMenuService } from "./left-menu.service";

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.css"]
})
export class LeftMenuComponent implements OnInit {

  menu:TreeNode[];
  selectedMenu:TreeNode;

  @Input()
  display:boolean;

  @Output()
  refreshTabs = new EventEmitter<Tab>();

  @Output()
  changeDisplay = new EventEmitter<void>();

  constructor(
    private translateService:TranslateService,
    private leftMenuService:LeftMenuService
  ) { }

  ngOnInit(): void {
    this.menu = this.leftMenuService.getMenu();
  }

  onHide(ev:Event):void {
    this.changeDisplay.emit();
  }

  selectMenu(item:any):void {
    var tab:Tab = {
      header:this.translateService.instant(item.node.label??""),
      component:item.node.component,
      tooltip:item.node.data,
      icon:item.node.icon,
      parent: [{
        label:item.node.parent,
        icon:item.node.icon,
        tooltip:item.node.data
      }]
      //parent:item.node.parent
    };
    this.changeDisplay.emit();
    this.refreshTabs.emit(tab);
  }

}
