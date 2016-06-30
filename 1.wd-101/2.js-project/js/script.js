var sketchpad = (function(j) {
  // Receiving jQuery
  var $ = j;

  // Local variables
  var $sketchpad;
  var squaresPerRow;

  function cacheDOM(){
    $sketchpad = $('.sketchpad');
  }

  function createGrid(){

    var canvasWidth = $sketchpad.width();

    var $rowTemp = $('<div />', {class: 'row'});
    $rowTemp.height(canvasWidth/squaresPerRow);

    var $cellTemp = $('<div />', {class: 'cell'});
    $cellTemp.width(100/squaresPerRow + '%');

    // Create rows
    for(var i = 0; i < squaresPerRow; i++){
      $sketchpad.append($rowTemp.clone());
    }

    // Create cells
    for(var i = 0; i < squaresPerRow; i++){
      $sketchpad.children('.row').append($cellTemp.clone());
    }

    bindCellEvents();
  }

  function bindCellEvents(){
    var exitHover = function(){ $(this).addClass('used'); }

    $('.sketchpad .cell').on('mouseout', exitHover);
  }


  function resetCanvas(){
    var spr = parseInt(prompt('Enter new grid size (minimum is 1)'));

    if (isNaN(spr) || spr <= 1) return

    if(spr !== squaresPerRow) {
      $sketchpad.empty()
      squaresPerRow = spr;
      createGrid();
    } else {
      $('.cell').removeClass('used');
    }
  }

  function bindButtonEvents() {
    $('button').on('click', resetCanvas);
  }

  // Initializer
  function initialize(spr){
    cacheDOM();
    bindButtonEvents();

    squaresPerRow = spr;
    createGrid();
  }

  // Public API for sketchpad
  return {
    init: initialize,
    gridSize: squaresPerRow,
    clearGrid: resetCanvas
  }

})(jQuery);

// On document ready
$(function(){
  sketchpad.init(50);
});
