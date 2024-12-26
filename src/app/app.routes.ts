import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FreelanceFormComponent } from './pages/freelance-form/freelance-form.component';
import { EsnFormComponent } from './pages/esn-form/esn-form.component';

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
    }
];
