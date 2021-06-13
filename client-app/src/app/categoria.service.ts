import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<Categoria[]>(`${environment.apiUrl}/categoria/all`);
  }

  getById(id){
    return this.http.get<Categoria>(`${environment.apiUrl}/categoria/id/${id}`);
  }

  addNew(categoria){
    return this.http.post(`${environment.apiUrl}/categoria/add`, categoria);
  }
}
