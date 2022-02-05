import { NgModule } from '@angular/core'; 
import {AuthGuard} from 'src/app/guards.guard'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
const routes: Routes = [
  
  {
    path: '',
    redirectTo:'login1',
    pathMatch: 'full'
  },
  
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'loginscreen',
    loadChildren: () => import('./loginscreen/loginscreen.module').then( m => m.LoginscreenPageModule)
  },
 
    
  {
    path: 'uploadimage',
    loadChildren: () => import('./uploadimage/uploadimage.module').then( m => m.UploadimagePageModule)
  },
 
  
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'addtree',
    loadChildren: () => import('./addtree/addtree.module').then( m => m.AddtreePageModule)
  },
  {
    path: 'map1',
    loadChildren: () => import('./map1/map1.module').then( m => m.Map1PageModule)
  },
  
  {
    path: 'treeprofile',
    loadChildren: () => import('./treeprofile/treeprofile.module').then( m => m.TreeprofilePageModule)
  },
 
 
  // {
  //   path: 'list',
  //   loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  // },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) , 
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
