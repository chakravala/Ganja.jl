var Algebra = Algebra || module.exports;
document.body.innerHTML = "";
document.body.style.overflow = "hidden";
Algebra(2,0,1,()=>{
  
  // The function we want to visualize and the point to visualize it at.
  
  var f = (a,b,c,d,e)=>a**5 + (a-b**2)**2*0.3 + 0.05*sin(c*10*e) + 0.5*d + E**e;
  var p = [0,0,0,0,0];
  
  // Labels for the derivatives.
  var labels = f.toString().match(/\((.*?)\)/)[1].split(',');
  
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
    // projected points on axi, grab coefficients.
    var proj = p.map((x,i)=>(((rots[i]>>>1e2)|pga_p)*(rots[i]>>>1e2)));
    p = p.map((p,i)=> ((rots[i].Reverse>>>proj[i].Normalized) & 1e12).e2);
  
    // Sample 100 points for each of the derivatives for a range of -1->1 around p.
    var q, df_points = df.map((df,dfi)=>[...Array(100)].map((x,i)=>df(...((q=p.slice()),q[dfi]=i/50-1,q))));

    // Convert the points to PGA entities. 
    var pga_points = df_points.map((df,dfi)=>df.map((x,i)=>(1e12+(i/50-1)*1e02+x*1e01))),
        pga_lines  = pga_points.map(p=>p.slice(1).map((x,i)=>[p[i],x])).map((x,i)=>rots[i]>>>[...x]).flat(),
        pga_axis   = p.map(x=>[[1e12,1e12+1e01],[1e12-1e02,1e12+1e02]]).map((x,i)=>[...rots[i]>>>[...x],labels[i]]).flat();
        

    return [
      "drag the point ..",pga_p,'p('+p.map(x=>x.toFixed(1))+')',
      0xAAAAAA, ...proj, ...proj.map(x=>[pga_p,x]),
      0xFF0000, ...pga_lines,...p.map((P,i)=>rots[i]>>>(1e12+P*1e02+df[i](...p)*1e01)),
      0x888888, ...pga_axis,
  ]},{scale:0.55,lineWidth:0.5,pointRadius:0.8,fontSize:0.75})).style.background='white';
});
