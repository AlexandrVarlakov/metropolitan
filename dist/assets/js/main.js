
let hamburger = document.querySelector('.hamburger');
let mobnav  = document.querySelector('.mob-nav');


hamburger.addEventListener('click', function(){
    let hState = this.getAttribute('data-state');

    if ( hState === '0') {
        this.setAttribute('data-state', '1');

        let headerHeight = document.querySelector('.header').offsetHeight;

        let footerHeight = document.querySelector('.footer').offsetHeight;

        mobnav.style.top = headerHeight + 'px';

        mobnav.setAttribute('data-state', '1');
        
        mobnav.style.bottom = footerHeight + 'px';
        


       
    } else{
        this.setAttribute('data-state', '0');
        mobnav.setAttribute('data-state', '0');
    }
});


let mobMenuHasChild = document.querySelectorAll('.mob-has-child');

mobMenuHasChild.forEach( (item) => {
    item.addEventListener('click', function(){
        let sub = this.querySelector('.mob-menu__sub');

        let subState = this.getAttribute('data-state');
        
        if (subState === '0'){
            let subInnerHeight = this.querySelector('.mob-menu__sub--inner').offsetHeight;
            sub.style.height = (subInnerHeight + 16) + 'px';
            this.setAttribute('data-state', '1');
        } else {
            sub.style.height = '0px';
            this.setAttribute('data-state', '0');
        }

        

    })
 } );