import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup-admin/signup.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { SingupAssistantComponent } from './components/singup-assistant/singup-assistant.component';
import { SingupUserComponent } from './components/singup-user/singup-user.component';
import { OurAssistantsComponent } from './components/our-assistants/our-assistants.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditAssistantComponent } from './components/edit-assistant/edit-assistant.component';
import { ContactAssistantComponent } from './components/contact-assistant/contact-assistant.component';
import { AssistantDashbordComponent } from './components/assistant-dashbord/assistant-dashbord.component';
import { UserDashbordComponent } from './components/user-dashbord/user-dashbord.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfileAssistantComponent } from './components/profile-assistant/profile-assistant.component';


const routes: Routes = [
  // localhost 4200:Home component will be displayed
  {path:"",component:HomeComponent},
  {path:"signin",component:LoginComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"signupAssistant",component:SingupAssistantComponent},
  {path:"signupUser",component:SingupUserComponent},
  {path:"AllAssistants",component:AllAssistantsComponent},
  {path:"AssistantInfo/:id",component:AssistantInfoComponent},
  {path:"admin",component:AdminComponent},
  {path:"ourAssistants",component:OurAssistantsComponent},
  {path:"contactAssistants/:idAssistant",component:ContactAssistantComponent},
  {path:"assistantDashbord",component:AssistantDashbordComponent},
  {path:"userDashbord",component:UserDashbordComponent},
  {path:"profileUser",component:ProfileUserComponent},
  {path:"profileAssistant",component:ProfileAssistantComponent},
  {path:"allUsers",component:AllUsersComponent},
  {path:"userInfo/:id",component:UserInfoComponent},
  {path:"editAssistant/:id",component:EditAssistantComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
