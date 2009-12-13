/*
 * Copyright 2005-2009 Jesse Andrews
 *
 * This file may be used under the terms of of the
 * GNU General Public License Version 3 or later (the "GPL"),
 * http://www.gnu.org/licenses/gpl.html
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 */


function updateSearch(node) {
  var words = document.getElementById('library-search').value.toLowerCase().split(" ");
  var nodes = document.getElementById('libraries-list').childNodes;
  for (var i=0; i<nodes.length; i++) {
    var libtext = nodes[i].getAttribute('name').toLowerCase();

    var hide = false;
    for (var j=0; j<words.length; j++) {
      hide = hide || !libtext.match(words[j]);
    }
    if (hide) {
      nodes[i].style.display = 'none';
    }
    else {
      nodes[i].style.display = '';
    }
  }
}

var bbConfig = {
  onLoad: function() {
    try {
      var wc_loc = localStorage["worldcat"];
      document.getElementById('worldcat-location').value = wc_loc;
    } catch (e) {}

    try {
      var disable_affiliate = localStorage['disable_affiliate'];
      document.getElementById('disable-affiliate').checked = disable_affiliate;
    } catch (e) {}

    // localStorage['setup'] = true;

    this.updateDetails( 'book_stores', BBSVC.stores() );
    this.updateDetails( 'libraries', BBSVC.libraries() );
  },
  loadLibs: function() {
    this.updateDetails( 'libraries', BBSVC.libraries() );
    this.loadLibs = function() {};
    document.getElementById('library-meter').hidden = true;
  },
  saveWorldCat: function() {
    this.prefs.setCharPref('worldcat', document.getElementById('worldcat-location').value );
  },
  saveAffiliate: function() {
    this.prefs.setBoolPref('disable_affiliate', document.getElementById('disable-affiliate').checked );
  },
  doChecked: function(checkbox) {
    localStorage[checkbox.id] = checkbox.checked;
  },
  updateDetails: function(sectionName, sources) {
    var sectionList = document.getElementById( sectionName + '-list' );
    if (sources.selectedCount != 0) {
      for (var i=0; i<sources.length; i++) {
        var source = sources[i];
        var li = document.createElement('li');
        li.setAttribute( 'name', source.title);
        var label = document.createElement('label');
        li.appendChild(label);
        var checkbox = document.createElement('input');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(source.title));
        checkbox.setAttribute( 'id', sectionName + '.' + source.name);
        checkbox.setAttribute( 'onchange', 'bbConfig.doChecked(this)' );
        checkbox.setAttribute( 'type', 'checkbox');
        if (source.active()) {
          checkbox.setAttribute( 'checked', source.active());
        }
        sectionList.appendChild( li );
      }
    }
  }
};

window.onload = function() { bbConfig.onLoad(); };
