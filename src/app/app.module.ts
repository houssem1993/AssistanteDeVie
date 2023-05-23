import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup-admin/signup.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { HeroComponent } from './components/hero/hero.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { AllAssistantsComponent } from './components/all-assistants/all-assistants.component';
import { AssistantInfoComponent } from './components/assistant-info/assistant-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { AssistantsTableComponent } from './components/assistants-table/assistants-table.component';
import { SingupAssistantComponent } from './components/singup-assistant/singup-assistant.component';
import { SingupUserComponent } from './components/singup-user/singup-user.component';
import { OneAssistantComponent } from './components/one-assistant/one-assistant.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OurAssistantsComponent } from './components/our-assistants/our-assistants.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { DemandeTableComponent } from './components/demande-table/demande-table.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserComponent } from './components/user/user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditAssistantComponent } from './components/edit-assistant/edit-assistant.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactAssistantComponent } from './components/contact-assistant/contact-assistant.component';
import { AssistantDashbordComponent } from './components/assistant-dashbord/assistant-dashbord.component';
import { UserDashbordComponent } from './components/user-dashbord/user-dashbord.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfileAssistantComponent } from './components/profile-assistant/profile-assistant.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ClientsComponent,
    PortfolioComponent,
    ServicesComponent,
    PresentationComponent,
    HeroComponent,
    ClientInfoComponent,
    ServiceInfoComponent,
    AllAssistantsComponent,
    AssistantInfoComponent,
    AdminComponent,
    AssistantsTableComponent,
    SingupAssistantComponent,
    SingupUserComponent,
    OneAssistantComponent,
    OurAssistantsComponent,
    UsersTableComponent,
    DemandeTableComponent,
    AllUsersComponent,
    UserComponent,
    UserInfoComponent,
    EditAssistantComponent,
    MyFilterPipe,
    ContactAssistantComponent,
    AssistantDashbordComponent,
    UserDashbordComponent,
    ProfileUserComponent,
    ProfileAssistantComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
