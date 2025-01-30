# Overview

This is a tween library for PlayCanvas. You can include `tween.js` in your Editor Project to start using the library.

If you create your application *after* loading this library, you can call the following method to enable
tweening on your application:

```javascript
app.addTweenManager();
```

# Usage

## Editor 

Copy the the [tween.umd.js](./dist/tween.umd.js) file from the build directory into your editor project

Tweening `pc.Entity` properties looks like this:

```javascript
var tween = entity.tween(fromProperty).to(toProperty, duration, easing);
tween.start();
```

For example, this tweens the entity's local position with duration 1.0 and `SineOut` easing:

```javascript
var tween = entity.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1.0, pc.SineOut);
tween.start();
```

If you are dealing with rotations you should use `rotate` instead of `to`. This takes euler angles and uses an internal quaternion or it can take quaternions to slerp between angles. For example:

```javascript
entity.tween(entity.getLocalEulerAngles()).rotate({x: 0, y: 180, z: 0}, 1.0, pc.Linear);
```

```javascript
entity.tween(entity.getLocalRotation()).rotate(targetQuaternionRotation, 1.0, pc.Linear);
```

You can also tween properties of any other object not just entities. For example:

```javascript
// some object with a property called 'value'
var data = {
    value: 0
};

// create a new tween using pc.Application#tween
// passing another object as the target. Any properties
// that are common between the target and the source object
// will be tweened
app.tween(data).to({value: 1}, 1.0, pc.BackOut);
```

## ESM 

You can also use this library as an ES Module, either from withing an ESM Script or an engine only project

Save the esm [`tween.mjs`](./dist/tween.mjs) to your project and import it.

```javascript
import { tweenEntity, SineOut } from './tween.mjs'

tweenEntity(entity, entity.getLocalPosition())
    .to({x: 10}, 1.0, SineOut));
```

The ESM won't automatically add `tween()` methods to Entity and Application, however you can manually add these using `addTweenExtensions(pc)`

```javascript
import { addTweenExtensions, SineOut } from './tween.mjs'
import * as pc from 'playcanvas'

// Adds .tween() to Entity and Application
addTweenExtensions(pc);

entity.tween(entity.getLocalPosition())
    .to({x: 10}, 1.0, SineOut));
```

# Chaining

You can chain method calls for a tween. For example:

```javascript
// delay, yoyo and loop tween
entity
.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1.0, pc.SineOut)
.delay(1.0)
.yoyo(true)
.loop(true)
.start();
```

# Methods

## `start()`

To start playing a tween call `tween.start()`.

## `stop()`

To stop a tween  call `tween.stop()`.

## `pause()`

To pause a tween call `tween.pause()`.

## `resume()`

To resume a paused tween call `tween.resume()`.

## `delay(duration)`

To delay a tween call `tween.delay(duration)` where duration is in seconds.

## `repeat(count)`

To repeat a tween `count` times call `tween.repeat(count)`.

## `loop(true / false)`

To loop a tween forever call `tween.loop(true)`.

## `yoyo(true / false)`

To make a tween play in reverse after it finishes call `tween.yoyo(true)`. Note that to actually see the tween play in reverse in the end, you have to either repeat the tween at least 2 times or set it to loop forever. E.g. to only play a tween from start to end and then from end to start 1 time you need to do:
```javascript
tween.yoyo(true).repeat(2);
```

## `reverse()`

To reverse a tween call `tween.reverse()`.

# Events

To subscribe to events during Tween execution, use a these methods:

## `onUpdate`

This is called on every update cycle. You can use this method to manually update something in your code using the tweened value.
It provides `dt` argument.

E.g.

```javascript
var color = new pc.Color(1, 0, 0);

var tween = app.tween(color).to(new pc.Color(0, 1, 1), 1, pc.Linear);
tween.onUpdate((dt) => {
    material.diffuse = color;
    material.update();
});
```

## `onComplete`

This is called when the tween is finished. If the tween is looping the `onLoop` will be called instead.

E.g.

```javascript
entity
.tween(entity.getLocalPosition())
.to({x: 10, y: 0, z: 0}, 1, pc.Linear)
.onComplete(() => {
   console.log('tween completed');
});
```

## `onLoop`

This is called whenever a looping tween finishes a cycle. This is called instead of the `onComplete` for looping tweens.

E.g.

```javascript
entity
.tween(entity.getLocalPosition())
.to({x: 10, y: 0, z: 0}, 1, pc.Linear)
.loop(true)
.onLoop(() => {
   console.log('tween loop');
});
```

# Easing methods

There are various easing methods you can use that change the way that values are interpolated. The available easing methods are:

- `pc.Linear`
- `pc.QuadraticIn`
- `pc.QuadraticOut`
- `pc.QuadraticInOut`
- `pc.CubicIn`
- `pc.CubicOut`
- `pc.CubicInOut`
- `pc.QuarticIn`
- `pc.QuarticOut`
- `pc.QuarticInOut`
- `pc.QuinticIn`
- `pc.QuinticOut`
- `pc.QuinticInOut`
- `pc.SineIn`
- `pc.SineOut`
- `pc.SineInOut`
- `pc.ExponentialIn`
- `pc.ExponentialOut`
- `pc.ExponentialInOut`
- `pc.CircularIn`
- `pc.CircularOut`
- `pc.CircularInOut`
- `pc.BackIn`
- `pc.BackOut`
- `pc.BackInOut`
- `pc.BounceIn`
- `pc.BounceOut`
- `pc.BounceInOut`
- `pc.ElasticIn`
- `pc.ElasticOut`
- `pc.ElasticInOut`

# Tutorial

You can find a tutorial with various use cases [here][1].

[1]: http://developer.playcanvas.com/en/tutorials/tweening/
