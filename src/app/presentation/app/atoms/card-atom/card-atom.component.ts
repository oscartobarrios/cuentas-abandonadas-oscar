import { Component, OnInit, Input } from '@angular/core';

export interface CardItem {
	title: string;
	url: string;
}

@Component({
  selector: 'app-card-atom',
  templateUrl: './card-atom.component.html',
  styleUrls: ['./card-atom.component.css']
})
export class CardAtomComponent {
  @Input('item') item: CardItem;
}
