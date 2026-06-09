async function loginData() {
    const token = await localStorage.getItem('forgetPwd')
    console.log(token)
    let newpassword = document.querySelector("#newpassword");
    let checknewpassword = document.querySelector("#checknewpassword");
    let ok = document.querySelector("#okReset");
    try {
        ok.addEventListener("click", async function () {
            try {
                let res = await fetch('http://localhost:8000/api/reset_password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    },
                    body: JSON.stringify({
                        "newpwd": newpassword,
                        "cnewpwd": checknewpassword
                    })
                });
                let body = await res.json();
                console.log(body);
                window.alert(body.msg);
                // window.location.href = 'http://localhost:5501/login.html';
            } catch (e) {
                console.log(e);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
loginData()