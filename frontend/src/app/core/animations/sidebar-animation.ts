import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SidebarAnimation = trigger('sidebar', [
  transition(':enter', [
    style({ width: 0, overflow: 'hidden' }),
    query('.sidebar-item', [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
    ]),
    sequence([
      animate('200ms', style({ width: '*' })),
      query('.sidebar-item', [
        stagger(-50, [
          animate('250ms ease', style({ opacity: 1, transform: 'none' })),
        ]),
      ]),
    ]),
  ]),

  transition(':leave', [
    style({ width: '*', overflow: 'hidden' }),
    query('.sidebar-item', [style({ opacity: 1, transform: 'none' })]),
    sequence([
      query('.sidebar-item', [
        stagger(50, [
          animate(
            '250ms ease',
            style({ opacity: 0, transform: 'translateX(-50px)' })
          ),
        ]),
      ]),
      animate('200ms', style({ width: 0 })),
    ]),
  ]),
]);
