"use strict";

let divresults=document.getElementById("results");

function testConstructor(){
    let sentence=new Sentence("S0, 0, 1, L, S1");

}
function testTape(assert){
    let tape=new Tape();
    assert.ok(tape!=undefined, "Tape is not null");
    assert.ok(tape.getCurrentSymbol()=="0", "Tape initialized");
    let symbolTest="1";
    tape.writeSymbol(symbolTest);
    assert.ok(tape.getCurrentSymbol()==symbolTest, "Tape write");
    assert.ok(tape.getCurrentSymbol()!="0", "Tape write");

    let differentTape="010010101";
    let newPos=2;
    tape.setTape(differentTape, newPos);
    symbolTest="X";
    tape.writeSymbol(symbolTest);
    
    assert.ok(tape.getCurrentSymbol()==symbolTest, "Set tape write");
    assert.ok(tape.getCurrentSymbol()!="0", "Set tape write");

    let expectedResult="01X010101";
    assert.ok(tape.toString()==expectedResult, "Set Tape write");

    assert.throws(
        function(){
            tape.writeSymbolAt("-", -1);
        }
    );
    assert.throws(
        function(){
            tape.writeSymbolAt("-", 10000);
        }
    );

    
}
function testProgram(){
    let programText="S0, 0, 1, L, S0;"+
    "S0, 1, 0, L, S1;"+
    "S1, 0, 0, L, S2;"+
    "S1, 1, 1, R, S2;"+
    "S2, 0, 0, L, S0;"+
    "S2, 0, 1, R, S0;"

    let tape=new Tape();
    let differentTape="010010101";
    tape.setTape(differentTape);
    
    let program=new Program(programText);
    program.runOneSentence();
}

QUnit.test("Tape test", testTape);
QUnit.test("Program test", testTape);