import { Component, Input, ViewChild } from '@angular/core';
import { IonInput, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedSeg: string = 'Grocery';
  Category :Array<string> = [];
  metadata: Array<Array<string | number>> = [];
  @ViewChild('categoryInput')
  categoryInput!: IonInput;
  @ViewChild('titleInput') titleInput!: IonInput;
  @ViewChild('amountInput') amountInput!: IonInput;
  constructor(private popover: PopoverController) {}

  addData() {
    // Get values from Ion inputs
    const category = this.categoryInput.value;
    const title = this.titleInput.value;
    const amount = this.amountInput.value;

    console.log('Category:', category);
    console.log('Title:', title);
    console.log('Amount:', amount);

    // Check if any of the inputs are undefined or null
    if (category === null || category === undefined) {
      // Handle the case where category is missing
      console.log('Category is missing.');
      return;
    }

    // Check if title and amount are of type string
    if (typeof title !== 'string' || typeof amount !== 'string' || typeof category !== 'string') {
      // Handle the case where title or amount is not a string
      console.log('Title or amount is not a string.');
      return;
    }

    // Check if the category already exists in the category array
  if (!this.Category.includes(category)) {
    // If it doesn't exist, add it to the category array
    this.Category.push(category);
  }

    this.metadata.push([category, title, amount]);

    console.log('Updated Metadata:', this.metadata);
    this.popover.dismiss();
  }
}
