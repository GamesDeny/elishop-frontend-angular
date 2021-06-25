import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-admin-sell-stats',
  templateUrl: './admin-sell-stats.component.html',
  styleUrls: ['./admin-sell-stats.component.css'],
})
export class AdminSellStatsComponent implements OnInit {
  constructor(private ProdttiService: ProdottiService) {}

  getStats() {
    this.ProdttiService.getVendite().subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.getStats();
  }
}
