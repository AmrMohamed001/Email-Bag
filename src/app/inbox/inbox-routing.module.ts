import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInboxComponent } from './home-inbox/home-inbox.component';

const routes: Routes = [{ path: '', component: HomeInboxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
