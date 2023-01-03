import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseBodyById } from 'src/app/models/responses/responseBodyById.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { getXprimerDicPath } from 'src/app/services/path';
import { XprimerClient } from '../../../models/xprimer/xprimerClient.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, ITableFormComponent {
  @Input()
  postPath: string;
  @Input()
  putPath: string;
  @Input()
  cols: ResponseGridDataColumnValue[];
  @Input()
  obj: TableMenuStructure;
  @Input()
  icon: string;
  @Input()
  gridId: number;

  @Output()
  refreshTable = new EventEmitter();

  xprimerClientDict: XprimerClient[] = [];
  xprimerClientSub: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getXprimerClientDict();
  }

  getXprimerClientDict() {
    this.xprimerClientSub = this.apiService
      .getResponseByPost(getXprimerDicPath('Client'))
      .subscribe({
        next: (res: ResponseBodyById) => {
          this.xprimerClientDict = res.value;
          this.xprimerClientSub.unsubscribe();
        },
      });
  }

  selectXprimerClient() {
    if (this.obj.objectEditDto.xprimerId) {
      const obj = this.xprimerClientDict.find(
        (x) => x.id === this.obj.objectEditDto.xprimerId
      );

      if (obj) {
        this.obj.objectEditDto.clientSymbol = obj.symbol;
        this.obj.objectEditDto.clientName = obj.name;
        this.obj.objectEditDto.nip = obj.nip;
        this.obj.objectEditDto.xprimerId = obj.id;
      }
    }
  }

  getRefreshTable(): void {
    this.refreshTable.emit();
  }
}
