var siteName = document.getElementById("bname");
var siteUrl = document.getElementById("burl");
var subButton = document.getElementById("submitBtn");
var layer = document.getElementById("alert-layer");
var errorAlert = document.querySelector(".alert");
var errorBtn = document.querySelector(".alert button");
var main = document.querySelector("main");
var allBookmarks = [];

///////handling alert/////////////////////////////////

errorBtn.addEventListener("click", function (e) {    //alert close button
    layer.classList.add("d-none");
    layer.classList.remove("d-flex");
    main.classList.remove("no-interactions")



})
layer.addEventListener("click", function (e) {         //closing alert when clicking outside
    layer.classList.add("d-none");
    layer.classList.remove("d-flex");
    main.classList.remove("no-interactions")


})
errorAlert.addEventListener("click", function (e) {

    e.stopPropagation();
})
document.addEventListener("keydown", function (e) {

    if (e.key == "Escape" && layer.classList.contains("d-flex")) {  //closing alert with escape
        // console.log(e)

        layer.classList.add("d-none");
        layer.classList.remove("d-flex");
        main.classList.remove("no-interactions")

    }

})

document.addEventListener("keydown", function (e) {    //stoping interactions using(space ,enter or tab )when alert is open
    var modalIsOpen = layer.classList.contains("d-flex");
    if (modalIsOpen && (e.key === "Enter" || e.key === " " || e.key === "Tab")) {
        e.preventDefault();
    }
});

///////////////////inputs and main data handling///////////////

if (localStorage.getItem("bookmarks") == null) {
    allBookmarks = [];
}
else {
    allBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    display();
}

function addBookmark() {

    if (validateInputs(siteName) && validateInputs(siteUrl)) {

        var Bookmark = {
            name: siteName.value,
            url: siteUrl.value

        };
        allBookmarks.push(Bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));
        clear();
        display();
    }

    else {
        layer.classList.remove("d-none");
        layer.classList.add("d-flex");
        main.classList.add("no-interactions");

    }

}

function clear() {
    siteName.value = "";
    siteUrl.value = "";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}


function display() {

    var blackbox = ``;
    for (var i = 0; i < allBookmarks.length; i++) {
        blackbox += `  <tr>
      <th scope="row">${i + 1}</th>
      <td>${allBookmarks[i].name}</td>
      <td><button onclick="window.open('${allBookmarks[i].url}', '_blank')" class="btn btn-visit" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button></td>
      <td><button onclick="deletebookmark(${i});" class="btn btn-delete pe-2" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button></td>

    </tr>`
    }
    document.getElementById("rows").innerHTML = blackbox;
}

function deletebookmark(deletedIndex) {
    // allBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    allBookmarks.splice(deletedIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));
    display();

}
function validateInputs(element) {
    var regex = {
        bname: /^[a-zA-Z0-9]{3,}$/,
        burl: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

    }

    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        // console.log("valid")
        return true;

    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        // console.log("not-valid")
        return false;
    }
}