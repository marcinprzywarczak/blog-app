import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const OpacityAnimation = trigger('opacity', [
  transition(':enter', [
    style({ width: 0, overflow: 'hidden' }),
    sequence([animate('400ms', style({ width: '*' }))]),
  ]),

  transition(':leave', [
    style({ width: '*', overflow: 'hidden' }),
    sequence([animate('400ms', style({ width: 0 }))]),
  ]),
]);
