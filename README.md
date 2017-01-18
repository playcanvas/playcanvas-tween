# Overview

This is a tween library for PlayCanvas. You can include `tween.js` in your Project to start using the library.

# Usage

Tweening `pc.Entity` properties looks like this:

```
var tween = entity.tween(fromProperty).to(toProperty, duration, easing);
tween.start();
```

For example, this tweens the entity's local position with duration 1.0 and `SineOut` easing:

```
var tween = entity.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1.0, pc.SineOut);
tween.start();
```

If you are dealing with rotations you should use `rotate` instead of `to`. For example:

```
entity.tween(entity.getLocalRotation()).rotate({x: 0, y: 180, z: 0}}, 1.0, pc.Linear);
```

You can also tween properties of any other object not just entities. For example:

```
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

# Chaining

You can chain method calls for a tween. For example:

```
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

## `delay(true / false)`

To delay a tween call `tween.delay(duration)` where duration is in seconds.

## `repeat(count)`

To repeat a tween `count` times call `tween.repeat(count)`.

## `loop(true / false)`

To loop a tween forever call `tween.loop(true)`.

## `yoyo(true / false)`

To make a tween play in reverse after it finishes call `tween.yoyo(true)`. Note that to actually see the tween play in reverse in the end, you have to either repeat the tween at least 2 times or set it to loop forever. E.g. to only play a tween from start to end and then from end to start 1 time you need to do:
```
tween.yoyo(true).repeat(2);
```

## `reverse()`

To reverse a tween call `tween.reverse()`.

# Events

## `update(dt)`

This is fired on every update cycle. You can use this method to manually update something in your code using the tweened value.

## `complete()`

This is fired when the tween is finished. If the tween is looping the `loop` event is fired instead.

## `loop()`

This is fired whenever a looping tween finishes a cycle. This is fired instead of the `complete` event for looping tweens.

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
