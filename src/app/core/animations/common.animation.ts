import {
  animate, animation, animateChild, stagger, style, transition, trigger
  , useAnimation, query, group
} from '@angular/animations';

export const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' })),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' })),
  group([
    query(':leave',
      animate('1s', style({ transform: 'translate3d(100%,0,0)' }))),
    query(':enter',
      animate('1s', style({ transform: 'translate3d(0%,0,0)' })))
  ])
];

export const slideRight = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0%,0,0)' })),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)' })),

  group([
    query(':leave',
      animate('1s', style({ transform: 'translate3d(-100%,0,0)' }))),
    query(':enter',
      animate('1s', style({ transform: 'translate3d(0%,0,0)' })))
  ])
];

export const transRight = [
  style({ transform: 'translateX(-100%)' }),
  animate('500ms')
];
export const transLeft = [
  style({ transform: 'translateX(100%)' }),
  animate('500ms')
];

export const ani1 = [
  query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
  query(':leave', style({ zIndex: 100 })),
  query(':enter', style({ transform: 'translateY(100%)' })),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100%)' })), // y: '-100%'
      animateChild()
    ])),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
      animateChild()
    ]))
  ])
]

export const ani2 = [
  query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
  query(':enter', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    query('contributor', [
      style({ opacity: 0, transform: 'scale(0)' })
    ])
  ]),
  query(':leave', [
    query('.image', [
      stagger(50, [
        animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translateY(-50px)' }))
      ])
    ]),
    animate('800ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translateX(-100%)' }))
  ])
];

const fadeIn = animation([
  style({
    opacity: 0
  }),
  animate('$customTime', style({ opacity: 1 }))
], { params: { customTime: 1000 } });
const fadeOut = animation([
  animate('$customTime', style({ opacity: 0.2 }))
], { params: { customTime: 1000 } });
export const fadeAnimation = trigger('fade', [
  transition('out => in', useAnimation(fadeIn, { params: { customTime: 5000 } })),
  transition('in => out', useAnimation(fadeOut, { params: { customTime: 5000 } }))
]);





// https://github.com/matsko/angular-connect-demos/blob/master/route_animations.ts
const startingStyles = (styles) => {
  styles['position'] = 'fixed';
  styles['top'] = 0;
  styles['left'] = 0;
  styles['right'] = 0;
  styles['height'] = '100%';
  return styles;
}

export default function (name) {
  return trigger(name, [
    transition('void => *', [
      style(startingStyles({
        transform: 'translateX(100%)'
      })),
      animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition('* => void', [
      style(startingStyles({
        transform: 'translateX(0%)'
      })),
      animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
    ])
  ]);
}
