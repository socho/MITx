function calculate (text) {
	// pattern to match numbers with decimal pt, operators, and paren
	var pattern = /\+|\-|\*|\/|\(|\)|([0-9]*\.)?[0-9]/g;
	var tokens = text.match(pattern);
	// returns an array of tokens in JSON string
	return JSON.stringify(tokens);
}

function setup_calc(div) {
	var input = $('<input type="text" size="50">');
	var button = $('<button>Calculate</button>');
	var output = $('<div></div>');

	//event handler for button
	button.bind("click",function() {
		output.html(String(calculate(input.val()))
	});

	$(div).append(input,button,output);
}

$(document).ready(function() {
	$('.calculator').each(function () {
		setup_calc(this);
	});
});