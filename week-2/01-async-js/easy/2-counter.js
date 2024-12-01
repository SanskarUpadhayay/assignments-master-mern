let cnt=0;

function counter(){
    console.log(cnt);
    cnt++;
    setTimeout(counter,1000);
}

counter();
    