const pages = {
  "/admusic.html": "admusic.html",
  "/ademotion.html": "ademotion.html",
  "/aduser.html": "aduser.html",
  "/adpwd.html": "adpwd.html",
  "/adgender.html": "adgender.html",
  "/admember.html": "admember.html",
  "/adsentence.html": "adsentence.html",
  "/adreport.html": "adreport.html",
};

const titles = {
  "adreport.html": "管理員報表",
  "admember.html": "會員名冊",
  "adsentence.html": "名言佳句",
  "ademotion.html": "心情小站",
  "admusic.html": "音樂庫",
  // 'aduser.html': '管理員資料',
  // 'adpwd.html': '管理員密碼',
  // 'adgender.html': '管理員性別',
};

const cssFiles = {
  "adreport.html": [
    "css/adlayout.css",
    "css/adlayout-m.css",
    "css/adreport.css",
    "css/adreport-m.css",
  ],
  "admember.html": [
    "css/adlayout.css",
    "css/adlayout-m.css",
    "css/admember.css",
    "css/admember-m.css",
  ],
  "adsentence.html": [
    "css/adlayout.css",
    "css/adlayout-m.css",
    "css/adsentence.css",
    "css/adsentence-m.css",
  ],
  "ademotion.html": [
    "css/adlayout.css",
    "css/adlayout-m.css",
    "css/ademotion.css",
    "css/ademotion-m.css",
  ],
  "admusic.html": [
    "css/adlayout.css",
    "css/adlayout-m.css",
    "css/admusic.css",
    "css/admusic-m.css",
  ],
  // 'aduser.html': ['css/adlayout.css', 'css/aduser.css'],
  // 'adpwd.html': ['css/adlayout.css', 'css/aduser.css'],
  // 'adgender.html': ['css/adlayout.css', 'css/aduser.css'],
};

const jsFiles = {
  "adreport.html": ["javascript/manage.js", "javascript/adreport.js"],
  "admember.html": [
    "javascript/manage.js",
    "javascript/admember.js",
    "javascript/sortdiv.js",
  ],
  "adsentence.html": [
    "javascript/manage.js",
    "javascript/adsentence.js",
    "javascript/sorttable.js",
  ],
  "ademotion.html": ["javascript/manage.js", "javascript/ademotion.js"],
  "admusic.html": [
    "javascript/manage.js",
    "javascript/admusic.js",
    "javascript/sortdiv.js",
  ],
  // 'aduser.html': ['javascript/manage.js', 'javascript/userinfo.js'],
  // 'adpwd.html': ['javascript/manage.js', 'javascript/userinfo.js'],
  // 'adgender.html': ['javascript/manage.js'],
};

function layout(page) {
  fetch("adlayout.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
      fetch(page)
        .then((response) => response.text())
        .then((pageHtml) => {
            checklogin()
          const main = document.querySelector("main");
          main.innerHTML = pageHtml;
          const title = titles[page];
          const cssFile = cssFiles[page];
          const jsFile = jsFiles[page];
          if (title) {
            document.title = title;
          }
          if (cssFile) {
            cssFile.forEach((cssfile) => {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = cssfile;
              document.head.appendChild(link);
            });
          }
          if (jsFile) {
            jsFile.forEach((jsfile) => {
              const script = document.createElement("script");
              script.src = jsfile;
              document.body.appendChild(script);
            });
          }
        })
        .catch((error) => {
          console.error("加載指定頁面失敗：", error);
        });
    })
    .catch((error) => {
      console.error("加載佈局失敗：", error);
    });
}

window.addEventListener("load", function () {
  const pathname = window.location.pathname;
  let page = pages[pathname] || "index.html";
  layout(page);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  setTimeout(() => {
    const quantityElements = document.querySelectorAll(".count .quantity");
    console.log("Quantity elements found:", quantityElements.length);

    fetch("http://localhost:8000/api/user_quantity", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data parsed:", data);
        if (quantityElements.length > 0) {
          quantityElements.forEach((element) => {
            element.textContent =
              data.data !== undefined ? `${data.data}` : "Error";
          });
        } else {
          console.error("Quantity element not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user quantity:", error);
        if (quantityElements.length > 0) {
          quantityElements.forEach((element) => {
            element.textContent = "Error";
          });
        }
      });
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    const BrowseElements = document.querySelectorAll(".Browse");
    console.log("Browse elements found:", BrowseElements.length);

    setTimeout(() => {
        const CountBrowseElements = document.querySelectorAll(".count .Browse");
        console.log("Browse elements found:", CountBrowseElements.length);
  
        fetch("http://localhost:8000/api/Browse", {
            method: "POST"
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data parsed:", data);
            if (CountBrowseElements.length > 0) {
                CountBrowseElements.forEach((element) => {
                    element.textContent =
                        data.data !== undefined ? `${data.data}` : "Error";
                });
            } else {
                console.error("Browse element not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching Browse:", error);
            if (CountBrowseElements.length > 0) {
                CountBrowseElements.forEach((element) => {
                    element.textContent = "Error";
                });
            }
        });
    }, 1000);
});

const checklogin = () => {
    const user = localStorage.getItem('userData');
    if (user) {
      const logoutLinks = document.querySelectorAll('header #logintext');
      logoutLinks.forEach(link => {
        link.innerText = '登出';
        link.addEventListener('click', () => {
          localStorage.removeItem('userData');
          link.innerText = '登入';
        });
      });
    }
  }

