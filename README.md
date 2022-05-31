# Overview

This is a tween library for PlayCanvas. You can include `tween.js` in your Project to start using the library.

If you create your application *after* loading this library, you can call the following method to enable
tweening on your application:

```javascript
app.addTweenManager();
```

# Usage

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

## `begin()`

This is fired whenever a tween begins. For repeating tweens, this is fired each time the tween repeats as well.

E.g.

```javascript
entity
.tween(entity.getLocalPosition())
.to({x: 10, y: 0, z: 0}, 1, pc.Linear)
.on('begin', function () {
   console.log('tween began');
});
```

## `update(dt)`

This is fired on every update cycle. You can use this method to manually update something in your code using the tweened value.

E.g.

```javascript
var color = new pc.Color(1, 0, 0);

var tween = app.tween(color).to(new pc.Color(0, 1, 1), 1, pc.Linear);
tween.on('update', function (dt) {
    material.diffuse = color;
    material.update();
});
```

## `complete()`

This is fired when the tween is finished. If the tween is looping the `loop` event is fired instead.

E.g.

```javascript
entity
.tween(entity.getLocalPosition())
.to({x: 10, y: 0, z: 0}, 1, pc.Linear)
.on('complete', function () {
   console.log('tween completed');
});
```

## `loop()`

This is fired whenever a looping tween finishes a cycle. This is fired instead of the `complete` event for looping tweens.

E.g.

```javascript
entity
.tween(entity.getLocalPosition())
.to({x: 10, y: 0, z: 0}, 1, pc.Linear)
.loop(true)
.on('loop', function () {
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
