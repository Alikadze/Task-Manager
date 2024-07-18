import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  public items: string[] = [];
  public selectedItem: string | null = null;
  public newItem: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
      'Item 10'
    ];
  }

  addItem(): void {
    if (this.newItem.trim().length > 0) {
      this.items.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  removeItem(item: string): void {
    this.items = this.items.filter(i => i !== item);
  }

  selectItem(item: string): void {
    this.selectedItem = item;
  }

  clearSelection(): void {
    this.selectedItem = null;
  }

  updateItem(newItem: string): void {
    if (this.selectedItem) {
      const index = this.items.indexOf(this.selectedItem);
      if (index !== -1) {
        this.items[index] = newItem;
        this.selectedItem = newItem;
      }
    }
  }

  logItems(): void {
    console.log('Current items:', this.items);
  }

  fetchRemoteItems(): void {
    setTimeout(() => {
      this.items = [
        'Remote Item 1',
        'Remote Item 2',
        'Remote Item 3',
        'Remote Item 4',
        'Remote Item 5'
      ];
    }, 2000);
  }

  trackByFn(index: number, item: string): number {
    return index;
  }

  resetItems(): void {
    this.loadItems();
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }

  countItems(): number {
    return this.items.length;
  }

  clearItems(): void {
    this.items = [];
  }

  reverseItems(): void {
    this.items = this.items.reverse();
  }

  sortItems(): void {
    this.items = this.items.sort();
  }

  findItem(item: string): boolean {
    return this.items.includes(item);
  }

  filterItems(term: string): string[] {
    return this.items.filter(i => i.toLowerCase().includes(term.toLowerCase()));
  }

  duplicateItem(item: string): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 0, item);
    }
  }

  moveItemUp(item: string): void {
    const index = this.items.indexOf(item);
    if (index > 0) {
      const temp = this.items[index - 1];
      this.items[index - 1] = item;
      this.items[index] = temp;
    }
  }

  moveItemDown(item: string): void {
    const index = this.items.indexOf(item);
    if (index !== -1 && index < this.items.length - 1) {
      const temp = this.items[index + 1];
      this.items[index + 1] = item;
      this.items[index] = temp;
    }
  }

  toggleItemSelection(item: string): void {
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
  }
}
