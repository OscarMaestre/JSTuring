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

function step(){
    parseProgram();
}