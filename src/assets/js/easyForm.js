'use strict';








let inputs = document.querySelectorAll('.easyForm__input');
inputs.forEach( (input) => {
    input.addEventListener('focus', function(){
        let outerWrap = input.closest('.input-outer-wrap');

        if ( outerWrap ) {
            outerWrap.removeAttribute('data-err');

            if ( outerWrap.querySelector('.err-msg') ){
                outerWrap.querySelector('.err-msg').innerHTML = '';
            }
            
        }

        
    })
} )




let btnsSend = document.querySelectorAll('.form-btn-send');

btnsSend.forEach( (btn) => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        let form = document.querySelector('.easyForm-modal');

        let errCount = 0;
        let inputs = form.querySelectorAll('.easyForm__input');

        function getOuterWrap(inp){
            return inp.closest('.input-outer-wrap');

        }


        let idMember = this.closest('.modal-form').getAttribute('data-for');



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
            
            if (idMember) {
                data_body += "&idMember =" + idMember;
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



            let feedSuccess = document.querySelector('.feed-success');
                feedSuccess.style.display = "flex";

                setTimeout(()=>{
                    let fog = document.querySelector('.modal-fog');
                    fog.click();

                    setTimeout(()=>{
                        feedSuccess.style.display = "none";
                    }, 500);
                }, 1000);


            return response.text()
            })
            .then(i => console.log(i))
            .catch(() => {
                
                

                

                console.log('ошибка');


            }); 
        }

    })
}) 






let btnSendsForm = document.querySelector('.send-s-form');


if (btnSendsForm) {
    btnSendsForm.onclick = function(e){
        e.preventDefault();
        
            e.preventDefault();
            let form = document.querySelector('.s-form__form');
    
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
    
    
    
                let modal = new easyModal('cv-success');
            
                
                    
                setTimeout ( ()=>{
                    let mf = document.querySelector('.modal-fog');
    
                    if (mf) {
                        mf.click();
                    }
                }, 1500 )
                
    
                return response.text()
                })
                .then(i => console.log(i))
                .catch(() => {
                    
                    
                    let modal = new easyModal('cv-success');
            
                
                    
                    
                    
    
                    console.log('ошибка');
    
    
                }); 
            }
    
        
    }
}












let cvLoad = document.querySelector('.cv-load-btn');
let inputFileCV = document.querySelector('.cv-file');

let sendCV = document.querySelector('.send-cv');
if  ( inputFileCV ) {
    inputFileCV.addEventListener('change', function(e){
        let loadFile = e.target.files[0];
    
    
        if (loadFile) {
            cvLoad.setAttribute('data-loaded', '1');
            cvLoad.querySelector('.cv-load-btn__text').innerHTML = loadFile.name;
            sendCV.removeAttribute('disabled');
        }
    })
}


if  ( cvLoad ){
    cvLoad.onclick = function(e){
        e.preventDefault();
        inputFileCV.click();
    }
}

if (sendCV){
    sendCV.onclick = function(e){
        e.preventDefault();
    
        let form = document.querySelector('.easyForm-cv');
    
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
                
    
                let formData = new FormData();
                
                
                formData.append("cv", inputFileCV.files[0]);
                formData.append('phone', document.querySelector('#phone').value);
                formData.append('name', document.querySelector('#name').value);
                formData.append('msg', document.querySelector('#cv-text').value);
                
    
    
            
                fetch(phpScript, { 
                    method: "POST",
                    body: formData,   
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
    
                document.querySelector('#cv-text').value = '';
                document.querySelector("#cv").value = null;
                this.setAttribute('disabled', 'disabled');
                document.querySelector(".cv-load-btn__text").innerHTML = "Загрузить CV";
                document.querySelector(".cv-load-btn").setAttribute('data-loaded', 0);
    
                let modal = new easyModal('cv-success');
            
                
                    
                setTimeout ( ()=>{
                    let mf = document.querySelector('.modal-fog');
    
                    if (mf) {
                        mf.click();
                    }
                }, 1500 )
                return response.text()
                })
                .then(i => console.log(i))
                .catch(() => {
                    
                    
                    
    
    
                    console.log('ошибка');
    
    
                }); 
            }
    }
}

