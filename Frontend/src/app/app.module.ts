import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdministrationComponent } from './administration/administration.component';
import { HelperComponent } from './helper/helper.component';
import { LogpageModule } from './logpage/logpage.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, DashboardComponent, ProjectsComponent, NotificationsComponent, AdministrationComponent, HelperComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, LogpageModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
