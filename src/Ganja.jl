module Ganja

using Blink, Requires, AbstractTensors #, Grassmann
import Blink: JSString
import AbstractTensors: value

export loadganja!, loadganja, loadexample!, loadexample

function readfile(filename)
    open(joinpath(filename),"r") do f
        read(f,String)
    end
end

readexample(filename) = readfile(joinpath(@__DIR__,"..","test",filename))

#loadganja!(w) = loadjs!(w,joinpath(@__DIR__,"..","deps","ganja.js"))
loadganja!(w) = loadjs!(w,"https://unpkg.com/ganja.js")
loadganja() = (w=Window();loadganja!(w);w)

loadexample!(w,filename) = js(w,JSString(readexample(filename)))
loadexample(filename) = (w=loadganja();loadexample(w,filename);w)

function __init__()
    @require Grassmann="4df31cd9-4c27-5bea-88d0-e6a7146666d8" begin
        export addelement!
        addelement!(w,t) = js(w,JSString("addElement($(string(value(Grassmann.Multivector(t)))))"))
    end
    @require Reduce="93e0c654-6965-5f22-aba9-9c1ae6b3c259" begin
        export multigraph!
        function multigraph!(w,t::Expr)
            t.head ≠ :-> && throw(error("$t is not an anonymous function"))
            js(w,JSString(readexample("multi-graphs-head.js")*"$(t.args[1])=>$(Reduce.RExpr(t.args[2]))"*readexample("multi-graphs-plot.js")))
        end
    end
end

end # module
