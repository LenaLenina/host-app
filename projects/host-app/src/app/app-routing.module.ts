// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { loadRemoteModule } from '@angular-architects/module-federation';
// import { TodoComponent } from './todo/todo.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'todo-list', component: TodoComponent },
// ];

// const MFE_APP_URL = "https://mfe123456789.netlify.app/remoteEntry.js";

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   {
//     path: 'todo-list',
//     loadChildren: () => {
//       return loadRemoteModule({
//         remoteEntry: MFE_APP_URL,
//         remoteName: "mfeApp",
//         exposedModule: "./TodoListModule",
//       }).then(m => m['TodoListModule']).catch(err => console.log(err));
//     }
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

// export const routeCompArr = [HomeComponent, TodoComponent];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes, PreloadingStrategy } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// let routes: Routes = [];

// export class AppPreloadingStrategy implements PreloadingStrategy {
//   preload(route: any, load: () => any): import('rxjs').Observable<import('@angular/core').Type<any>> {
//     return load();
//   }
// }

// export function loadRoutes(http: HttpClient) {
//   console.log("work");
//   return () => http.get<Routes>('../assets/routes-config.json').subscribe(x => console.log(x));
// }

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       preloadingStrategy: AppPreloadingStrategy,
//     }),
//     HttpClientModule,
//   ],
//   exports: [RouterModule],
//   providers: [
//     {
//       provide: PreloadingStrategy,
//       useFactory: loadRoutes,
//       deps: [HttpClient],
//     },
//   ],
// })
// export class AppRoutingModule {}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { Injectable, NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { HomeComponent } from './home/home.component';

// @Injectable()
// export class AppPreloadingStrategy {
//   constructor(private http: HttpClient) {}

//   preload(): Observable<any> {
//     return this.http.get<Routes>('../assets/routes-config.json');
//   }
// }

// @NgModule({
//   imports: [RouterModule.forRoot([], { preloadingStrategy: AppPreloadingStrategy })],
//   exports: [RouterModule],
//   providers: [AppPreloadingStrategy],
// })
// export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { Route, Router, RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// // import routeData from './routesconfig.json';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// const routes: Routes = []; 

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
//   Data: any;
//   constructor(private httpService: HttpClient, private router: Router) {
//     this.loadDynamicRoutes();
//   }

//   loadDynamicRoutes() {
//     this.httpService.get('./routesconfig.json').subscribe(
//       (data: any) => {
//         this.Data = data;
//         console.log(this.Data);

//         this.Data.forEach((element: Route) => {
//           this.router.config.push(element);
//         });

//         this.router.resetConfig(this.router.config);
//       },
//       (err: HttpErrorResponse) => {
//         console.log(err.message);
//       }
//     );
//   }
//  }

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule, Router, Route } from '@angular/router';
// import { HttpErrorResponse, HttpClient } from '@angular/common/http';
// const routes: Routes = [];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
//   Data: any;
//   constructor(router: Router, private httpService: HttpClient) {
//     const config = router.config;
//     this.httpService.get('./assets/routesconfig.json').toPromise().then(
//       data => {
//         this.Data = data as string[];
//         console.log(this.Data);
//       },
//       (err: HttpErrorResponse) => {
//         console.log(err.message);
//       }
//     ).then(i => { 
//       this.Data.forEach((element: Route) => {
//         config.push(element); 
//         router.resetConfig(config); 
//       });
//     });   
//   }
// }

// import { NgModule, APP_INITIALIZER, Injectable, Type, Component } from '@angular/core';
// import { Router, RouterModule, Routes } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { HomeComponent } from './home/home.component';

// interface DynamicRoute {
//   path: string;
//   component: Type<any>;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class DynamicRouteService {
//   constructor(private http: HttpClient) {}

//   loadRoutes(): Observable<DynamicRoute[]> {
//     return this.http.get<DynamicRoute[]>('../assets/routesconfig.json').pipe(
//       catchError((error) => {
//         console.error('Error loading dynamic routes', error);
//         return [];
//       })
//     );
//   }
// }

// export function initializeApp(dynamicRouteService: DynamicRouteService, router: Router): () => Promise<void> {
//   return () => {
//     let routes: DynamicRoute[] = [];

//     return dynamicRouteService.loadRoutes().toPromise().then((data) => {
//       if (data) {
//         routes = data.map(route => ({
//           ...route,
//           component: route.component
//         }));
//       }

//       router.config.unshift(...routes);
//       console.log(router.config);
//       router.resetConfig(router.config);
//     });
//   };
// }

// const routes: Routes = [
//   // { path: '', redirectTo: '/home', pathMatch: 'full' },
//   // { path: 'home', component: HomeComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   providers: [
//     DynamicRouteService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: initializeApp,
//       deps: [DynamicRouteService, Router],
//       multi: true
//     }
//   ]
// })
// export class AppRoutingModule {}

// import { NgModule, Type } from '@angular/core';
// import { RouterModule, Routes, Router } from '@angular/router';

// import AppRoutingJson from '../assets/routesconfig.json';
// import { HomeComponent } from './home/home.component';

// const componentMap: { [key: string]: Type<any> } = {
//   'HomeComponent': HomeComponent,
//   // Другие компоненты добавляются по мере необходимости
// };

// const routes: Routes = [
//   { path: 'home', component: HomeComponent },
// ];

// @NgModule({
//     imports: [ RouterModule.forRoot(routes) ],
//     exports: [ RouterModule ],
// })

// export class AppRoutingModule {

//     constructor( private router: Router ){

//         this.prepareRoutes( AppRoutingJson );

//     }

//     prepareRoutes( routesJson: any ) {
//     //   console.log(routesJson);
//     //   if (Array.isArray(routesJson)) {
//     //     let routesArr = <Routes>routesJson;
//     //     console.log(routesArr);
//     //     routesArr.forEach(route => {
//     //         routes.push(route);
//     //     });
//     //     console.log(routes);
//     //     this.router.resetConfig(routes);

//     // } else {
//     //     console.error("routesJson is not an array");
//     // }
//     if (Array.isArray(routesJson)) {
//       let dynamicRoutes: Routes = routesJson.map(route => {
//         return {
//           ...route,
//           component: componentMap[route.component],
//         };
//       });

//       console.log(dynamicRoutes);
//       this.router.resetConfig(dynamicRoutes);
//     } else {
//       console.error("routesJson is not an array");
//     }
//   }

// }
// import { NgModule, Type } from '@angular/core';
// import { RouterModule, Routes, Router } from '@angular/router';
// import AppRoutingJson from '../assets/routesconfig.json';
// import { HomeComponent } from './home/home.component';

// const routes: Routes = [
//   { path: 'home', component: HomeComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {

//   constructor(private router: Router) {
//     this.prepareRoutes(AppRoutingJson);
//   }

//   async prepareRoutes(routesJson: any) {
//     console.log(routesJson);
//     if (Array.isArray(routesJson)) {
//       let dynamicRoutes: Routes = await Promise.all(routesJson.map(async route => {
//         return {
//           ...route,
//           component: await this.getComponent(route.component),
//         };
//       }));

//       console.log(dynamicRoutes);
//       this.router.resetConfig(dynamicRoutes);
//     } else {
//       console.error("routesJson is not an array");
//     }
//   }

//   private async getComponent(componentName: string): Promise<Type<any>> {
//     const module = await import(`./${componentName}/${componentName}.module`);
//     return module[`${componentName}Component`];
//   }
// }

import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import AppRoutingJson from '../assets/routesconfig.json';

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
