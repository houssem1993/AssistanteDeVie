import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  demandeUrl:string="http://localhost:3000/allDemande";

  constructor(private http:HttpClient) { }


  // POST DEMANDE
  postDemande(obj)
  {
    return this.http.post<{message:any}>(this.demandeUrl,obj);
  }

  // GET ALL DEMANDE

  getAllDemande()
  {

    return this.http.get<{demandeTab:any,AssistantTab:any}>(this.demandeUrl)
  }

  // GET ALL DEMANDE Parametre
  
  getAllDemandeParametre(id)
  {

    return this.http.get<{demandeTab:any}>(`${this.demandeUrl}/AllDemandeParameter/${id}`)
  }

  getDemandeByAssistant(id)
    {

      return this.http.get<{demandeTab:any}>(`${this.demandeUrl}/${id}`+"/contact")

    }

    // TEST
    getDemande(id) {
      return this.http.get<{ allDemande:any }>(`${this.demandeUrl}/${id}`+"/demandeClient");
    }

   


  getDemandeById(id)
    {

      return this.http.get<{demande:any}>(`${this.demandeUrl}/status/${id}`)

    }


    editDemande(newobj)
    {
      return this.http.put<{message:any}>(this.demandeUrl,newobj)
    }
  
  


}

