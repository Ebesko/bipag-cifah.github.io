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
    var tonk = Object.fromEntries(data);
    var year = document.getElementById("year");
    var nbftyp2 = document.getElementById("minortyptest");
    var nbfname = document.getElementById("minor");
    var semester = document.getElementById("semester");
    console.log("Année d'inscription: 20" + year.value + ", type de mineure: " + nbftyp2.value + ", nom de la mineure: " + nbfname.value + ", semestre: " + semester.value);
}

function minitest() {
    var nbfname = document.getElementById("minor");
    document.getElementById("to_show_when_generate").innerHTML = nbfname.value;

    //
}

async function start() {
    //Clean before use
    document.getElementById("generated").innerHTML = "";
    var divmodulen_bild = document.querySelector(".modul-minor");
    divmodulen_bild.innerHTML = "";

    // Récupération des données de formulaire
    const data = new FormData(myform);
    var tonk = Object.fromEntries(data);
    var year = document.getElementById("year");
    var nbftyp2 = document.getElementById("minortyptest");
    var nbfname = document.getElementById("minor");
    var semester_gwlt = document.getElementById("semester");

    // Récupération des cours depuis le fichier JSON:
    //Histoire (dans tout les cas):
    const reponse_history = await fetch("history.json");
    const hist = await reponse_history.json();

    const reponse_bild = await fetch("minor/bild.json");
    const bild = await reponse_bild.json();

    console.log(semester_gwlt.value)

    if (semester_gwlt.value == "all") {
        //Modules de mineure
        for (let module_of_bild of bild) {
            console.log("in loop bild");

            var numberElement2 = document.createElement("p");
            numberElement2.innerText = module_of_bild.num;
            var nomElement2 = document.createElement("p");
            nomElement2.innerText = module_of_bild.nom;
            var pointsElement2 = document.createElement("p");
            pointsElement2.innerText = module_of_bild.ECTS;
            var semesterElement2 = document.createElement("p");
            semesterElement2.innerText = module_of_bild.semestre;
            var choiceElement2 = document.createElement("p");
            choiceElement2.innerText = module_of_bild.choix;

            var divmodulen2 = document.querySelector(".modul-minor");
            divmodulen2.appendChild(numberElement2);
            divmodulen2.appendChild(nomElement2);
            divmodulen2.appendChild(pointsElement2);
            divmodulen2.appendChild(semesterElement2);
            divmodulen2.appendChild(choiceElement2);
        } 
        console.log("One full bild loop")

        // Modules d'Histoire
        for (let modules in hist) {
            console.log("in loop hist");
            var module_of_hist = hist[modules];

            var numberElement = document.createElement("p");
            numberElement.innerText = module_of_hist.num;
            var nomElement = document.createElement("p");
            nomElement.innerText = module_of_hist.nom;
            var pointsElement = document.createElement("p");
            pointsElement.innerText = module_of_hist.ECTS;
            var semesterElement = document.createElement("p");
            semesterElement.innerText = module_of_hist.semestre;
            var choiceElement = document.createElement("p");
            choiceElement.innerText = module_of_hist.choix;

            var divmodulen = document.querySelector(".modul-hist");
            divmodulen.appendChild(numberElement);
            divmodulen.appendChild(nomElement);
            divmodulen.appendChild(pointsElement);
            divmodulen.appendChild(semesterElement);
            divmodulen.appendChild(choiceElement);
        } 
    } else {
        //Si un semestre et pas tous les modules 
        console.log("else value:" + semester_gwlt.value);

        var numberElement = document.createElement("p");
        numberElement.innerText = hist[(semester_gwlt.value - 1)].num;
        var nomElement = document.createElement("p");
        nomElement.innerText = hist[(semester_gwlt.value - 1)].nom;
        var pointsElement = document.createElement("p");
        pointsElement.innerText = hist[(semester_gwlt.value - 1)].ECTS;
        var semesterElement = document.createElement("p");
        semesterElement.innerText = hist[(semester_gwlt.value - 1)].semestre;
        var choiceElement = document.createElement("p");
        choiceElement.innerText = hist[(semester_gwlt.value - 1)].choix;

        var divmodulen = document.querySelector(".modul-hist");
        divmodulen.appendChild(numberElement);
        divmodulen.appendChild(nomElement);
        divmodulen.appendChild(pointsElement);
        divmodulen.appendChild(semesterElement);
        divmodulen.appendChild(choiceElement);

        var numberElement2 = document.createElement("p");
        numberElement2.innerText = bild[(semester_gwlt.value - 1)].num;
        var nomElement2 = document.createElement("p");
        nomElement2.innerText = bild[(semester_gwlt.value - 1)].nom;
        var pointsElement2 = document.createElement("p");
        pointsElement2.innerText = bild[(semester_gwlt.value - 1)].ECTS;
        var semesterElement2 = document.createElement("p");
        semesterElement2.innerText = bild[(semester_gwlt.value - 1)].semestre;
        var choiceElement2 = document.createElement("p");
        choiceElement2.innerText = bild[(semester_gwlt.value - 1)].choix;

        var divmodulen_bild = document.querySelector(".modul-minor");
        divmodulen_bild.appendChild(numberElement2);
        divmodulen_bild.appendChild(nomElement2);
        divmodulen_bild.appendChild(pointsElement2);
        divmodulen_bild.appendChild(semesterElement2);
        divmodulen_bild.appendChild(choiceElement2);
    }
    
    document.getElementById("generated").style.display = 'grid';
    
}
