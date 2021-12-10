import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { finalize, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Merchandise } from './../models/Merchandise';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class MerchandiseService {
  private merchandiseCollection: AngularFirestoreCollection<Merchandise>;
  allMerchandise$: Observable<Merchandise[]>;

  constructor(private angularFireStore: AngularFirestore) {
    this.merchandiseCollection = this.angularFireStore.collection<Merchandise>(
      'merchandise',
      (ref) => ref.limit(10)
    );
    this.allMerchandise$ = this.merchandiseCollection
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  getAllMerchandise_tmp(): Observable<Merchandise[]> {
    return this.allMerchandise$.pipe(
      map((allMerchandise) => {
        return allMerchandise.map((merchandise) => {
          return {
            id: merchandise.id,
            allergenInformation: merchandise.allergenInformation,
            name: merchandise.name,
            price: merchandise.price,
            soldBy: merchandise.soldBy,
            volume: merchandise.volume
          };
        });
      })
    );
  }

  getAllMerchandise(): Observable<Merchandise[]> {
    return this.angularFireStore.collection<Merchandise>('merchandise').snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Merchandise>{
            ...snap.payload.doc.data(),
            id: snap.payload.doc.id
          }
        })
      }));
  }

  public initMerchandiseCollection(): void {
    this.merchandiseCollection = this.angularFireStore.collection<Merchandise>(
        'merchandise',
        (ref) => ref.limit(10)
      );
      this.allMerchandise$ = this.merchandiseCollection
        .valueChanges({ idField: 'id' })
        .pipe(take(1));
  }

  createMerchandise(newMerchandise: Merchandise) : Observable<any> {
    return from(this.angularFireStore.collection<Merchandise>('merchandise').add(newMerchandise))
      .pipe(
          // switchMap((documentReference) => this.merchandiseCollection.doc<Merchandise>(documentReference.id).valueChanges())
          switchMap((documentReference) => this.angularFireStore.collection<Merchandise>('merchandise').doc(documentReference.id).valueChanges())
          // switchMap((documentReference) => {
          //   return documentReference.set({...newMerchandise, ...{id: documentReference.id}});
          // })
        );
  }

  getMerchandise(merchandiseId: string): Observable<Merchandise | undefined> {
    return this.angularFireStore.collection<Merchandise>('merchandise').doc(merchandiseId).valueChanges();
  }

  updateMerchandise(merchandiseId: string, changes: Partial<Merchandise>): Observable<any> {
    return of(this.angularFireStore.doc(`merchandise/${merchandiseId}`).update(changes));
  }

  removeMerchandise(merchandiseId: string): Observable<any> {
    return of(this.angularFireStore.collection('merchandise').doc(merchandiseId).delete());
  }
}