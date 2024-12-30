import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {FreelanceFormComponent} from './pages/freelance-form/freelance-form.component';
import {EsnFormComponent} from './pages/esn-form/esn-form.component';
import {EnsImageComponent} from './pages/esn-form/ens-image/ens-image.component';
import {ListEsnComponent} from "./pages/list-esn/list-esn.component";
import {ListFreelanceComponent} from "./pages/list-freelance/list-freelance.component";
import {EsnUpdateComponent} from "./pages/esn-update/esn-update.component";
import {FreelanceUpdateComponent} from "./pages/freelance-update/freelance-update.component";
import {esnUpdateResolver} from "./core/resolvers/esn-update.resolver";
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./core/guards/auth.guard";
import {loginCheckGuard} from "./core/guards/login-check.guard";

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'freelance',
    component: FreelanceFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'esn',
    component: EsnFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'esn/list',
    component: ListEsnComponent,
    canActivate: [authGuard],
  },
  {
    path: 'freelance/list',
    component: ListFreelanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'esn/:id/update',
    component: EsnUpdateComponent,
    canActivate: [authGuard],
    resolve: {
      esnResponse: esnUpdateResolver
    }
  },
  {
    path: 'freelance/:id/update',
    component: FreelanceUpdateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginCheckGuard]
  }
];
