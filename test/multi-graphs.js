var Algebra = Algebra || module.exports;
document.body.innerHTML = "";
document.body.style.overflow = "hidden";
Algebra(2,0,1,()=>{
  
  // The function we want to visualize and the point to visualize it at.
  
  var f = (a,b,c,d,e)=>a**3 + b**2*0.3 + 0.05*sin(c*10) + 0.5*d + E**e;
  var p = [0,0,0,0,0];
  
  // Labels for the derivatives.
  var labels = ["a","test","c","d","e"];
  
  // THE CODE BELOW CALCULATES THE DERIVATIVES AND MAKES THE GRAPH.
  // IT WILL AUTOMATICALLY ADAPT TO THE NUMBER OF ARGUMENTS IN f AND p.
  
  // Just convenience
  var {sin,cos,tan,E,PI,pow} = Math,
      pga_p      = 1e12,
      rots       = p.map((x,i)=>E**(1e12*PI*i/p.length)*E**(-1e02));
  
  // A cheap partial differential operator.
  // returns the i-th partial derivative of f.
  var d = (f,i=0)=> (...a)=>(-f(...a)+f(...(a.splice(i,1,a[i]+1E-7),a)))/1E-7;
  
  // All the partial derivatives of our function f.
  var df = p.map((x,i)=>d(f,i));

  // Graph the derivatives.
  document.body.appendChild(this.graph(()=>{ 
    // grab two parameters back from point movement.
    p = p.map((p,i)=>((((rots[i]>>>1e1)|pga_p)*(rots[i]>>>1e1))&1e12).e1);
    
    // Sample 100 points for each of the derivatives for a range of -1->1 around p.
    var q, df_points = df.map((df,dfi)=>[...Array(100)].map((x,i)=>df(...((q=p.slice()),q[dfi]+=i/50-1,q))));

    // Convert the points to PGA points.
    var pga_points = df_points.map((df,dfi)=>df.map((x,i)=>(1e12+(i/50-1)*1e02+x*1e01))),
        pga_lines  = pga_points.map(p=>p.slice(1).map((x,i)=>[p[i],x])),
        pga_axis   = p.map(x=>[[1e12,1e12+1e01],[1e12-1e02,1e12+1e02]]);
      
    return [
      "drag the point ..",
      pga_p,'p('+p.map(x=>x.toFixed(1))+')',
      0xFF0000, ...pga_lines.map((x,i)=>rots[i]>>>[...x]).flat(),
      0x888888, ...pga_axis.map((x,i)=>[...rots[i]>>>[...x],labels[i]]).flat(),
      0xCCCCCC, ...p.map((x,i)=>[rots[i]>>>(1e12),1e12])
  ]},{scale:0.55,lineWidth:0.5,fontSize:0.75}));
});
