import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebDataRocksPivot } from './webdatarocks/webdatarocks.angular4';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    WebDataRocksPivot,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
