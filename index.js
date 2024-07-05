let randomNo=parseInt(Math.random()*100+1);
        const btn=document.querySelector('#submit');
        const input=document.querySelector('#guess');
        const guesses=document.querySelector('.guesses');
        const remains=document.querySelector('.remains');
        const feedback=document.querySelector('.loworhi');
        const result=document.querySelector('.result');
        const p=document.createElement('p');
        let prevGuess=[];
        let numGuesses=10;
        let playGame=true;

        if(playGame){
            btn.addEventListener('click',(e)=>{
                e.preventDefault();
                const guess=parseInt(input.value);
                validateGuess(guess);
            })
        }

        const validateGuess=(g)=>{
            if(g<1 || g>100){
                alert(`Please enter valid number.`)
            }else{
                prevGuess.push(g);
                disGuess(g);
                if(numGuesses === 0){
                    disMsg(`Game over! Random number was ${randomNo}`);
                    end(g);
                }else{
                    checkGuess(g);
                }
            }
        }

        const checkGuess=(g)=>{
            if(g === randomNo){
                disMsg(`You guessed it right!`);
                end();
            }else if(g < randomNo){
                disMsg(`Too low`);
            }else if(g > randomNo){
                disMsg(`Too high`);
            }
        }

        const disGuess=(g)=>{
            input.value="";
            guesses.innerHTML+=`${g} `;
            numGuesses--;
            remains.innerHTML=numGuesses;
        }

        const disMsg=(msg)=>{
            feedback.innerHTML=`<h2>${msg}</h2>`
        }

        const restart=()=>{
            const newBtn=document.querySelector('#new');
            newBtn.addEventListener('click',(e)=>{
                randomNo=parseInt(Math.random()*100+1);
                prevGuess=[];
                numGuesses=10;
                guesses.innerHTML=''
                remains.innerHTML=numGuesses;
                input.removeAttribute('disabled','');
                result.removeChild(p);
                playGame=true;
            })
        }

        const end=()=>{
            input.value="";
            input.setAttribute('disabled','');
            p.classList.add('button')
            p.innerHTML=`<h2 id="new">New game</h2>`;
            result.appendChild(p);
            playGame=false;
            restart();
        }