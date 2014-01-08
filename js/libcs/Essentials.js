
var operators={};
operators[':']=20;    //Colon: Feldzugriff auf Selbstdefinierte Felder
operators['.']=25;   //Dot: Feldzugriff
operators['\u00b0']=25;   //Degree
operators['_']=50;   //x_i i-tes Element von x
operators['^']=50;   //hoch
operators['*']=100;  //Multiplikation (auch für Vectoren, Scalarmul)
operators['/']=100;  //Division (auch für Vectoren, Scalerdiv)
operators['+']=200;  //Addition (auch für Vectoren, Vectorsumme)
operators['-']=200;  //Subtraktion (auch für Vectoren, Vectordiff)
operators['!']=200;  //Logisches Not (einstellig)
operators['==']=300; //Equals
operators['~=']=300; //approx Equals
operators['~<']=300; //approx smaller
operators['~>']=300; //approx greater
operators['=:=']=300;//Equals after evaluation
operators['>=']=300; //Größergleich
operators['<=']=300; //Kleinergleich
operators['~>=']=300; //ungefähr Größergleich
operators['~<=']=300; //ungefähr Kleinergleich
operators['>']=300;  //Größer
operators['<']=300;  //Kleiner
operators['<>']=300; //Ungleich
operators['&']=350;  //Logisches Und
operators['%']=350;  //Logisches Oder
operators['!=']=350; //Ungleich
operators['~!=']=350; //ungefähr Ungleich
operators['..']=350; //Aufzählung 1..5=(1,2,3,4,5)
operators['++']=370; //Listen Aneinanderhängen
operators['--']=370; //Listen wegnehmen
operators['~~']=370; //Gemeinsame Elemente
operators[':>']=370; //Append List
operators['<:']=370; //Prepend List
operators['=']=400;  //Zuweisung
operators[':=']=400; //Definition
operators[':=_']=400; //Definition
operators['::=']=400; //Definition
operators['->']=400; //Modifier
operators[',']=500;  //Listen und Vektoren Separator
operators[';']=500;  //Befehlsseparator


var infixmap={};
infixmap['+']='add';
infixmap['-']='minus';
infixmap['*']='mult';
infixmap['/']='div';
infixmap['^']='pow';
infixmap[';']='semicolon';
infixmap['=']='assign';
infixmap['..']='sequence';
infixmap[':=']='define';
infixmap['==']='equals';
infixmap['>']='comp_gt';
infixmap['<']='comp_lt';
infixmap['_']='take';


//****************************************************************
// this function is responsible for evaluation an expression tree
//****************************************************************

var niceprint=function(a){
    if(typeof a==='undefined'){
        return '_??_';
    }
    if(a.ctype=='undefined'){
        return '_?_';
    }
    if(a.ctype=='number'){
        return Number.niceprint(a);
    }
    if(a.ctype=='string'){
        return a.value;
    }
    if(a.ctype=='boolean'){
        return a.value;
    }
    if(a.ctype=='list'){
        var erg="[";
        for(var i=0;i<a.value.length;i++){
            erg=erg+niceprint(evaluate(a.value[i]));
            if(i!=a.value.length-1){
                erg=erg+', ';
            }
            
        }
        return erg+"]";
    }
    if(a.ctype=='function'){
        return 'FUNCTION';
        
    }
    if(a.ctype=='infix'){
        return 'INFIX';
    }
    if(a.ctype=='modifier'){
        return a.key+'->'+niceprint(a.value);
    }
    if(a.ctype=='error'){
        return "Error: "+a.message;
    }
    return "__";
    
}


//TODO Eventuell auslagern
//*******************************************************
//this is the container for self-defined functions
//Distinct form evaluator for code clearness :-)
//*******************************************************
var myfunctions= function(name,args,modifs){
    var tt=myfunctions[name];
    if(tt===undefined){
        return nada;
    }
    
    var set=[];
    
    for(var i=0;i<tt.arglist.length;i++){
        set[set.length]=evaluate(args[i]);
    }
    for(var i=0;i<tt.arglist.length;i++){
        namespace.newvar(tt.arglist[i].name);
        namespace.setvar(tt.arglist[i].name,set[i]);
    }
    var erg= evaluate(tt.body);
    for(var i=0;i<tt.arglist.length;i++){
        namespace.removevar(tt.arglist[i].name);
    }
    return erg;
    //                    return tt(args,modifs);
}

//*******************************************************
//this function evaluates a concrete function
//*******************************************************
var evaluator={};
evaluator.helper={};
evaluator.helper.eval= function(name,args,modifs){
    var tt=evaluator[name];
    if(tt===undefined){
        return myfunctions(name+args.length,args,modifs); //Ich habe  überdefinieren von fkts rausgenommen
        //Das muss man sich auch insbesomndere mit Arity nochmal anschauen
    }
    return tt(args,modifs);
}

