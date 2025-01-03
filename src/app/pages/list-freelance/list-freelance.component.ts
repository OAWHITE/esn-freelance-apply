import {Component, inject, OnInit} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FreelanceService } from '../../shared/services/freelance.service';
import { FreelanceResponse } from '../../shared/model/FreelanceResponse';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Router, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FreelanceUpdateComponent } from '../freelance-update/freelance-update.component';
import {NzImageService} from "ng-zorro-antd/image";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-list-freelance',
  standalone: true,
  imports: [NzTableModule, NzModalModule, RouterLink, NzTabsModule, NgForOf, FreelanceUpdateComponent, TranslatePipe],
  providers: [NzImageService],
  templateUrl: './list-freelance.component.html',
  styleUrls: ['./list-freelance.component.css']
})
export class ListFreelanceComponent implements OnInit {
  freelanceData: FreelanceResponse[] = [];
  imagesData: any[] = [];
  dynamicTabs: { freelance: FreelanceResponse; tabIndex: number }[] = [];
  selectedTabIndex: number = 0;
  private nzImageService = inject(NzImageService);


  constructor(
    private freelanceService: FreelanceService,
    private router: Router,
    private nzNotif: NzNotificationService,
    private modalService: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.getFreelance();
  }

  getFreelance() {
    this.freelanceService.getFreelance().subscribe({
      next: (data) => {
        this.freelanceData = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openEditTab(freelance: FreelanceResponse, index: number) {
    console.log('clicked');

    if (!freelance) {
      console.error('Freelance data is not available');
      return;
    }

    const existingTab = this.dynamicTabs.find((tab) => tab.freelance.id === freelance.id);
    if (existingTab) {
      this.selectedTabIndex = this.dynamicTabs.indexOf(existingTab) + 1;
    } else {
      this.dynamicTabs.push({ freelance :freelance, tabIndex: index });
      this.selectedTabIndex = this.dynamicTabs.length;
    }
  }

  closeTab(event: { index: number }): void {
    const tabIndex = event.index - 1;
    if (tabIndex >= 0) {
      this.dynamicTabs.splice(tabIndex, 1);
    }
  }

  deleteFreelance(id: number) {
    this.translateService.get("notifications").subscribe((data:any ) => {
      this.modalService.confirm({
        nzTitle: data.confirmDeleteFreelance,
        nzContent: `<b style="color: red;">${data.deleteFree}</b>`,
        nzOkText: data.confirmDelete,
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => {
          this.freelanceService.freelanceDelete(id).subscribe({
            next: () => {
              this.getFreelance();
              this.nzNotif.success(data.suppressionNotif, data.freelanceDelete);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        nzCancelText: data.no,
      });
    })

  }

  editFreelance(id: number) {
    this.router.navigate([`/freelance/${id}/update`]);
  }

  // Image Handling
  LoadImages(freelanceObject: FreelanceResponse, file: Blob | undefined) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event?.target?.result;
      let imgObj: any = freelanceObject;
      imgObj.imageUrl = result;
      this.imagesData.push(imgObj);
    };

    reader.readAsDataURL(file as Blob);
  }

  getImageUrl(base64Image: string): string {
    if (base64Image.startsWith('data:image/')) {
      return base64Image;
    } else {
      const mimeType = this.detectMimeType(base64Image);
      return `data:${mimeType};base64,${base64Image}`;
    }
  }

  detectMimeType(base64String: string): string {
    const signature = atob(base64String.substring(0, 10))
      .split('')
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
    switch (true) {
      case signature.startsWith('ffd8'):
        return 'image/jpeg';
      case signature.startsWith('89504e47'):
        return 'image/png';
      case signature.startsWith('47494638'):
        return 'image/gif';
      case signature.startsWith('424d'):
        return 'image/bmp';
      default:
        return 'application/octet-stream';
    }
  }
  onImageClick(image?: Blob, type?: string): void {
    const images = [
      {
        src: 'data:image/' + type + ';base64,' + image,
        alt: 'Preview Image'
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 0.5, nzRotate: 0, nzScaleStep: 0.5 });
  }

}

