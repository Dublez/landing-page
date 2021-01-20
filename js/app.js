/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

var oldVisible = new Object();
let headers = document.querySelector('main section div h2');
for(let i = 0; i < headers.length; i++){
    oldVisible['h'+i] = false;
}

function onVisibilityEnabled(header, i, callbackIfTrue){    
    var visible = isElementInViewport(header);
    if(visible != oldVisible[i]){
        oldVisible[i] = visible;
    }
    if(visible === true && typeof callbackIfTrue == 'function'){
        callbackIfTrue();
    }

}

function deselectAllSections(sections){
    for (section of sections){
        section.classList.remove('your-active-class');
    }
}

function selectVisibleSection(section){
    section.classList.add('your-active-class');
}

function deselectAllNavbar(navbar){
    for (n of navbar){
        n.classList.remove('your-active-class');
    }
}

function selectVisibleNavbarElement(navElement){
    navElement.classList.add('your-active-class');
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const fragment = document.createDocumentFragment();
let sections = document.querySelectorAll('main section');
for(var s of sections){
    var link = document.createElement('a');
    link.textContent = s.dataset.nav;
    link.href = '#'+s.id;
    var menuElement = document.createElement('li');
    menuElement.className = 'menu__link';
    menuElement.id = 'Nav'+s.id;
    menuElement.appendChild(link);
    fragment.appendChild(menuElement);
}
document.querySelector('#navbar__list').appendChild(fragment);

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
var activeMenuHandler = function(){
    let headers = document.querySelectorAll('.landing__container h2');
    let sections = document.querySelectorAll('body main section');
    let navbar = document.querySelectorAll('.navbar__menu .menu__link');
    
    for(let i = 0; i < headers.length; i++){
        let h = headers[i];
        onVisibilityEnabled(h, 'h'+i,function(){
            deselectAllSections(sections);
            selectVisibleSection(sections[i]);
            deselectAllNavbar(navbar);
            selectVisibleNavbarElement(navbar[i]);
        });
    }
}

var enableHeaderMovement = function(){
    var header = document.querySelector('.page__header');
    var height = window.scrollY;
    if(height > 100){
        if(!header.classList.contains('fixedHeader')){
            header.classList.add('fixedHeader');
        }
        if(header.classList.contains('movingHeader')){
            header.classList.remove('movingHeader');
        }
    } else if(height <= 100){
        if(header.classList.contains('fixedHeader')){
            header.classList.remove('fixedHeader');
        }
        if(!header.classList.contains('movingHeader')){
            header.classList.add('movingHeader');
        }
    }

}

window.addEventListener('DOMContentLoaded', activeMenuHandler);
window.addEventListener('load', activeMenuHandler);
window.addEventListener('scroll', activeMenuHandler);
window.addEventListener('resize', activeMenuHandler);

window.addEventListener('DOMContentLoaded', enableHeaderMovement);
window.addEventListener('load', enableHeaderMovement);
window.addEventListener('scroll', enableHeaderMovement);
window.addEventListener('resize', enableHeaderMovement);

