(function() {
  var DeepDict, Dict, Node, dict, oldDict,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  dict = {};

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = dict;
  } else {
    oldDict = this.dict;
    this.dict = dict;
    dict.noConflict = (function(_this) {
      return function() {
        _this.dict = oldDict;
        return dict;
      };
    })(this);
  }

  dict.Dict = Dict = (function() {
    function Dict() {
      this._keys = [];
      this._vals = [];
    }

    Dict.prototype.keys = function() {
      return this._keys.slice();
    };

    Dict.prototype.vals = function() {
      return this._vals.slice();
    };

    Dict.prototype.len = function() {
      return this._keys.length;
    };

    Dict.prototype.get = function(key) {
      var i;
      i = this._keys.indexOf(key);
      if (i < 0) {
        return void 0;
      } else {
        return this._vals[i];
      }
    };

    Dict.prototype.set = function(key, val) {
      var i;
      i = this._keys.indexOf(key);
      if (i < 0) {
        this._keys.push(key);
        this._vals.push(val);
      } else {
        this._vals.splice(i, 1, val);
      }
      return this;
    };

    Dict.prototype.has = function(key) {
      return __indexOf.call(this._keys, key) >= 0;
    };

    Dict.prototype.del = function(key) {
      var i;
      i = this._keys.indexOf(key);
      if (i >= 0) {
        this._keys.splice(i, 1);
        this._vals.splice(i, 1);
      }
      return this;
    };

    Dict.prototype.clear = function() {
      this._keys = [];
      this._vals = [];
      return this;
    };

    Dict.prototype.each = function(f, context) {
      var i, _i, _ref;
      if (context == null) {
        context = this;
      }
      for (i = _i = 0, _ref = this._keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        f.apply(context, [this._keys[i], this._vals[i]]);
      }
      return this;
    };

    Dict.prototype.map = function(f, context) {
      var i, _i, _ref, _results;
      if (context == null) {
        context = this;
      }
      _results = [];
      for (i = _i = 0, _ref = this._keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(f.apply(context, [this._keys[i], this._vals[i]]));
      }
      return _results;
    };

    return Dict;

  })();

  Node = (function(_super) {
    __extends(Node, _super);

    function Node() {
      this._h = false;
      this._v = void 0;
      Node.__super__.constructor.apply(this, arguments);
    }

    Node.prototype.g = function() {
      return this._v;
    };

    Node.prototype.s = function(v) {
      this._h = true;
      this._v = v;
      return this;
    };

    Node.prototype.h = function() {
      return this._h;
    };

    Node.prototype.d = function() {
      this._h = false;
      this._v = void 0;
      return this;
    };

    return Node;

  })(Dict);

  dict.DeepDict = DeepDict = (function() {
    function DeepDict() {
      this._node = new Node;
    }

    DeepDict.prototype.len = function() {
      var len;
      len = 0;
      this.each(function() {
        return len++;
      });
      return len;
    };

    DeepDict.prototype.get = function(keys) {
      var node;
      node = this._getNode(keys);
      if (node) {
        return node.g();
      } else {
        return void 0;
      }
    };

    DeepDict.prototype.set = function(keys, val) {
      var key, node;
      keys = keys.slice();
      node = this._node;
      while (keys.length) {
        key = keys.shift();
        (node.has(key)) || (node.set(key, new Node));
        node = node.get(key);
      }
      node.s(val);
      return this;
    };

    DeepDict.prototype.has = function(keys) {
      var node;
      node = this._getNode(keys);
      if (node) {
        return node.h();
      } else {
        return false;
      }
    };

    DeepDict.prototype.del = function(keys) {
      var node;
      node = this._getNode(keys);
      node && node.d();
      return this;
    };

    DeepDict.prototype.clear = function() {
      this._node = new Node;
      return this;
    };

    DeepDict.prototype.each = function(f, context) {
      if (context == null) {
        context = this;
      }
      this._each([], this._node, f, context);
      return this;
    };

    DeepDict.prototype._each = function(keys, node, f, context) {
      if (context == null) {
        context = null;
      }
      if (node.h()) {
        f.apply(context, [keys, node.g()]);
      }
      return node.each((function(_this) {
        return function(key, val) {
          return _this._each(keys.concat([key]), val, f, context);
        };
      })(this));
    };

    DeepDict.prototype._getNode = function(keys) {
      var e, node;
      keys = keys.slice();
      node = this._node;
      try {
        while (keys.length) {
          node = node.get(keys.shift());
        }
      } catch (_error) {
        e = _error;
        node = null;
      }
      return node;
    };

    return DeepDict;

  })();

}).call(this);
