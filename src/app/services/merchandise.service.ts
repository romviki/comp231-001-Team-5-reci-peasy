import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Merchandise } from './../models/Merchandise';

@Injectable({
  providedIn: 'root',
})
export class MerchandiseService {
  collectionName = 'merchandises';
  collectionWithoutQuery: AngularFirestoreCollection<Merchandise>;
  valueChangesWithoutQuery$: Observable<Merchandise[]>;
  editingMerchandise$ = new BehaviorSubject<Merchandise | undefined>(undefined);

  constructor(private angularFireStore: AngularFirestore) {
    this.collectionWithoutQuery = this.getCollection();
    this.valueChangesWithoutQuery$ = this.collectionWithoutQuery
      .valueChanges({
        idField: 'id',
      })
      .pipe(shareReplay());
  }

  getAllMerchandise(): Observable<Merchandise[]> {
    return this.valueChangesWithoutQuery$.pipe(shareReplay());
  }

  createMerchandise(
    newMerchandise: Merchandise
  ): Promise<DocumentReference<Merchandise>> {
    return this.collectionWithoutQuery.add(newMerchandise);
  }

  getMerchandiseById(
    merchandiseId: string
  ): Observable<Merchandise | undefined> {
    return this.angularFireStore
      .collection<Merchandise>('merchandise')
      .doc(merchandiseId)
      .valueChanges();
  }

  updateMerchandise(merchandiseId: string, changes: Partial<Merchandise>) {
    return this.collectionWithoutQuery.doc(merchandiseId).update(changes);
  }

  removeMerchandiseById(merchandiseId: string) {
    return this.collectionWithoutQuery.doc(merchandiseId).delete();
  }

  getCollection(
    queryCallBack?: QueryFn<firebase.firestore.DocumentData>
  ): AngularFirestoreCollection<Merchandise> {
    return this.angularFireStore.collection<Merchandise>(
      this.collectionName,
      queryCallBack
    );
  }
}
