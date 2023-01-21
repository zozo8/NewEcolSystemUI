import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BaseTreeFilteredDto } from 'src/app/models/baseTreeFilteredDto.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITreeNode } from 'src/app/modules/universal-components/interfaces/ITreeNode';

// !!!!!!!!!!!!!!!!!!
// Proszę sprawdzić, czy wszystko działa - aby zaoszczędzić czas słabo testowałem :)

export const getDefaultColumns: () => ResponseGridDataColumnValue[] = () => [
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

export const getTreeNodes = (data: BaseTreeFilteredDto[]): ITreeNode[] => {
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
        const parObj = getTreeNode(parObjTmp);
        const childObj = getTreeNode(data[i]);
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
};

export const getTreeNode = (obj: BaseTreeFilteredDto): ITreeNode => {
  const treeNode: ITreeNode = {
    label: obj.nodeName,
    id: obj.id,
    parentId: obj.parentId,
    icon: '',
    leaf: obj.objectType === 'Task' ? true : false,
    level: obj.level,
    departmentId: obj.departmentId,
    children: [],
    recordId: obj.recordId,
  };

  switch (obj.objectType) {
    case 'Client':
      treeNode.icon = 'pi pi-fw pi-euro';
      break;
    case 'Department':
      treeNode.icon = 'pi pi-fw pi-home';
      break;
    case 'Element':
      treeNode.icon = 'pi pi-fw pi-globe';
      break;
    case 'Equipment':
      treeNode.icon = 'pi pi-fw pi-cog';
      break;
    case 'LubricantPoint':
      treeNode.icon = 'pi pi-fw pi-file';
      break;
    case 'Task':
      treeNode.icon = 'pi pi-fw pi-shield';
      break;
    default:
      treeNode.icon = 'pi pi-fw pi-folder';
      break;
  }

  return treeNode;
};

export const getDefaultFilters = (): LazyLoadEvent => ({
  first: 1,
  rows: 10000,
});

export const getChildrenByParentId = (
  data: BaseTreeFilteredDto[]
): TreeNode[] => {
  const res: TreeNode[] = [];
  data.forEach((element) => {
    res.push(getTreeNode(element));
  });
  return res;
};
