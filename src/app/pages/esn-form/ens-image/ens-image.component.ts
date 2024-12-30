import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-ens-image',
  standalone: true,
   imports: [NzFormModule,ReactiveFormsModule,NzFormModule, NzSelectModule, NzButtonModule, NzUploadModule],
  templateUrl: './ens-image.component.html',
  styleUrl: './ens-image.component.css'
})
export class EnsImageComponent implements OnInit{
  userId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get userId from route parameters
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('Received User ID:', this.userId);

    // Perform any logic with the userId, such as fetching user-specific data
  }

}
