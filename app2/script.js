var string = prompt("input"),
//на дворе трава на траве братва вся братва в дрова,
    n = 3,
    pos = string.substr(0, 3),
    d_pos;


for(i = 3; i <= string.length-1; i++ ){
    n = 3;

    while(true){
    let x = false;

    for (j = 0; (j + n - 1) < i; j++){

      str = string.substr(i, n);
      str2 = string.substr(j, n);

      if (str == str2) {
      //  console.log(str,"-", i," ",str2,"-", j);
        d_pos = "("+n+";"+(i-j-n)+")";
        x = true;
      }
      else {
      //  console.log(str,"-", i," ",str2,"-", j, "---------");
      }

    }

    if (x) { n++ } else { break }


  }

 if(n == 3){pos += string[i];
 }  else  {
   pos += d_pos;
   i += n - 2;
 }
}

alert(pos+ "\n" +string);
