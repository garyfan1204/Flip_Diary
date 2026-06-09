async function treehole() {
    try {
        let tab = '';

        var token = localStorage.getItem('userData');
        const response = await fetch('http://localhost:8000/api/show_diary_all', {
            headers:{
                'Authorization': token
            }
        });
        const data = await response.json();

        data.data.forEach(function (user) {
            let Emoji = ''; 
            if (user.Emoji == 1) {
                Emoji = 'calm';
            } else if (user.Emoji == 2) {
                Emoji = 'fear';
            } else if (user.Emoji == 3) {
                Emoji = 'sad';
            } else if (user.Emoji == 4) {
                Emoji = 'joy';
            } else if (user.Emoji == 5) {
                Emoji = 'happiness';
            } else if (user.Emoji == 6) {
                Emoji = 'angry';
            }

            tab += `
                <div class="diarys">
                    <div class="diary-left">
                        <div class="date">${user.Day}</div>
                        <div class="title">
                            <p>${user.Title}</p>
                            <hr>
                        </div>
                        <button class="checklink openDialog" data-id="${user.Diary_Id}">
                            <img src="image/pen.png" class="check">
                            <div class="checktext">
                                <p>查看</p>
                            </div>
                        </button>
                    </div>
                    <hr>
                    <div class="diary-right">
                        <img src="image/img-emoji/${Emoji}.png" class="emoticon">
                    </div>
                </div>
            `;
        });
        document.getElementById('upside').innerHTML = tab;

        document.querySelectorAll('.openDialog').forEach(button => {
            button.addEventListener('click', async function () {
                const diaryId = this.getAttribute('data-id');
                await showDiaryContent(diaryId);
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function showDiaryContent(diaryId) {
    const infoModal = document.querySelector("#infoShowDiary");
    const token = localStorage.getItem('userData');
    let iframeElement = document.getElementById("infoIfream");

    try {
        const response = await fetch(`http://localhost:8000/api/show_diary?Diary_Id=${diaryId}`, {
            headers: {
                'Authorization': token
            }
        });
        const data = await response.json();
        console.log(data)
        document.getElementById("infoDate").value = data.data.Day;
        document.getElementById("titleShowDiary").value = data.data.Title;
        document.getElementById("contentShowDiary").value = data.data.content;

        let emoji = '';
        if (data.data.Emoji == 1) {
            emoji = 'calm';
        } else if (data.data.Emoji == 2) {
            emoji = 'fear';
        } else if (data.data.Emoji == 3) {
            emoji = 'sad';
        } else if (data.data.Emoji == 4) {
            emoji = 'joy';
        } else if (data.data.Emoji == 5) {
            emoji = 'happiness';
        } else if (data.data.Emoji == 6) {
            emoji = 'angry';
        }
        
        let weather = '';
        if (data.data.weather == 1) {
            weather = 'sun';
        } else if (data.data.weather == 2) {
            weather = 'cloudy';
        } else if (data.data.weather == 3) {
            weather = 'rain';
        }else if (data.data.weather == 4) {
            weather = 'partly';
        }else if (data.data.weather == 5) {
            weather = 'snowy';
        }
        iframeElement.src = data.data.music
        document.getElementById("infoEmoji").src = `./image/img-emoji/${emoji}.png`;
        document.getElementById("infoWeather").src = `./image/img-weather/${weather}.png`;

        infoModal.showModal();
    } catch (err) {
        console.error("Error fetching diary content:", err);
    }
}

window.onload = treehole;

document.getElementById('closeDialog').addEventListener('click', function () {
    document.querySelector("#infoShowDiary").close();
});
