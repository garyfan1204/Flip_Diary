
async function addSentence() {
    let btn = document.querySelector("#add");
    let ok = document.querySelector("#okSentence");
    let infoModal = document.querySelector("#infoModalSentence");
    let close = document.querySelector("#closeSentence");

    btn.addEventListener("click", async function () {
        infoModal.showModal();
        ok.addEventListener('click', async function () {
            let type = document.querySelector("#typeSentence").value;
            let content = document.querySelector("#contentSentence").value;
            console.log(type);
            try {
                let res = await fetch('http://localhost:8000/api/sentence_add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Content": content,
                        "Type_Name": type
                    })
                });
                let body = await res.json();
                console.log(body);
            } catch (error) {
                console.error('Error:', error);
            }
            finally{
                infoModal.close();
            }
        })

    });
    close.addEventListener("click", function () {
        infoModal.close();
    });
}
addSentence();


async function handleSentenceAction(event) {
    if (event.target.tagName === 'INPUT') {
        let SentenceId = event.target.dataset.id;
        //delete
        if (event.target.classList.contains('delete')) {
            try {
                let res = await fetch('http://localhost:8000/api/sentence_del', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Sentence_Id": SentenceId
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
            let newContent = prompt("輸入新佳句名:");
            let newType = prompt("輸入新類型:");
            if (newContent || newType) {
                try {
                    let res = await fetch('http://localhost:8000/api/change_sentence', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "Sentence_Id": SentenceId,
                            "Content": newContent,
                            "Type_Name": newType
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


document.querySelector('#items').addEventListener('click', handleSentenceAction);



async function fetchData(pagenow, searchContent = '') {
    try {
        let head = '';
        let str = '<table class="pages"><tr>';
        let tab = '';
        let res = searchContent
            ? await fetch('http://localhost:8000/api/Search_sentence?Content=' + searchContent)
            : await fetch('http://localhost:8000/api/admin_show_sentence_all');
        let body = await res.json();
        let sentence = body.data[0];
        let MaxPage = Math.ceil(sentence.length / 5);
        let NowPage = Math.max(1, Math.min(pagenow, MaxPage || 1));
        let itemsPerPage = 5;
        let start = (NowPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        total = sentence.length
        let pageItems = sentence.slice(start, end);
        if (NowPage > 1) {
            str += `<td><a href="#" onclick="fetchData(1, '${searchContent}')">&lt;&lt;</a></td>`;
            str += `<td><a href="#" onclick="fetchData(${NowPage - 1}, '${searchContent}')">&lt;</a></td>`;
        }
        for (let page = Math.max(1, NowPage - 2); page <= Math.min(NowPage + 2, Math.ceil(sentence.length / itemsPerPage)); page++) {
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
        pageItems.forEach(function (sentence) {
            tab += `
            <tr>
                <td class="type">${sentence.Type_Name}</td>
                <td class="content">${sentence.Content}</td>
                <td class="btns">
                    <div>
                        <input type="submit" value="刪除" class="delete" data-id="${sentence.Sentence_Id}">
                        <input type="submit" value="修改" class="edit" data-id="${sentence.Sentence_Id}">
                    </div>
                </td>
            </tr>            
            `;
        });

        str += '</tr></table>';
        document.getElementById('items').innerHTML = tab;
        document.getElementById('pages-sentence').innerHTML = str;
        document.getElementById('sentence-total').innerHTML = total;
    } catch (err) {
        console.error('Failed to fetch data:', err);
    }
}

//     if (event.target.tagName === 'INPUT') {
//         let SentenceId = event.target.dataset.id;
//         //delete
//         if (event.target.classList.contains('delete')) {
//             try {
//                 let res = await fetch('http://localhost:8000/api/sentence_del', {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         "Sentence_Id": SentenceId
//                     })
//                 });
//                 let body = await res.json();
//                 console.log(body);
//                 showSentence(1);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         //edit
//         else if (event.target.classList.contains('edit')) {
//             let newContent = prompt("輸入新歌名:");
//             let newType = prompt("輸入新類型:");
//             if (newContent || newType ) {
//                 try {
//                     let res = await fetch('http://localhost:8000/api/change_sentence', {
//                         method: 'PUT',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             "Sentence_Id": SentenceId,
//                             "Content": newContent,
//                             "Type_Name": newType
//                         })
//                     });
//                     let body = await res.json();
//                     console.log(body);
//                     showSentence(1);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             }
//         }
//     }
// }

// document.querySelector('#items').addEventListener('click', handleSentenceAction);

fetchData(1);

document.querySelector('#searchBtn').addEventListener('click', function () {
    let searchContent = document.querySelector('#searchData').value;
    fetchData(1, searchContent);
});
