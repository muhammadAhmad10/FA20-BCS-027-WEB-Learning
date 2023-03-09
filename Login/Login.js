
function passwordFocus(){
    var input = document.getElementById("floatingInput");
    var input1 = document.getElementById('floatingPassword')
    if (input.value) {
        input.classList.remove("error");
        input.classList.add("success");
      } else {
        input.classList.remove("success");
        input.classList.add("error");
      }
      if (input1.value) {
        input1.classList.remove("error");
        input1.classList.add("success");
      } else {
        input1.classList.remove("success");
        input1.classList.add("error");
      }
}