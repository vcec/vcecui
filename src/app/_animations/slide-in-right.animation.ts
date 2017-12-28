import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInRight =
trigger('slideInRight', [
 		state('*', style({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity:1
            
        })),

        transition(':enter', [
 			style({
                left: '100%',
 				opacity:0
            }),
 			animate('.5s ease-in-out', style({
                left: '0',
 				opacity:1
            }))
        ])
        
    ]);