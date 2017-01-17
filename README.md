# Overview

This is a tween library for PlayCanvas. You can include `tween.js` in your Project to start using the library.

# Usage

Tweening `pc.Entity` properties looks like this:

```
var tween = entity.tween(fromProperty).to(toProperty, speed, easing);
tween.start();
```

For example, this tweens the entity's local position with speed 1.0 and SineOut easing:

```
var tween = entity.tween(entity.getLocalPosition()).to({x: 10, y: 0, z: 0}, 1.0, pc.SineOut);
tween.start();
```

In this example we tween the entity's local rotation:

```
var toRotation = (new pc.Quat()).setFromEulerAngles(0, 90, 0);
entity.tween(entity.getLocalRotation()).to(toRotation, 1.0, pc.Linear);
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

# `start()`

To start playing a tween call `tween.start()`.

# `stop()`

To stop a tween  call `tween.stop()`.

# `pause()`

To pause a tween call `tween.pause()`.

# `resume()`

To resume a paused tween call `tween.resume()`.

# `delay(true / false)`

To delay a tween call `tween.delay(duration)` where duration is in seconds.

# `repeat(count)`

To repeat a tween `count` times call `tween.repeat(count)`.

# `loop(true / false)`

To loop a tween forever call `tween.loop(true)`.

# `yoyo(true / false)`

To make a tween play in reverse after it finishes call `tween.yoyo(true)`. Note that to actually see the tween play in reverse in the end, you have to either repeat the tween at least 2 times or set it to loop forever. E.g. to only play a tween from start to end and then from end to start 1 time you need to do:
```
tween.yoyo(true).repeat(2);
```

# `reverse()`

To reverse a tween call `tween.reverse()`.


