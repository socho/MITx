// from madeye2
// from brackets
function calculate(text) {
    // return text;

    // pattern matches integers, parens and the operators +, -, *, /
    var pattern = /\d+(\.\d+)?|\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens = text.match(pattern);
    console.log(tokens);
    try {
        var val = evaluation(tokens);
        if (tokens.length != 0) {throw "ill-formed expression";}
        return String(val);
    } catch (err) {
        return err; 
    }
    //return JSON.stringify(tokens);
}


function read_term(tokenArray) {

}

function read_operand(tokenArray) {
    var num = tokenArray[0];
    tokenArray.shift();
    var parsedNum = parseFloat(num);
    console.log(num);
    if (num == "(") {
        var tempResult = evaluation(tokenArray);
        if (tokenArray[0] == ")") {
            tokenArray.shift();
            return tempResult};
    }
    else if (num == "-") {
        var numToNegate = tokenArray[0];
        tokenArray.shift();
        return -numToNegate;
    }
    else if (isNaN(parsedNum)) {throw "number expected";}
    else {return parsedNum};
}

function evaluation(tokenArray) {
    if (tokenArray.length == 0) {throw "missing operand";}
    var value = read_operand(tokenArray);
    while (tokenArray.length != 0 && tokenArray[0] != ")") {
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
    $('#calculator').each(function() {
        setup_calc();
    });

    function setup_calc() {
    $('.number').click(function(event) {
        var buttonID = event.target.id;
        var previous = $('#screen').html();
        if (buttonID == "dec") {$('#screen').html(previous+".");}
        else {$('#screen').html(previous+buttonID[1]);}
    });
    $('.operator').click(function(event) {
        console.log("pressed");
        var buttonID = event.target.id;
        var previous = $('#screen').html();
        if (buttonID == "divide") {$('#screen').html(previous+"/");}
        else if (buttonID == "multiply") {$('#screen').html(previous+"*");}
        else if (buttonID == "subtract") {$('#screen').html(previous+"-");}
        else if (buttonID == "add") {$('#screen').html(previous+"+");}
   });
    $('.cancel').click(function(event) {
        $('#screen').html("");
   });
    $('#equal').click(function(event) {
        var previous = $('#screen').html();
        $('#screen').html(calculate(previous));
   });
}
});