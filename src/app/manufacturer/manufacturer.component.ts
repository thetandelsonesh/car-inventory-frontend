import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {
  manufacturerList: any[];
  name: any;
  manufacturerError: boolean;
  manufacturerSuccess: boolean;
  manufacturerErrorMsg: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.manufacturerSuccess = false;
    this.manufacturerError = false;
    this.getList();
  }

  getList() {
    this.apiService.getManufacturers().subscribe((res: any) => {
      this.name = null;
      this.manufacturerList = res;
    });
  }

  onSubmit() {
    this.manufacturerSuccess = false;
    this.manufacturerError = false;
    const formData = new FormData();
    formData.append('name', this.name);
    this.apiService.addManufacturer(formData).subscribe((res) => {
      this.getList();
      this.manufacturerSuccess = true;
    }, (errResponse) => {
      this.manufacturerErrorMsg = errResponse.error.msg;
      this.manufacturerError = true;
    });
  }
}
