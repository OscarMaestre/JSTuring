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
    getCurrentSymbol(){
        let pos=this.getPosInTape();
        return this.tape[pos];
    }
    getPosInTape(){
        return this.currentPosInTape;
    }
    
}
class Program{
    constructor(text){
        this.program=new Array();
        let lines=text.split(";")
        for (let pos in lines){
            if (lines[pos]!="") {
                let sentence=new Sentence(lines[pos]);
                this.program.push(sentence);
            }
        }
        this.resetState();
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
 
    findProgramSentenceForCurrentState(state){
        let symbolInTape=getCurrentSymbolInTape();
        for (let pos in this.program){
            let sentence=this.program[pos]
            if ((sentence.getState()==state) && (sentence.getIfNumber()==symbolInTape) ){
                return sentence;
            }
        }
        return null;
    }
    runOneSentence(){
        
        let sentence=this.findProgramSentenceForCurrentState(this.getState());
    }

}