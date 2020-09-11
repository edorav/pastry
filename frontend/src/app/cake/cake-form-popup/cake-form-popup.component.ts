import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Cake } from '../cake';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CakeService } from '../cake.service';

@Component({
  selector: 'app-cake-form-popup',
  templateUrl: './cake-form-popup.component.html',
  styleUrls: ['./cake-form-popup.component.scss']
})
export class CakeFormPopupComponent implements OnInit {
  @Input() cake: Cake;
  @Output() closePopup = new EventEmitter<Cake>();

  
  public cakeForm: FormGroup;
  public ingredients: FormArray;
  public displayErrors = false;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private cakeService: CakeService,
  ) {}

  
  ngOnInit() {
    const ingredients = [];
    if(this.cake) {
      this.cake.ingredients.forEach(ingredient =>
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            unitmeasure: new FormControl(ingredient.unitmeasure, Validators.required),
            quantity: new FormControl(ingredient.quantity, Validators.required),
          })
        )
      );
    }
    this.cakeForm = new FormGroup({
      id: new FormControl(this.cake ? this.cake.id : null),
      name: new FormControl(this.cake ? this.cake.name : null, [Validators.required, Validators.maxLength(50)]),
      price: new FormControl(this.cake ? this.cake.price : null, Validators.required),
      quantity: new FormControl(this.cake ? this.cake.quantity : null, [Validators.min(1), Validators.required]),
      ingredients: new FormArray(ingredients)
    });

    this.ingredients = this.cakeForm.get('ingredients') as FormArray;
  }

  public save(): void {
    this.displayErrors = true;
    if (this.cakeForm.valid) {
      this.cakeService.save(this.cakeForm.value).subscribe(
        cake => {
          this.toastr.success('Dolce salvato correttamente!');
          this.closePopup.emit(cake);
          this.activeModal.close(event);
        }
      );
    }
  }

  public addIngredient(): void {
    const group = new FormGroup({
      name: new FormControl('', Validators.required),
      unitmeasure: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });

    this.ingredients.push(group);
  }

  public deleteIngredient(index): void {
    this.ingredients.removeAt(index);
  }
}
