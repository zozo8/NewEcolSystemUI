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
import { TableMenuService } from "./universalComponents/table-menu/table-menu.service";


function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    MainpageComponent,
    NotfoundComponent
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
    TranslateModule.forRoot({
      loader: {
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthconfigInterceptor,
      multi:true
    },
    ConfirmationService,
    MessageService,
    TableMenuService
  ],
  exports:[

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


