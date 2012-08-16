# dict.js

## dict.Dict

A collection that uses an object as a key.

```javascript
var a = {}, b = [], c = 'C';

var d = new dict.Dict();

d.set(a, 'a');
d.set(b, 'b');
d.set(c, 'c');

d.get(a); // 'a'
d.get(b); // 'b'
d.get(c); // 'c'

d.del(a);
d.has(a); // false
d.get(a); // undefined

d.has(b); // true

d.len(); // 2
d.clear();
d.len(); // 0
```

## dict.DeepDict

A collection that uses a sequence of objects as a key.

```javascript
var a = {}, b = [], c = 'C';

var d = new dict.DeepDict();

d.set([a], 'a');
d.set([a, b], 'ab');
d.set([a, b, c], 'abc');

d.get([a]); // 'a'
d.get([a, b]); // 'ab'
d.get([a, b, c]); // 'abc'

d.del([a, b]);
d.has([a, b]); // false
d.get([a, b]); // undefined

d.has([a, b, c]); // true
d.has([c, b, a]); // false
d.get([c, b, a]); // undefined

d.len(); // 2
d.clear();
d.len(); // 0
```