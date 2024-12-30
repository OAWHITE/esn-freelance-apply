import {Component, OnInit} from '@angular/core';
import {FreelanceService} from "../../shared/services/freelance.service";
import {FreelanceResponse} from "../../shared/model/FreelanceResponse";
import {NzTableModule} from "ng-zorro-antd/table";
import {Router, RouterLink} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-list-freelance',
  standalone: true,
  imports: [NzTableModule, NzModalModule, RouterLink],
  templateUrl: './list-freelance.component.html',
  styleUrl: './list-freelance.component.css'
})
export class ListFreelanceComponent implements OnInit {
  freelanceData: FreelanceResponse[] = []
  imagesData: any[] = []

  constructor(private freelanceService: FreelanceService,
              private router: Router,
              private nzNotif: NzNotificationService,
              private modalService: NzModalService,
  ) {
  }

  ngOnInit() {
    this.getFreelance();

  }

  getFreelance() {
    this.freelanceService.getFreelance().subscribe({
      next: (data) => {
        this.freelanceData = data;
        // this.freelanceData.map((e)=>{
        //   this.LoadImages(e,e.image);
        // })
        console.log(this.freelanceData);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addNewFreelancer() {
    this.router.navigate(["/freelance"]);
  }

  deleteFreelance(id: number) {

    this.modalService.confirm({
      nzTitle: 'Are you sure delete this esn?',
      nzContent: '<b style="color: red;">you are on the point of deleting esn</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.freelanceService.freelanceDelete(id).subscribe({
          next: () => {
            this.getFreelance()
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

  editFreelance(id: number,) {
    this.router.navigate([`/freelance/${id}/update`]);
  }

  LoadImages(freelanceObject: FreelanceResponse, file: Blob | undefined) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event?.target?.result;
      let imgObj: any = freelanceObject
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
