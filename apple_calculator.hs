// from madeye2
// from brackets
function calculate(text) {
    // return text;

    // pattern matches integers, parens and the operators +, -, *, /
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens = text.match(pattern);
    try {
        var val = evaluation(tokens);
        if (tokens.length != 0) {throw "ill-formed expression";}
        return String(val);
    } catch (err) {
        return err; 
    }
    //return JSON.stringify(tokens);
}

function setup_calc(div) {
    var input = $('<input></input>',{type: 'text', size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function() {
        output.html(String(calculate(input.val())));
    });
    
    $(div).append(input,button,output);
}

function read_operand(tokenArray) {
    var num = tokenArray[0];
    tokenArray.shift();
    num = parseInt(num);
    if (isNaN(num)) {throw "number expected";}
    else {return num};
}

function evaluation(tokenArray) {
    if (tokenArray.length == 0) {throw "missing operand";}
    var value = read_operand(tokenArray);
    while (tokenArray.length != 0) {
        var operator = tokenArray[0];
        console.log(operator);
        tokenArray.shift();
        if (operator != "+" && operator != "-" && operator!="/" && operator!="*") {
            throw "unrecognized operator";
        }
        if (tokenArray.length == 0) {throw "missing operand";}
        var temp = read_operand(tokenArray);
        if (operator == "+") {value = value+temp;}
        else if (operator == "-") {value = value-temp;}
        else if (operator == "/") {value = value / temp;}
        else if (operator == "*") {value = value*temp;}
    }
    return value;
}

$(document).ready(function() {
    // look for nodes of class "calculator" and set them up
    $('.calculator').each(function() {
        setup_calc(this);
    });
});