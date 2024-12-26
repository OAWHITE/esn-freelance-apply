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
  freelanceData:FreelanceResponse[]=[]
  constructor(    private freelanceService:FreelanceService,
                  private router:Router,
                  private nzNotif: NzNotificationService,
                  private modalService:NzModalService,

  ) {
  }
  ngOnInit() {
    this.getFreelance();

  }
  getFreelance() {
    this.freelanceService.getFreelance().subscribe({
      next: (data) => {
        this.freelanceData=data;
        console.log(this.freelanceData);
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addNewFreelancer(){
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
  editFreelance(id:number , ){
    this.router.navigate([`/freelance/${id}/update`]);
  }
}
