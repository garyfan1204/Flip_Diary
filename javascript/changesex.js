// let account = ''
function getUserData(){
    const token = localStorage.getItem('userData')
    fetch(`http://localhost:8000/api/getuser_by_token`,{
      headers:{
        Authorization:token
      }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data = data.data
        account = data.user
        console.log(data)
        document.getElementById("username").innerText = data.Account
        document.getElementById("gender_select").value = data.Gender
      })
      .catch(error => {
        console.error('發生錯誤:', error);
      });
}

getUserData()

function changesex(){
    const sex = document.getElementById("gender_select").value
    const token = localStorage.getItem('userData')
    fetch('http://localhost:8000/api/change_sex',{
        method: 'POST',
        headers:{
          Authorization:token
        },
        body: JSON.stringify({
            sex:sex
        })
    })
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        console.log(data)
        alert("性別修改成功");
        history.back();
    })
}