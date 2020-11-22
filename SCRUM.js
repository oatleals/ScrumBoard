const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach(item => {
        addNewNote(item.color, item.note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(color = "rgb(100, 149, 237)", text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div
                id = "note"
                class = "note
                draggable = "true"
                ondragstart = "onDragStart(event);"
            >
                draggable
            </div>

            <div class="tools" style="background-color:`+ color + `">
                <select class="status"></select>
                <button class="edit">EDIT</i></button>
                <button class="delete">DELETE</i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

    note.onmousedown = function(event) {
        let shiftX = event.clickX - note.getBoundingClientRect().left;
        let shiftY = event.clientY - note.getBoundingClientRect().top;

        note.style.position = 'absolute';
        note.style.zIndex = 1000;
        document.body.append(note);
        
        function moveAt(pageX, pageY) {
            note.style.left = pageX - note.offsetWidth / 2 + 'px';
            note.style.top = pageY - note.offsetHeight / 2 + 'px';
        }

        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);
        note.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;    
        };
    };

    note.ondragstart = function(){
        return false;
    };

    const statusSelect = note.querySelector(".status");
    const toolsDiv = note.querySelector(".tools");

    const obj = {
        "rgb(100, 149, 237)": "Blue/新建",
        "rgb(127, 255, 170)": "Mint/UI开发中",
        "rgb(148, 0, 211)": "Purple/API开发中",
        "rgb(255, 69, 0)": "Red/UI集成API",
        "rgb(255, 192, 203)": "Pink/完成",
    }

    let str = "";
    Object.entries(obj).map(([key, value]) => {
        if (color === key) {
            str += `<option value="` + key + `" selected>` + value + `</option>`;
        } else {
            str += `<option value="` + key + `">` + value + `</option>`;
        }
    })
    statusSelect.innerHTML = str;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    statusSelect.addEventListener("change", e => {
        toolsDiv.style.backgroundColor = e.target.value;

        updateLS();
    });

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const toolsArr = document.querySelectorAll(".tools");
    const toolsColorArr = [];
    toolsArr.forEach(item => { toolsColorArr.push(item.style.backgroundColor) });

    const notesText = document.querySelectorAll("textarea");
    const notesTextArr = [];
    notesText.forEach(item => { notesTextArr.push(item.value) });

    const notes = [];

    notesText.forEach((note, index) => {
        notes.push({
            color: toolsColorArr[index],
            note: note.value,
        });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}
