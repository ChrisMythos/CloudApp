import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaSearchComponent } from './media-search/media-search.component';
import { MediaUploadComponent } from './media-upload/media-upload.component';

const routes: Routes = [
  {path: 'upload', component: MediaUploadComponent},
  {path: 'search', component: MediaSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
