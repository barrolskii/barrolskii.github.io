## Classes

<dl>
<dt><a href="#Vector2D">Vector2D</a></dt>
<dd></dd>
<dt><a href="#Vector3D">Vector3D</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#mapValue">mapValue(x, a, b, c, d)</a> ⇒ <code>number</code></dt>
<dd><p>Maps value x from range a -&gt; b to range c -&gt; d</p>
</dd>
<dt><a href="#degToRad">degToRad(degrees)</a> ⇒ <code>number</code></dt>
<dd><p>Converts degrees to radians</p>
</dd>
<dt><a href="#radToDeg">radToDeg(radians)</a> ⇒ <code>number</code></dt>
<dd><p>Converts radians to degrees</p>
</dd>
<dt><a href="#getRandomInt">getRandomInt(max)</a> ⇒ <code>number</code></dt>
<dd><p>Generates a random integer</p>
</dd>
</dl>

<a name="Vector2D"></a>

## Vector2D
**Kind**: global class  

* [Vector2D](#Vector2D)
    * [new Vector2D(x, y)](#new_Vector2D_new)
    * [.add(x, y)](#Vector2D+add)
    * [.subtract(x, y)](#Vector2D+subtract)
    * [.multiply(x, y)](#Vector2D+multiply)
    * [.divide(x, y)](#Vector2D+divide)
    * [.dotProduct(x, y)](#Vector2D+dotProduct)
    * [.magnitude()](#Vector2D+magnitude) ⇒ <code>number</code>
    * [.toString()](#Vector2D+toString) ⇒ <code>string</code>
    * [.toArray()](#Vector2D+toArray) ⇒ <code>Array</code>
    * [.copy()](#Vector2D+copy) ⇒ [<code>Vector2D</code>](#Vector2D)

<a name="new_Vector2D_new"></a>

### new Vector2D(x, y)
Create a new 2D vector


| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+add"></a>

### vector2D.add(x, y)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+subtract"></a>

### vector2D.subtract(x, y)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+multiply"></a>

### vector2D.multiply(x, y)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+divide"></a>

### vector2D.divide(x, y)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+dotProduct"></a>

### vector2D.dotProduct(x, y)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector2D</code>](#Vector2D) | 
| y | <code>number</code> | 

<a name="Vector2D+magnitude"></a>

### vector2D.magnitude() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector2D+toString"></a>

### vector2D.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector2D+toArray"></a>

### vector2D.toArray() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector2D+copy"></a>

### vector2D.copy() ⇒ [<code>Vector2D</code>](#Vector2D)
**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector3D"></a>

## Vector3D
**Kind**: global class  

* [Vector3D](#Vector3D)
    * [new Vector3D(x, y, z)](#new_Vector3D_new)
    * [.add(x, y, z)](#Vector3D+add)
    * [.subtract(x, y, z)](#Vector3D+subtract)
    * [.multiply(x, y, z)](#Vector3D+multiply)
    * [.divide(x, y, z)](#Vector3D+divide)
    * [.crossProduct(x, y, z)](#Vector3D+crossProduct) ⇒ [<code>Vector3D</code>](#Vector3D)
    * [.dotProduct(x, y, z)](#Vector3D+dotProduct) ⇒ <code>number</code>
    * [.magnitude()](#Vector3D+magnitude) ⇒ <code>number</code>
    * [.toString()](#Vector3D+toString) ⇒ <code>string</code>
    * [.toArray()](#Vector3D+toArray) ⇒ <code>Array</code>
    * [.copy()](#Vector3D+copy) ⇒ [<code>Vector3D</code>](#Vector3D)

<a name="new_Vector3D_new"></a>

### new Vector3D(x, y, z)

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+add"></a>

### vector3D.add(x, y, z)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+subtract"></a>

### vector3D.subtract(x, y, z)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+multiply"></a>

### vector3D.multiply(x, y, z)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+divide"></a>

### vector3D.divide(x, y, z)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+crossProduct"></a>

### vector3D.crossProduct(x, y, z) ⇒ [<code>Vector3D</code>](#Vector3D)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+dotProduct"></a>

### vector3D.dotProduct(x, y, z) ⇒ <code>number</code>
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  

| Param | Type |
| --- | --- |
| x | <code>number</code> \| <code>Array</code> \| [<code>Vector3D</code>](#Vector3D) | 
| y | <code>number</code> | 
| z | <code>number</code> | 

<a name="Vector3D+magnitude"></a>

### vector3D.magnitude() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  
<a name="Vector3D+toString"></a>

### vector3D.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  
<a name="Vector3D+toArray"></a>

### vector3D.toArray() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  
<a name="Vector3D+copy"></a>

### vector3D.copy() ⇒ [<code>Vector3D</code>](#Vector3D)
**Kind**: instance method of [<code>Vector3D</code>](#Vector3D)  
<a name="mapValue"></a>

## mapValue(x, a, b, c, d) ⇒ <code>number</code>
Maps value x from range a -> b to range c -> d

**Kind**: global function  

| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| a | <code>number</code> | 
| b | <code>number</code> | 
| c | <code>number</code> | 
| d | <code>number</code> | 

<a name="degToRad"></a>

## degToRad(degrees) ⇒ <code>number</code>
Converts degrees to radians

**Kind**: global function  

| Param | Type |
| --- | --- |
| degrees | <code>number</code> | 

<a name="radToDeg"></a>

## radToDeg(radians) ⇒ <code>number</code>
Converts radians to degrees

**Kind**: global function  

| Param | Type |
| --- | --- |
| radians | <code>number</code> | 

<a name="getRandomInt"></a>

## getRandomInt(max) ⇒ <code>number</code>
Generates a random integer

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| max | <code>number</code> | Maximum number to generate |

