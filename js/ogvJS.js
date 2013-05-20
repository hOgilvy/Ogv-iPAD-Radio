(function(){

    'use strict';

    var toqueInicial = 0,
        firstClick = true,
        executouFechaStep1 = false,
        vaiParaStep2,
        ogvStage = document.getElementById('ogvStage'),
        
        /* STEP 1 */
        step1 = document.getElementById('step1'),
        radioOn = document.getElementById('radio-on'),
        radioOff = document.getElementById('radio-off'),
        radioTitle = document.getElementById('radio-title'),
        radioFade = document.getElementById('radio-fade'),

        radioTextOne = document.getElementsByClassName('radio-text-screen-1')[0],
        radioTextTwo = document.getElementsByClassName('radio-text-screen-2')[0],
        
        /* AUDIO / VIDEO */
        videoScreen = document.getElementById('videoScreen'),
        audio = document.getElementById("audio"),

        
        /* TEXT'S */
        textOneStepOne = document.getElementById('text1_1'),
        textTwoStepOne = document.getElementById('text2_1'),
        textThreeStepOne = document.getElementById('text3_1'),
        textFourStepOne = document.getElementById('text4_1'),

        /* STEP 2 */
        step2 = document.getElementById('step2'),
        claro = document.getElementById('claro'),

        textFinish1 = document.getElementById('textFinish-1'),
        textFinish2 = document.getElementById('textFinish-2'),
        textFinish3 = document.getElementById('textFinish-3'),

        txtInf1 = document.getElementById('txtInf-1'),
        txtInf2 = document.getElementById('txtInf-2'),
        txtInf3 = document.getElementById('txtInf-3'),
        txtInf4 = document.getElementById('txtInf-4'),
        txtInfFixo = document.getElementById('txtInf-fixo'),
        
        icon1 = document.getElementById('icon-1'),
        icon2 = document.getElementById('icon-2'),
        icon3 = document.getElementById('icon-3'),
        icon4 = document.getElementById('icon-4'),
        icon5 = document.getElementById('icon-5'),

        mql = window.matchMedia("(orientation: portrait)");

    // Dá o start na peça:

    if(navigator.userAgent.match(/9B206/i) != null){

            loop.style.display ='none';

            if (mql.matches) {
              ogvStage.style.background = 'url("imgs/portrait-ipad-1.jpg")';
              step1.style.display = 'none';
              step2.style.display = 'none';
            } else {
                openStep2Alternate();
            }
        
        }else{

            if(mql.matches) {
              ogvStage.style.background = 'url("imgs/portrait.jpg")';
              step1.style.display = 'none';
              step2.style.display = 'none';
            
            } else {
                openStep1();
            }
    }
    
    // Faz o necessário para abrir Step1:
    function openStep1(){

        startLoop();
        
        // Faz o rádio aparecer:
        addClass(radioOff, 'radio-init', 0.5);
        addClass(radioOn, 'radio-init', 0.5);
        addClass(radioTitle, 'radio-title-init', 0.5);
        addClass(radioFade, 'radio-fade',1.6);
    
        // Adiciona as funções de touch aos eventos:
        radioOff.addEventListener('touchstart', touchStart, false);
        
        // TOUCHSTART: Função disparada quando o usuário toca na tela:
        function touchStart(event){
            event.preventDefault();
             
             createVideo(); 

             // Makes sure that the classes are added just once:
            if (firstClick === true){

                radioOff.style.display = 'none';
                radioFade.style.display = 'none';
                // addClass(loop, 'fade-out', 1);
                
                    addClass(radioOn, 'radioOn-init', 0);
                    addClass(radioTitle, 'radio-title-out', 0);
                    addClass(radioTextOne, 'radio-text-screen-init', .5);

                setTimeout(function(){
                    addClass(textOneStepOne, 'text1-init', 0);
                    addClass(textTwoStepOne, 'text1-init', 0.2);
                }, 2000);
                
                    addClass(radioTextOne, 'radio-text-screen-out', 7.2);
                    addClass(radioTextTwo, 'radio-text-screen-init', 7.4);

                addClass(textOneStepOne, 'text1-out', 6.3);
                addClass(textTwoStepOne, 'text1-out', 6.4);
                
                setTimeout(function(){
                    radioTitle.style.display = 'none';
                }, 300);

                setTimeout(function(){
                    videoScreen.play();
                    addClass(textThreeStepOne, 'text1-init', 0);
                    addClass(textFourStepOne, 'text1-init', 0.2);
                }, 7000);

                firstClick = false;
            }
        
        setTimeout(function(){
                    closeStep1();
                }, 10000);
        }

    } // openStep1

    // Faz o necessário para fechar o Step1 e chama Step2:
    function closeStep1(){

        // Faz com que a função closeStep1 e as seguintes não executem mais de uma vez:
        if (executouFechaStep1 === false){

            try {
                radioOff.removeEventListener('touchmove', touchMove, false);
                radioOff.removeEventListener('touchend', touchEnd, false);
            } catch(e){}
            
            addClass(textThreeStepOne, 'text1-out', 1);
            addClass(textFourStepOne, 'text1-out', 1.1);
            addClass(radioTextTwo, 'radio-text-screen-out', .6);
            addClass(radioOn, 'radio-out', 1.3);

            // Chama o Step2:
            setTimeout(function(){

                setTimeout(function(){
                    addClass(videoScreen, 'fade-out', 1);
                }, 300);

                openStep2();
            }, 100);

            executouFechaStep1 = true;
            addClass(loop, 'fade-out', 1);
        }

    } // closeStep1


    // Faz o necessário para abrir Step2:
    function openStep2(){

        step2.style.display = 'block';
        removeVideo();
        // addClass(claro, 'textFinish-init', 1.8);
        
        // TEXTOS
        addClass(textFinish1, 'textFinish-init', 1.8);
        addClass(textFinish2, 'textFinish-init', 2.2);
        addClass(textFinish3, 'textFinish-init', 2.5);
        
        setTimeout(function(){
            addClass(icon1, 'icon1-init', 1); // Download
            addClass(icon2, 'icon2-init', 1); // Balão
            addClass(icon3, 'icon3-init', 1); // Claquete
            addClass(icon4, 'icon4-init', 1); // Câmera
            addClass(icon5, 'icon5-init', 1); // ps4
        }, 1800);

        addClass(txtInf1, 'textFinish-init', 3);
        addClass(txtInfFixo, 'textFinish-init', 3.5);

        txtInfFixo.addEventListener('touchstart', goURL, false);

        continueStep2();

    } // openStep2


    function openStep2Alternate(){

        step2.style.display = 'block';
        
        // TEXTOS
        addClass(textFinish1, 'textFinish-init', 1.8);
        addClass(textFinish2, 'textFinish-init', 2.2);
        addClass(textFinish3, 'textFinish-init', 2.5);
        
        setTimeout(function(){
            addClass(icon1, 'icon1-init', 1); // Download
            addClass(icon2, 'icon2-init', 1); // Balão
            addClass(icon3, 'icon3-init', 1); // Claquete
            addClass(icon4, 'icon4-init', 1); // Câmera
            addClass(icon5, 'icon5-init', 1); // ps4
        }, 1800);

        addClass(txtInf1, 'textFinish-init', 3);
        addClass(txtInfFixo, 'textFinish-init', 3.5);

        txtInfFixo.addEventListener('touchstart', goURL, false);

        continueStep2();

    } // openStep2

    // Faz o necessário para fechar o Step2 e chama o Step3:
    function continueStep2(){

        // Chama o Step3:
        setTimeout(function(){

            addClass(txtInf1, 'textFinish-out', 1);
            addClass(txtInf2, 'textFinish-init', 1.6);

            // icons carrousel 2
            addClass(icon1, 'icon1-2-init', 1);     
            addClass(icon2, 'icon2-2-init', 1);     
            addClass(icon3, 'icon3-2-init', 1);     
            addClass(icon4, 'icon4-2-init', 1);     
            addClass(icon5, 'icon5-2-init', 1);     

                setTimeout(function(){
                    addClass(txtInf2, 'textFinish-out', 1);
                    addClass(txtInf3, 'textFinish-init', 1.6);

                    // icons carrousel 3
                    addClass(icon1, 'icon1-3-init', 1);     
                    addClass(icon2, 'icon2-3-init', 1);     
                    addClass(icon3, 'icon3-3-init', 1);     
                    addClass(icon4, 'icon4-3-init', 1);     
                    addClass(icon5, 'icon5-3-init', 1);     

                        setTimeout(function(){
                        addClass(txtInf3, 'textFinish-out', 1);
                        addClass(txtInf4, 'textFinish-init', 1.6);

                        // icons carrousel 3
                        addClass(icon1, 'icon1-4-init', 1);     
                        addClass(icon2, 'icon2-4-init', 1);     
                        addClass(icon3, 'icon3-4-init', 1);     
                        addClass(icon4, 'icon4-4-init', 1);     
                        addClass(icon5, 'icon5-4-init', 1);     
                    }, 5000);

                }, 5000);

        }, 5000);

    } // continueStep2

    // ==================================
    // =========== function's ===========


    function createVideo(){
        videoScreen.style.display = 'none';

        videoScreen.style.position = 'absolute';

        videoScreen.style.width = '1024px';
        videoScreen.style.height = '768px';
        
        // videoScreen.addEventListener('ended', removeVideo, false);
        videoScreen.src = 'video/complete-movie.ipad.mp4';
        videoScreen.play();
        videoScreen.pause();

        audio.play();
        audio.pause();
    }
    
    // SANCHES
    function playVideo() { 
        audio.play();
        videoScreen.play();
        videoScreen.style.display = 'block';
    }

    function removeVideo () {
        videoScreen.removeEventListener('ended', removeVideo, false);
        ogvStage.removeChild(el);
    }

    var el = document.getElementById('loop'), // Tag IMG com ID 'loop' 
    path = 'imgs/loop/loop000', // Caminho das imagens + prefixo que não mudo (ex: loop0001.jpg,loop00010.jpg. O prefixo é loop000);
    indice = 0,
    limit =  25; //Numero de imagens do loop (ex: 20 imagens)
    var interval;
    //el.src = path + indice + '.jpg';
    // var debug = document.getElementById('debug');
    
    function startLoop()
    {
        // console.log('startLoop');

        interval = setInterval(function()
        {
            if(indice == limit) {
                
                clearInterval(interval);
                
                revertLoop();                      
                
                return;                        
            };
     
        // console.log('indice '+indice)
        el.src = path + indice + '.jpg';
        
        // debug.innerHTML = path + indice + '.jpg';
        
        indice++;
        
        }.bind(this),40);
    }

    function revertLoop(){
        
        interval = setInterval(function()
        {
            if(indice == 0) {
                
                clearInterval(interval);
                
                if(checkPowerRadio()){
                    startLoop();
                }else{
                    playVideo();

                        // // Init Text 1 e 2
                        // setTimeout(function(){
                        //  videoScreen.pause();
                        //  addClass(textOneStepOne, 'text1-init', 0);
                        //  addClass(textTwoStepOne, 'text1-init', 0.2);
                        // }, 3000);

                        // addClass(textOneStepOne, 'text1-out', 6.8);
                        // addClass(textTwoStepOne, 'text1-out', 6.9);
                        }
                
                return;                        
        };
     
        // console.log('indice '+indice)
        el.src = path + indice + '.jpg';
        
        indice--;
     
        }.bind(this),40);
    }

    function checkPowerRadio(){
        return firstClick
    }

    function goURL(){
        window.open('http://www.claro.com.br/promocao/promocao-pos?utm_source=Abril_IPAD&utm_medium=Bn_DHTML5&utm_content=HIT&utm_campaign=DiaDasMaes', '_self');
    }

    // Função que adiciona classes a elementos:
    function addClass(alvo, nomeClasse, delay){
        setTimeout (function(){
            alvo.className += ' ' + nomeClasse;
        }, delay * 1000);
    }

}());