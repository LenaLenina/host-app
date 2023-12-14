import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import AppRoutingJson from '../assets/routes-config.json';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    this.prepareRoutes(AppRoutingJson);
  }

  prepareRoutes(routesJson: any) {
    if (!Array.isArray(routesJson)) {
      console.error("routesJson is not an array");
      return;
    }

    let routesArr = <any[]>routesJson;

    routesArr.forEach(route => {
      routes.push({
        path: route.path,
        loadChildren: () => {
          return loadRemoteModule({
            remoteEntry: route.remoteEntry,
            remoteName: route.remoteName,
            exposedModule: route.exposedModule,
          }).then(m => m[route.module]).catch(err => console.log(err));
        }
      });
    });

    this.router.resetConfig(routes);
  }
}
