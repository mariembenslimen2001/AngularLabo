import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, GLOBAL } from 'src/app/app-config';
import { Tool } from 'src/models/tool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  // tabOutils : Tool[]= GLOBAL._DB.tools;
  constructor(private httpClient: HttpClient) {}

  getTools(): Observable<Tool[]>{
    return this.httpClient.get<Tool[]>(`${API.url}/${API.tool}/tools`);
    // return new Observable((observer) => {observer.next(this.tabOutils)});
  }

  saveTool(tool: Tool): Observable<Tool>{

    return this.httpClient.post<Tool>(`${API.url}/${API.tool}/tools/create`, tool);

    //ken maandekch back-end

    // //this.tab.unshift(member);
    // this.tabOutils = [tool, ...this.tabOutils.filter(item=> item.id!= tool.id)];
    // console.log(this.tabOutils);
    // return new Observable (observer => {observer.next()});
  }



  updateTool(tool: Tool): Observable<Tool>{
    return this.httpClient.put<Tool>(`${API.url}/${API.tool}/tools/${tool.id}/update`, tool);
  }

  deleteTool(id: number): Observable<void>{
    this.httpClient.delete<void>(`${API.url}/${API.member}/members-per-outil/${id}/delete`);
    return this.httpClient.delete<void>(`${API.url}/${API.tool}/tools/${id}/delete`);
  }

  getToolById(id: number): Observable<Tool>{
    return this.httpClient.get<Tool>(`${API.url}/${API.tool}/tools/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((event)=>event.id === id))});
  }


}
