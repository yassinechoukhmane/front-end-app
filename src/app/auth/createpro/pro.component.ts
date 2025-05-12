import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createpro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class CreateproComponent {
    currentDate = new Date().toLocaleDateString();
    demandeAchatId: string = '';
    formattedDate = new Date().toLocaleDateString('fr-FR');

  project = {
    name: '',
    description: '',
    id: ''
    
  };

  saveProject() {
    console.log('Saving project:', this.project);
    alert('Project saved successfully!');
  }
}
