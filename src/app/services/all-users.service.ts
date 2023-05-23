import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  

  allUserstUrl:string="http://localhost:3000/allUsers";

public token: string;
private authStatusListener = new Subject<boolean>();
private isUserAuthenticated = false;
private name: string;
private id: string;
private role: string;



  constructor(private httpClient:HttpClient,
              private router:Router) { }

  getToken() {
    return this.token;
    }

    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
      }
      isUserAuth() {
      return this.isUserAuthenticated;
      }
      getName(){
      return this.name;
      }
     
   

  login(user)
{

return this.httpClient.post<{message:string,user:any}>(this.allUserstUrl+"/signin",user).subscribe(
  (res) => {
  const token = res.user.jwt;
  this.token = token;
  if (res.user) {
  this.isUserAuthenticated = true;
  this.name = res.user.FirstName;
  this.id = res.user.id;
  this.role = res.user.role;
  localStorage.setItem( 'token' , token);
  localStorage.setItem( 'name' , this.name);
  localStorage.setItem( 'id' ,this.id);
  localStorage.setItem( 'role' ,this.role);
  
  this.authStatusListener.next( true);

 

  (res.user.role=="admin")?
  this.router.navigate([ 'admin']):
  this.router.navigate([ ''])

  }
  }
  )
}


logout() {
  localStorage.removeItem( 'token' );
  localStorage.removeItem( 'name' );
  localStorage.removeItem( 'id' );
  localStorage.removeItem( 'role' );
  this.isUserAuthenticated = false ;
  this.authStatusListener.next( false );
  this.router.navigate([ '/']);
  }
 

signupAssistant(obj,cv:File)
{
  let formData=new FormData();

  formData.append("FirstName",obj.FirstName);
  formData.append("lastName",obj.lastName);
  formData.append("tel",obj.tel);
  formData.append("email",obj.email);
  formData.append("adresse",obj.adresse);
  formData.append("birthDay",obj.birthDay);
  formData.append("pwd",obj.pwd);
  formData.append("role",obj.role);
  formData.append("status",obj.status);
  formData.append("cv",cv);


return this.httpClient.post<{message:string}>(this.allUserstUrl+"/assistant/subscription",formData)

}


getAllAssistants()
  {
    
  return this.httpClient.get<{assistants:any}>(this.allUserstUrl+"/assistant");
  }

  getAllAssistantsDemande(id)
  {
    
  return this.httpClient.get<{assistants:any}>(`${this.allUserstUrl}/assistant/${id}`);
  }

  getAllAssistantsConfirmed()
  {
    
  return this.httpClient.get<{assistantsConfirmed:any}>(this.allUserstUrl);
  }

getAssistantById(id)
  {

    return this.httpClient.get<{findedAssistant:any}>(`${this.allUserstUrl}/assistant/${id}`) ;

  }

deleteAssistantById(id) 
  {

    return this.httpClient.delete<{message:any}>(`${this.allUserstUrl}/assistant/${id}`) ;

  }

editAssistant(newobj)
  {

    return this.httpClient.put<{message:any}>(this.allUserstUrl+"/assistant",newobj)

  }

 

signupUser(obj,img:File)
{
  let formDatauser=new FormData() ;

  formDatauser.append("FirstName",obj.FirstName);
  formDatauser.append("lastName",obj.lastName);
  formDatauser.append("tel",obj.tel);
  formDatauser.append("email",obj.email);
  formDatauser.append("birthDay",obj.birthDay);
  formDatauser.append("pwd",obj.pwd);
  formDatauser.append("role",obj.role);
  formDatauser.append("img",img);
    
  

return this.httpClient.post<{message:string}>(this.allUserstUrl +"/user/subscription",formDatauser)

}

editProfile(newObj)
{

return this.httpClient.put(this.allUserstUrl+"/user",newObj)

}

getAllUsers()
{
  return this.httpClient.get<{users:any}>(this.allUserstUrl+"/user");
}

getUserById(id)
{
  return this.httpClient.get<{findedUser:any}>(`${this.allUserstUrl}/user/${id}`);
}

deleteUser(id)
{
  return this.httpClient.delete<{message:string}>(`${this.allUserstUrl}/user/${id}`)
}

signupAdmin(obj)
{

  return this.httpClient.post<{message:string}>(this.allUserstUrl+"/admin/subscription",obj)
  
}





}
