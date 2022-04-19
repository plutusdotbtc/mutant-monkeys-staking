function handleScroll2(top, left, documentElement) {
    var topEx = 0
    var leftEx = 0

    if (top !== "" && top !== false) {
        var doc = document.getElementById(documentElement);
        if (doc == null)    {
            var topEx = window.pageYOffset;
        } else {
            var topEx = doc.scrollTop  - doc.clientTop;
        }
    }

    if (left !== "" && left !== false) {
        var doc = document.getElementById(documentElement);
        if (doc == null)    {
            var topEx = window.pageXOffset;
        } else {
            var topEx = doc.scrollLeft  - doc.clientLeft;
        }
    }

    return [topEx, leftEx]
}