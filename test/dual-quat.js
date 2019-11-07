// now create the algebra of choice, and render some elements.
Algebra(3,0,1,()=>{

  var point = (x,y,z)=>!(1e0+x*1e1+y*1e2+z*1e3);

  var a = point(0,1,0), b = point(0,0,1);

  var canvas = document.body.appendChild(this.graph([
    0x000000,                                               // black color
    1e123,                                                  // a point
    "origin",                                               // a label
    0xFF0000,                                               // red color
    1e12,                                                   // a line
    0x0000FF,                                               // blue color
    new Element([0, 0,0,0,0, 0,0,0,0,1,0, 0,0,0,0, 0]),     // = 1e13, another line, as flat MV
    0xFF00FF,                                               // purple
    a,b,                                                    // two points
    ()=>a&b                                                 // their regressive product as lambda
  ]));
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
});
