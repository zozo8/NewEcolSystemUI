import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DashboardPageComponent } from '../dashboard-page.component';

@Component({
  selector: 'app-inline-menu',
  templateUrl: './inline-menu.component.html',
  styleUrls: ['./inline-menu.component.scss'],
  animations: [
    trigger('menu', [
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          paddingBottom: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
          overflow: 'visible',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          'z-index': 100,
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          'z-index': '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition('visible => hidden', animate('.1s linear')),
      transition('hidden => visible', [
        style({ transform: 'scaleY(0.8)' }),
        animate('.12s cubic-bezier(0, 0, 0.2, 1)'),
      ]),
    ]),
  ],
})
export class InlineMenuComponent {
  @Input() key: string = 'inline-menu';
  @Input() style: any;
  @Input() styleClass: string;
  active: boolean;

  constructor(
    public app: AppComponent,
    public dashboard: DashboardPageComponent
  ) {}

  onClick(ev: Event) {
    this.dashboard.onInlineMenuClick(ev, this.key);
    ev.preventDefault();
  }

  get isTooltipDisabled() {
    return !(this.dashboard.isSlim() && !this.dashboard.isMobile());
  }

  get tabIndex() {
    return !this.dashboard.inlineMenuActive ? '-1' : null;
  }

  isHorizontalActive() {
    return this.dashboard.isHorizontal() && !this.dashboard.isMobile();
  }
}
