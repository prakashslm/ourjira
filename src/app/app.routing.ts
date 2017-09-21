import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '@shared/components/index';

import { HomeComponent, LoginComponent } from './components/index';
// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';
import { AuthGuard } from './core';

const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    , data: {
      animation: { value: 'home' }
    }
  },
  { path: 'projects', component: HomeComponent },
  {
    path: 'login', component: LoginComponent
    , data: {
      animation: { value: 'login' }
    }
  },
  {
    path: 'todo', loadChildren: 'app/todo/todo-app.module#TodoAppModule'
    , data: {
      animation: { value: 'todo' }
    }
  },
  {
    path: 'company', loadChildren: 'app/components/company/company-app.module#CompanyAppModule'
    , data: {
      animation: { value: 'company' }
    }
  },
  //     { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes, {
  useHash: true
  , preloadingStrategy: PreloadAllModules
});

export const routedComponents = [HomeComponent, LoginComponent];
