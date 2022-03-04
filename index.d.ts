declare namespace pc {
  type TweenTarget =
  | Record<string, unknown>
  | Quat
  | Vec4
  | Vec3
  | Vec2;

  // Easing Functions
  export function Linear(t: number): number;
  export function QuadraticIn(t: number): number;
  export function QuadraticOut(t: number): number;
  export function QuadraticInOut(t: number): number;
  export function CubicIn(t: number): number;
  export function CubicOut(t: number): number;
  export function CubicInOut(t: number): number;
  export function QuarticIn(t: number): number;
  export function QuarticOut(t: number): number;
  export function QuarticInOut(t: number): number;
  export function QuinticIn(t: number): number;
  export function QuinticOut(t: number): number;
  export function QuinticInOut(t: number): number;
  export function SineIn(t: number): number;
  export function SineOut(t: number): number;
  export function SineInOut(t: number): number;
  export function ExponentialIn(t: number): number;
  export function ExponentialOut(t: number): number;
  export function ExponentialInOut(t: number): number;
  export function CircularIn(t: number): number;
  export function CircularOut(t: number): number;
  export function CircularInOut(t: number): number;
  export function BackIn(t: number): number;
  export function BackOut(t: number): number;
  export function BackInOut(t: number): number;
  export function BounceIn(t: number): number;
  export function BounceOut(t: number): number;
  export function BounceInOut(t: number): number;
  export function ElasticIn(t: number): number;
  export function ElasticOut(t: number): number;
  export function ElasticInOut(t: number): number;

  /**
   * @name  pc.Tween
   * @param {object} target - The target property that will be tweened
   * @param {pc.TweenManager} manager - The tween manager
   * @param {pc.Entity} entity - The pc.Entity whose property we are tweening
   */
  export class Tween {
    time: number;

    complete: boolean;

    playing: boolean;

    stopped: boolean;

    pending: boolean;

    target: unknown;

    duration: number;

    private _currentDelay: number;

    timeScale: number;

    private _reverse: boolean;

    private _delay: number;

    private _yoyo: boolean;

    private _count: number;

    private _numRepeats: number;

    private _repeatDelay: number;

    private _from: boolean;

    private _slerp: boolean;

    private _fromQuat: Quat;

    private _toQuat: Quat;

    private _quat: Quat;

    easing: (t: number) => number;

    private _sv: unknown;

    private _ev: unknown;

    to: (
      properties: TweenTarget,
      duration?: number,
      easing?: (t: number) => number,
      delay?: number,
      repeat?: boolean,
      yoyo?: boolean
    ) => Tween;

    from: (
      properties: TweenTarget,
      duration?: number,
      easing?: (t: number) => number,
      delay?: number,
      repeat?: boolean,
      yoyo?: boolean
    ) => Tween;

    rotate: (
      properties: TweenTarget,
      duration?: number,
      easing?: (t: number) => number,
      delay?: number,
      repeat?: boolean,
      yoyo?: boolean
    ) => Tween;

    start: () => Tween;

    pause: () => void;

    resume: () => void;

    stop: () => void;

    delay: (delay: number) => Tween;

    repeat: (num: number, delay?: number) => Tween;

    loop: (loop: boolean) => Tween;

    yoyo: (yoyo: boolean) => Tween;

    reverse: () => Tween;

    chain: (...tween: Tween[]) => Tween;

    update: (dt: number) => boolean;
  }

  export interface TweenOptions {
    /** Property name of an Element component to be tweened...? */
    element: string;
  }

  export interface Entity {
    tween: (target: TweenTarget, options?: TweenOptions) => Tween;
  }
}
