## Members

<dl>
<dt><a href="#postCanvasResize">postCanvasResize</a> : <code>function</code></dt>
<dd><p>Function to run after the canvas has been resized</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#initCanvas">initCanvas()</a> ⇒ <code>Object</code></dt>
<dd><p>Initialises a 2D canvas and returns the canvas object and the 2D canvas context</p>
</dd>
<dt><a href="#initCanvas3D">initCanvas3D()</a> ⇒ <code>Object</code></dt>
<dd><p>Initialises a 3D web GL 2 canvas and returns the canvas object and the 3D canvas context</p>
</dd>
<dt><a href="#updateCanvasSize">updateCanvasSize(canvas)</a> ⇒ <code>void</code></dt>
<dd><p>Updates the size of a HTML canvas element to fit the containing parent element</p>
</dd>
<dt><a href="#setCanvasResizeFunction">setCanvasResizeFunction(callback)</a> ⇒ <code>void</code></dt>
<dd><p>Sets the canvas resize behaviour to a user specified function</p>
</dd>
<dt><a href="#setCanvasResizeEvent">setCanvasResizeEvent(callback)</a> ⇒ <code>void</code></dt>
<dd><p>Sets the canvas post resize function</p>
</dd>
</dl>

<a name="postCanvasResize"></a>

## postCanvasResize : <code>function</code>
Function to run after the canvas has been resized

**Kind**: global variable  
<a name="initCanvas"></a>

## initCanvas() ⇒ <code>Object</code>
Initialises a 2D canvas and returns the canvas object and the 2D canvas context

**Kind**: global function  
<a name="initCanvas3D"></a>

## initCanvas3D() ⇒ <code>Object</code>
Initialises a 3D web GL 2 canvas and returns the canvas object and the 3D canvas context

**Kind**: global function  
<a name="updateCanvasSize"></a>

## updateCanvasSize(canvas) ⇒ <code>void</code>
Updates the size of a HTML canvas element to fit the containing parent element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>HTMLCanvasElement</code> | The canvas element to update |

<a name="setCanvasResizeFunction"></a>

## setCanvasResizeFunction(callback) ⇒ <code>void</code>
Sets the canvas resize behaviour to a user specified function

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to call when canvas is resized |

<a name="setCanvasResizeEvent"></a>

## setCanvasResizeEvent(callback) ⇒ <code>void</code>
Sets the canvas post resize function

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to call after the canvas has been resized |

