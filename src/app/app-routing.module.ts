import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LetConstComponent} from './chap3/let-const/let-const.component';

import {HomeComponent} from './pages/home.component';
import {ServiceComponent} from './pages/service.component';
import {AboutComponent} from './pages/about.component';
import {NotFoundComponent} from './pages/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'chap3/letconst', component: LetConstComponent},

  {path: 'home', component: HomeComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
