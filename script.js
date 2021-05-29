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


        let tableRow = `<tr ${(item.status == 1) ?  'class="crossed-out"' : ""}  >
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.category}</td>` +
            `<td>
                                <div style="float: right;" class="${ (item.status != 1) ? "buy" :"un-buy" } btn btn-success" value="${item.id}">${ (item.status != 1) ? "pirkti" :"atšaukti" }</div>  
                            </td>
                            <td>
                                <div style="float: right;" class="edit btn btn-warning" id="edit-${item.id}">Edit</div>  
                            </td>
                            <td>    
                                <div style="float: right;" class="delete btn btn-danger" id="${item.id}">trinti irasa</div>
                            </td>

                        </tr>`

        generatedHtml = generatedHtml + tableRow;
    }

    let bodyElement = document.getElementById("tasks-table");

    bodyElement.innerHTML = generatedHtml;
    activateDeleteBtns();
    activateEditBtns();
    activateBuyMode();
    activateUnBuyMode()
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


function deleteEntry(id) {

    let shoppingList = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].id == id) {
            shoppingList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(shoppingList));

    generateHtmlTable();
}

function editEntry(id) {

    let shoppingList = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < shoppingList.length; i++) {
        if (`edit-${shoppingList[i].id}` == id) {
            activateEditMode(shoppingList[i]);
        }
    }
}

function activateEditMode(todo) {
    //Get Html elements of Name, description
    document.getElementById("name").value = todo.name;
    document.getElementById("quantity").value = todo.quantity;
    document.getElementById("category").value = todo.category;
    document.getElementById("id").value = todo.id;

    //Update those html elements with todo.name, todo.description
    //Unhide the EditButton
    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
    document.getElementById("form").classList.remove('hidden');
    document.getElementById("show").classList.add('hidden');

}


function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("category").value = "";
}

function editTodo() {
    // if(!inputValidation2()){
    //     return;
    // }

    let shoppingList = JSON.parse(localStorage.getItem('cart'));
    let item = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        "quantity": document.getElementById("quantity").value,
        "category": document.getElementById("category").value,
        "status": 0
    }

    console.log(item);
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].id == item.id) {
            console.log("radau");
            shoppingList[i] = item;
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(shoppingList));

    generateHtmlTable();

    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
    document.getElementById("form").classList.add('hidden');
    show.classList.remove('hidden');
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


function activateBuyMode() {
    let buys = document.getElementsByClassName('buy');
    console.log(buys);
    let shoppingList = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < buys.length; i++) {
        const buy = buys[i];
        buy.addEventListener('click', function() {
            console.log(buy.getAttribute('value'));
            shoppingList.forEach(item => {
                if (item.id == (buy.getAttribute('value'))) {
                    console.log(item);
                    item.status = 1;
                    localStorage.setItem("cart", JSON.stringify(shoppingList));
                    generateHtmlTable();
                    return;
                }
            });

        });
    }
}

function activateUnBuyMode() {
    let buys = document.getElementsByClassName('un-buy');
    let shoppingList = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < buys.length; i++) {
        const buy = buys[i];
        buy.addEventListener('click', function() {
            console.log(buy.getAttribute('value'));
            shoppingList.forEach(item => {
                if (item.id == (buy.getAttribute('value'))) {
                    console.log(item);
                    item.status = 0;
                    localStorage.setItem("cart", JSON.stringify(shoppingList));
                    generateHtmlTable();
                    return;
                }
            });

        });
    }
}
// buys.forEach(buy => {
//     buy.addEventListener('click', function() {
//         console.log(buy.value);
//     });
// });

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