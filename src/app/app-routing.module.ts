import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSearchComponent } from './components/file-search/file-search.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FileUploadComponent },
  { path: 'search', component: FileSearchComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
