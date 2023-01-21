import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  model: TreeNode[];

  constructor(public app: AppComponent, private menuService: MenuService) {}

  ngOnInit(): void {
    this.model = this.menuService.getMenu();
  }
}
