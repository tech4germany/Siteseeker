import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Project } from '../models/config/project';

import {
  CollectionReference,
  DocumentData,
  collection,
} from '@firebase/firestore';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import BaseLayer from 'ol/layer/Base';
import { Collection } from 'ol';
import { MapService } from './map.service';
import { WmsService } from './layer-services/wms.service';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private projectCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
    private mapService: MapService,
    private wmsService: WmsService
  ) {
    this.projectCollection = collection(this.firestore, 'projects');
  }

  getAll() {
    return collectionData(this.projectCollection, {
      idField: 'id',
    }) as Observable<Project[]>;
  }

  get(id: string) {
    const projectDocumentReference = doc(this.firestore, `project/${id}`);
    return docData(projectDocumentReference, { idField: 'id' });
  }

  create(project: Project) {
    return addDoc(this.projectCollection, project);
  }

  update(project: Project) {
    const projectDocumentReference = doc(
      this.firestore,
      `project/${project.id}`
    );
    return updateDoc(projectDocumentReference, { ...project });
  }

  delete(id: string) {
    const projectDocumentReference = doc(this.firestore, `project/${id}`);
    return deleteDoc(projectDocumentReference);
  }
}
