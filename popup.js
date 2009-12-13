var BBSVC = chrome.extension.getBackgroundPage();


function build(isbn) {
  var doc = document;
  var html = DomBuilder.apply(window);

  var ul = doc.getElementById('dealList');


  function addSite(site, odd) {
    var li = html.LI({'class': 'site ', 'busy': !!site.check});
    li.appendChild(
      html.A({'title': site.title, 'href': site.url(isbn), 'target': '_blank', 'onclick': 'window.close()'}, site.title));
    var price = html.SPAN({'class':'price'});
    li.appendChild(price);

    if (site.check) {
      site.check(isbn,
        function(i) {
          li.removeAttribute('busy');
          price.appendChild(doc.createTextNode(i));
        },
        function(i) {
          li.removeAttribute('busy');
          price.appendChild(doc.createTextNode(i));
        });
    }

    ul.appendChild(li);
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


//     var isbn = find_isbn(window);
//     alert(isbn);
// //    if (isbn) build(isbn);
//   });

chrome.tabs.getSelected(null,
  function show(tab) {
    var isbn = find_isbn(tab);
    build(isbn);
  });
