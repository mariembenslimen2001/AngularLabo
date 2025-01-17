import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app-config';
import { Publication } from 'src/models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) {}

  getPublications(): Observable<Publication[]>{
    return this.httpClient.get<Publication[]>(`${API.url}/${API.publication}/publications`);
    //return new Observable((observer) => {observer.next(this.tab)});
  }

  savePublication(publication: Publication): Observable<Publication>{

    return this.httpClient.post<Publication>(`${API.url}/${API.publication}/publications/create`, publication);

    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [publication, ...this.tab.filter(item=> item.id!= publication.id)];
    //return new Observable (observer => {observer.next()});
  }

  updatePublication(publication: Publication): Observable<Publication>{
    return this.httpClient.put<Publication>(`${API.url}/${API.publication}/publications/${publication.id}/update`, publication);
  }

  deletePublication(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${API.url}/${API.publication}/publications/${id}/delete`);
  }

  getPublicationById(id: number): Observable<Publication>{
    return this.httpClient.get<Publication>(`${API.url}/${API.publication}/publications/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((publication)=>publication.id === id))});
  }
}
