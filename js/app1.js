let difficulty = 2
let num = []
let score = 0

document.addEventListener('DOMContentLoaded' , ()=>{
    const gridDisplay = document.querySelector('.grid')
    const text = document.querySelector('h3')
    const width = 6

    let started = false
    let ended = true
    let cubes = [] 

        // start the 'game'
        function start(){
            if(started === false && ended === true){
                createBoard()
                setTimeout(active, 2000);
                started = true
                ended = false
                text.innerText = "Press ESC to exit(Press H for hints)"
            }
            else{
                return
            }
        }

        // end the 'game'
        function ending(){
            
            if(ended === false && started === true ){
                cubes = []
                num = []
                score = 0
                let temp = document.getElementById('score')
                temp.innerHTML = "<strong>Score:</strong>" + score;
                document.querySelectorAll('.grid-2').forEach(e => e.remove())
                ended = true
                started = false
                text.innerText = "Press Enter to start"
            }
            else{
                return
            }


        }

        // create a playing board and fill it

        function createBoard() {

            for(let i=0; i < width; i++){
                cubes[i] = new Array(width) 
            }

            for(let i=0; i < width; i++){
                for(let o=0; o < width; o++){
                    cube = document.createElement('div');
                    cube.classList.add('grid-2');
                    gridDisplay.appendChild(cube)
                    getPieceClass(cube)
                    cubes[i][o] = cube
                }
            }

        }

        function getPieceClass(cube){
            let temp = Math.floor(Math.random()*(6-0) + 0)
        
            switch(temp){
                case 0:
                    cube.classList.add('bishop');
                    break
                case 1:
                    cube.classList.add('board');
                    break
                case 2:
                    cube.classList.add('king');
                    break
                case 3:
                    cube.classList.add('knight');
                    break
                case 4:
                    cube.classList.add('pawn');
                    break
                case 5:
                    cube.classList.add('queen');
                    break
            }
        }

        //active cubes 
        function active(){
            for(let i=0; i < width; i++){
                for(let o=0; o < width; o++){
                    cubes[i][o].classList.add('active');
                }
            }
        }

        function hint(){
            for(let i=0; i < width; i++){
                for(let o=0; o < width; o++){
                    cubes[i][o].classList.remove('active');
                }
            }
            setTimeout(active, 500)
        }

        document.addEventListener('keyup', control)
        function control(e) {
            if(e.keyCode === 72){
                hint()
            }
            else if(e.keyCode === 13){
                start()
            }
            else if(e.keyCode === 27){
                ending()
            }
        }
})

document.addEventListener("click" , e=>{
    
    if (e.target.classList.contains('grid-2')) {
        if(e.target.classList.contains('active')){
            if (num.length < difficulty) {
                e.target.classList.add('rotating')
                e.target.classList.remove('active')
                e.target.classList.remove('correct')
                e.target.classList.remove('wrong')
                num.push(e.target)
                checkOptions()
            }
        }
        else if (e.target.classList.contains('rotating')){
            e.target.classList.add('active')
            e.target.classList.remove('rotating')
            e.target.classList.remove('correct')
            e.target.classList.remove('wrong')
            num.pop(e.target)
        }
    }
    

    function checkOptions(){
        if (num.length === difficulty ) {
            let main = num[0]
            let string = validate(main)
            let count = 1
            for(let i = 1 ; i<num.length;i++){
                if (num[i].classList.contains(string)) {
                    count ++
                }
            }

            if (count === difficulty ) {
                for(let i = 0; i<num.length;i++){
                    num[i].classList.add('correct')
                }
                setTimeout(resetCheckOPtionTwo, 1000)
            }
            else{
                for(let i = 0; i<num.length;i++){
                    num[i].classList.add('wrong')
                }
                setTimeout(resetCheckOPtion, 1000)
            }
            
            
        }
    }

    function resetCheckOPtion(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.add('active')
            num[i].classList.remove('wrong')
        }
        score--
        let temp = document.getElementById('score')
        temp.innerHTML = "<strong>Score:</strong>" + score;
        num = []
    }

    function resetCheckOPtionTwo(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.add('active')
            num[i].classList.remove('correct')
            let temp = validate(num[i])
            getPieceClassTwo(num[i], temp)
        }
        score++
        let temp = document.getElementById('score')
        temp.innerHTML = "<strong>Score:</strong>" + score;
        num = []
    }

    function validate(main){
            if (main.classList.contains('bishop')){
                return 'bishop'
            }
            else if (main.classList.contains('board')){
                return 'board'
            }
            else if (main.classList.contains('king')){
                return 'king'
            }
            else if (main.classList.contains('knight')){
                return 'knight'
            }
            else if (main.classList.contains('pawn')){
                return 'pawn'
            }
            else if (main.classList.contains('queen')){
                return 'queen'
            }
    }
    
    function getPieceClassTwo(cube, string){
        let temp = Math.floor(Math.random()*(6-0) + 0)
    
        switch(temp){
            case 0:
                cube.classList.remove(string);
                cube.classList.add('bishop');
                break
            case 1:
                cube.classList.remove(string);
                cube.classList.add('board');
                break
            case 2:
                cube.classList.remove(string);
                cube.classList.add('king');
                break
            case 3:
                cube.classList.remove(string);
                cube.classList.add('knight');
                break
            case 4:
                cube.classList.remove(string);
                cube.classList.add('pawn');
                break
            case 5:
                cube.classList.remove(string);
                cube.classList.add('queen');
                break
        }
    }
})