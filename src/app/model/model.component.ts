import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  car: any;
  manufacturerList: any[];
  carForm: any;
  fileToUpload1: File;
  fileToUpload2: File;
  carSuccess: boolean;
  carError: boolean;
  carErrorMsg: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.car = {}

    this.apiService.getManufacturers().subscribe((res: any[])=>{
      this.manufacturerList = res;
    });
  }

  handleFileInput1(files: FileList) {
    this.fileToUpload1 = files.item(0);
    console.log( this.fileToUpload1.type);
    if('image/jpeg' === this.fileToUpload1.type || 'image/jpg' === this.fileToUpload1.type){
      return;
    }
    this.car.image1 = null;
    this.fileToUpload1 = null;
  }

  handleFileInput2(files: FileList) {
    this.fileToUpload2 = files.item(0);
    if('image/jpeg' === this.fileToUpload2.type || 'image/jpg' === this.fileToUpload2.type){
      return;
    }
    this.car.image2 = null;
    this.fileToUpload2 = null;
  }

  onSubmit() {
    this.carSuccess = false;
    this.carError = false;

    const formData = new FormData();
    formData.append('name', this.car.name);
    formData.append('manufacturer_id', this.car.manufacturer_id);
    formData.append('color', this.car.color);
    formData.append('year', this.car.year);
    formData.append('regno', this.car.regno);
    formData.append('note', this.car.note);

    formData.append('image1', this.fileToUpload1);
    formData.append('image2', this.fileToUpload2);
    
    console.log(this.fileToUpload1, this.fileToUpload2);
    this.apiService.addCarModel(formData).subscribe((res) => {
      this.carSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2500);
    }, (errResponse) => {
      this.carErrorMsg = errResponse.error.msg;
      this.carError = true;
    });
  }

}
