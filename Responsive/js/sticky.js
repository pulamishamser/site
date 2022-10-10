// can play with the offset value to get the smooth results you are looking for.

var stickyEl = document.querySelector('.me_sticky')
var stickyPosition = stickyEl.getBoundingClientRect().top;
var offset = -20
window.addEventListener('scroll', function() {
    if (window.pageYOffset >= stickyPosition + offset) {
        stickyEl.style.position = 'fixed';
        stickyEl.style.top = '0px';
    } else {
        stickyEl.style.position = 'static';
        stickyEl.style.top = '';
    }
});