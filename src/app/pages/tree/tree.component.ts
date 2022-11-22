import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
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
})
export class TreeComponent implements OnInit, OnDestroy {
  static icon = 'pi pi-fw pi-list';
  values: TreeNode[] = [];
  private compositeSubscription = new Subscription();
  loading = false;

  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private commonService: CommonService,
    private treeService: TreeService
  ) {}

  ngOnInit(): void {
    this.loadData();
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
          complete: () => (this.loading = false),
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

  ngOnDestroy(): void {
    this.compositeSubscription.unsubscribe();
  }
}
