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

// This helper function shows if an element is in viewport
function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// This helper function makes headers invisible
var oldVisible = new Object();
let headers = document.querySelector('main section div h2');
for(let i = 0; i < headers.length; i++){
    oldVisible['h'+i] = false;
}

// This helper function checks if an element became visible / invisible in the viewport and if yes it triggers callback 
function onVisibilityEnabled(header, i, callbackIfTrue){    
    var visible = isElementInViewport(header);
    if(visible != oldVisible[i]){
        oldVisible[i] = visible;
    }
    if(visible === true && typeof callbackIfTrue == 'function'){
        callbackIfTrue();
    }

}

// This helper function deselects all sections
function deselectAllSections(sections){
    for (section of sections){
        section.classList.remove('your-active-class');
    }
}

// This helper function selects visible section
function selectVisibleSection(section){
    section.classList.add('your-active-class');
}

// This helper function deselects all navigation menu items
function deselectAllNavbar(navbar){
    for (n of navbar){
        n.classList.remove('your-active-class');
    }
}

// This helper function selects visible navigation menu items
function selectVisibleNavbarElement(navElement){
    navElement.classList.add('your-active-class');
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// This piece of code creates the navigation menu
const fragment = document.createDocumentFragment();
let sections = document.querySelectorAll('main section');
for(let i = 0; i < sections.length; i++){
    let s = sections[i];
    var link = document.createElement('a');
    link.textContent = s.dataset.nav;
    link.addEventListener('click', function(event){
        event.preventDefault();
        s.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    var menuElement = document.createElement('li');
    menuElement.className = 'menu__link';
    menuElement.id = 'Nav'+s.id;
    menuElement.appendChild(link);
    fragment.appendChild(menuElement);
}
document.querySelector('#navbar__list').appendChild(fragment);

//This piece of code creatse scrollToTop link
let scrollToTopAnchorLink = document.querySelector('#scrollToTopImg');
scrollToTopAnchorLink.addEventListener('click', function(event){
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// This handler activates menu and section when it is visible in the viewport
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

// This function enables nice header movement
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

// This function enables scroll to top icon
var enableScrollToTop = function(){
    var scrollLink = document.querySelector('#scrollToTopImg');
    var height = window.scrollY;
    if(height > 300){
        if(scrollLink.classList.contains('hidden')){
            scrollLink.classList.remove('hidden');
        }
    } else if(height <= 300){
        if(!scrollLink.classList.contains('hidden')){
            scrollLink.classList.add('hidden');
        }
    }

}

// The following code assigns event listeners
window.addEventListener('DOMContentLoaded', activeMenuHandler);
window.addEventListener('load', activeMenuHandler);
window.addEventListener('scroll', activeMenuHandler);
window.addEventListener('resize', activeMenuHandler);

window.addEventListener('DOMContentLoaded', enableHeaderMovement);
window.addEventListener('load', enableHeaderMovement);
window.addEventListener('scroll', enableHeaderMovement);
window.addEventListener('resize', enableHeaderMovement);

window.addEventListener('DOMContentLoaded', enableScrollToTop);
window.addEventListener('load', enableScrollToTop);
window.addEventListener('scroll', enableScrollToTop);
window.addEventListener('resize', enableScrollToTop);

let secs = document.querySelectorAll('.landing__container');
for(sec of secs){
    let header = sec.firstElementChild;
    header.addEventListener('click', function(){
        header.nextElementSibling.classList.toggle('section-content-collapsed');
        header.firstElementChild.nextElementSibling.classList.toggle('arrow-image-collapsed');
    });
}

