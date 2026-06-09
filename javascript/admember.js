async function fetchData(pagenow, searchContent = '') {
    try {
        let head = '';
        let str = '<table class="pages"><tr>';
        let tab = '';
        let res = searchContent
            ? await fetch('http://localhost:8000/api/Search_user?Content=' + searchContent)
            : await fetch('http://localhost:8000/api/admin_show_user_all');
        let body = await res.json();
        let members = body.data[0];

        head += `
        <div class="sort">
            <div class="account" onclick="sortDivs(0)">帳號</div>
            <div class="name" onclick="sortDivs(1)">姓名</div>
            <div class="mail" onclick="sortDivs(2)">信箱</div>
            <div class="sex" onclick="sortDivs(3)">性別</div>
        </div>
    `;

        let MaxPage = Math.ceil(members.length / 5);
        let NowPage = Math.max(1, Math.min(pagenow, MaxPage || 1));
        let itemsPerPage = 5;
        let start = (NowPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        let pageItems = members.slice(start, end);
        if (NowPage > 1) {
            str += `<td><a href="#" onclick="fetchData(1, '${searchContent}')">&lt;&lt;</a></td>`;
            str += `<td><a href="#" onclick="fetchData(${NowPage - 1}, '${searchContent}')">&lt;</a></td>`;
        }
        for (let page = Math.max(1, NowPage - 2); page <= Math.min(NowPage + 2, Math.ceil(members.length / itemsPerPage)); page++) {
            if (page === NowPage) {
                str += `<td>${page}</td>`;
            } else {
                str += `<td><a href="#" onclick="fetchData(${page}, '${searchContent}')">${page}</a></td>`;
            }
        }
        if (NowPage < MaxPage) {
            str += `<td><a href="#" onclick="fetchData(${NowPage + 1}, '${searchContent}')">&gt;</a></td>`;
            str += `<td><a href="#" onclick="fetchData(${MaxPage}, '${searchContent}')">&gt;&gt;</a></td>`;
        }
        pageItems.forEach(function (user) {
            let Gender = ['不透露', '男', '女'][user.Gender] || '不透露';
            tab += `
            <div class="column">
                <div class="account">${user.Account}</div>
                <div class="name">${user.Name}</div>
                <div class="mail">${user.Email}</div>
                <div class="sex">${Gender}</div>
                <div class="btns">
                    <div>
                        <input type="button" value="刪除" class="delete" data-id="${user.Account}">
                        <input type="button" value="修改" class="edit" data-id="${user.Account}">
                    </div>
                </div>
            </div>
            `;
        });

        str += '</tr></table>';
        document.getElementById('head-content').innerHTML = head;
        document.getElementById('container').innerHTML = tab;
        document.getElementById('page-member').innerHTML = str;
    } catch (err) {
        console.error('Failed to fetch data:', err);
    }
}

async function handleSentenceAction(event) {
    if (event.target.tagName === 'INPUT') {
        let accountId = event.target.dataset.id;
        //delete 
        if (event.target.classList.contains('delete')) {
            try {
                let res = await fetch('http://localhost:8000/api/user_del', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Account": accountId
                    })
                });
                let body = await res.json();
                console.log(body);
                fetchData(1);
            } catch (err) {
                console.error(err);
            }
        }
        //edit 
        else if (event.target.classList.contains('edit')) {
            let newAccount = prompt("輸入您的帳號:");
            let newName = prompt("輸入您的姓名:");
            let newEmail = prompt("輸入您的電子郵件:");
            if (newName && newEmail) {
                try {
                    let res = await fetch('http://localhost:8000/api/change_user', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "oldAccount": accountId,
                            "Account": newAccount,
                            "Name": newName,
                            "Email": newEmail
                        })
                    });
                    let body = await res.json();
                    console.log(body);
                    fetchData(1);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}

document.querySelector('#container').addEventListener('click', handleSentenceAction);

fetchData(1);

document.querySelector('#searchBtn').addEventListener('click', function () {
    let searchContent = document.querySelector('#searchData').value;
    fetchData(1, searchContent);
});
