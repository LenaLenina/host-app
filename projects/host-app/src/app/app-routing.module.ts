import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ConfigService } from './config.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router, private configService: ConfigService) {
    this.loadRoutes();
  }

  loadRoutes() {
    this.configService.getConfig().subscribe((routesJson) => {
      if (!Array.isArray(routesJson)) {
        console.error('routesJson is not an array');
        return;
      }

      let dynamicRoutes = routesJson.map((route) => ({
        path: route.path,
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: route.remoteEntry,
            remoteName: route.remoteName,
            exposedModule: route.exposedModule,
          })
            .then((m) => m[route.module])
            .catch((err) => console.log(err)),
      }));

      this.router.resetConfig([...routes, ...dynamicRoutes]);
    });
  }
}
