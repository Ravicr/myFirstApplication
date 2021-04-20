class myClass
{

    constructor(name)
    {
        this.name=name;
    }
    myFunc()
    {
        console.log("My Name is "+this.name);
    }


    myAddition()
    {
     var addition= 12 + 10;
     return addition;
    }

}
var number =123;
module.exports.myClass=myClass;
module.exports.number = number;