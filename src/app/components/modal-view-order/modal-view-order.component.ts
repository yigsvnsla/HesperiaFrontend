
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { order } from 'src/app/interfaces/products';


@Component({
  selector: 'app-modal-view-order',
  templateUrl: './modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss'],
})
export class ModalViewOrderComponent implements OnInit {

  constructor(
    private ModalController:ModalController,
  ) { }

  @Input() Order:order

  ngOnInit() { }

  onExit(){
    this.ModalController.dismiss()
  }
}
