import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/create-room.component/create-room.component';
import { MainMenuComponent } from './component/main-menu.component/main-menu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component';
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { UpdateBuildingComponent } from './component/update-building.component/update-building.component';
import { CreateLiftComponent } from './component/create-lift.component/create-lift.component';
import {ListBuildingsComponent} from './component/list-buildings.component/list-buildings.component';
import { CreateRobotTypeComponent } from './component/create-robot-type.component/create-robot-type.component';
import { SingleFileUploadComponent } from './component/single-file-upload/single-file-upload.component';
import { EditFloorComponent } from './component/edit-floor.component/edit-floor.component';
import { AddRobotComponent } from './component/add-robot.component/add-robot.component';
import {ChangeRobotStateComponent} from './component/change-robot-state.component/change-robot-statecomponent';
import { ListFloorsFromBuildingComponent } from './component/list-floors-from-building.component/list-floors-from-building.component';
import { PatchFloorMapComponent } from './component/patch-floor-map.component/patch-floor-map.component';
import { PatchPassagesComponent } from './component/patch-passages.component/patch-passages.component';
import { ListPassageBetween2BuildingsComponent } from './component/list-2-Buildings-Passage.component/list-2-Buildings-Passage.component';
import { ListBuildingsMinMaxComponent } from './component/list-buildings-min-max.component/list-buildings-min-max.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'create-building', component: CreateBuildingComponent },
  { path: 'create-floor', component: CreateFloorComponent},
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'create-lift', component: CreateLiftComponent },
  { path: 'list-buildings', component: ListBuildingsComponent },
  { path: 'create-robot', component: CreateRobotTypeComponent },
  { path: 'single-file-upload', component: SingleFileUploadComponent},
  { path: 'edit-floor', component: EditFloorComponent },
  { path: 'add-robot', component: AddRobotComponent },
  { path: 'change-robot-state', component: ChangeRobotStateComponent},
  { path: 'update-building', component: UpdateBuildingComponent },
  { path: 'list-floors-from-building', component: ListFloorsFromBuildingComponent },
  { path: 'patch-floor-map', component: PatchFloorMapComponent },
  { path: 'patch-passages', component: PatchPassagesComponent },
  { path: 'list-2-buildings-passage', component: ListPassageBetween2BuildingsComponent },
  { path: 'list-buildings-min-max', component: ListBuildingsMinMaxComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
