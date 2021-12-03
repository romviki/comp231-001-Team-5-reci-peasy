import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Merchandise } from 'src/app/models/Merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-merchandise-list',
  templateUrl: './merchandise-list.component.html',
  styleUrls: ['./merchandise-list.component.scss']
})
export class MerchandiseListComponent implements OnInit {
  merchandiseList$?: Observable<Merchandise[]>;
  merchandiseLise2$?: Observable<Merchandise[]>;

  constructor(
    public merchandiseService: MerchandiseService,
    public loadingService: LoadingService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.merchandiseList$ = this.loadingService.showLoaderUntilCompleted(
    //   this.merchandiseService.getAllMerchandise()
    // );
    this.merchandiseList$ = this.merchandiseService.getAllMerchandise();

    this.merchandiseList$.forEach(
      (allMerch) => {
        // console.log("all merch -> ", allMerch);
          allMerch.forEach((merch) => {
            // console.log("merch -> ", merch);
          }
        )}
    );

    // this.merchandiseLise2$ = this.merchandiseService.getAllMerchandise();

    // this.merchandiseLise2$?.subscribe(
    //   (val) => {console.log(val);}
    // );
  }

  public navigateToEditMerchandise(merchandiseId: string): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: merchandiseId
      }
    }
    this.router.navigate(['merchandise-list/edit'], navigationExtras);
  }

  public confirmMerchandiseDelete(merchandiseId: string, merchandiseName: string): void {
    if (confirm("Confirm removal of " + merchandiseName)) {
      console.log("removeMerchandise -> ", merchandiseId);
      this.merchandiseService.removeMerchandise(merchandiseId)
      .subscribe(
        res => {
          console.log("delete result -> ", res);
        });
    }
  }

  public removeMerchandise(merchandiseId: string): void {

  }
}
