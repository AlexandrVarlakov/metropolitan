let  accItems =  document.querySelectorAll('.easyAccordion__item');

let rolledAcc = document.querySelectorAll('.easyAccordion__item[data-state="rolled"]');
let deployedAcc = document.querySelectorAll('.easyAccordion__item[data-state="deploy"]');

rolledAcc.forEach( (item) => {

    item.querySelector('.easyAccordion__content').style.height = '0' + 'px';
} );

deployedAcc.forEach( (item) => {
    let innerHight = item.querySelector('.easyAccordion__content-inner').offsetHeight;
    item.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
    item.querySelector('.easyAccordion__content').style.height = '0' + 'px';
} );

document.querySelectorAll('.easyAccordion').forEach((item)=>{
    item.onclick = function(){
        this.classList.add('easyAccordion_ready')
    }
});

accItems.forEach( ( item )=> {
    item.onclick = function(){

        let acc = this.closest('.easyAccordion');
        let option = this.closest('.easyAccordion').getAttribute('data-option');
        
        if ( this.getAttribute('data-state') == 'rolled' ){
            

            if ( option == 'onlyone'){
                

                let deployed = acc.querySelector('.easyAccordion__item[data-state = "deploy"]');


                if ( deployed !== null){
                    let closedContent = deployed.querySelector('.easyAccordion__content');
                    
                    deployed.setAttribute('data-animated', 'true');

                    closedContent.addEventListener('animationend', ()=>{
                        deployed.querySelector('.easyAccordion__content').style.minHeight = '0px';
                        deployed.querySelector('.easyAccordion__content').style.height = '0px';
                        deployed.setAttribute('data-state', 'rolled');  
                        deployed.removeAttribute('data-animated');  
                        closedContent.classList.remove('hide-content');
                    }, {once:true});

                    deployed.querySelector('.easyAccordion__content').classList.add('hide-content');
                } else{
                    this.querySelector('.easyAccordion__content').style.height = '0px';
                }

                let innerHight = this.querySelector('.easyAccordion__content-inner').offsetHeight;
                this.querySelector('.easyAccordion__content').style.height = '0px';
                this.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
                this.setAttribute('data-state', 'deploy');
            } else{
                let innerHight = this.querySelector('.easyAccordion__content-inner').offsetHeight;
                this.querySelector('.easyAccordion__content').style.height = '0px';
                this.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
                this.setAttribute('data-state', 'deploy');
            }


        } else {
            if ( option == 'onlyone'){

            } else {
                let closedContent = this.querySelector('.easyAccordion__content');
                this.setAttribute('data-animated', 'true');
                closedContent.addEventListener('animationend', ()=>{
                    this.querySelector('.easyAccordion__content').style.minHeight = '0px';
                    this.querySelector('.easyAccordion__content').style.height = '0px';
                    this.setAttribute('data-state', 'rolled');  
                    closedContent.classList.remove('hide-content');
                    this.removeAttribute('data-animated');
                }, {once:true});

                this.querySelector('.easyAccordion__content').classList.add('hide-content');
            }    
        }
    }
} )
