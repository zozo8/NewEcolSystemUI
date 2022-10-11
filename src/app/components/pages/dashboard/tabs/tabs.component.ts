import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
import { InitEditableRow } from 'primeng/table';
import { Tab } from 'src/app/models/tab.model';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { DynamicTabComponent } from './dynamic-tab/dynamic-tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  activeIndex:number;
  tabs:Array<{view:ViewRef, component:any}> = [];

  @ViewChild(DynamicTabComponent) dynamicComponent:DynamicTabComponent;

  constructor(

  ) { }

  addComponent(compnent:any){
    // let component = this.dynamicComponent.addComponent(component);
  }



}


