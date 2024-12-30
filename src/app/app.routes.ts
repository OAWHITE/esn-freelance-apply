import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FreelanceFormComponent } from './pages/freelance-form/freelance-form.component';
import { EsnFormComponent } from './pages/esn-form/esn-form.component';
import { EnsImageComponent } from './pages/esn-form/ens-image/ens-image.component';
import {ListEsnComponent} from "./pages/list-esn/list-esn.component";
import {ListFreelanceComponent} from "./pages/list-freelance/list-freelance.component";
import {EsnUpdateComponent} from "./pages/esn-update/esn-update.component";
import {FreelanceUpdateComponent} from "./pages/freelance-update/freelance-update.component";
import {esnUpdateResolver} from "./core/resolvers/esn-update.resolver";
import {freelanceUpdateResolver} from "./core/resolvers/freelance-update.resolver";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'freelance',
        component:FreelanceFormComponent
    },
    {
        path:'esn',
        component:EsnFormComponent
    },
  {
    path:'esn/list',
    component:ListEsnComponent
  },
  {
    path:'freelance/list',
    component:ListFreelanceComponent
  },
  {
    path:'esn/:id/update',
    component:EsnUpdateComponent,
    resolve:{
      esnResponse:esnUpdateResolver
    }
  },
  {
    path:'freelance/:id/update',
    component:FreelanceUpdateComponent,
    resolve:{
      freelanceResponse: freelanceUpdateResolver
    }
  },
  {
    path:'login',
    component:LoginComponent,
  }
];
