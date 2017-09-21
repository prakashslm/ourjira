import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';

import { CompanyAppComponent } from './company-app.component';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyAddComponent } from './add/company-add.component';

const routes: Routes = [
  {
    path: '', component: CompanyAppComponent, children: [
      { path: 'list', component: CompanyListComponent },
      { path: 'add', component: CompanyAddComponent },
      { path: '', redirectTo: '/company/list', pathMatch: 'full' }
    ]
  },
  // { path: 'todo', component: TodoAppComponent },
  // { path: '', redirectTo: '/todo', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CompanyAppComponent
    , CompanyListComponent
    , CompanyAddComponent
  ],
  imports: [
    CommonModule
    , FormsModule
    , SharedModule.forRoot()
    , RouterModule.forChild(routes)
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [CompanyAppComponent],
  exports: [CompanyAppComponent]
})
export class CompanyAppModule {
}
