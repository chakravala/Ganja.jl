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
        addelement!(w,t) = js(w,JSString("addElement($(string(value(Grassmann.MultiVector(t)))))"))
    end
end

end # module
