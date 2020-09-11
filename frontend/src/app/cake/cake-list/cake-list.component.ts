import { Component, OnInit, Input } from '@angular/core';
import { CakeService } from './../cake.service';
import { Cake } from '../cake';
import { UserService } from 'src/app/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CakeFormPopupComponent } from '../cake-form-popup/cake-form-popup.component';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.scss']
})
export class CakeListComponent implements OnInit {
  @Input() crud: boolean;

  public cakes: Cake[];
  public loading = false;

  public recordsPerPage = 12;
  public collectionSize = 0;
  public page = 1;

  public searchField = '';
  public searchTerm = '';

  public orderByField = 'created_at';
  public order = 'desc';

  public isLoggedUser: boolean;

  constructor(
    private cakeService: CakeService,
    private userService: UserService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoggedUser = this.userService.getLoggedUser() !== null;
    this.getCakes();
  }

  public getCakes(): void {
    this.loading = true;

    this.cakeService.getPaginated(this.getParams()).subscribe(response => {
      this.loading = false;

      this.cakes = response.data;
      this.recordsPerPage = response.per_page;
      this.page = response.current_page;
      this.collectionSize = response.total;
    }, err => {
      this.cakes = [];
    });
  }

  private getParams() {
    return {
      searchField: this.searchField,
      searchTerm: this.searchTerm,
      sortBy: this.orderByField,
      sortOrder: this.order,
      page: this.page,
      size: this.recordsPerPage,
      onlyAvailable: !this.crud
    };
  }

  public sort(field: string): void {
    this.orderByField = field;
    this.order = this.order === 'desc' ? 'asc' : 'desc';
    this.getCakes();
  }

  public setMaxRecords(event): void {
    this.recordsPerPage = event.target.value;
    this.getCakes();
  }

  public edit(cake?: Cake): void {
    const modalRef = this.modalService.open(CakeFormPopupComponent);
    modalRef.componentInstance.cake = cake;
    modalRef.result.then(() => {
      this.getCakes();
    });
  }

  public delete(cakeId: number): void {
    this.cakeService.delete(cakeId).subscribe(() => {
      this.getCakes();
    });
  }
}
