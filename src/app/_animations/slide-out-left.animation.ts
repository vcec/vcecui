import { trigger, state, animate, transition, style } from '@angular/animations';


export const slideOutLeft =
trigger('slideOutLeft', [
 		state('*', style({
            position: 'absolute',
            top: 0,
            left: 0,
            opacity:1
            
        })),

        transition(':leave', [
             animate('.5s ease-in-out', style({
                left: '-100%',
 				
            }))
        ])
        
    ]);