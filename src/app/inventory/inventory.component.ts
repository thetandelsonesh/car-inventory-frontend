import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare var $:any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory: any[];
  inventorySuccess: boolean;
  inventoryError: boolean;
  inventoryList: any;
  pagination: any;
  selectedCar: any;
  // imageURL: string = 'http://localhost/car_inventory/api/uploads/';
  imageURL: string = 'https://car-inventory-codemax.000webhostapp.com/api/uploads/';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.inventorySuccess = false;
    this.inventoryError = false;
    this.selectedCar = { image1: '', image2: ''};
    this.pagination = {
      total: 0,
      current: 1,
      limit: 10,
      pages: 1,
      iterator: [null],
      info: function(){
        const from = (this.limit * this.current) - (this.limit - 1);
        const to = this.limit * (this.current);
        const toExact = to < this.total ? this.limit * (this.current) : this.total;
        return `${from} to ${toExact} of ${this.total}`
      }
    }
    this.getList();
  }

  getList(page = 1) {
    this.pagination.current = page;
    this.apiService.getCarModels(page).subscribe((res: any) => {
      this.pagination.total = res.count;
      this.pagination.pages = Math.ceil(res.count / 10);
      this.pagination.iterator = new Array(this.pagination.pages);
      this.inventoryList = res.list;

      console.log(this.pagination);
    });
  }

  showDetails(item) {
    this.selectedCar = item;
    this.selectedCar.image1 = this.imageURL + 'image_' + item.id + 'a.jpg';
    this.selectedCar.image2 = this.imageURL + 'image_' + item.id + 'b.jpg';
    $('#carModelDetails').modal('show');
  }

  markSold() {
    var confirm = window.confirm('Are you sure?');
    if(confirm){
      this.apiService.MarkAsSold(this.selectedCar.id).subscribe((res) => {
        $('#carModelDetails').modal('hide');
        this.getList();
      }, (errResponse) => {
        console.log('err');
      });
    }
  }
}
