import {Component, OnInit} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {EsnService} from "../../shared/services/esn.service";
import {EnsResponse} from "../../shared/model/EnsResponse";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {Router, RouterLink} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-list-esn',
  standalone: true,
  imports: [NzTableModule, NzModalModule, RouterLink, NgIf],
  templateUrl: './list-esn.component.html',
  styleUrl: './list-esn.component.css'
})
export class ListEsnComponent implements OnInit {
  ensData: EnsResponse[] = []
  imagesData: any[] = []

  constructor(
    private ensservice: EsnService,
    private nzNotif: NzNotificationService,
    private router: Router,
    private modalService: NzModalService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadEns()
  }

  loadEns() {
    this.ensservice.getEns().subscribe({
      next: (data) => {
        this.ensData = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteEsn(id: number) {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this esn?',
      nzContent: '<b style="color: red;">you are on the point of deleting esn</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.ensservice.ensDelete(id).subscribe({
          next: () => {
            this.loadEns()
            this.nzNotif.success("Suppression", 'ens supprimé avec succes')
          }
          ,
          error: (err) => {
            console.log(err)
          }
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
      }
    });
  }

  LoadImages(esnObject: EnsResponse, file: Blob | undefined) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event?.target?.result;
      let imgObj: any = esnObject
      imgObj.imageUrl = result;
      this.imagesData.push(imgObj);
    }

    reader.readAsDataURL(file as Blob);
  }


  getImageUrl(base64Image: string): string {
    if (base64Image.startsWith('data:image/')) {
      // The MIME type is already present, so return the string directly.
      return base64Image;
    } else {
      // Dynamically guess MIME type (not always accurate but works for common types)
      const mimeType = this.detectMimeType(base64Image);
      return `data:${mimeType};base64,${base64Image}`;
    }
  }

  detectMimeType(base64String: string): string {
    // Decode base64 string to raw binary data
    const signature = atob(base64String.substring(0, 10)) // Get first 10 bytes
      .split("")
      .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");

    console.log(signature)
    // Match signature with common MIME types
    switch (true) {
      case signature.startsWith("ffd8"):
        console.log("jpeg")
        return "image/jpeg";
      case signature.startsWith("89504e47"):
        console.log("png")
        return "image/png";
      case signature.startsWith("47494638"):
        console.log("gif")
        return "image/gif";
      case signature.startsWith("424d"):
        console.log("bmp")
        return "image/bmp";
      default:
        return "application/octet-stream"; // Default MIME type if unknown
    }
  }

}
