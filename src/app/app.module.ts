import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaUploadComponent } from './media-upload/media-upload.component';
import { MediaSearchComponent } from './media-search/media-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaUploadComponent,
    MediaSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
