'use strict';








let inputs = document.querySelectorAll('.easyForm__input');
inputs.forEach( (input) => {
    input.addEventListener('focus', function(){
        let outerWrap = input.closest('.input-outer-wrap');

        outerWrap.removeAttribute('data-err');

        outerWrap.querySelector('.err-msg').innerHTML = '';
    })
} )




let btnsSend = document.querySelectorAll('.form-btn-send');

btnsSend.forEach( (btn) => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        let form = document.querySelector('.easyForm');

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