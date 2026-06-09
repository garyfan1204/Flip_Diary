async function sentenceData() {
    try {
        const res = await fetch('http://localhost:8000/api/sentence');
        const sentenceShow = document.getElementById('sentence');
        const data = await res.json();
        console.log(sentenceShow);
        sentenceShow.innerText = data.data.sentence;
    }
    catch (err) {
        console.error(err);
    }
}

sentenceData();




const checkGoDiary = () => {
    const user = localStorage.getItem('userData');
    let goDiary = document.querySelectorAll('.goDiary');
    if (user) {
        goDiary.forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = 'http://localhost:5501/diary.html';
            });
        });
    } else {
        goDiary.forEach(item => {
            item.addEventListener('click', () => {
                alert('登入後才可寫日記');
                window.location.href = 'http://localhost:5501/login.html';
            });
        });
    }
};
checkGoDiary()
