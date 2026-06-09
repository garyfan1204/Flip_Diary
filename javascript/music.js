var player = document.getElementById("musicinfo");
var previous = document.getElementById("previous");
var next = document.getElementById("next");

previous.addEventListener("click", function(event){
    event.preventDefault();
    player.style.animation = "FadeOutRight 1s"
    previous.style.animation = "FadeOut 1s"
    next.style.animation = "FadeOut 1s"
    player.addEventListener('animationend', function() {
        player.style.animation = "FadeInLeft 1s"
        previous.style.animation = "FadeIn 1s"
        next.style.animation = "FadeIn 1s"
    })
});

next.addEventListener("click", function(event){
    event.preventDefault();
    player.style.animation = "FadeOutLeft 1s"
    previous.style.animation = "FadeOut 1s"
    next.style.animation = "FadeOut 1s"
    player.addEventListener('animationend', function(){
        player.style.animation = "FadeInRight 1s"
        previous.style.animation = "FadeIn 1s"
        next.style.animation = "FadeIn 1s"
    })
});

async function treehole() {
    const formDiary = await document.querySelector('.upside')
    try {
        let res = await (await fetch('http://localhost:8000/api/show_music_all'))
        console.log(res)
        console.log(res.ok)
        console.log(res.status)
        console.log(res.statusText)
        console.log(res.url)

    }
    catch (err) {
        console.log(err);
    }
}
treehole()