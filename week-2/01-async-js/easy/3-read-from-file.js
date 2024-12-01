const fs = require('fs');

fs.readFile('a.txt','utf-8' ,function (error,data) {
    console.log(data);
})
let cnt=0;
for(let i=0;i<1000000000;i++){
    cnt++;
}
console.log(cnt);