import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApmModule, ApmService } from '@elastic/apm-rum-angular';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ApmModule,
    DemoNgZorroAntdModule,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [ApmService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  isSpinning = false;
}
