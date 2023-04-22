import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { INoticia } from '../home/home.page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dbPath = '/noticias';

  tutorialsRef!: AngularFirestoreCollection<INoticia>;

  constructor(private firestore: AngularFirestore) { 
    this.tutorialsRef = this.firestore.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<INoticia> {
    return this.tutorialsRef;
  }

  create(tutorial: INoticia): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
