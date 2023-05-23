import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl="http://localhost:3000/users"

  constructor(private httpClient:HttpClient) { }


login(obj)
{

return this.httpClient.post<{message:string}>(this.usersUrl +"/signin",obj)

}

signup(obj)
{

return this.httpClient.post<{message:string}>(this.usersUrl +"/subscription",obj)

}

editProfile(newObj)
{

return this.httpClient.put(this.usersUrl,newObj)

}

getAllUsers()
{
  return this.httpClient.get<{users:any}>(this.usersUrl);
}

getUserById(id)
{
  return this.httpClient.get<{findedUser:any}>(`${this.usersUrl}/${id}`);
}




}
