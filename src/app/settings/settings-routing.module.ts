import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes = [
  {path: '', redirectTo:'profile-settings', pathMatch: 'full'},
  {path: 'profile-settings', component: ProfileSettingsComponent, title:"Fresh Cart | Profile-Settings"},
  {path: 'profile-settings/change', component: ChangePasswordComponent, title:"Fresh Cart | Change Password"},
  {path: 'profile-settings/reset', component: ResetPasswordComponent, title:"Fresh Cart | Reset Password"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
