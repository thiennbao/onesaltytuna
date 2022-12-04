// Whole page zoming
if (outerWidth > 992) {$('body').css('max-width',`${outerWidth}px`)}


// Navbar effect
$('nav').css('max-width',`${outerWidth}px`)
function nav() {
    if (scrollY >= 200 && outerWidth > 768) {
        $('nav').css({"position":"fixed","height":"70px","animation":"head-stick 0.75s forwards"});
        $('nav #logo img').css('animation','');
        $('nav a').css('line-height','70px');
    } else if (scrollY == 0 && outerWidth > 768) {
        $('nav').css({"position":"absolute","height":"80px","animation":""});  
        $('nav #logo img').css('animation','logo-zoom 1s forwards');
        $('nav a').css('line-height','80px');
    };
};
document.onscroll = function() {nav()}