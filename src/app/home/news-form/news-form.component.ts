import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { INoticia } from '../home.page';
import { MsgalertService } from 'src/app/services/msgalert.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
  @Input() titulo!: string;
  @Input() data!: INoticia;

  regForm: FormGroup;
  regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private _svcApi: ApiService,
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private _svcMessage: MsgalertService) {
    this.regForm = this.fb.group({
      titulo: ['', [Validators.required]],
      imagen: ['', [Validators.required, Validators.pattern(this.regUrl)]],
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data) {
      const { id, ...data } = this.data;
      this.regForm.setValue(data);
    }
  }

  guardar() {
    if(this.data) {
      this.updateNew();
    } else {
      this.saveNew();
    }
  }

  saveNew(): void {
    this._svcApi.create(this.regForm.value).then(() => {
      this._svcMessage.showToast('Nueva noticia creada!');
      this.cerrarModal();
    });
  }

  updateNew(){
    if(this.data.id)
    this._svcApi.update(this.data.id, this.regForm.value)
        .then(() => {
          this._svcMessage.showToast('Noticia actualizada!', 'secondary');
          this.cerrarModal();
        })
        .catch(err => console.log(err));
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
