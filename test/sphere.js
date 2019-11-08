document.body.innerHTML='';
window.addElement = module.exports(4,1,()=>{
  // Cambridge Convention
  var no = .5e5-.5e4, ni = 1e4+1e5, up = (x)=>no+x+.5*x*x*ni;

  // Elements to render
  var els = [];

  // Function to be called from the outside.
  var addElement = (x)=>{
    if (x) els.push(new Element(x.split?x.split(","):x));
    else els.splice(0,els.length);
  }

  var c = document.body.appendChild(this.graph(()=>{
    return els;
  },{conformal:true,animate:true,grid:true,gl:true}));
  c.style.width="100vw";
  c.style.height="100vh";
  return addElement;
});
