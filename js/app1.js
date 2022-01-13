let difficulty = 2
let num = []
let score = 0

document.addEventListener('DOMContentLoaded' , ()=>{
    const gridDisplay = document.querySelector('.grid')
    const text = document.querySelector('h3')
    const width = 6

    let started = false
    let ended = true
    let template = [
        {name: 'Bishop'},{name: 'Bishop'},{name: 'Bishop'},{name: 'Bishop'},{name: 'Bishop'},{name: 'Bishop'},{name: 'King'},{name: 'King'},{name: 'King'},{name: 'King'},{name: 'King'},{name: 'King'},{name: 'Knight'},{name: 'Knight'},{name: 'Knight'},{name: 'Knight'},{name: 'Knight'},{name: 'Knight'},{name: 'Pawn'},{name: 'Pawn'},{name: 'Pawn'},{name: 'Pawn'},{name: 'Pawn'},{name: 'Pawn'},{name: 'Queen'},{name: 'Queen'},{name: 'Queen'},{name: 'Queen'},{name: 'Queen'},{name: 'Queen'},{name: 'rook'},{name: 'rook'},{name: 'rook'},{name: 'rook'},{name: 'rook'},{name: 'rook'}
    ];
    let templateCount = 0;
    let cubes = [] 

        // start the 'game'
        function start(){
            if(started === false && ended === true){
                template.sort(() => 0.5 - Math.random());
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
                temp.innerHTML = "Score:" + score;
                //document.querySelectorAll('.grid-even').forEach(e => e.remove())
                //document.querySelectorAll('.grid-odd').forEach(e => e.remove())
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
                    if (i == 0 || i == 2 || i == 4) {
                        cube.classList.add('grid-even');
                    } 
                    if(i == 1 || i == 3 || i == 5) {
                        cube.classList.add('grid-odd');
                    }
                    cube.classList.add('grid-2');
                    getPieceClass(cube)
                    gridDisplay.appendChild(cube)
                    cubes[i][o] = cube
                }
            }

            console.log(cubes)

        }

        function getPieceClass(cube){
            var pieceClass = template[templateCount].name
            cube.classList.add(pieceClass); 
            templateCount++;       
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
    
    if (e.target.classList.contains('grid-even') || e.target.classList.contains('grid-odd')) {
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
        if(score == 18){
            alert('well done!');
        }
    }

    function resetCheckOPtion(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.add('active')
            num[i].classList.remove('wrong')
        }
        num = []
    }

    function resetCheckOPtionTwo(){
        for(let i = 0; i<num.length;i++){
            num[i].classList.remove('rotating')
            num[i].classList.remove('grid-odd')
            num[i].classList.remove('grid-even')
            num[i].classList.remove('correct')
            num[i].classList.add('checked')
            num[i].classList.remove('Bishop');
            num[i].classList.remove('rook');
            num[i].classList.remove('King');
            num[i].classList.remove('Knight');
            num[i].classList.remove('Pawn');
            num[i].classList.remove('Queen');
        }
        score++
        
        let temp = document.getElementById('score')
        temp.innerHTML = "<strong>Score:</strong>" + score;
        num = []
    }

    function validate(main){
            if (main.classList.contains('Bishop')){
                return 'Bishop'
            }
            else if (main.classList.contains('rook')){
                return 'rook'
            }
            else if (main.classList.contains('King')){
                return 'King'
            }
            else if (main.classList.contains('Knight')){
                return 'Knight'
            }
            else if (main.classList.contains('Pawn')){
                return 'Pawn'
            }
            else if (main.classList.contains('Queen')){
                return 'Queen'
            }
    }
    
    function getPieceClassTwo(cube, string){
        let temp = Math.floor(Math.random()*(6-0) + 0)
    
        switch(temp){
            case 0:
                cube.classList.remove(string);
                cube.classList.add('Bishop');
                break
            case 1:
                cube.classList.remove(string);
                cube.classList.add('rook');
                break
            case 2:
                cube.classList.remove(string);
                cube.classList.add('King');
                break
            case 3:
                cube.classList.remove(string);
                cube.classList.add('Knight');
                break
            case 4:
                cube.classList.remove(string);
                cube.classList.add('Pawn');
                break
            case 5:
                cube.classList.remove(string);
                cube.classList.add('Queen');
                break
        }
    }
})