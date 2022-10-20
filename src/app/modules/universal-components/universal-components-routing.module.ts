import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversalComponentsComponent } from './universal-components.component';

const routes: Routes = [{ path: '', component: UniversalComponentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalComponentsRoutingModule { }
