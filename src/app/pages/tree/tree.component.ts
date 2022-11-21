import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  static icon = 'pi pi-fw pi-list';

  constructor() {}

  ngOnInit(): void {}
}
