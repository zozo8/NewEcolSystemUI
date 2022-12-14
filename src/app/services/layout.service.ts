import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConfigLayout } from '../modules/login/state/login.selector';
import { LoginState } from '../modules/login/state/loginState';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  getColors() {
    const isLight =
      this.commonService.getValueFromObservable(
        this.store.select(getConfigLayout)
      ) === 'light';
    return {
      pinkColor: isLight ? '#EC407A' : '#F48FB1',
      purpleColor: isLight ? '#AB47BC' : '#CE93D8',
      deeppurpleColor: isLight ? '#7E57C2' : '#B39DDB',
      indigoColor: isLight ? '#5C6BC0' : '#9FA8DA',
      blueColor: isLight ? '#42A5F5' : '#90CAF9',
      lightblueColor: isLight ? '#29B6F6' : '#81D4FA',
      cyanColor: isLight ? '#00ACC1' : '#4DD0E1',
      tealColor: isLight ? '#26A69A' : '#80CBC4',
      greenColor: isLight ? '#66BB6A' : '#A5D6A7',
      lightgreenColor: isLight ? '#9CCC65' : '#C5E1A5',
      limeColor: isLight ? '#D4E157' : '#E6EE9C',
      yellowColor: isLight ? '#FFEE58' : '#FFF59D',
      amberColor: isLight ? '#FFCA28' : '#FFE082',
      orangeColor: isLight ? '#FFA726' : '#FFCC80',
      deeporangeColor: isLight ? '#FF7043' : '#FFAB91',
      brownColor: isLight ? '#8D6E63' : '#BCAAA4',
    };
  }
}
