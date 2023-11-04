import { Component, Input, ViewChild } from '@angular/core';
import { IonInput, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedSeg: string = 'grocery';
  Category: Array<string> = ['Grocery', 'Dining'];
  totalSpend: number = 0;
  metadata: { [category: string]: { title: string; amount: string }[] } = {};
  @ViewChild('categoryInput')
  categoryInput!: IonInput;
  @ViewChild('titleInput') titleInput!: IonInput;
  @ViewChild('amountInput') amountInput!: IonInput;
  constructor(private popover: PopoverController) {}

  addData() {
    // Get values from Ion inputs
    const categoryInput = this.categoryInput.value;
    const title = this.titleInput.value;
    const amountInput = this.amountInput.value;

    let category =
      typeof categoryInput === 'string'
        ? this.capitalizeFirstLetter(categoryInput)
        : categoryInput;

    console.log(category, typeof category);

    if (category === null || category === undefined) {
      console.log('Category is missing.');
      return;
    }
    if (typeof title !== 'string' || typeof category !== 'string') {
      console.log('Title or category is not a string.');
      return;
    }

    const amountInputStr = amountInput?.toString() || '';

    const isAmountValid = /^\d+$/.test(amountInputStr);
    if (!isAmountValid) {
      // Display an alert for non-digit input
      this.showAlert('Invalid Amount', 'Amount should contain only digits.');
      return;
    }

    const amount = amountInputStr;

    if (!(category in this.metadata)) {
      this.metadata[category] = [];
    }
    this.metadata[category].push({ title, amount });

    if (!this.Category.includes(category)) {
      this.Category.push(category);
    }

    console.log('Updated Metadata:', this.metadata);
    this.calculateTotalSpend();
    this.popover.dismiss();
  }

  calculateTotalSpend() {
    this.totalSpend = 0;
    for (const category of this.Category) {
      if (this.metadata[category]) {
        for (const item of this.metadata[category]) {
          this.totalSpend += parseFloat(item.amount);
        }
      }
    }
  }

  showAlert(title: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = title;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  capitalizeFirstLetter(input: string) {
    const trimmedInput = input.trim();
    return trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1);
  }
}
