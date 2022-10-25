import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';

/*
 * This is the routing configuration for the application.
 * It only loads the main module with lazy loading, if the entered path is not garbled.
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./content/content.module').then(m => m.ContentModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
