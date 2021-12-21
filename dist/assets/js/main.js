maskPhone('#phone');

let hamburger = document.querySelector('.hamburger');
let mobnav  = document.querySelector('.mob-nav');

function closeMobMenu( hamburger, mobNav){
    hamburger.setAttribute('data-state', '0');
    mobNav.setAttribute('data-state', '0');
}


hamburger.addEventListener('click', function(){
    let hState = this.getAttribute('data-state');

    if ( hState === '0') {
        this.setAttribute('data-state', '1');

        let headerHeight = document.querySelector('.header').offsetHeight;

        let footerHeight = document.querySelector('.footer').offsetHeight;

        mobnav.style.top = headerHeight + 'px';

        mobnav.setAttribute('data-state', '1');
        
        mobnav.style.bottom = 0 + 'px';
        


       
    } else{
        
        closeMobMenu( this, mobnav);
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



 let options = {
    //zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    //displayFog: 'block', //Значение по умолчанию flex
    //displayModal: 'flex', //Значение по умолчанию block
    //showModalAnimationName: 'fadeInBottom', 
    //closeModalAnimationName: 'fadeOutTop', 
    closeClasses: ['close-modal'], 
    //closeModalOnFogClick: false, 
    showModalAnimationDuration: 800,
    //closeModalAnimationDuration: 300,
    showFogAnimationName: 'fadeIn',
    closeFogAnimationName: 'fadeOut',
    showFogAnimationDuration: 300,
    closeFogAnimationDuration: 300,

    documentScrolled: false, 
    //onModalClose: function(){console.log('modal close');},
    //onModalOpen: function(){console.log('modal open');}

}




let callFeedbackForm = document.querySelectorAll('.call-feedback-form');





callFeedbackForm.forEach( (btn) => {

    btn.addEventListener('click', function(){
        
        closeMobMenu( hamburger, mobnav);
        let modal = new easyModal('modal-form');

        

    });


    
});
