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
        console.log(this.ensData)
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

  // getImgUrl(blob: Blob | undefined ): SafeUrl {
  //   return URL.createObjectURL(blob as Blob);
  //
  // }

}
