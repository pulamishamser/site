
var myButton = document.getElementById("my-button");
//Getting the button with "my-button" as id.
var myOutput = document.getElementById("my-output");
//Getting the id for the tag where you want to output your number
var startNumber = 0;

/*Creating a function where it adds 1 to the startNumber variable
for every time you click on myButton.*/
function addToNumber(){
	//Using template literal here.
	myOutput.innerHTML = `The current number is: ${1+startNumber++}`;
	/*Sets the startNumber to 1+ startNumber++.
 	This makes it look like it starts to count from 1 and not 0
    the first time you click the the button.*/
}
myButton.onclick = addToNumber;














// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");











const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#icon"),
  count = document.querySelector("#count");

let clicked = false;


likeBtn.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
    count.textContent++;
  } else {
    clicked = false;
    likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
    count.textContent--;
  }
})
}




const likeBtn = document.querySelector(".like_btn"); let likeIcon = document.querySelector("#icon"),
count = document.querySelector("#count");
let clicked = false;
likeBtn.addEventListener("click", O => { if (Iclicked) {
clicked = true;
likeIcon.innerHTML = '<i class="fas fa-thumbsup"></i>';
