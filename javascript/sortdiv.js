var ascending = true;
var lastSortedColumnIndex = null;

function sortDivs(columnIndex) {
    if (lastSortedColumnIndex !== columnIndex) {
        ascending = true;
    }

    var container = document.getElementById("container");
    var columns = Array.from(container.getElementsByClassName("column"));
    columns.sort(function(a, b) {
        var x = a.getElementsByTagName("div")[columnIndex].innerText.toLowerCase();
        var y = b.getElementsByTagName("div")[columnIndex].innerText.toLowerCase();
        
        if (columnIndex === 3) {
            x = getSexOrder(x);
            y = getSexOrder(y);
        }

        if (columnIndex === 4) {
            x = getSingerOrder(x);
            y = getSingerOrder(y);
        }
        
        if (ascending) {
            return x > y ? 1 : (x < y ? -1 : 0);
        } else {
            return x < y ? 1 : (x > y ? -1 : 0);
        }
    });

    columns.forEach(function(column) {
        container.appendChild(column);
    });

    ascending = !ascending;
    lastSortedColumnIndex = columnIndex;
}

function getSexOrder(sex) {
    switch(sex) {
        case '男':
            return 1;
        case '女':
            return 2;
        case '不透露':
            return 3;
        default:
            return 4;
    }
}

function getSingerOrder(singer){
    switch(singer){
        default:
            return 1;
        case 'unknown':
            return 2;
        case '未知':
            return 3;
    }
}