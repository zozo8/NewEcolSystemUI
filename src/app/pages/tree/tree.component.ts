import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  MegaMenuItem,
  MenuItem,
  MessageService,
  PrimeIcons,
  TreeDragDropService,
  TreeNode,
} from 'primeng/api';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/requests/filter.model';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  getInitTreeElementListPath,
  getTreeElementListPath,
} from 'src/app/services/path';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeDragDropService, MessageService],
})
export class TreeComponent implements OnInit, OnDestroy {
  static icon = PrimeIcons.LIST;
  values: TreeNode[] = [];
  private compositeSubscription = new Subscription();
  loading = false;
  treeActions: MegaMenuItem[];
  treeContextActions: MenuItem[];
  selectionMode = 'single';

  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private commonService: CommonService,
    private treeService: TreeService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.treeActions = this.getTreeActions();
    this.treeContextActions = this.getTreeContextActions();
  }

  loadData() {
    this.loading = true;
    this.compositeSubscription.add(
      this.apiService
        .getResponseObj(getInitTreeElementListPath(), this.getRequestObj())
        .subscribe({
          next: (res: ResponseBodyGetList) => {
            this.values = this.treeService.getTreeNodes(res.value.data);
          },
          complete: () => {
            this.loading = false;
          },
        })
    );
  }

  getRequestObj(filters?: Filter[]): RequestBodyGetList {
    const res: RequestBodyGetList = this.commonService.getRequestObj(
      this.treeService.getDefaultColumns(),
      this.treeService.getDefaultFilters(),
      filters
    );

    return res;
  }

  loadChildren(ev: any) {
    if (ev.node.children === undefined || ev.node.children.length === 0) {
      this.loading = true;
      const filter = this.commonService.getFilter4request(
        'ParentId',
        ev.node.id.toString(),
        'equals'
      );

      this.compositeSubscription.add(
        this.apiService
          .getResponseObj(
            getTreeElementListPath(),
            this.getRequestObj([filter])
          )
          .subscribe({
            next: (res: ResponseBodyGetList) => {
              ev.node.children = this.treeService.getChildrenByParentId(
                res.value.data
              );
              this.loading = false;
            },
            error: () => (this.loading = false),
            complete: () => (this.loading = false),
          })
      );
    }
  }

  getTreeActions(): MegaMenuItem[] {
    return [
      {
        label: 'Dodaj',
        icon: PrimeIcons.PLUS,
        disabled: true,
      },
      {
        label: 'Usuń',
        icon: PrimeIcons.MINUS,
        disabled: true,
      },
      {
        label: 'Edytuj',
        icon: PrimeIcons.PENCIL,
        disabled: true,
      },
      {
        label: 'Odśwież',
        icon: PrimeIcons.REFRESH,
        command: () => this.loadData(),
      },
      {
        label: 'Funkcje',
        items: [
          [
            {
              label: 'Stan drzewa',
              items: [
                {
                  label: 'Rozwiń',
                  icon: PrimeIcons.ARROW_V,
                  disabled: true,
                },
                {
                  label: 'Zwiń',
                  icon: PrimeIcons.ARROW_V,
                  disabled: true,
                },
                {
                  label: 'Multiselect',
                  icon: PrimeIcons.LIST,
                  command: () => {
                    if (this.selectionMode === 'single') {
                      this.selectionMode = 'checkbox';
                    } else {
                      this.selectionMode = 'single';
                    }
                  },
                },
              ],
            },
            {
              label: 'Czynności seriwsowe',
              items: [
                {
                  label: 'Ustaw remont',
                  icon: PrimeIcons.BUILDING,
                  disabled: true,
                },
                {
                  label: 'Wyłącz z użytku',
                  icon: PrimeIcons.POWER_OFF,
                  disabled: true,
                },
              ],
            },
          ],
          [
            {
              label: 'Pozycja w drzewie',
              items: [
                {
                  label: 'Kopiuj',
                  icon: PrimeIcons.COPY,
                  disabled: true,
                },
                {
                  label: 'Zamień urządzenie',
                  icon: PrimeIcons.ARROW_CIRCLE_DOWN,
                  disabled: true,
                },
                {
                  label: 'Zamień el. nadrzędny',
                  icon: PrimeIcons.ARROW_H,
                  disabled: true,
                },
                {
                  label: 'W górę',
                  icon: PrimeIcons.ARROW_UP,
                  disabled: true,
                },
                {
                  label: 'W dół',
                  icon: PrimeIcons.ARROW_DOWN,
                  disabled: true,
                },
              ],
            },
          ],
          [
            {
              label: 'Pozostałe',
              items: [
                {
                  label: 'Historia zmian',
                  icon: PrimeIcons.HISTORY,
                  disabled: true,
                },
                {
                  label: 'Dane diagnostyczne',
                  icon: PrimeIcons.CHART_LINE,
                  disabled: true,
                },
              ],
            },
          ],
        ],
      },
    ];
  }

  getTreeContextActions(): MenuItem[] {
    return [
      {
        label: 'Edytuj',
        icon: PrimeIcons.PENCIL,
        disabled: true,
      },
      {
        label: 'Usuń',
        icon: PrimeIcons.MINUS,
        disabled: true,
      },
      {
        label: 'W górę',
        icon: PrimeIcons.ARROW_UP,
        disabled: true,
      },
      {
        label: 'W dół',
        icon: PrimeIcons.ARROW_DOWN,
        disabled: true,
      },
      {
        label: 'Ustaw remont',
        icon: PrimeIcons.BUILDING,
        disabled: true,
      },
      {
        label: 'Wyłącz z użytku',
        icon: PrimeIcons.POWER_OFF,
        disabled: true,
      },
      {
        label: 'Pozostałe funkcje',
        items: [
          {
            label: 'Kopiuj',
            icon: PrimeIcons.COPY,
            disabled: true,
          },
          {
            label: 'Zamień urządzenie',
            icon: PrimeIcons.ARROW_CIRCLE_DOWN,
            disabled: true,
          },
          {
            label: 'Zamień el. nadrzędny',
            icon: PrimeIcons.ARROW_H,
            disabled: true,
          },
          {
            label: 'Historia zmian elementu',
            icon: PrimeIcons.HISTORY,
            disabled: true,
          },
          {
            label: 'Dane diagnostyczne',
            icon: PrimeIcons.CHART_LINE,
            disabled: true,
          },
          {
            label: 'Multiselect',
            icon: PrimeIcons.LIST,
            command: () => {
              if (this.selectionMode === 'single') {
                this.selectionMode = 'checkbox';
              } else {
                this.selectionMode = 'single';
              }
            },
          },
        ],
      },
    ];
  }

  ngOnDestroy(): void {
    this.compositeSubscription.unsubscribe();
  }
}
