import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ClickMode, Container, Engine, HoverMode, MoveDirection, OutMode, StartValueType } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.css'],
  animations: [
    trigger('float', [
      transition('* <=> *', [
        animate('3s ease-in-out', keyframes([
          style({ transform: 'translateY(0px) translateX(0px)', offset: 0 }),
          style({ transform: 'translateY(-15px) translateX(5px)', offset: 0.25 }),
          style({ transform: 'translateY(10px) translateX(-5px)', offset: 0.50 }),
          style({ transform: 'translateY(-10px) translateX(3px)', offset: 0.75 }),
          style({ transform: 'translateY(0px) translateX(0px)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('explode', [
      state('inflated', style({})),
      state('exploded', style({ opacity: 0 })),
      transition('inflated => exploded', [
        animate('0.5s ease-in')
      ]),
    ])]

})
export class BalloonComponent implements OnInit
{

  state = 'initial';
  explodeState = 'inflated';
  id = "tsparticles";
  options = {
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push,
        }


      },
      modes: {
        push: {
          quantity: 40,
        }

      },
    },
    fullScreen: {
      zIndex: 1
    },
    emitters: {
      position: { x: 50, y: 100 },
      rate: { quantity: 5, delay: 0.15 }
    },
    particles: {
      color: { value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"] },
      move: {
        decay: 0.05,
        direction: MoveDirection.top,
        enable: true,
        gravity: { enable: true },
        outModes: { top: OutMode.none, default: OutMode.destroy },
        speed: { min: 50, max: 100 }
      },
      number: { value: 0 },
      opacity: { value: 1 },
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: 30 }
      },
      tilt: {
        direction: "random",
        enable: true,
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 30 }
      },
      size: {
        value: 3,
        animation: { enable: true, startValue: StartValueType.min, count: 1, speed: 16, sync: true }
      },
      roll: {
        darken: { enable: true, value: 25 },
        enlighten: { enable: true, value: 25 },
        enable: true,
        speed: { min: 5, max: 15 }
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: { min: -7, max: 7 }
      },
      shape: { type: ["circle", "square"] }
    },
    responsive: [
      {
        maxWidth: 1024,
        options: {
          particles: {
            move: {
              speed: { min: 33, max: 66 }
            }
          }
        }
      }
    ]
  };
  constructor() { }

  ngOnInit(): void
  {
    let counter = 0;
    setInterval(() =>
    {
      this.state = `state${counter++ % 2}`;
    }, 3000);
  }

  explode()
  {
    this.explodeState = 'exploded';
  }

  particlesLoaded(container: Container): void
  {
    console.log(container);
  }
  async particlesInit(engine: Engine): Promise<void>
  {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }
}
