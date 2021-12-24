maskPhone('#phone');

maskNum('#min-price');
maskNum('#max-price');

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
    //showModalAnimationDuration: 800,
    //closeModalAnimationDuration: 300,
    showFogAnimationName: 'fadeIn',
    closeFogAnimationName: 'fadeOut',
    showFogAnimationDuration: 500,
    closeFogAnimationDuration: 500,

    documentScrolled: true, 
    onModalClose: function(){
        let modalForm = document.querySelector('.modal-form');

        if ( modalForm ){
            modalForm.removeAttribute('data-for');
        }
    },
    //onModalOpen: function(){console.log('modal open');}

}




let callFeedbackForm = document.querySelectorAll('.call-feedback-form');





callFeedbackForm.forEach( (btn) => {

    btn.addEventListener('click', function(){
        
        closeMobMenu( hamburger, mobnav);

        let member = this.closest('.team-member');
        let memberId;
        if ( member ) {
            memberId = member.id;
            
        }

        let modal = new easyModal('modal-form', options);

        if ( memberId ) {
            document.querySelector('.modal-form').setAttribute('data-for', memberId);
        }

    });


    
});


let  tabs = document.querySelectorAll('.realty-filter__tab');

let filterSheets = document.querySelectorAll('.realty-filter__sheet');

function removeActive(compList){
    compList.forEach( (comp) => {
        comp.classList.remove('active');  
    } )
}


tabs.forEach( (tab) => {
    tab.addEventListener('click', function(){
        removeActive(tabs);
        removeActive(filterSheets);

        this.classList.add('active');
        
        let numSheet = +(this.getAttribute('data-sheet'));
        filterSheets[numSheet].classList.add('active');
        
    })
})





var objGallery = new Swiper('.object-gallery', {
    speed: 1000,
    centeredSlides: true,
    
    autoHeight: false,
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // delay between transitions in ms
    
    
    
    
    
    
    

    effect: 'slide',
    // Distance between slides in px.
    
    //
    
    //
    
    //
    slidesOffsetBefore: 0,
    //
    grabCursor: true,

    breakpoints: {
       
        320: {
            loopedSlides: 3,
            slidesPerView: 1.2,
            spaceBetween: 8,
          },
        1024: {
            loopedSlides: 5,
            slidesPerView: 1.501,
            spaceBetween: 12,
        },
    }
    
});


var smallGallery = new Swiper('.small-obj-gallery', {
    speed: 1000,
    centeredSlides: true,
    spaceBetween: 12,
    autoHeight: false,
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // delay between transitions in ms
    
    slideToClickedSlide: true,
    navigation: {
        prevEl: '.prev-obj-slide',
        nextEl: '.next-obj-slide'
      },

    breakpoints: {
       
        320: {
            slidesPerView: 3,
            spaceBetween: 12
          },
        1024: {
            slidesPerView: 5,
            spaceBetween: 12
        },    
            
        
    }
});


objGallery.controller.control = smallGallery;
smallGallery.controller.control = objGallery;