import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApmModule, ApmService } from '@elastic/apm-rum-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    ApmModule,
  ],
  providers: [ApmService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  constructor(apmService: ApmService) {
    // Agent API is exposed through this apm instance
    // const apm = apmService.init({
    //   serviceName: 'angular-app',
    //   serverUrl: 'http://localhost:8200'
    // })
    // apm.setUserContext({
    //   'username': 'foo',
    //   'id': 'bar'
    // })
  }
}
