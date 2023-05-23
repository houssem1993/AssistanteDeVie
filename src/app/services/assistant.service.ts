import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  assistantUrl:string="http://localhost:3000/assistant";
  constructor(private httpClient:HttpClient) { }

login(obj)
{

return this.httpClient.post<{message:string}>(this.assistantUrl+"/signin",obj)

}

signup(obj)
{

return this.httpClient.post<{message:string}>(this.assistantUrl+"/subscription",obj)

}


getAllAssistants()
  {
    
  return this.httpClient.get<{assistants:any}>(this.assistantUrl);
  }

getAssistantById(id)
  {

    return this.httpClient.get<{findedAssistant:any}>(`${this.assistantUrl}/${id}`) ;

  }

deleteAssistantById(id) 
  {

    return this.httpClient.delete<{message:any}>(`${this.assistantUrl}/${id}`) ;

  }

editAssistant(newobj)
  {

    return this.httpClient.put<{message:any}>(this.assistantUrl,newobj)

  }



}
