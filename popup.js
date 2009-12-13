var BBSVC = chrome.extension.getBackgroundPage();

function build(isbn) {
  var doc = document;
  var html = DomBuilder.apply(window);

  var table = doc.getElementById('container');


  function addSite(site, odd) {
    var row = html.TR({'class': 'site '+ (odd ? 'odd' : ''), 'busy': !!site.check});
    row.appendChild(
      html.TH(
        html.A({'title': site.title, 'href': site.url(isbn), 'target': '_blank', 'onclick': 'window.close()'}, site.title)));

    var result = html.TD({'class': 'price'});
    row.appendChild(result);

    if (site.check) {
      site.check(isbn,
        function(i) {
          row.removeAttribute('busy');
          result.appendChild(doc.createTextNode(i));
        },
        function(i) {
          row.removeAttribute('busy');
          result.appendChild(doc.createTextNode(i));
        });
    }

    table.appendChild(row);
  }

  var odd = false;

  var stores = BBSVC.active_stores(true);
  for (var i=0; i<stores.length; i++) {
    odd = !odd;
    addSite(stores[i], odd);
  }
  var libraries = BBSVC.active_libraries();
  for (var i=0; i<libraries.length; i++) {
    odd = !odd;
    addSite(libraries[i], odd);
  }
};

build('1590598210');
