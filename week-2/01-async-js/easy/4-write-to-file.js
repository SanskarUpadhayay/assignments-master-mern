const fs = require('fs');

fs.appendFile('a.txt','Sanskar',function (err){
    if(err){
        console.log(err);
    }
})