import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DndModule } from 'ngx-drag-drop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/pages/dashboard-page/breadcrumb/breadcrumb.component';
import { ConfigComponent } from './components/pages/dashboard-page/config/config.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { FooterComponent } from './components/pages/dashboard-page/footer/footer.component';
import { InlineMenuComponent } from './components/pages/dashboard-page/inline-menu/inline-menu.component';
import { LeftMenuComponent } from './components/pages/dashboard-page/left-menu/left-menu.component';
import { MenuComponent } from './components/pages/dashboard-page/menu/menu.component';
import { MenuitemComponent } from './components/pages/dashboard-page/menuitem/menuitem.component';
import { RightmenuComponent } from './components/pages/dashboard-page/rightmenu/rightmenu.component';
import { SearchPageComponent } from './components/pages/dashboard-page/search-page/search-page.component';
import { TopbarComponent } from './components/pages/dashboard-page/topbar/topbar.component';
import { TabsComponent } from './components/pages/dashboard/tabs/tabs.component';
import { AuthconfigInterceptor } from './modules/login/auth/authconfig.interceptor';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { Summary1Component } from './pages/summary1/summary1.component';
import { Summary2Component } from './pages/summary2/summary2.component';

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    NotfoundComponent,
    LeftMenuComponent,
    TabsComponent,
    SearchPageComponent,
    TopbarComponent,
    RightmenuComponent,
    BreadcrumbComponent,
    FooterComponent,
    ConfigComponent,
    InlineMenuComponent,
    MenuComponent,
    MenuitemComponent,
    Summary1Component,
    Summary2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenubarModule,
    SplitButtonModule,
    TreeModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    SidebarModule,
    PanelMenuModule,
    TreeSelectModule,
    SplitterModule,
    ConfirmDialogModule,
    OrganizationChartModule,
    BadgeModule,
    DropdownModule,
    ChartModule,
    MessagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    DndModule,
    TabViewModule,
    BreadcrumbModule,
    AutoCompleteModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
    }),
    MegaMenuModule,
    RadioButtonModule,
    InputSwitchModule,
    ProgressBarModule,
    MenuModule,
    TimelineModule,
    CardModule,
    OverlayPanelModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
