var emis = emis || {};

/* References
    http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
    http://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/
    http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
    http://wildermuth.com/2012/1/20/Modern_Web_Development_-_Part_2
*/

// create a general purpose namespace method
// this will allow us to create namespace a bit easier
emis.CreateNamespace = function(namespace) {
    var nsparts = namespace.split(".");
    var parent = emis;

    // we want to be able to include or exclude the root namespace
    // So we strip it if it's in the namespace
    if (nsparts[0] === "emis") {
        nsparts = nsparts.slice(1);
    }

    // loop through the parts and create
    // a nested namespace if necessary
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        // check if the current parent already has
        // the namespace declared, if not create it
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // get a reference to the deepest element
        // in the hierarchy so far
        parent = parent[partname];
    }
    // the parent is now completely constructed
    // with empty namespaces and can be used.
    return parent;
};