const { log } = require('console');
const fs = require('fs');

fs.readFile('a.txt','utf-8' ,(err,data) => {
    let str = data;
    str = str.trim();
    let res = [];
    let temp="";
    for(let i=0;i<str.length;i++){
        if(str[i]!=" "){
            temp+=str[i];
        }
        else{
            if(temp!=""){
                res.push(temp);
            }
            temp="";
        }
    }
    res.push(temp);
    let text = res.join(" ");
    fs.writeFile('a.txt',text, (err) => {
        console.log(err);
    });

})