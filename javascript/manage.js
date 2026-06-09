var switchbtn = document.getElementById("switch")
var rightside = document.getElementById("rightside")
var main = document.querySelector("main")
var switched = false;

switchbtn.addEventListener("click", function(event){
    event.preventDefault();
    rightside.style.transition = "all 0.5s"
    switchbtn.style.transition = "all 0.5s"
    main.style.transition = "all 0.5s"
    
    if(!switched){
        rightside.style.transform = "translate(200px)"
        switchbtn.style.transform = "translate(120px) rotate(180deg)"
        main.style.width = "calc(100% - 100px)"
        switched = true;
    }

    else{
        rightside.style.transform = "translate(0)"
        main.style.width = "calc(100% - 300px)"
        switchbtn.style.transform = "rotate(0) translate(0)"
        switched = false;
    }
})