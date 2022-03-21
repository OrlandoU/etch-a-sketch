function fillColor(e){
    if(e.buttons != 1) return
    //Set the background color of the div depending on the mode
    switch(currentMode){
        case 'normal':
            this.style.cssText = `background-color:${colorPalette.value};`
            break;
        case 'rainbow':
            this.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16)
            break;
        case 'eraser':
            this.style.backgroundColor = 'white'
    } 
}
function changeColor(){
    //keep track and change color on label when input is changed
    backPalette.style.backgroundColor = colorPalette.value
}
function changeMode(e){
    //keeping track of the mode and changing it if necessary
    currentMode = this.dataset.mode
    if (this.dataset.mode == 'normal'){
        normalButton.classList.add('selected')
        rainbowButton.classList.remove('selected')
        eraserButton.classList.remove('selected')
    }
    else if(this.dataset.mode == 'rainbow'){
        rainbowButton.classList.add('selected')
        normalButton.classList.remove('selected')
        eraserButton.classList.remove('selected')
    }
    else {
        eraserButton.classList.add('selected')
        normalButton.classList.remove('selected')
        rainbowButton.classList.remove('selected')
    }
}

function clear(e){
    //clearing the div container and populating it anew
    while (grid.hasChildNodes()) {  
        grid.removeChild(grid.firstChild);
      }
    if(e) setupGrid(gridSize.value)
}
function setupGrid(size){
    //creating the grid layout and populating it
    clear();
    changeColor();
    grid.style.cssText = `grid-template : repeat(${size},1fr) / repeat(${size},1fr)`
    sliderPara.textContent = `${size} ✗ ${size}`
    
    for(let i = 0;i<size*size;i++){
        let div = document.createElement('div')
        div.addEventListener('mouseover', fillColor)
        div.addEventListener('mousedown', fillColor)
        grid.appendChild(div)
    }
}


const defaultSize = 16;
let currentMode = 'normal';

const backPalette = document.querySelector('label')
const sliderPara = document.querySelector('.slider-container')
const colorPalette = document.querySelector('#colorPalette')
const gridSize = document.querySelector('.slider')
const grid = document.querySelector('.sketch')
const clearButton = document.querySelector('.clear')
const normalButton = document.querySelector('.normal')
const rainbowButton = document.querySelector('.rainbow')
const eraserButton = document.querySelector('.eraser')

eraserButton.addEventListener('click', changeMode)
rainbowButton.addEventListener('click', changeMode)
normalButton.addEventListener('click', changeMode)
colorPalette.addEventListener('change', changeColor)
clearButton.addEventListener('click', clear)
gridSize.addEventListener('change',()=>{setupGrid(gridSize.value)})



//Setup the basic when loading the page
window.onload = () =>{
    setupGrid(defaultSize)
}


