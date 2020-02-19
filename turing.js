"use strict";

let programInMemory=undefined;

function parseProgram(){
    let program=document.getElementById("program").innerHTML;
    let sentenceTerminator=";"
    let lines=program.trim().split(sentenceTerminator);
    for (pos in lines){
        console.log(pos+":->"+lines[pos].trim());
    }
}

function run(){
    parseProgram();
}
function showCurrentStateOfProgram(){
    let tableprogram=document.getElementById("tableprogram");
    let rows=programInMemory.getAsRowTables();
    tableprogram.innerHTML=rows;
    let tapeText=document.getElementById("tape");
    tapeText.value=programInMemory.getTapeAsText();
}
function step(){
    
    if (programInMemory==undefined){
        let tapeText=document.getElementById("tape").value;
        let tape=new Tape();
        tape.setTape(tapeText, 0);

        let program=document.getElementById("program").innerHTML;
        programInMemory=new Program(program, tape);

    }
    programInMemory.runOneSentence();
    showCurrentStateOfProgram();
}