'use strict';
/**
 * Передаваемые опции:
 * zIndex - z-index контейнера модального окна; Значение по умолчанию из css-класса modal-fog
 * background - фон контейнера модального окна; Значение по умолчанию из css-класса modal-fog
 * displayFog - значение display у активного контейнера; Значение по умолчанию из css-класса modal-fog
 * displayModal -  значение display у активного модального окна; Значение по умолчанию block
 * showModalAnimationName - css-класс анимации добавляемый при открытии модального окна; По умолчанию не добавляется
 * closeModalAnimationName   -  css-класс анимации добавляемый при закрытиии модального окна; По умолчанию не добавляется
 * closeClasses[] - массив с классами, которые служат селекторами для закрытия окна; по умолчанию только modal-fog
 * closeModalOnFogClick - если передается false, то модальное окно не закрывается при клике; По умолчанию работает как true
 * 
 * showFogAnimationName - анимация появления контейнера Модального окна (modal-fog)
 * closeFogAnimationName - анимация скрытия контейнера Модального окна (modal-fog)
 * 
 * showFogAnimationDuration - продолжительность анимации появления контейнера (modal-fog) модального окна
 * closeFogAnimationDuration - продолжительность анимации скрытия контейнера (modal-fog) модального окна
 * 
 * showModalAnimationDuration - продолжительность анимации появления модального окна
 * closeModalAnimationDuration - продолжительность анимации скрытия модального окна
 * 
 * documentScrolled - если установлен в false,  отключается скролл документа; По умолчанию true.
 * onModalOpen - назначить функцию, которая сработает при открытии модального окна
 * onModalClose - назначить функцию, которая сработает при закрытии модального окна
 * beforeAppendModal - срабатывает до вставки модального окна в modal-fog 
 */

class easyModal extends EventTarget{
    constructor (_modalClassName, _options = {}){
        super();
        let self = this;
        this.modalSelector = _modalClassName;

        this.documentYPosition = window.pageYOffset;

        this.options = _options;
        this.modalFog =  this.createFog();
        this.modal = this.getModal(_modalClassName);


        this.modalFlag = this.createFlag();

        this.modal.before( this.modalFlag );
        
        //Проверяем есть ли закрывающие классы
        if  ( 'closeClasses' in this.options ) {
            this.closeClasses = this.options.closeClasses;  
        } else{
            this.closeClasses = [];
        }
        
        if ( 'closeModalOnFogClick' in this.options ){
            if ( this.options.closeModalOnFogClick !== false){
                this.closeClasses.unshift('modal-fog');
            }
        } else{
            this.closeClasses.unshift('modal-fog');
        }


        if ( 'showFogAnimationName' in this.options ){
            this.modalFog.classList.add(this.options.showFogAnimationName);
        } else {
            this.modalFog.classList.add('fadeIn');
        }


        
        if ( 'showFogAnimationDuration' in this.options ){
            this.modalFog.style.animationDuration = this.options.showFogAnimationDuration + 'ms';
        }
        
        //Проверяем стоит ли запрет на скролл колесиком
        if  ( this.options.documentScrolled == false ) {
            document.body.classList.add('hide-scroll');           
        }

        
        if ('beforeAppendModal' in this.options){
            this.options.beforeAppendModal();
        }


        this.modalFog.append(this.modal);



        document.body.append(this.modalFog);


        if ('onModalOpen' in this.options){
            this.options.onModalOpen();
        }

        

        this.modalFog.onclick = function(event){

            if (  self.searchCloseClasses( event.target ) ){

                self.closeModal();
              
            }

            
        }

    }

    //Создаем контейнер для модального окна
    createFog(){
        let modalFog = document.createElement('div');
        
        modalFog.classList.add('modal-fog');

        if ( 'background' in this.options ) {
            modalFog.style.background = this.options.background;
        } 

        if ( 'zIndex' in this.options ) {
            modalFog.style.zIndex = this.options.zIndex;
        } 


        if ( 'displayFog' in this.options ) {
            modalFog.style.display = this.options.displayFog;
        } else{
            modalFog.style.display = 'flex';
        }

        return modalFog;
    }

    //Находит модальное окно добавляет опции , возращает ссылку
    getModal(_modalClassName){
        let modal = document.querySelector('.'+_modalClassName);

        if ( 'displayModal' in this.options ) {
            modal.style.display = this.options.displayModal;
        } else {
            modal.style.display = 'block';
        }

        if ( 'showModalAnimationName' in this.options ) {
            modal.classList.add(this.options.showModalAnimationName);
        }


        if ( 'showModalAnimationDuration' in this.options ) {
            modal.style.animationDuration = this.options.showModalAnimationDuration + 'ms';
        }
        return modal;
    }

    //Создаем флаг для пометки места где стояло всплывающее модальное окно в документе
    createFlag(){
        return document.createElement('modalFlag');
    }
    //Закрывает модальное окно
    closeModal(){
        if ('closeModalAnimationName' in this.options ){

            
            this.modalFog.addEventListener('animationend', (e) => {

                

                if ( e.target.classList.contains('modal-fog') ){
                    this.closeOperations();
                } else if ( e.target.classList.contains( this.modalSelector ) ) {
                    
                    if ( 'closeFogAnimationDuration' in this.options ){
                        this.modalFog.style.animationDuration = this.options.closeFogAnimationDuration + 'ms';
                    }
                    if ( 'closeFogAnimationName' in this.options ){
                        this.modalFog.classList.add(this.options.closeFogAnimationName);
                    } else {
                        this.modalFog.classList.add('fadeOut');
                    }
                        
                }
                    
                
            });

            if ( 'closeModalAnimationDuration' in this.options ) {
                this.modal.style.animationDuration = this.options.showModalAnimationDuration + 'ms';
            }
            this.modal.classList.add(this.options.closeModalAnimationName);

            


            
            

        } else{
            if ( 'closeFogAnimationDuration' in this.options ){
                this.modalFog.style.animationDuration = this.options.closeFogAnimationDuration + 'ms';
            }
            if ( 'closeFogAnimationName' in this.options ){
                this.modalFog.classList.add(this.options.closeFogAnimationName);
            } else {
                this.modalFog.classList.add('fadeOut');
            }
            this.modalFog.addEventListener('animationend', (e) => {
                this.closeOperations();
            });



            
        }

        document.body.classList.remove('hide-scroll');

        if ('onModalClose' in this.options){
            this.options.onModalClose();
        }
        
        
        
        
    }
    /**
     * Ряд операций при закрытиии:
     * 1. Удаляем modal-fog
     * 2. Очищаем style модального окна
     * 3. Удаляем классы добавленные модальному окну
     * 4. Возращаем модальное окно на прежнее место
     * 5. удаляем флаг
    */ 
    closeOperations(){
        this.modalFog.remove();
        this.modal.removeAttribute('style');
        this.clearModalClasses(this.options);
        this.modalFlag.after(this.modal);
        this.modalFlag.remove();
    }
    //Провереят есть ли в цели клика класс из options.closeClasses
    searchCloseClasses(eTarget){
        for (let i = 0; i < this.closeClasses.length; i++){
            if ( eTarget.classList.contains(this.closeClasses[i])) return true;
        }

        return false;
    }
    //Очищает модальное окно от ранее добавленных классов
    clearModalClasses(){
        if ( 'showModalAnimationName' in this.options ) {
            this.modal.classList.remove(this.options.showModalAnimationName);
        }

        if ( 'closeModalAnimationName' in this.options ) {
            this.modal.classList.remove(this.options.closeModalAnimationName);
        }
    }

    
}
