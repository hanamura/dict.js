oldDict = @dict
dict = {}

if module?.exports?
	module.exports = dict
else
	@dict = dict

dict.noConflict = =>
	@dict = oldDict
	return dict



dict.Dict = class Dict
	constructor: ->
		@_keys = []
		@_vals = []

	len: ->
		@_keys.length

	get: (key) ->
		i = @_keys.indexOf key

		if i < 0 then undefined else @_vals[i]

	set: (key, val) ->
		i = @_keys.indexOf key

		if i < 0
			@_keys.push key
			@_vals.push val
		else
			@_vals.splice i, 1, val
		@

	has: (key) ->
		key in @_keys

	del: (key) ->
		i = @_keys.indexOf key

		if i >= 0
			@_keys.splice i, 1
			@_vals.splice i, 1
		@

	clear: ->
		@_keys = []
		@_vals = []
		@

	each: (f, context = @) ->
		for i in [0...@_keys.length]
			f.apply context, [@_keys[i], @_vals[i]]
		@



class Node extends Dict
	constructor: ->
		@_h = false
		@_v = undefined

		super arguments...

	g: ->
		@_v

	s: (v) ->
		@_h = true
		@_v = v
		@

	h: ->
		@_h

	d: ->
		@_h = false
		@_v = undefined
		@



dict.DeepDict = class DeepDict
	constructor: ->
		@_node = new Node

	len: ->
		len = 0
		@each -> len++
		len

	get: (keys) ->
		node = @_getNode keys
		if node then node.g() else undefined

	set: (keys, val) ->
		keys = keys.slice()
		node = @_node

		while keys.length
			key = keys.shift()
			(node.has key) or (node.set key, new Node)
			node = node.get key

		node.s val
		@

	has: (keys) ->
		node = @_getNode keys
		if node then node.h() else false

	del: (keys) ->
		node = @_getNode keys
		node and node.d()
		@

	clear: ->
		@_node = new Node
		@

	each: (f, context = @) ->
		@_each [], @_node, f, context
		@

	_each: (keys, node, f, context = null) ->
		if node.h()
			f.apply context, [keys, node.g()]
		node.each (key, val) =>
			@_each (keys.concat [key]), val, f, context

	_getNode: (keys) ->
		keys = keys.slice()
		node = @_node
		try
			while keys.length
				node = node.get keys.shift()
		catch e
			node = null
		node
