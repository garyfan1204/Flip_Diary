//正則表達式
function isValidEmail(email) {
    var emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return emailRegex.test(email);
}

function validateRegister() {
    var email = document.getElementById('email');
    var passwd = document.getElementById('passwd');
    var confirmrwd = document.getElementById('confirmpwd');

    if (!isValidEmail(email.value)) {
        alert('請輸入符合格式的電子信箱');
        return false;
    }

    let password = passwd.value;
    let checkpsw = confirmrwd.value;
    if (password !== checkpsw) {
        console.log(password);
        alert('前後密碼不相符')
        return false;
    }
    return true;
}

var loginform = document.getElementById('loginform')
var registerfrom = document.getElementById('registerform')

document.getElementById("registerlink").addEventListener("click", function (event) {
    event.preventDefault();
    loginform.style.transition = "transform 0.5s ease"
    registerfrom.style.transition = "transform 0.5s ease"
    loginform.style.transform = "translateX(-90%) rotate(15deg)"
    registerfrom.style.transform = "rotate(0)"

    setTimeout(function () {
        loginform.style.zIndex = "0"
        registerfrom.style.zIndex = "1"
        loginform.style.transform = "translateX(0) rotate(15deg)";
    }, 500);
});

document.getElementById("loginlink").addEventListener("click", function (event) {
    event.preventDefault();
    loginform.style.transition = "transform 0.5s ease"
    registerfrom.style.transition = "transform 0.5s ease"
    registerfrom.style.transform = "translateX(90%) rotate(15deg)"
    loginform.style.transform = "rotate(0)"

    setTimeout(function () {
        registerfrom.style.zIndex = "0"
        loginform.style.zIndex = "1"
        registerfrom.style.transform = "translateX(0) rotate(15deg)";
    }, 500);
});

async function loginData() {
    const formLogin = await document.querySelector('.loginform');
    let btn = document.querySelector("#forgotpwd");
    let infoModalforgot = document.querySelector("#infoModalforgot");
    let close = document.querySelector("#closeForgot");
    let ok = document.querySelector("#okForgot");
    let msg = '';

    close.addEventListener("click", function () {
        infoModalforgot.close();
    });
    try {
        formLogin.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(formLogin);
            let object = {};
            formData.forEach((value, key) => object[key] = value);
            let json = JSON.stringify(object);
            fetch('http://localhost:8000/api/login', {
                method: 'POST',
                body: json
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    errmsg = msg.replace("", data.msg);
                    if (errmsg === "登入成功") {
                        const responseData = data.data;
                        console.log(responseData.token);
                        localStorage.setItem('userData', responseData.token);
                        window.alert(errmsg)
                        window.location.href = 'http://localhost:5501/index.html';
                    } else {
                        window.alert('!!!登入失敗!!!');
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        });
        btn.addEventListener("click", function () {
            infoModalforgot.showModal();
            ok.addEventListener("click", async function () {
                let content = document.querySelector("#accountForgot").value;
                try {
                    const body = await forgotPassword(content);
                    console.log(body.data);
                    localStorage.setItem('forgetPwd', body.data.token);
                    window.alert(body.msg);
                } catch (e) {
                    console.log(e);
                } finally {
                    infoModalforgot.close();
                }
            }, { once: true });
        }, { once: true });
    }
    catch (err) {
        console.log(err);
    }
}
loginData()

async function forgotPassword(content) {
    let res = await fetch('http://localhost:8000/api/forget_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "account": content
        })
    });
    let body = await res.json();
    return body;
}

async function registerData() {
    const forRegister = document.querySelector('.registerform');
    let showAuthCode = document.querySelector('#showAuthCode');
    let btn = document.querySelector("#showAuthCode");
    let infoModal = document.querySelector("#infoModal");
    let close = document.querySelector("#close");
    let ok = document.querySelector("#ok");

    close.addEventListener("click", function () {
        infoModal.close();
        showAuthCode.close();
    });

    forRegister.addEventListener('submit', async event => {
        event.preventDefault();
        const formDataR = new FormData(forRegister);
        let object = {};
        formDataR.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);

        try {
            let res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
            let data = await res.json();
            localStorage.setItem('registerData', data.data.token);
            console.log(data);

            if (data.msg === '註冊成功，請收取驗證信') {
                showAuthCode.showModal();
                btn.addEventListener("click", function () {
                    showAuthCode.close();
                    infoModal.showModal();
                    ok.addEventListener("click", async function () {
                        const token = await localStorage.getItem('registerData')
                        console.log(token)
                        let content = document.querySelector("#content").value;
                        console.log(object.account);
                        try {
                            let res = await fetch('http://localhost:8000/api/AuthCode', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: token
                                },
                                body: JSON.stringify({
                                    "AuthCode": content
                                })
                            });
                            let body = await res.json();
                            console.log(body.data);
                            window.alert(body.data.msg);
                        } catch (e) {
                            console.log(e);
                        } finally {
                            infoModal.close();
                        }
                    }, { once: true });
                }, { once: true });

            } else {
                window.alert('!!!註冊失敗!!!');
            }
        } catch (err) {
            console.log(err);
        }
    });
}

registerData();

