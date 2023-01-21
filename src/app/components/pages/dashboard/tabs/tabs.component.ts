import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';
import {
  removeTab,
  setActiveTab,
} from 'src/app/modules/login/state/login.actions';
import {
  getActiveTab,
  getTabs,
} from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { CommonService } from 'src/app/services/common.service';
import { components4tabs } from './components4tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})

//Fajnie byłoby, aby lista tabów była w tzw. entity store. Dałoby to możliwość trzymania tabów, być może zarządzania kolejnością lub opcjonalnością wyświetlania oraz tym, który jest aktywny. Dodatkowo - taki state łatwo potem zapisać np. w local storage. Więcej tutaj, ew. mogę zrobić przykład na stackblitz: https://blog.angular-university.io/ngrx-entity/
export class TabsComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTab: number;
  private compsiteSubs = new Subscription();

  constructor(
    private translate: TranslateService,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // Ta subskrypcja nie jest "odsubskrybowywana". Co prawda przy tym komponencie to
    this.store
      .select(getTabs)
      .pipe(take(1))
      .subscribe({
        next: (tabs: string[]) => {
          tabs.forEach((tab, i) => {
            this.addTab(tab, i);
          });
        },
        complete: () => {
          this.activeTab = this.commonService.getValueFromObservable(
            this.store.select(getActiveTab)
          );
          // Tworzenie strumieni w bloku subscribe nie jest dobrym pomysłem i może bardzo szybko skończyć się wyciekiem pamięci. Tutaj jest to w bloku complete, lecz często lepszą opcją jest utworzenie nowego Subject i kontrolowanie przepływu RXJS za jego pomocą - wtedy tutaj byłoby tylko coś w stylu tabsLoaded$.next() czy coś w tym stylu.
          this.compsiteSubs.add(
            this.store.select(getActiveTab).subscribe({
              next: (res: number) => {
                this.setTab(res);
              },
            })
          );
        },
      });
  }

  private setTab(i: number) {
    const extTab = this.tabs[i];
    if (extTab) {
      this.activeTab = i;
    } else {
      this.store
        .select(getTabs)
        .pipe(take(1)) //Tutaj podobnie - zamiast take(1) można zrobić stałą subskrypcję. W tym momencie model jest taki, że nie wykorzystujemy RXJS w store w żaden sposób, a nawet wygląda to jakby nam to przeszkadzało. Oczywiście, wartość statyczna sklepu się przydaje (np. w POST, DELETE etc. requestach), ale zazwyczaj więcej skorzystamy, jeżeli subskrypcje będą stałe. Zauważyłem też, że nie korzystacie z pipe | async - która jest jakby stworzona do łączenia strumieni RXJS z UI
        .subscribe({
          next: (res: string[]) => {
            this.addTab(res[i], i);
          },
        });
    }
  }

  private addTab(name: string, lastIndex: number) {
    const tab = components4tabs.find((x) => x.name === name);

    if (tab) {
      this.tabs.push({
        component: tab.component,
        header: this.translate.instant(tab.component.title ?? ''),
        active: true,
        icon: tab.component.icon ?? '',
        tooltip: tab.component.header ?? '',
      });
      this.activeTab = lastIndex;
    }
  }

  closeTab(ev: any): void {
    const tabIndex = ev.index;
    this.store.dispatch(removeTab({ val: tabIndex }));
    this.tabs.splice(ev.index, 1);
    this.store.dispatch(setActiveTab({ val: tabIndex - 1 }));
  }

  selectTab(ev: any) {
    this.store.dispatch(setActiveTab({ val: ev.index }));
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
