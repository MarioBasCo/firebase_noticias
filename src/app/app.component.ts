import { Component } from '@angular/core';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _svcTheme: DarkmodeService) {
    this._svcTheme.setInitialTheme();
  }

}
