import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const fadeOutAnimation =
trigger('fadeOutAnimation', [
     transition(':leave', [
         style({ opacity: 1 }),
         animate('.3s', style({ opacity: 0 }))
    ]),
]);
