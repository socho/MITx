/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
  var root = null;

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor'></textarea>"
    + "  <div class='property-editor'>"
    + "    <button class='visual-selection'>Start Inspecting</button>"
    + "    <div class='node-lookup'>"
    + "      <input class='selector' /><input class='nth' />"
    + "      <button class='lookup'>Lookup</button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "      <canvas class='myCanvas'></canvas>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";


  /*
   * Construct the UI
   */
  exports.initialize = function() {
    root = $("<div class='inspector'></div>").appendTo($('body'));
    root.append(template);

    root.find('.handle').on('click', function(){
      if ($('.inspector').position().top == 0) {
        $('.inspector').animate({"top":"-300px"});
      }
      else {
        $('.inspector').animate({"top":"0px"});        
      }
    });

    root.find('.visual-selection').on('click', function(){
      $("#wrapper *").mouseenter(function(event){
        $(this).attr('original-border',$(this).css("border"));
        $(this).css({"border-color": "red", "border-width": "3px", 
          "border-style": "solid"});
      });
      $("#wrapper *").mouseleave(function(){
        $(this).css("border",$(this).attr('original-border'));
      });
      $("#wrapper *").on("click", function(event){
        event.preventDefault();
        var htmlString = $(event.target).html();
        root.find('.text-editor').val(htmlString);
        $(this).css("border",$(this).attr('original-border'));
        $("#wrapper *").off("mouseenter");
        $("#wrapper *").off("mouseleave");

      });
    });

    root.find('.lookup').on('click', function(){
      //show html
      var selector = root.find('.selector').val();
      var nth = root.find('.nth').val();
      if (nth == "") {nth = 0;}
      var selectorFound = $(selector).eq(parseInt(nth));
      var htmlString = selectorFound.html();
      root.find('.text-editor').val(htmlString);

      //display property
      var w = selectorFound.width();
      var h = selectorFound.height();
      if (w>h) {var width = 120; var height = h*120/w;}
      else {var height = 120; var width = w*120/h;}

      var propertyList = root.find('.property-list');
      var canvas = root.find('.myCanvas');
      canvas.width(338); canvas.height(200);
      //scale it correctly
      canvas[0].width = canvas.width();
      canvas[0].height = canvas.height();

      var ctx = canvas[0].getContext('2d');
      ctx.clearRect(0,0,canvas.width(),canvas.height());

      ctx.beginPath();
      ctx.rect(75-width/2,75-height/2,width,height)
      ctx.fillStyle = "#FFB000";
      ctx.fill();
      ctx.fillStyle = "#4013AF";
      ctx.font = "12px Georgia";
      ctx.textAlign = "center";
      ctx.textBaseline = "Hanging";
      ctx.fillText("width: "+w,75,75+height/2);
      ctx.textAlign = "right";
      ctx.fillText("height: "+h,75+width/2,75);
      ctx.beginPath(); ctx.lineWidth = "5"; 
      ctx.rect(74-width/2,74-height/2,4,4); ctx.fill();
      ctx.textBaseline = "bottom"; ctx.textAlign = "start";
      ctx.fillText("x: "+selectorFound.position().left+", y: "+selectorFound.position().top,
        75-width/2,75-height/2);
      ctx.textBaseline = "top"; ctx.textAlign = "start";
      ctx.fillStyle = "#015666";      
      ctx.fillText("margin: "+selectorFound.css("margin"),153,3);
      ctx.fillText("padding: "+selectorFound.css("padding"),153,15);
      ctx.beginPath(); ctx.rect(153,27,10,10);
      ctx.fillStyle = selectorFound.css("background-color"); ctx.fill();
      ctx.fillStyle = "#015666";
      ctx.fillText("bg-color: "+selectorFound.css("background-color"),163,27);
      ctx.fillText("tag name: "+selectorFound.tagName,153,39);
      ctx.fillText("# of children: "+selectorFound.children().length,153,51);

    //.tagName, .children().length
    });

    root.find('.text-editor').on('keyup', function(){
      //make html editor live!
      var selector = root.find('.selector').val();
      var nth = root.find('.nth').val();
      $(selector).eq(parseInt(nth)).html($(this).val());
    });
  };


  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
