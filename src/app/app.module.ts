import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { MenubarModule } from "primeng/menubar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { SidebarModule } from "primeng/sidebar";
import { PanelMenuModule } from "primeng/panelmenu";
import { TreeSelectModule } from "primeng/treeselect";
import { SplitterModule} from "primeng/splitter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { OrganizationChartModule } from "primeng/organizationchart";
import { BadgeModule } from "primeng/badge";
import { DropdownModule } from "primeng/dropdown";
import { ChartModule } from "primeng/chart";
import { MessagesModule } from "primeng/messages";
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbModule } from "primeng/breadcrumb";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardPageComponent } from "./components/pages/dashboard-page/dashboard-page.component";
import { MainpageComponent } from "./components/pages/dashboard/mainpage/mainpage.component";
import { NotfoundComponent } from "./components/pages/notfound/notfound.component";
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthconfigInterceptor } from "./shared/authconfig.interceptor";
import { FormsModule } from "@angular/forms";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ConfirmationService, MessageService } from "primeng/api";
import { ModulesComponent } from "./components/pages/dashboard/mainpage/modules/modules.component";
import { ChartsComponent } from "./components/pages/dashboard/mainpage/charts/charts.component";
import { WarningsComponent } from "./components/pages/dashboard/mainpage/warnings/warnings.component";

import { DndModule } from "ngx-drag-drop";
import { LeftMenuComponent } from "./components/pages/dashboard-page/left-menu/left-menu.component";
import { DynamicTabDirective } from "./directivies/dynamic-tab.directive";
import { TabsComponent } from "./components/pages/dashboard/tabs/tabs.component";

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    MainpageComponent,
    NotfoundComponent,
    ModulesComponent,
    ChartsComponent,
    WarningsComponent,
    LeftMenuComponent,
    DynamicTabDirective,
    TabsComponent
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
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    DndModule,
    TabViewModule,
    BreadcrumbModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthconfigInterceptor,
      multi:true
    },
    ConfirmationService,
    MessageService
  ],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


