import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { UserDetail } from './components/user-detail/user-detail';

export const routes: Routes = [
  { path: '', component: UserList },
  { path: 'user/:id', component: UserDetail },
  { path: '**', redirectTo: '' }
];
