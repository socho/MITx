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
    + "    <div class='node-lookup'>"
    + "      <input class='selector' /><input class='nth' />"
    + "      <button>Lookup</button>"
    + "    </div>"
    + "    <div class='property-list'>"
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

    root.find('button').on('click', function(){
      //show html
      var selector = root.find('.selector').val();
      var nth = root.find('.nth').val();
      if (nth == "") {nth = 0;}
      var htmlString = $(selector).eq(parseInt(nth)).html();
      root.find('.text-editor').val(htmlString);

      //display property
      //height, width, position.top, position.left, .css("margin"), 
      //.css("padding"), .css("background-color"), .tagName, .children().length
    });

    root.find('.text-editor').on('keyup', function(){
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
