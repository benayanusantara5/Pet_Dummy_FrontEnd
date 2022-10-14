import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Pet } from '../model/pet';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PetService{
    private apiServerUrl = 'http://localhost:8080'

    constructor(private http: HttpClient){}

    public getPets(): Observable<Pet[]>{
        return this.http.get<any>(`${this.apiServerUrl}/pet/all`);
    }

    public addPet(pet: Pet): Observable<Pet>{
        return this.http.post<Pet>(`${this.apiServerUrl}/pet/insert`, pet);
    }

    public updatePet(pet: Pet): Observable<Pet>{
        return this.http.put<Pet>(`${this.apiServerUrl}/pet/update`, pet);
    }

    public deletePet(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/pet/delete/${id}`);
    }
}
