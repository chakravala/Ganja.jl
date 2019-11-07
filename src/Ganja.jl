module Ganja

using Blink #, Grassmann

jshead = """
<HEAD>
  <SCRIPT TYPE="text/javascript" SRC="https://unpkg.com/ganja.js"></SCRIPT>
</HEAD>
<BODY>
  <SCRIPT>
    var Algebra = Algebra || module.exports;
    document.body.innerHTML = "";
    document.body.style.overflow = "hidden";
"""

function read_example(filename)
    open(joinpath(@__DIR__,"..","test",filename),"r") do f
        read(f,String)
    end
end

jsend = """
  </SCRIPT>
</BODY>
"""

load_example(filename) = loadhtml(Window(),jshead*read_example(filename)*jsend)


end # module
