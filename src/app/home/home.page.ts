import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { DarkmodeService } from '../services/darkmode.service';
import { ModalController } from '@ionic/angular';
import { NewsFormComponent } from './news-form/news-form.component';
import { ApiService } from '../services/api.service';
import { MsgalertService } from '../services/msgalert.service';

export interface INoticia {
  id?: string;
  titulo: string;
  imagen: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaded: boolean = false;

  darkMode!: BehaviorSubject<boolean>;

  data: INoticia[]=[];
  username:string='';
  
  constructor(
    private _svcTheme: DarkmodeService, 
    private modalCtrl: ModalController, 
    private dbService: ApiService,
    private _svcMsg: MsgalertService) { }

  ngOnInit(){
    this.darkMode = this._svcTheme.darkMode;
    this.getData();
  }

  getData(): void {
    this.dbService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.data = data;
      this.loaded = true;
    });
  }

  setTheme(darkMode: boolean){
    this._svcTheme.setTheme(darkMode);
  }

  async openModal(data:any = null){
    const modal = await this.modalCtrl.create(
      {
        component: NewsFormComponent,
        componentProps: {
          titulo: data ? 'Edición de Noticia' : 'Nueva Noticia',
          data: data
        },
        showBackdrop: true
      }
    );

    modal.present();
  }
 

  deleteNew(data: any): void {
    if (data.id) {
      this.dbService.delete(data.id)
        .then(() => {
          console.log('The tutorial was updated successfully!');
          this._svcMsg.showToast('Noticia Eliminada!', 'danger');
        })
        .catch(err => console.log(err));
    }
  }
}
