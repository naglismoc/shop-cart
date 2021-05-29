generateHtmlTable();

function generateHtmlTable() {

    let generatedHtml = "";
    let shoppingList = JSON.parse(localStorage.getItem('cart'));
    let select = document.getElementById("select");


    if (shoppingList === null) {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("id", "0");
        return;
    }
    for (let i = 0; i < shoppingList.length; i++) {
        const item = shoppingList[i];
        if (select.value != "0") {
            if (select.value != item.category) {
                continue;
            }
        }
        let tableRow = `<tr  >

                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.category}</td>` +
            `<td>
                                <div style="float: right;" class="edit btn btn-warning" id="edit-${item.id}">Edit</div>
                                <div style="float: right;" class="delete btn btn-danger" id="${item.id}">trinti irasa</div>
                           </td>

                        </tr>`

        generatedHtml = generatedHtml + tableRow;
    }

    let bodyElement = document.getElementById("tasks-table");

    bodyElement.innerHTML = generatedHtml;
    activateDeleteBtns();
    activateEditBtns();
}




function addNewItem() {
    // if(!inputValidation2()){
    //     return;
    // }

    let items = JSON.parse(localStorage.getItem('cart'));

    console.log(document.getElementById("name").value);
    let item = {
        id: parseInt(localStorage.getItem("id")) + 1,
        name: document.getElementById("name").value,
        quantity: document.getElementById("quantity").value,
        category: document.getElementById("category").value,
        status: 0
    }

    //4 add new todo to todoslist
    items.push(item);
    localStorage.setItem("id", item.id);
    localStorage.setItem("cart", JSON.stringify(items));
    //5 Call UpdateHtmlTable function
    clearForm();
    generateHtmlTable();

    document.getElementById('name').focus();
}

function activateDeleteBtns() {
    let deleteBtns = document.getElementsByClassName('delete');

    for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click', function() {
            deleteEntry(btn.id);
        });
    }
}

function activateEditBtns() {
    let editBtns = document.getElementsByClassName('edit');

    for (let i = 0; i < editBtns.length; i++) {
        let btn = editBtns[i];
        btn.addEventListener('click', function() {
            editEntry(btn.id);
        });
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("category").value = "";
}




let hide = document.getElementById("hide");
let show = document.getElementById("show");

hide.addEventListener('click', function() {
    document.getElementById("form").classList.add('hidden');
    show.classList.remove('hidden');
});
show.addEventListener('click', function() {
    document.getElementById("form").classList.remove('hidden');
    show.classList.add('hidden');
});

let select = document.getElementById("select");
select.addEventListener('change', function() {
    console.log(select.value);
    generateHtmlTable();
    // show.classList.add('hidden');
});

/* <option value="audi">Audi</option> */
categorySelect();

function categorySelect() {
    let shopingList = JSON.parse(localStorage.getItem('cart'));
    let select = document.getElementById("select");
    let categories = [];
    let HTML = "";

    shopingList.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    });

    categories.forEach(category => {
        HTML += `<option value="${category}">${category}</option>`;
    });

    select.innerHTML += HTML;
}