"use strict";

const DEFAULT_TAPE_SIZE     =       100;
const DEFAULT_BEGIN_STATE   =       "S0";
const DEFAULT_END_STATE     =       "SE";
const EXCEPTION_PROGRAM_ENDED   =   "Program ended";

class Sentence{
    constructor (line){
        this.tokens=line.split(",");
        this.state          =   this.tokens[0].trim();
        this.ifNumber       =   this.tokens[1].trim();
        this.thenNumber     =   this.tokens[2].trim();
        this.movement       =   this.tokens[3].trim();
        this.nextState      =   this.tokens[4].trim();
    }
    getState(){
        return this.state;
    }
    getIfNumber(){
        return this.ifNumber;
    }
    getThenNumber(){
        return this.thenNumber;
    }
    getMovement(){
        return this.movement;
    }
    getNextState(){
        return this.nextState;
    }
    asRowTable(highlight){
        let str;
        if (highlight){
            str="<tr class='sentencetorun'>";
        } else {
            str="<tr>";
        }
        str+="<td>" + this.getState()+"</td>"
        str+="<td>" + this.getIfNumber()+"</td>"
        str+="<td>" + this.getThenNumber()+"</td>"
        str+="<td>" + this.getMovement()+"</td>"
        str+="<td>" + this.getNextState()+"</td>"
        str+="</tr>"
        return str;
    }

} //End of class sentence

class Tape{
    constructor(){
        this.buildTape(DEFAULT_TAPE_SIZE);
        this.length=DEFAULT_TAPE_SIZE;
    }
    getLength(){
        return this.length;
    }
    buildTape(maxElements){
        this.tape=new Array(maxElements);
        this.length=maxElements;
        for (let i=0; i<maxElements; i++){
            this.tape[i]="0"
        }
        this.currentPosInTape=0;
        this.setPosInTape(0);
    }
    setTape(aBinaryString, currentPos){
        this.tape=new Array(aBinaryString.length);
        for (let i=0; i<aBinaryString.length; i++){
            this.tape[i]=aBinaryString[i];
        }
        this.setPosInTape(currentPos);
        this.length=aBinaryString.length;
    }
    setPosInTape(number){
        this.currentPosInTape=number;
    }
    writeSymbol(symbol){
        let pos=this.getPosInTape();

        this.tape[pos]=symbol;
    }
    writeSymbolAt(symbol, pos){
        if ( (pos<0) || (pos>this.getLength() ) ) {
            throw "Unable to write at pos:"+pos;
        }
        this.tape[pos]=symbol;
    }
    getCurrentSymbol(){
        let pos=this.getPosInTape();
        return this.tape[pos];
    }
    getPosInTape(){
        return this.currentPosInTape;
    }
    moveLeft(){
        let pos=this.getPosInTape();
        if (pos-1<0){
            throw "Unable to move left, already at start of tape:";
        }
        this.setPosInTape(pos-1);
    }
    moveRight(){
        let pos=this.getPosInTape();
        if (pos+1>this.length){
            throw "Unable to move right, already at end of tape:";
        }
        this.setPosInTape(pos+1);
    }
    toString(){
        let str="";
        for (let i=0; i<this.getLength(); i++){
            str=str+this.tape[i];
        }
        return str;
    }
    
    
}
class Program{
    constructor(text, tape){
        this.program=new Array();
        let lines=text.split(";")
        for (let pos in lines){
            let lineExamined=lines[pos].trim();
            if (lineExamined!="") {
                let sentence=new Sentence(lineExamined);
                this.program.push(sentence);
            }
        }
        this.resetState();
        this.tape=tape;
    }
    getTape(){
        return this.tape;
    }
    getTapeAsText(){
        return this.tape.toString();
    }
    
    resetState(){
        this.currentState=DEFAULT_BEGIN_STATE;
    }
    getState(){
        return this.currentState;
    }
    setState(state){
        this.currentState=state;
    }
 
    findProgramSentencePositionForCurrentState(state){
        let symbolInTape=this.tape.getCurrentSymbol();
        for (let pos in this.program){
            let sentence=this.program[pos]
            if ((sentence.getState()==state) && (sentence.getIfNumber()==symbolInTape) ){
                return pos;
            }
        }
        return -1;
    }

    runOneSentence(){
        
        let sentencePos=this.findProgramSentencePositionForCurrentState(this.getState());
        if (sentencePos==-1){
            alert("No new sentence to run. Program ended");
            return ;
        }
        let sentenceToRun=this.program[sentencePos];
        this.tape.writeSymbol(sentenceToRun.getThenNumber());
        if (sentenceToRun.getMovement()=="L"){
            this.tape.moveLeft();
        }
        if (sentenceToRun.getMovement()=="R"){
            this.tape.moveRight();
        }
        this.currentState=sentenceToRun.getNextState();
    }

    getAsRowTables(){
        let posToHighlight=this.findProgramSentencePositionForCurrentState(this.getState());
        let rows="";
        for (let pos in this.program){
            let sentence=this.program[pos]
            let highlight=false;
            if (pos==posToHighlight){
                highlight=true;
            }
            rows+=sentence.asRowTable(highlight);
        }
        return rows;
    }

}