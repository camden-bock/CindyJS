

//==========================================
//      Namespace and Vars
//==========================================



function Nada(){this.ctype='undefined'};
function Void(){this.ctype='void'};
function CError(msg){this.ctype='error';this.message=msg};
var nada= new Nada();

function Namespace(){
    this.vars={
        'pi':{'ctype':'variable','stack':[{'ctype':'number','value':{'real':Math.PI,'imag':0}}],'name':'pi'},
        'i':{'ctype':'variable','stack':[{'ctype':'number','value':{'real':0,'imag':1}}],'name':'i'},
        'true':{'ctype':'variable','stack':[{'ctype':'boolean','value':true}],'name':'true'},
        'false':{'ctype':'variable','stack':[{'ctype':'boolean','value':false}],'name':'false'},
        '#':{'ctype':'variable','stack':[nada],'name':'#'},
    }
    this.isVariable= function(a){
        return this.vars[a]!== undefined;
        
    }
    
    this.isVariableName = function(a){//TODO will man das so? Den ' noch dazu machen
        
        if (a=='#') return true;
        if (a=='#1') return true;
        if (a=='#2') return true;
        
        var b0 =  /^[a-z,A-Z]+$/.test(a[0]);
        var b1 =  /^[0-9,a-z,A-Z]+$/.test(a);
        return b0 && b1;
    }
    
    this.create =function(code){
        this.vars[code]={'ctype':'variable','stack':[],'name':code};
        return this.vars[code];
    }
    
    this.newvar =function(code){
        if(this.vars[code]===undefined){
            return this.create(code);
        }
        this.vars[code].stack.push(nada);
        return this.vars[code];
    }
    
    this.removevar=function(code){
        this.vars[code].stack.pop();
    }
    
    
    this.setvar= function(code,val) {
        var stack=this.vars[code].stack;
        if(val.ctype=='undefined'){
            stack[stack.length-1]=val;
            return;
        }
        var erg=evaluator._helper.clone(val);
        stack[stack.length-1]=erg;
    }
    
    this.setvarnocopy= function(code,val) {
        var stack=this.vars[code].stack;
        stack[stack.length-1]=val;
    }
    
    
    this.getvar= function(code) {

        var stack=this.vars[code].stack;
        var erg=stack[stack.length-1];
        if(stack.length==0 && stack[stack.length-1]==nada){//Achtung das erforder das der GeoTeil da ist.
            if(typeof csgeo.csnames[code] !== 'undefined'){
                return {'ctype':'geo','value':csgeo.csnames[code]}
            }
        }
        return erg;
    }
    
    this.dump= function(code) {
        var stack=this.vars[code].stack;
        console.log("*** Dump "+code);
        
        for(var i=0;i<stack.length;i++){
            console.log(i+":> "+ niceprint(stack[i]))
            
        }
        
    }
    
    this.vstack=[];
    
    this.pushVstack=function(v){
        this.vstack.push(v);
    
    }
    this.popVstack=function(){
        this.vstack.pop();
    }
    
    this.cleanVstack=function(){
        var st=this.vstack;
        while(st.length>0 && st[st.length-1]!="*"){
            this.removevar(st[st.length-1]);
            st.pop();
        }
        if(st.length>0){st.pop();}
    }
    
    
    
    
}

var namespace =new Namespace();
