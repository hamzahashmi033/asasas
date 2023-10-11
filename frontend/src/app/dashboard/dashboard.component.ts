import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { SnackbarService } from '../service/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage: any;
  	data: any;
	ngAfterViewInit() { }
	constructor(private dashboardService:DashboardService,private ngxService: NgxUiLoaderService,
		private snackBar: SnackbarService) {
			this.ngxService.start()
			this.dashboardData()
	}
	dashboardData(){
		this.dashboardService.getDetails().subscribe(
			(resp: any) => {
			  this.ngxService.stop();
			  this.data = resp.data;
			},
			(error: any) => {
			  this.ngxService.stop();
			  console.log(error);
			  if (error.error?.message) {
				this.responseMessage = error.error?.message;
			  } else {
				this.responseMessage = GlobalConstants.genericError;
			  }
			  this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
			}
		  );
	}
}
