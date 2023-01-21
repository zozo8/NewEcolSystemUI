import { Injectable } from '@angular/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BaseTreeFilteredDto } from 'src/app/models/baseTreeFilteredDto.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITreeNode } from 'src/app/modules/universal-components/interfaces/ITreeNode';

@Injectable({
  providedIn: 'root',
})
// Lepiej to nazwać tree helper i korzystać z metod statycznych - utworzę plik obok i zrobię ekwiwalent
export class TreeService {
  constructor() {}

  getDefaultColumns(): ResponseGridDataColumnValue[] {
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

  getTreeNodes(data: BaseTreeFilteredDto[]): ITreeNode[] {
    const treeElements: ITreeNode[] = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const extObj = treeElements.find(
        (x) => x.recordId === data[i].recordId && x.level === data[i].level
      );
      if (extObj) break;

      var parentObj = treeElements.find((x) => x.id === data[i].parentId);
      if (!parentObj) {
        const name = data.find((x) => x.id === data[i].parentId)?.nodeName;
        if (name) {
          parentObj = treeElements.find((x) => x.label === name);
        }
      }

      if (!parentObj) {
        const parObjTmp = data.find((x) => x.id === data[i].parentId);
        if (parObjTmp) {
          const parObj = this.getTreeNode(parObjTmp);
          const childObj = this.getTreeNode(data[i]);
          parObj.children?.push(childObj);
          treeElements.push(parObj);
        }
      } else {
        parentObj.children?.push(data[i]);
      }
    }

    // data.forEach((value) => {
    //   const extObj = treeElements.find(
    //     (x) => x.recordId === value.recordId && x.level === value.level
    //   );
    //   if (extObj) return;

    //   const obj = this.getTreeNode(value);
    //   var parentObj = treeElements.find((x) => x.id === obj.parentId);
    //   if (!parentObj) {
    //     const name = data.find((x) => x.id === obj.parentId)?.nodeName;
    //     if (name) {
    //       parentObj = treeElements.find((x) => x.label === name);
    //     }
    //   }

    //   if (!parentObj) {
    //     treeElements.push(obj);
    //   } else {
    //     parentObj.children?.push(obj);
    //   }
    // });

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

    const treeNode: ITreeNode = {
      label: obj.nodeName,
      id: obj.id,
      parentId: obj.parentId,
      icon: icon,
      leaf: obj.objectType === 'Task' ? true : false,
      level: obj.level,
      departmentId: obj.departmentId,
      children: [],
      recordId: obj.recordId,
    };

    return treeNode;
  }

  getDefaultFilters(): LazyLoadEvent {
    const res: LazyLoadEvent = {
      first: 1,
      rows: 10000,
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
