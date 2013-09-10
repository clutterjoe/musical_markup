var ObjectifyMarkup = function(markup) {
  // set up object attributes
  $jqObj = $(markup);
  this.return_obj = {
    tag: $jqObj[0].localName,
    tag_attributes: [],
    source: markup,
    inner_content: $jqObj.html(),
    children: []
  };

  // get attributes
  var attrMap = $jqObj[0].attributes;
  $.each(attrMap, function(i, e) {
console.log(this.return_obj.tag_attributes);
console.log(e);
    this.return_obj.tag_attributes[this.return_obj.tag_attributes.length] = e;
  });

console.log(this.tag_attributes);

  // get children
  for(child in $jqObj[0].children) {
    if (typeof($jqObj[0].children[child]) == 'object') {
      this.return_obj.children[this.return_obj.children.length] = new ObjectifyMarkup($jqObj[0].children[child]);
    }
  }
  return this.return_obj;

};


(function($) {

console.log('start app');

  var markup = $('#markup_content').val();
  var markup = '<div><div id="tmp_wrapper" class="classy super_classy"><h1>Above paragraph</h1><p>This is the content <span>within</span> a div</p></div><div>Other div</div></div>';

  var obj = new ObjectifyMarkup(markup);
console.log(obj);
})(jQuery);
