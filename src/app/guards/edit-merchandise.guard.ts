import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Merchandise } from '../models/Merchandise';
import { MerchandiseService } from '../services/merchandise.service';

@Injectable({
  providedIn: 'root',
})
export class EditMerchandiseGuard implements CanActivate {
  constructor(
    private merchandiseService: MerchandiseService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.merchandiseService.editingMerchandise$.asObservable().pipe(
      switchMap((merchandise: Merchandise | undefined) => {
        if (merchandise && merchandise.id === route.params.id) {
          return of(true);
        }

        this.router.navigate(['/merchandise-list']);
        return of(false);
      })
    );
  }
}
