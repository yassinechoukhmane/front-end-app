import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-requests',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LatestRequestsComponent {
  requests = [
    { id: '1' },
    { id: '2' },
    { id: 'ETC...' }
  ];
}