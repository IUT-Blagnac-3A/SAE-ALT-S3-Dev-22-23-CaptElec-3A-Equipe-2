import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectsComponent } from "./projects/projects.component";
import { HelperComponent } from "./helper/helper.component";
import { LogpageModule } from "./logpage/logpage.module";
import { CreateAccountModule } from "./create-account/create-account.module";
import { BatteryComponent } from "./battery/battery.component";
import { GaugeComponent } from "./gauge/gauge.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { SummaryComponent } from "./summary/summary.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectsComponent,
    HelperComponent,
    BatteryComponent,
    GaugeComponent,
    LineChartComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LogpageModule,
    CreateAccountModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
