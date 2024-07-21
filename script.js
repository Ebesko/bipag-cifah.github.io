function showStuff(id, text, btn) {
    document.getElementById(id).style.display = 'grid';
    document.getElementById(text).style.display = 'none';
    btn.style.display = 'block';
}

function showSpecial(id, text, btn) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(text).style.display = 'none';
    document.getElementById("showfirst").style.display = 'none';
    document.getElementById("generate").disabled = false; 
    btn.style.display = 'block';
}

function hiddenBefore(id, text, btn) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(text).style.display = 'block';
    btn.style.display = 'block';
}

function getdiffvalues() {
    const data = new FormData(myform);
    var year = document.getElementById("year");
    var nbftyp2 = document.getElementById("minortyptest");
    var nbfname = document.getElementById("minor");
    var semester = document.getElementById("semester");
    console.log("Année d'inscription: 20" + year.value + ", type de mineure: " + nbftyp2.value + ", nom de la mineure: " + nbfname.value + ", semestre: " + semester.value);
}

function minitest() {
    var nbfname = document.getElementById("minor");
    document.getElementById("to_show_when_generate").innerHTML = nbfname.value;
}

async function start() {
    // Clean before use
    document.getElementById("generated").innerHTML = "";
    var divmodulen_minor = document.querySelector(".modul-minor");
    divmodulen_minor.innerHTML = "";

    // Fetch form data
    const data = new FormData(myform);
    var year = document.getElementById("year");
    var nbftyp2 = document.getElementById("minortyp");
    var nbfname = document.getElementById("minor");
    var semester_gwlt = document.getElementById("semester");

    // Fetch courses data from JSON files
    const response_history = await fetch("history.json");
    const hist = await response_history.json();

    console.log(nbftyp2 + nbfname + ".json")

    const response_minor = await fetch("minor/bild.json");
    const minor = await response_minor.json();

    // Function to create and append course elements
    function appendCourseElements(course, containerClass) {
        var numberElement = document.createElement("p");
        numberElement.innerText = course.num;
        var nomElement = document.createElement("p");
        nomElement.innerText = course.nom;
        var pointsElement = document.createElement("p");
        pointsElement.innerText = course.ECTS;
        var semesterElement = document.createElement("p");
        semesterElement.innerText = course.semestre;
        var choiceElement = document.createElement("p");
        choiceElement.innerText = course.choix;

        var divmodulen = document.querySelector(containerClass);
        divmodulen.appendChild(numberElement);
        divmodulen.appendChild(nomElement);
        divmodulen.appendChild(pointsElement);
        divmodulen.appendChild(semesterElement);
        divmodulen.appendChild(choiceElement);
    }

    if (semester_gwlt.value == "all") {
        // Append all minor courses
        for (let module_of_minor of minor) {
            appendCourseElements(module_of_minor, ".modul-minor");
        }

        // Append all history courses
        for (let module_of_hist of hist) {
            appendCourseElements(module_of_hist, ".modul-hist");
        }
    } else {
        // Append specific semester courses
        for (let module_of_hist of hist) {
            if (module_of_hist.semestre == semester_gwlt.value) {
                appendCourseElements(module_of_hist, ".modul-hist");
            }
        }

        for (let module_of_minor of minor) {
            if (module_of_minor.semestre == semester_gwlt.value) {
                appendCourseElements(module_of_minor, ".modul-minor");
            }
        }
    }

    document.getElementById("generated").style.display = 'grid';
}

