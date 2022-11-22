import { Injectable } from '@angular/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BaseTreeFilteredDto } from 'src/app/models/baseTreeFilteredDto.model';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  constructor(private commonService: CommonService) {}

  getDefaultColumns(): RequestGridDataColumnValue[] {
    return [
      {
        columnName: 'Level',
        dataType: 'Int32',
        displayName: 'Level',
        isVisible: true,
      },
      {
        columnName: 'NodeName',
        dataType: 'string',
        displayName: 'NodeName',
        isVisible: true,
      },
      {
        columnName: 'ObjectType',
        dataType: 'string',
        displayName: 'ObjectType',
        isVisible: true,
      },
      {
        columnName: 'TreePath',
        dataType: 'string',
        displayName: 'TreePath',
        isVisible: true,
      },
      {
        columnName: 'RecordId',
        dataType: 'Int32',
        displayName: 'RecordId',
        isVisible: true,
      },
      {
        columnName: 'DepartmentId',
        dataType: 'Int32',
        displayName: 'DepartmentId',
        isVisible: true,
      },
      {
        columnName: 'ParentId',
        dataType: 'Int32',
        displayName: 'ParentId',
        isVisible: true,
      },
    ];
  }

  getTreeNodes(data: BaseTreeFilteredDto[]): TreeNode[] {
    const treeElements: TreeNode[] = [];
    const level0: TreeNode[] = [];
    const level1: TreeNode[] = [];
    const level2: TreeNode[] = [];

    data.forEach((d) => {
      switch (d.level) {
        case 0:
          level0.push(this.getTreeNode(d));
          break;
        case 1:
          level1.push(this.getTreeNode(d));
          break;
        case 2:
          level2.push(this.getTreeNode(d));
          break;
        default:
          break;
      }
    });

    level1.forEach((element) => {
      element.children = level2.filter((x) => x.parentId === element.id);
    });

    level0.forEach((element) => {
      element.children = level1.filter((x) => x.parentId === element.id);
      treeElements.push(element);
    });

    return treeElements;
  }

  private getTreeNode(obj: BaseTreeFilteredDto): TreeNode {
    var icon = '';

    switch (obj.objectType) {
      case 'Client':
        icon = 'pi pi-fw pi-euro';
        break;
      case 'Department':
        icon = 'pi pi-fw pi-home';
        break;
      case 'Element':
        icon = 'pi pi-fw pi-globe';
        break;
      case 'Equipment':
        icon = 'pi pi-fw pi-cog';
        break;
      case 'LubricantPoint':
        icon = 'pi pi-fw pi-file';
        break;
      case 'Task':
        icon = 'pi pi-fw pi-shield';
        break;
      default:
        icon = 'pi pi-fw pi-folder';
        break;
    }

    const treeNode: TreeNode = {
      label: obj.nodeName,
      id: obj.id,
      parentId: obj.parentId,
      icon: icon,
      leaf: obj.objectType === 'Task' ? true : false,
    };

    return treeNode;
  }

  getDefaultFilters(): LazyLoadEvent {
    const res: LazyLoadEvent = {
      first: 1,
      rows: 1000,
    };

    return res;
  }

  getChildrenByParentId(data: BaseTreeFilteredDto[]): TreeNode[] {
    const res: TreeNode[] = [];
    data.forEach((element) => {
      res.push(this.getTreeNode(element));
    });
    return res;
  }
}
