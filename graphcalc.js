var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
   
    function graph(canvas,expression,x1,x2) {
        // … your code to plot the value of expression as x varies from x1 to x2 …
        
        //scale it correctly
        canvas[0].width = canvas.width();
        canvas[0].height = canvas.height();

        var ctx = canvas[0].getContext('2d');

        var bg_image = $("<canvas></canvas>")[0];
        bg_image.width = 400;
        bg_image.height = 350;
        var bctx = bg_image.getContext('2d');

        var newx1 = calculator.evaluate(calculator.parse(x1),{e: Math.E, pi: Math.PI, x: 0});
        var newx2 = calculator.evaluate(calculator.parse(x2),{e: Math.E, pi: Math.PI, x: 0});
        try {
            bctx.clearRect(0,0,canvas.width(),canvas.height());
            var tree = calculator.parse(expression);
            var value1 = calculator.evaluate(tree, {e: Math.E, pi: Math.PI, x: newx1});
            var value2 = calculator.evaluate(tree, {e: Math.E, pi: Math.PI, x: newx2});
            
            //calculates how many necessary data points within the range
            var interval = (newx2-newx1)/(canvas.width()-1);
            var xarray = new Array(); var yarray = new Array();
            for (var i = 0; i < canvas.width(); i++) {
                xarray[i] = newx1+i*interval;
                yarray[i] = calculator.evaluate(tree, {e: Math.E, pi: Math.PI, x: xarray[i]});
            }

            //scale it so that the height of canvas fits
            var ymax = Math.max.apply(Math,yarray);
            var ymin = Math.min.apply(Math,yarray);
            var yaxis = (ymax-ymin)*1.1;
            var realmax = ymax+(ymax-ymin)*0.05; //10% larger height than actual range of y-coord
            bctx.beginPath();
            bctx.moveTo(0,(realmax-yarray[0])*canvas.height()/yaxis);
            for (var i = 1; i < canvas.width(); i++) {
                bctx.lineTo(i,(realmax-yarray[i])*canvas.height()/yaxis);
            }
            bctx.strokeStyle = "red";
            bctx.stroke();
            
            ctx.drawImage(bg_image,0,0);

            var offset = canvas.offset();
            
            canvas.bind("mousemove", function(event) {
                var mx = Math.round(event.pageX - offset.left);
                var my = Math.round(event.pageY - offset.top);
                ctx.clearRect(0,0,canvas.width(),canvas.height());
                ctx.drawImage(bg_image,0,0);
                ctx.beginPath();
                ctx.moveTo(mx,0); ctx.lineTo(mx,canvas.height());
                ctx.strokeStyle = "gray";
                ctx.stroke();
                ctx.fillStyle = "blue";
                ctx.fillRect(mx-2,(realmax-yarray[mx])*canvas.height()/yaxis-2,4,4);
                ctx.fillText(parseFloat(xarray[mx]).toFixed(4)+","+parseFloat(yarray[mx]).toFixed(4),mx+2,(realmax-yarray[mx])*canvas.height()/yaxis+2);

            });

        } catch(err) {
            // ctx.beginPath();
            // ctx.moveTo(0,0);
            // ctx.lineTo(50,50);
            // ctx.stroke();
            ctx.fillStyle = "black";
            ctx.font = "13px Georgia";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(err,200,175);
        }

    }
   
    function setup(div) {
        // … your code to fill the div with the appropriate HTML components and
        //  to call graph() with the appropriate arguments in response to a click
        //  of the Plot button … 
        var canvas = $("<canvas></canvas>");
        var funcLab = $("<label>f(x):</label>");
        var funcInp = $("<input></input>",{type: 'text', size: 100, width: 360});
        var minXLab = $("<label>min x:</label>");
        var minXInp = $("<input></input>",{type: 'text', size: 50});
        var maxXLab = $("<label>max x:</label>");
        var maxXInp = $("<input></input>",{type: 'text', size: 50});
        var plotButton = $("<button>plot</button>");

        plotButton.bind("click", function() {
            graph(canvas, funcInp.val(), minXInp.val(), maxXInp.val())
        });

        $(div).append(canvas,funcLab,funcInp,"<br>",
            minXLab,minXInp,maxXLab,maxXInp,"<br>",plotButton);
    }
    exports.setup = setup;   
    return exports;
}());
// setup all the graphcalc divs in the document
$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});
