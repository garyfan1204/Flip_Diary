// let account = ''
function getUserData() {
  const token = localStorage.getItem('userData')
  fetch(`http://localhost:8000/api/getuser_by_token`, {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("username").innerText = data.data.Account
      console.log(data.data.Account)
    })
    .catch(error => {
      console.error('發生錯誤:', error);
    });
}

getUserData()
function changepwd() {
  const opwd = document.getElementById("originpwd_input").value
  const npwd = document.getElementById("newpwd_input").value
  const cpwd = document.getElementById("confirmpwd_input").value
  let checkpwd = document.querySelector("#checkpwd")
  const token = localStorage.getItem('userData')
  console.log(token)
  checkpwd.addEventListener('click', function () {
    fetch('http://localhost:8000/api/change_password', {
      method: 'POST',
      headers: {
        Authorization: token
      },
      body: JSON.stringify({
        pwd: opwd,
        newpwd: npwd,
        cnewpwd: cpwd
      })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.msg)
        if (data.msg === '修改成功') {
          alert("密碼修改成功！");
          history.back();
        } 
      })

  })

}
changepwd()