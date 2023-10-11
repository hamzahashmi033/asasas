import { NgModule } from '@angular/core';

import { AccordionAnchorDirective } from './accordion/accodionanchor.directive';
import { AccordionDirective } from "./accordion/accordion.directive"
import {AccordionLinkDirective} from "./accordion/accordionlink.directive"
import { MenuItems } from './menu-items';
@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
