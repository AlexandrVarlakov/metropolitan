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

        let headerHeight = document.querySelector('.header__top').offsetHeight;

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




var swiperReviews = new Swiper('.swiper-reviews', {
    
    
    speed: 1000,
    navigation: {
        prevEl: '.prev-review-slide',
        nextEl: '.next-review-slide'
      },
    breakpoints: {
        320: {
        slidesPerView: 1,
        spaceBetween: 0
        },
        680: {
            slidesPerView: 2,
            spaceBetween: 20
            },
        1025: {
            slidesPerView: 3,
            spaceBetween: 75
        },    
    }
    
});

let swiperSells =  new Swiper('.swiper-sells', {
    speed: 1000,
    navigation: {
        prevEl: '.prev-sells-slide',
        nextEl: '.next-sells-slide'
      },
    breakpoints: {
        1025: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    }

});

/*BEGIN: QUIZ*/

function removeActiveQuiz(){
    let actives = document.querySelectorAll('.quiz-w__screen.active');

    actives.forEach( (active)=>{
        active.classList.remove('active');
    })
}

function setActiveQuiz(className){
    let objects = document.querySelectorAll(className);

    objects.forEach( (obj) => {
        obj.classList.add('active');
    } );
}


function getCountQuizSlides(){
    let actives = document.querySelectorAll('.quiz-w__screen.active');

    return (actives.length + 3);
}


function getStepIndicatorWidth(){
    let w = 100 / (getCountQuizSlides() - 1);

    return w;
}


function setStepIndicatorWidth(className){

    document.querySelector(className).style.width = getStepIndicatorWidth() + '%';
    
}

// обработка выбора типа недвижимости
let quizTypeBtns = document.querySelectorAll('input[name = type]');

let slidesCount = getCountQuizSlides();

let slidesPos = 0;

let quizLine = document.querySelector('.quiz-sildes-line');

let quizTransform = 0;


if ( quizTypeBtns ) {
    quizTypeBtns.forEach( (input) => { 
        input.onchange = function(){
            
            
            removeActiveQuiz();


            switch ( this.value ) {
                case '0': 
                    setActiveQuiz('.quiz-w__flat');
                    slidesCount = getCountQuizSlides();
                    setStepIndicatorWidth('.quiz-progress__step');


                    break;
                case '1': 
                    setActiveQuiz('.quiz-w__house');
                    slidesCount = getCountQuizSlides();
                    setStepIndicatorWidth('.quiz-progress__step');
                    break;
                case '2': 
                    setActiveQuiz('.quiz-w__comm');
                    slidesCount = getCountQuizSlides();
                    setStepIndicatorWidth('.quiz-progress__step');
                    break;
            }

        }
    } )





    let nextQuizBtns = document.querySelectorAll('.next-quiz-slide');

    let prevQuizBtns = document.querySelectorAll('.prev-quiz-slide');

    nextQuizBtns.forEach( (btn) => {
        btn.onclick = function(){

            quizTransform++;

            if ( quizTransform >= slidesCount - 1){
                quizTransform = slidesCount - 1
            }
            
            document.querySelector('.quiz-progress__finished').style.width = ( quizTransform / (getCountQuizSlides()-1 ) )*100 + '%';



            quizLine.style.transform = 'translateX(' + ( quizTransform * -100  )+ '%)'
        }
    })


    prevQuizBtns.forEach( (btn) => {
        btn.onclick = function(){

            quizTransform--;

            if ( quizTransform < 0){
                quizTransform = 0
            }
            document.querySelector('.quiz-progress__finished').style.width = ( quizTransform / (getCountQuizSlides()-1 ) )*100 + '%';
            quizLine.style.transform = 'translateX(' + ( quizTransform * -100  )+ '%)'
        }
    })

    let sendQuizForm = document.querySelector('.send-quiz-form');


    if (sendQuizForm) {
        sendQuizForm.onclick = function(e){
            e.preventDefault();
            
                e.preventDefault();
                let form = document.querySelector('.s-quiz__form');
        
                let errCount = 0;
                let inputs = form.querySelectorAll('.easyForm__input');
        
                function getOuterWrap(inp){
                    return inp.closest('.input-outer-wrap');
        
                }
        
        
                inputs.forEach( (input) => {
                    let innerError = 0;
        
                    let outerWrap = getOuterWrap( input );
                    
                    let value = input.value;
        
                    /* Проверяем установлен ли параметр минимальная длина*/
                    let minLength = input.getAttribute('data-minLength');
        
        
                    if ( minLength != null && minLength != undefined ){
                        minLength = +minLength;
                    } else {
                        minLength = false;
                    }
                    
                    /*Конец: Проверяем установлен ли параметр минимальная длина*/
        
        
                    //Проверка на обязательность заполнения
                    if ( value.length < 1 && input.hasAttribute('required') ){
                        let errMsg = outerWrap.querySelector('.err-msg');
                        errMsg.innerHTML = 'Значение поля не может быть пустым';
        
                        innerError++;
                    } 
        
                    //Проверка на минимальную длину
                    if (  minLength &&  value.length < minLength && innerError == 0){
                        let errMsg = outerWrap.querySelector('.err-msg');
                        errMsg.innerHTML = 'Значение поля не может быть короче ' + minLength + ' символов';
                        innerError++;
                    } 
        
        
                    //Проверка на email
        
                    let fieldType = input.getAttribute('data-type');
        
                                
                    if (  innerError == 0 && fieldType == 'email' && (value.includes('.') === false  || value.includes('@') === false || value.length < 6) ){
                        let errMsg = outerWrap.querySelector('.err-msg');
                        errMsg.innerHTML = 'Некорректное значение поля';
                        innerError++;
                    }
                    
                    if (  innerError == 0 && fieldType == 'phone' && ( value.length < 19) ){
                        let errMsg = outerWrap.querySelector('.err-msg');
                        errMsg.innerHTML = 'Некорректное значение поля';
                        innerError++;
                    }
        
                    if ( innerError > 0){
                        outerWrap.setAttribute('data-err', '1');
                        errCount++;
                    }
        
                } );
        
        
        
                if ( errCount == 0){
                        
                    let data_body = '';
        
        
                    let phpScript = form.getAttribute('action');
                    
        
                    inputs.forEach ( (input, i) => {
                        if ( i < 1 ){
                            data_body += input.name + "=" + input.value;
                        } else {
                            data_body += "&" + input.name + "=" + input.value;
                        }
                        
                    })
                    
                    
                    let realtyType = document.querySelector('.easyRadio__hidden-radio[name="type"]:checked').value;

                    switch ( realtyType ){
                        case '0': 
                            data_body += "&answer_1"   + "=" + 'Тип недвижимости: Квартиры';

                            let answer_2 = document.querySelector('.easyRadio__hidden-radio[name="rooms"]:checked').value;
                            data_body += "&answer_2"   + "=" + 'Количество комнат: ' + answer_2;


                            let answer_3 = document.querySelector('.easyRadio__hidden-radio[name="flat-square"]:checked').value;
                            data_body += "&answer_3"   + "=" + 'Метраж квартиры: ' + answer_3;


                            let answer_4 = document.querySelector('.easyRadio__hidden-radio[name="flat-year"]:checked').value;
                            data_body += "&answer_4"   + "=" + 'Год постройки: ' + answer_4;

                            let answer_5 = document.querySelector('.easyRadio__hidden-radio[name="flat-has-repair"]:checked').value;
                            data_body += "&answer_5"   + "=" + 'Наличие ремонта: ' + answer_5;

                            
                            break;
                        case '1': 
                            data_body += "&answer_1"  + "=" + 'Тип недвижимости: Загородная';

                            let answer_22 = document.querySelector('.easyRadio__hidden-radio[name="house-type"]:checked').value;
                            data_body += "&answer_2"   + "=" + 'Вид недвижимости: ' + answer_22;


                            let answer_23 = document.querySelector('#house-location').value;
                            data_body += "&answer_3"   + "=" + 'Название населённого пункта: ' + answer_23;

                            let answer_24 = document.querySelector('.easyRadio__hidden-radio[name="house-g-s"]:checked').value;
                            data_body += "&answer_4"   + "=" + 'Площадь участка: ' + answer_24;

                            
                            //house-type
                            break;
                        case '2':
                            data_body += "&answer_1"  + "=" + 'Тип недвижимости: Коммерческая'; 


                            let answer_32 = document.querySelector('.easyRadio__hidden-radio[name="comm-target"]:checked').value;
                            data_body += "&answer_2"   + "=" + 'Ваша цель: ' + answer_32;


                            let answer_33 = document.querySelector('.easyRadio__hidden-radio[name="comm-type"]:checked').value;
                            data_body += "&answer_3"   + "=" + 'Тип помещения: ' + answer_33;


                            let answer_34 = document.querySelector('.easyRadio__hidden-radio[name="comm-square"]:checked').value;
                            data_body += "&answer_4"   + "=" + 'Площадь помещения: ' + answer_34;

                            
                            break;
                    }
                    

                            
                    
        
                    
        
                
                    fetch(phpScript, { 
                        method: "POST",
                        body: data_body,   
                        headers:{"content-type": "application/x-www-form-urlencoded"} 
                        })
                        
                    .then( (response) => {
                            if (response.status !== 200) {           
                                return Promise.reject();
                                
                            }   
                        
                
                
                    console.log("Почта отправлена");
                    inputs.forEach ( (input) => {
                        input.value = '';
                    });
        
        
                    document.querySelector('.quiz-progress').style.display = 'none';
                    quizLine.style.transform = 'translateX(' + ( (getCountQuizSlides() - 1) * -100  )+ '%)'
                    

                    setTimeout(() => {

                        document.querySelector('.quiz-close').click();


                        
                        setTimeout(() => {
                            slidesPos = 0;
                            quizTransform = 0;

                            document.querySelector('.quiz-progress').style.display = '';
                            document.querySelector('.quiz-progress__finished').style.width = '';
                            quizLine.style.transform = 'translateX(0)';
                        }, 500);    
                    }, 1500);
                    
                    
        
                    return response.text()
                    })
                    .then(i => console.log(i))
                    .catch(() => {
                        
                        
                        
                        
        
                        console.log('ошибка');
        
        
                    }); 
                }
        
            
        }
    }

}



let callQuizBtns = document.querySelectorAll('.call-quiz-btn');
if (callQuizBtns){
    callQuizBtns.forEach( (btn) => {
        btn.onclick = function(){
            let modal = new easyModal('quiz-w', {
                
                closeClasses: ['quiz-close'], 
                
                showFogAnimationName: 'fadeIn',
                closeFogAnimationName: 'fadeOut',
                showFogAnimationDuration: 500,
                closeFogAnimationDuration: 500,
            
                documentScrolled: true, 
                
                })
        } 
    
    })
    
}

document.addEventListener("DOMContentLoaded", function(){
    let specWrap = document.querySelector('.realty-info__member-wrap');


    if (specWrap) {


        let pageSection = document.querySelector('.realty-page-s');
        let realtyInfo = document.querySelector('.realty-info');


        if (document.documentElement.clientWidth <= 480){
            pageSection.append(specWrap);
        }


        window.addEventListener('resize', function() {
            if (document.documentElement.clientWidth <= 480){
                pageSection.append(specWrap);
            } else{
                realtyInfo.append(specWrap);
            }   
        }, true);
    }
});





/*END: QUIZ*/
