function resetlink(formid) {
  document.getElementById(formid).reset();
  window.location.href = "userinfo.html";
}

function adreset(formid) {
  document.getElementById(formid).reset();
  window.location.href = "aduser.html";
}

var changeshot = document.getElementById('changeshot');
var inputimg = document.getElementById('inputimg');
var userimg = document.getElementById('userimg');
let account = ''

changeshot.addEventListener('click', function (event) {
  event.preventDefault();
  inputimg.click();
});

inputimg.addEventListener('change', function () {
  var selectfile = inputimg.files[0];
  if (selectfile) {
    if (selectfile.type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        userimg.src = e.target.result;
        userimg.style.display = 'block';
      }
      reader.readAsDataURL(selectfile);
      changeUserPicture(selectfile)
    } else {
      alert('請選擇圖片文件');
      changeshot.value = '';
    }
  } else {
    console.log('未選擇文件');
  }
});

// function changePicture(pic) {
//   let formdata = new FormData()
//   const acc = JSON.parse(localStorage.getItem('userData'))
//   formdata.append("account", acc)
//   formdata.append("file", pic)
//   fetch('http://localhost:8000/api/change_shot',
//     {
//       headers: {
//         Authorization: token
//       },
//       method: "post",
//       body: formdata
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
// }
async function changeUserPicture(uploadShot) {
  const token = localStorage.getItem('userData')
  let formdata = new FormData()
  let changeUserPhoto = document.querySelector('#changeUserPhoto')
  formdata.append("file", uploadShot)
  changeUserPhoto.addEventListener('click', async () => {
    let res = await fetch('http://localhost:8000/api/change_shot', {
      method: 'POST',
      headers: {
        Authorization: token,
        // 'Content-Type': 'multipart/form-data'
      },
      body:formdata
    })
    let body = await res.json();
    console.log(body)
    console.log(uploadShot);
  })
}

async function getUserData() {
  const token = await localStorage.getItem('userData')
  console.log(token)
  await fetch(`http://localhost:8000/api/getuser_by_token`, {
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
      console.log(data)
      data = data.data
      account = data.user
      document.getElementById("username").innerText = data.Name
      document.getElementById("account").innerText = data.Account
      document.getElementById("email_input").value = data.Email
      console.log(data.Email)
    })
    .catch(error => {
      console.error('發生錯誤:', error);
    });
}

getUserData()

