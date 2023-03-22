
function handleSubmit(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var input = document.querySelector('[name="email"]');
    var fname = document.querySelector('[name="fname"]');
    var lname = document.querySelector('[name="lname"]');
    var input1 = document.getElementById('floatingPassword')
    if (input.value && input.value.match(validRegex)) {
      input.classList.remove("error");
      input.classList.add("success");
    } else {
      console.log('asdfka')
      input.classList.remove("success");
      input.classList.add("error");        
    }

    if(fname.value){
      console.log('First name is: ',fname.value);
      fname.value = ""
      fname.classList.remove("error");
      fname.classList.add("success");
    }
    else{
      fname.classList.remove("success");
      fname.classList.add("error");
    }

    if(lname.value){
      console.log('First name is: ',lname.value);
      lname.value = ""
      lname.classList.remove("error");
      lname.classList.add("success");
    }
    else{
      lname.classList.remove("success");
      lname.classList.add("error");
    }
      
    if (input1.value && input1.value.length>=6) {
      console.log('Password is: ',input1.value)
      input1.value = ""
      input1.classList.remove("error");
      input1.classList.add("success");
    } else {
      input1.classList.remove("success");
      input1.classList.add("error");
    }
}
