import { Component } from '@angular/core';
import { Pet } from './model/pet';
import { PetService } from './service/pet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'atrial';

  petname : string;
  petanimal : string;
  petprice : number;

  upetname : string;
  upetanimal : string;
  upetprice : number;
  upetid: number;

  displayInsert: boolean;
  displayUpdate: boolean;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getPets();
  }

  public pets: Pet[] = [];

  constructor (private petService: PetService, private primengConfig: PrimeNGConfig){
    this.displayInsert = false;
    this.displayUpdate = false;

    this.petname = ""
    this.petanimal = ""
    this.petprice = 0

    this.upetid = 0
    this.upetname = ""
    this.upetanimal = ""
    this.upetprice = 0
  }

  public showInsertDialog() {
    this.displayInsert = true;
  }

  public showUpdateDialog(id: number, name: string, animal: string, price: number){
    this.upetid = id
    this.upetname = name
    this.upetanimal = animal
    this.upetprice = price

    this.displayUpdate = true;
  }

  public insertPet(): void {
    let newPet = {
      id: 0,
      name: this.petname,
      animal: this.petanimal,
      price: this.petprice
    }

    this.petService.addPet(newPet).subscribe((response) => {
      console.log(response)
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })

    this.displayInsert = false;
    this.petname = ""
    this.petanimal = ""
    this.petprice = 0

    window.location.reload();
  }

  public updatePet(): void{


    let updatedPet = {
      id: this.upetid,
      name: this.upetname,
      animal: this.upetanimal,
      price: this.upetprice
    }

    this.petService.updatePet(updatedPet).subscribe((response) => {
      console.log(response)
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })

    this.displayUpdate = false;
    window.location.reload();
  }

  public deletePet(id: number): void {
    this.petService.deletePet(id).subscribe((response) => {
      console.log(response)
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })

    window.location.reload();
  }

  public getPets(): void {
    this.petService.getPets().subscribe(
      (response : Pet[]) => {
      this.pets = response;
    },(error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public download() {
    let file = new Blob([new TextEncoder().encode(JSON.stringify(this.pets))], {type: '.txt'});
    let a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = "Data.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
  }
}
