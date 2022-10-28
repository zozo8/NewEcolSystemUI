import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableMenuStructure } from 'src/app/models/tableMenuStructure';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TableButtonService {
  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  post(obj: TableMenuStructure): Observable<TableMenuStructure> {
    let ret = new BehaviorSubject<TableMenuStructure>(obj);
    obj.editState = true;
    obj.submitValue = this.translateService.instant('btn.add');
    obj.objectDto = {};
    obj.objectEditDto = {};
    ret.next(obj);
    return ret.asObservable();
  }

  put(obj: TableMenuStructure): Observable<TableMenuStructure> {
    let ret = new BehaviorSubject<TableMenuStructure>(obj);

    if (obj.objectEditDto?.id !== null) {
      obj.editState = true;
      obj.submitValue = this.translateService.instant('btn.edit');
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('btn.warning'),
        detail: this.translateService.instant('table-menu.select_record'),
      });
    }

    return ret.asObservable();
  }

  delete(path: string): Observable<boolean> {
    let returnSubject = new BehaviorSubject<boolean>(false);

    this.confirmationService.confirm({
      message: this.translateService.instant(
        'table-menu.remove_record_question'
      ),
      accept: () => {
        this.http.delete(environment.endpointApiPath + path).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('btn.ok'),
              detail: this.translateService.instant(
                'table-menu.remove_record_success'
              ),
            });
            returnSubject.next(true);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('table-menu.error'),
              detail: this.translateService.instant(
                'table-menu.remove_record_error'
              ),
            });
          },
        });
      },
    });

    return returnSubject.asObservable();
  }

  save(objectDto: any, id?: number, path?: string): Observable<boolean> {
    var returnSubject = new BehaviorSubject<boolean>(false);

    if (objectDto !== undefined) {
      if (id === undefined || id === 0) {
        id = 0;
        this.http
          .post(environment.endpointApiPath + path, objectDto)
          .subscribe({
            complete: () => {
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('btn.ok'),
                detail: this.translateService.instant(
                  'table-menu.add_record_success'
                ),
              });
              returnSubject.next(true);
            },
            error: (er: Error) => {
              this.messageService.add({
                severity: 'error',
                summary: this.translateService.instant('table-menu.error'),
                detail: this.translateService.instant(
                  'table-menu.add_record_error'
                ),
              });
            },
          });
      } else {
        this.http
          .put(environment.endpointApiPath + path + '?id=' + id, objectDto)
          .subscribe({
            complete: () => {
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('btn.ok'),
                detail: this.translateService.instant(
                  'table-menu.edit_record_success'
                ),
              });
              returnSubject.next(true);
            },
            error: (er: any) => {
              this.messageService.add({
                severity: 'error',
                summary: this.translateService.instant('table-menu.error'),
                detail: this.translateService.instant(
                  'table-menu.edit_record_error'
                ),
              });
            },
          });
      }
    }

    return returnSubject.asObservable();
  }
}
