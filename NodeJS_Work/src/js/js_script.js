var a;

function show_hide(parameter)
{
    if(a==1){

        document.getElementById(parameter).style.display="none";
        document.getElementById(parameter+"_arrowbutton").src="down_arrow.png";
        return a=0;
    }
    else{

        document.getElementById(parameter).style.display="inline";
        document.getElementById(parameter+"_arrowbutton").src="up_arrow.png";
        return a=1;
    }
}

function submit_form(){


}