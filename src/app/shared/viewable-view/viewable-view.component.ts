import { Component } from '@angular/core';
import { BaseViewDirective } from '../base-view.directive';

@Component({
  selector: 'app-viewable-view',
  templateUrl: './viewable-view.component.html',
  styleUrls: ['./viewable-view.component.scss']
})
export class ViewableViewComponent extends BaseViewDirective {

}
