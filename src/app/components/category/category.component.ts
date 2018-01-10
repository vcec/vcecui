import { Component, OnInit, AfterViewInit } from '@angular/core';
import {fadeInAnimation} from '../../_animations/index';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [fadeInAnimation]
})
export class CategoryComponent implements OnInit {
	products = [
		{
			title:'Location Intelligence APIs',
			icon:'locationAPIs.png'
		},
		{
			title:'Enterprise Location Intelligence - Spectrum Spatial',
			icon:'enterpriseSpectrumSpatial.png'
		},
		{
			title:'Spectrum Spatial Analyst',
			icon:'spectrumSpatialAnalyst.png'
		},
		{
			title:'Map Info Pro V16.0',
			icon:'mapInfoProv16.png'
		},
		{
			title:'Data Products',
			icon:'data_products.png'
		},
		{
			title:'Location Intelligence for Marketting',
			icon:'li4Mktg.png'
		}
	]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
	   window.scrollTo(0, 0);
	}
   getAnimationDelay(i,col){
  	return {'animation-delay': ((i+1)%(col+1))*2/10 + 's'};
  	}
}
