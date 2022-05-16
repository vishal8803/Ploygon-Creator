let canvas = new fabric.Canvas('canvas',{
    width: window.innerWidth,
    height: window.innerHeight
})

let addLineBtn = document.getElementById('enalbe-disable');
let addLineBtnClicked = false;


addLineBtn.addEventListener('click',startDrawLine);

function startDrawLine() {
    if(addLineBtnClicked==false){
        canvas.getObjects().forEach(o => {
            if(o.id==='added-line'){
                o.set({
                    selectable: false
                })
            }
        })
        addLineBtnClicked = true;
        canvas.on('mouse:down', startAddingLine);
        canvas.on('mouse:move', startIncreasingLine);
        canvas.on('mouse:up', stopDrawingLine);
        canvas.selection = false;
        canvas.hoverCursor = 'auto';
    }
    
}

let line;
let mouseDown = false;

let blue = false;
let green = false;
let red = true;
let pink = false;

document.getElementById('blue').addEventListener('click',function(){
    blue = true;
    green = false;
    red = false;
    pink = false;
})
document.getElementById('green').addEventListener('click',function(){
    blue = false;
    green = true;
    red = false;
    pink = false;
})
document.getElementById('red').addEventListener('click',function(){
    blue = false;
    green = false;
    red = true;
    pink = false;
})
document.getElementById('pink').addEventListener('click',function(){
    blue = false;
    green = false;
    red = false;
    pink = true;
})


function startAddingLine(o) {
    // console.log(o);
    let pointer = canvas.getPointer(o.e);
    mouseDown = true;
    
    let finalColor;
    if(blue){
        finalColor = 'blue';
    }else if(green){
        finalColor = 'green';
    }else if(red){
        finalColor = 'red';
    }else{
        finalColor = 'pink';
    }

    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
        id:'added-line',
        stroke: finalColor,
        strokeWidth: 3,
        selectable: false
    });

    canvas.add(line)
    canvas.requestRenderAll();

}

function startIncreasingLine(o) {
    if(mouseDown){
        let pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y 
        })
        canvas.requestRenderAll();
    }
}

function stopDrawingLine() {
    line.setCoords();
    mouseDown = false;
}

let deactivate = document.getElementById('deactivate');

deactivate.addEventListener('click', deactivateAddingShape);

function deactivateAddingShape() {
    canvas.off('mouse:down', startAddingLine);
    canvas.off('mouse:move', startIncreasingLine);
    canvas.off('mouse:up', stopDrawingLine);
    
    canvas.getObjects().forEach(o => {
        if(o.id==='added-line'){
            o.set({
                selectable: true
            })
        }
    })
    addLineBtnClicked = false;
    canvas.hoverCursor = 'all-scroll';
    canvas.selection = true;
}

let addlabel = document.getElementById('addlabel');

addlabel.addEventListener('click', createLabel);

function createLabel() {
    var editableText = new fabric.Textbox('Add Label Here',{
        id:'label',
        width:150,
        editable: true
    })
    canvas.add(editableText);
    canvas.centerObject(editableText);
    canvas.requestRenderAll();
}

let deleteBtn = document.getElementById('deleteActiveObject');

deleteBtn.addEventListener('click', deleteObject);

function deleteObject() {
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj)
      });
    canvas.requestRenderAll();
}

// change color
// let blue = document.getElementById('blue')
