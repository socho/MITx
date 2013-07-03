function test_clear() {
	var canvas = $("#myCanvas");
	//canvas.getContext() doesn't work, because it's in jQuery.
	//to get the actual html, do [0]
	var ctx = canvas[0].getContext('2d');

	ctx.clearRect(0,0,canvas.width(),canvas.height());
}

function test_line() {
	var canvas = $("#myCanvas");
	var ctx = canvas[0].getContext('2d');

	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(150,50);
	ctx.lineTo(150,150);
	ctx.lineTo(50,150);
	//ctx.lineTo(50,50);
	ctx.lineWidth = 10;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.fillStyle = "blue";
	ctx.fill();
}

function test_star() {
	var canvas = $("#myCanvas");
	var ctx = canvas[0].getContext('2d');

	var cx = 100;
	var cy = 100;
	var longR = 80;
	var shortR = 35;
	var astep = 2*Math.PI/10;

	function p2r(r,a) { //r: distance, a: angle from positive x axis
		var px = cx+r*Math.cos(a);
		var py = cy-r*Math.sin(a);
		return {x:px, y:py};
	}

	ctx.beginPath();
	ctx.moveTo(p2r(longR,Math.PI/2).x,p2r(longR,Math.PI/2).y)
	for (var i = 0; i<10; i++) {
		pt = p2r((i%2)==1 ? longR : shortR, Math.PI/2+(i+1)*astep)
		ctx.lineTo(pt.x,pt.y);

	}
	ctx.strokeStyle="yellow";
	ctx.lineWidth=5;
	ctx.stroke();
	ctx.fillStyle="orange";
	ctx.fill();
}

function test_rect() {
	var canvas = $("#myCanvas");
	var ctx = canvas[0].getContext('2d');

	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.fillRect(20,20,150,100);
	ctx.fillStyle = "blue";
	ctx.fillRect(50,50,100,100);
}

function test_smi() {
	var canvas = $("#myCanvas");
	var ctx = canvas[0].getContext('2d');
	
	//yellow face
	ctx.beginPath();
	ctx.arc(100,100,75,0,2*Math.PI);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black"
	ctx.stroke();
	ctx.fillStyle = "yellow";
	ctx.fill();

	//eyes
	ctx.beginPath();
	ctx.arc(70,80,10,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(130,80,10,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    //smile
    ctx.beginPath();
    ctx.arc(100,100,40,Math.PI/8,7*Math.PI/8);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function test_text() {
	var canvas = $("#myCanvas");
	var ctx = canvas[0].getContext('2d');

	ctx.fillStyle = "black";
	ctx.font = "20px Georgia";
	ctx.textAlign = "center";
	ctx.textBaseline = "Hanging";
	ctx.fillText("Hellooo",100,100);

}

// function test_mouse() {
// 	var canvas = $("#myCanvas");
// 	var ctx = canvas[0].getContext('2d');
	
// }
var coords = [];
for (var i = 0; i < 3; i += 1) {
    coords.push([Math.random()*200,Math.random()*200]);
}
function complicated_figure(ctx,w,h) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,w,h);
    for (var i = 0; i < coords.length; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.arc(coords[i][0],coords[i][1],5,0,2*Math.PI);
        ctx.stroke();
    }
}

function test_mouse() {
    var canvas = $('#myCanvas');
    var offset = canvas.offset();
    var ctx = canvas[0].getContext('2d');
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    
    var bg_image = $("<canvas></canvas>")[0];
    bg_image.width = 200;
    bg_image.height = 200;
    var bctx = bg_image.getContext('2d');
    complicated_figure(bctx,200,200);

    ctx.drawImage(bg_image,0,0);
    
    canvas.bind("mousemove",function(event) {
        var mx = Math.round(event.pageX - offset.left);
        var my = Math.round(event.pageY - offset.top);
        //ctx.clearRect(0,0,canvas.width(),canvas.height());
        //complicated_figure(ctx);
        ctx.drawImage(bg_image,0,0);
        ctx.beginPath();
        ctx.moveTo(mx-10,my); ctx.lineTo(mx+10,my);
        ctx.moveTo(mx,my-10); ctx.lineTo(mx,my+10);
        ctx.stroke();
        ctx.fillText(mx+","+my,mx+4,my-4);
    });
 
}