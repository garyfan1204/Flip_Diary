var date = new Date();
var yyyy = date.getFullYear();
var mm = String(date.getMonth() + 1).padStart(2, "0");
var dd = String(date.getDate()).padStart(2, "0");
var today = yyyy + "-" + mm + "-" + dd;

document.getElementById("date").value = today;

function show(emotion) {
  const textbox = document.querySelector('input[name="textbox"]');
  textbox.value = emotion;
}

function showone(weather) {
  const textbox1 = document.querySelector('input[name="textbox1"]');
  textbox1.value = weather;
}

function toggleRotation(id) {
  const drop = document.getElementById(id);
  drop.classList.toggle("active");
}

function show(emotion) {
  const textbox = document.querySelector('input[name="textbox"]');
  textbox.value = emotion;
  console.log(emotion);
  const image = document.querySelector("#emotion img");
  if (emotion === "生氣") {
    image.src = "./image/img-emoji/angry.png";
  } else if (emotion === "平靜") {
    image.src = "./image/img-emoji/calm.png";
  } else if (emotion === "害怕") {
    image.src = "./image/img-emoji/fear.png";
  } else if (emotion === "幸福") {
    image.src = "./image/img-emoji/happiness.png";
  } else if (emotion === "喜悅") {
    image.src = "./image/img-emoji/joy.png";
  } else if (emotion === "失落") {
    image.src = "./image/img-emoji/sad.png";
  }
}

function showone(weather) {
  const textbox = document.querySelector('input[name="textbox1"]');
  textbox.value = weather;
  const image = document.querySelector("#weather img");
  if (weather === "晴天") {
    image.src = "./image/img-weather/sun.png";
  } else if (weather === "雨天") {
    image.src = "./image/img-weather/rain.png";
  } else if (weather === "陰天") {
    image.src = "./image/img-weather/cloudy.png";
  } else if (weather === "晴時多雲") {
    image.src = "./image/img-weather/partly.png";
  } else if (weather === "下雪") {
    image.src = "./image/img-weather/snowy.png";
  }
}

function loadImage(option, emotion) {
  document.getElementById("image-container").innerHTML = "";
  const imageUrl = option.getAttribute("data-image");
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status === 200) {
      const blob = this.response;
      const imageUrl = URL.createObjectURL(blob);
      const imgElement = document.createElement("img");

      imgElement.width = 80;
      imgElement.height = 80;
      imgElement.src = imageUrl;
      document.getElementById("image-container").appendChild(imgElement);
    } else {
      console.error("Request failed with status:", this.status);
    }
  };
  xhttp.responseType = "blob";
  xhttp.open("GET", imageUrl);
  xhttp.send();

  // document.getElementById("selected_emotion_field").value = emotion;
}

function loadImage1(option, emotion) {
  document.getElementById("image-container1").innerHTML = "";
  const imageUrl = option.getAttribute("data-image");
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status === 200) {
      const blob = this.response;
      const imageUrl = URL.createObjectURL(blob);
      const imgElement = document.createElement("img");

      imgElement.width = 80;
      imgElement.height = 80;
      imgElement.src = imageUrl;
      document.getElementById("image-container1").appendChild(imgElement);
    } else {
      console.error("Request failed with status:", this.status);
    }
  };
  xhttp.responseType = "blob";
  xhttp.open("GET", imageUrl);
  xhttp.send();

  // document.getElementById("selected_weather_field").value = emotion;
}

//document.getElementById("current_date_input") = yyyy + "-" +  mm + "-" + dd;

var music = document.getElementsByClassName("music");
var submit = document.querySelector("button");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  // music.style.transition = "transform 0.4s"
  // music.style.transform = "none"
});


async function WriteDiary() {
  let dateValue = document.querySelector(".datecontent").value;
  let emojiValue = document.querySelector("#emojiSelect").value;
  let weatherValue = document.querySelector("#weatherSelect").value;
  let titleValue = document.querySelector("#title").value;
  let contentValue = document.querySelector("#content").value;
  let showMusic = document.getElementsByClassName('showMusic')[0];
  let token = localStorage.getItem("userData");
  console.log(dateValue, emojiValue, weatherValue, titleValue, contentValue);
  try {
    const response = await fetch("http://localhost:8000/api/write_diary", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        emoji: emojiValue,
        content: contentValue,
        weather: weatherValue,
        title: titleValue,
        date: dateValue,
      }),
    });
    const data = await response.json();
    console.log(data);
    console.log(data.Path);
    if (data.msg == "新增成功") {
      showMusic.style.transform = 'translate(0,0)';
      let iframeElement = document.getElementById('musicShow');
      console.log(iframeElement.src);
      window.alert(data.msg);
      iframeElement.src = data.data.Path
      document.getElementById("songName").innerHTML = data.data.Music_Name;
      document.getElementById("singerName").innerHTML = data.data.Singer;
    }
    let errmsg = "";
    errmsg = errmsg.replace("", data.msg);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


