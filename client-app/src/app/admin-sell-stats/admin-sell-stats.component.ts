import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from 'src/models/data.model';
import { DataSet } from 'src/models/dataset.model';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-admin-sell-stats',
  templateUrl: './admin-sell-stats.component.html',
  styleUrls: ['./admin-sell-stats.component.css'],
})
export class AdminSellStatsComponent implements OnInit {
  dataSet: DataSet;
  showLoading: boolean;

  constructor(private ProdttiService: ProdottiService) {}

  getStats() {
    this.showLoading = true;
    this.dataSet = new DataSet();
    this.ProdttiService.getVendite().subscribe((response) => {
      var data: Data = new Data();
      var prodKeys: string[] = [];
      Object.keys(response).forEach(function (key) {
        console.log('Key : ' + key + ', Value : ' + response[key]);
        prodKeys.push(key);
        data.data.push(response[key]);
      });
      var labels: string[] = [];
      Observable.from(prodKeys)
        .concatMap((key) => this.ProdttiService.getById(parseInt(key)))
        .subscribe(
          (response) => {
            labels.push(response.nome);
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.dataSet.labels = labels;
            this.dataSet.datasets.push(data);
            console.log(this.dataSet);
            this.showLoading = false;
          }
        );
    });
  }

  ngOnInit(): void {
    this.getStats();
  }
}
