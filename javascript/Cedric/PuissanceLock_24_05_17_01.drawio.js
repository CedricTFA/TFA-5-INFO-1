/* 
Qui : Coranthin Gomy et Cédric Elsen de 5 ème transition informatique a l'IPET.
Quand : 2023-2024
Quoi : Ce travail est un travail de fin d'année en 5 ème transition informatique a l' IPET. Il doit être réaliser par groupe de 2 élèves de la classe.Il faut réaliser un  puissance 4 avec une modification personelle en HTML CSS et javascript et faire un organigrame avec toute l'analyse du projet ainsi que sa présentation. Il faut apporter une petite modification au jeu pour qu'il soit personnel. ce travail est demander pour le cours de laboratoire informatique avec Monsieur Lorie et informatique avec Monsieur Benidir.

                    Règles :

Avant que la partie ne commence, les joueurs doivent entrer leur pseudo.

Si c'est la première partie alors créer et afficher la grille, préparer les pions.

Sinon enlever tous les pions de la grille et préparer les pions.

Au commencement de la partie, le joueur n°1 choisit l'emplacement qu'il veut bloquer avec son locker.

Ensuite c'est au tour du joueur n°2 de choisir un endroit différent du joueur n°1. 

Lorsque la partie commence, chacun à son tour, un joueur choisit une colonne dans laquelle il va déposer son pion.

Si la colonne n'est pas remplie jusqu'au bout alors il peut poser son pion. 

Sinon le joueur doit choisir une autre colonne. 

Si autant de pions bleus que la puissance choisie sont alignés (horizontalement,verticalement ou diagonalement). Alors le joueur 1 a gagné

Si autant de pions rouges que la puissance choisie sont alignés (horizontalement,verticalement ou diagonalement). Alors le joueur 2 a gagné

Si la grille est remplie a 100% et aucun des 2 joueurs ont alignés le nombre de pions qu'il fallait alors match nul.

Si un joueur joue dans une colonne pleine alors le pion ne sera pas déposé. Il devra choisir une autre colonne.
*/

function clignotementPionGagnant(listePionAlignes){
    // Initialiser les variabmes
    let opaciter = 0;
    let incrementation = 0;
    // Pour tout les éléments dans la liste, les faire clignoter
    listePionAlignes.forEach(id => {
        // Récupérer les elements grâce a leurs id
        const element = document.getElementById(id);
        setInterval(() => {
            opaciter += incrementation;
            // Si l'opactier est a 100% alors diminuer l'opactier et si elle est a 0% alors augmenter l'opaciter
            if (opaciter >= 100) {
                incrementation = -1;
                opaciter = 100;
            } else if (opaciter <= 0) {
                incrementation = 1;
                opaciter = 0;
            }
            // Attribuer l'opaciter a mon element
            element.style.opacity = opaciter / 100;
        },30);
    });
}


function locker(grille, ligneSelectionner, colonneSelectionner){
    console.log(grille);
    // Initialiser les variables
    let lockerColonne1 = 0;
    let lockerligne1 = 0;
    let locker1Poser = false;
    let locker2Poser = false;
    let emplacementDifferents = true;
    
    
    // Parcourir toute la grille et vérifier si elle contient locker1
    for (let ligneGrille = 0; ligneGrille < grille.length; ligneGrille++){
        for (let colonneGrille = 0; colonneGrille < grille[ligneGrille].length;colonneGrille++){
            if (grille[ligneGrille][colonneGrille] == "locker1"){
                locker1Poser = true;
                lockerligne1 = ligneGrille;
                lockerColonne1 = colonneGrille;
                
            }
            if (grille[ligneGrille][colonneGrille] == "locker2"){
                locker2Poser = true;
            }
        }
    }
    
    // prendre les données de la cellule qui a été sélectionner
    const cellule = document.getElementById("ligneTableau" + ligneSelectionner + "_" + "colonneTableau" + colonneSelectionner);
    const image = cellule.querySelector("img");
    // Si il y a pas de locker dans la grille
    if (locker1Poser === false && locker2Poser === false){
        // Poser locker1 et retenir qu'il est posé
        image.src = "../../../../../Z_Image/texture-bois-jaune.jpeg";
        grille[ligneSelectionner][colonneSelectionner] = "locker1";
        locker1Poser = true;
        // jouer un son
        jouerAudio("locker");
        // Changer le message de locker et dire au joueur suivant de plaer son locker
        const messageLocker = document.getElementById("messageLocker");
        document.getElementById("messageLocker").innerHTML = localStorage.getItem("pseudoJoueur2") + " place ton locker dans la grille";
        messageLocker.style.color = "red";
        
    }
    
    // Si il y a juste le locker1 dans la grille
    else{
        
        
        // Vérifier que l'emplacement du locker2 est différent de celui du locker1
        if (ligneSelectionner == lockerligne1 && colonneSelectionner == lockerColonne1){
            console.log("même emplacement");
            emplacementDifferents = false;
            alert("Vous devez placer votre locker a un endroit différent de celui de " + localStorage.getItem("pseudoJoueur1"));
        }
        // Si la case selectionner est différente de l'emplacement du locker1 alors on pose le locker 2
        if (locker1Poser === true && locker2Poser === false && emplacementDifferents === true){
            // Poser le locker2
            image.src = "../../../../../Z_Image/texture-bois-rouge.jpeg";
            grille[ligneSelectionner][colonneSelectionner] = "locker2";
            lockersPoser = true;
            // jouer un son
            jouerAudio("locker");
            document.getElementById("messageLocker").style.display = "none";
            const messageJoueurActif = document.getElementById("messageJoueurActif");
            messageJoueurActif.innerHTML = "C'est au tour de " + joueurActif + " de jouer";
            messageJoueurActif.style.display = "block";
            messageJoueurActif.style.color = "yellow";

        }
    
    }
    console.log("grille : ", grille);
    return grille;
}



function verifierPionAligner(puissance, grille) {
    // Initialiser les variables
    let gagnant = "";
    console.log("puissanceVerifier", puissance);
    
    // Créer une variable qui dis quels pions faut-il faire clignoter une fois qu'un joueur gagne
    let listePionAlignes = [];

    // Parcourir la grille pour vérifier les alignements horizontalement et verticalement
    for (let ligne = 0; ligne < grille.length; ligne++){
        
        for (let colonne = 0; colonne < grille[ligne].length; colonne++) {
            // Vérifier alignements horizontaux
            if (colonne <= grille[ligne].length - puissance){
                let pionActuel = grille[ligne][colonne];
                let nombrePionAligne = 1;
                
                // Regarde 'puissance'-1 pions plus loins pour voir si il y a un alignement de 'puissance' pions
                for (let i = 1; i < puissance; i++) {
                    
                    if (grille[ligne][colonne + i] === pionActuel && pionActuel !== "vide") {
                        // Si le pion suivant est identique et n'est pas vide, ajouter 1 a nombrePionAligner                        
                        console.log("pionaligne : " + listePionAlignes);
                        nombrePionAligne += 1;
                        
                    } else {
                        // si pion suivant n'est pas identique alors sortir de la boucle.
                        break;
                    }
                }
                if (nombrePionAligne === puissance) {
                    // Si le nombre de pions alignés égal la puissance alors mettre gagant a pionActuel.
                    gagnant = pionActuel;
                    
                    // ajouter toutes les cases alignés en partant de la case qui a été analyser (ligne ; colonne)
                    for (let colonneDuPionAligne = colonne; colonneDuPionAligne <= colonne + puissance - 1; colonneDuPionAligne++){
                        listePionAlignes.push("ligneTableau" + ligne + "_colonneTableau" + colonneDuPionAligne);
                    }
                    console.log(listePionAlignes);
                    
                    
                }
            }

            // Vérifier alignements verticaux
            if (ligne <= grille.length - puissance) {
                let pionActuel = grille[ligne][colonne];
                let nombrePionAligne = 1;
                
                // Regarde 'puissance'-1 pions plus loins pour voir si il y a un alignement de 'puissance' pions
                for (let i = 1; i < puissance; i++) {
                    if (grille[ligne + i][colonne] == pionActuel && pionActuel !== "vide") {
                        // Si le pion suivant est identique et n'est pas vide, ajouter 1 a nombrePionAligner
                        nombrePionAligne += 1;
                    } else {
                        // Si pion suivant n'est pas identique alors sortir de la boucle.
                        break;
                    }
                }
                if (nombrePionAligne === puissance) {
                    // Si le nombre de pions alignés égal la puissance alors mettre gagant a pionActuel.
                    gagnant = pionActuel;
                    // ajouter toutes les cases alignés en partant de la case qui a été analyser (ligne ; colonne)
                    for (let ligneDuPionAligne = ligne; ligneDuPionAligne <= puissance; ligneDuPionAligne++){
                        listePionAlignes.push("ligneTableau" + ligneDuPionAligne + "_colonneTableau" + colonne);
                    }
                    console.log(listePionAlignes);
                                      
                }
            }
        }
    }

    // Vérification des alignements diagonaux
    for (let ligne = 0; ligne <= grille.length - puissance; ligne++) {
        for (let colonne = 0; colonne <= grille[ligne].length - puissance; colonne++) {
            // Vérification de la diagonale "\"
            let pionActuel = grille[ligne][colonne];
            let nombrePionAligne = 1;
            for (let i = 1; i < puissance; i++) {
                // Regarde 'puissance'-1 pions plus loins diagonalement "\" pour voir si il y a un alignement de 'puissance' pions 
                if (grille[ligne + i][colonne + i] == pionActuel && pionActuel !== "vide") {
                    // Si le pion suivant est identique et n'est pas vide, ajouter 1 a nombrePionAligner
                    nombrePionAligne++;
                } else {
                    // Si pion suivant n'est pas identique alors sortir de la boucle.
                    break;
                }
            }
            if (nombrePionAligne === puissance) {
                // Si le nombre de pions alignés égal la puissance alors mettre gagant a pionActuel.
                gagnant = pionActuel;
                // ajouter toutes les cases alignés en partant de la case qui a été analyser (ligne ; colonne)
                for (let coordonneeDuPionAligne = 0; coordonneeDuPionAligne < puissance; coordonneeDuPionAligne++){
                    listePionAlignes.push("ligneTableau" + (ligne + coordonneeDuPionAligne) + "_colonneTableau" + (colonne + coordonneeDuPionAligne));
                }
                console.log(listePionAlignes);
            }

            // Vérification de la diagonale "/"
            pionActuel = grille[ligne][colonne + puissance - 1];
            nombrePionAligne = 1;
            for (let i = 1; i < puissance; i++) {
                // Regarde 'puissance'-1 pions plus loins diagonalement "/" pour voir si il y a un alignement de 'puissance' pions
                if (grille[ligne + i][colonne + puissance - 1 - i] == pionActuel && pionActuel !== "vide") {
                    // Si le pion suivant est identique et n'est pas vide, ajouter 1 a nombrePionAligner
                    nombrePionAligne++;
                } else {
                    // Si pion suivant n'est pas identique alors sortir de la boucle.
                    break;
                }
            }
            if (nombrePionAligne === puissance) {
                // Si le nombre de pions alignés égal la puissance alors mettre gagant a pionActuel.
                gagnant = pionActuel;
                // ajouter toutes les cases alignés en partant de la case qui a été analyser (ligne ; colonne)
                for (let coordonneeDuPionAligne = 0; coordonneeDuPionAligne < puissance; coordonneeDuPionAligne++){
                    listePionAlignes.push("ligneTableau" + (ligne + coordonneeDuPionAligne) + "_colonneTableau" + (colonne + puissance -1 -coordonneeDuPionAligne));
                }
                console.log(listePionAlignes);
                
            }
        }
    }


    // Vérifier si la grille est pleine
    let grillePleine = true;
    for (let ligne = 0; ligne < grille.length; ligne++) {
        for (let colonne = 0; colonne < grille[ligne].length; colonne++) {
            if (grille[ligne][colonne] == "vide" || grille[ligne][colonne] == "locker1" || grille[ligne][colonne] == "locker2") {
                grillePleine = false;
            }
        }
        if (grillePleine === true){
            break;
        }
    }
    if (grillePleine === true ){
        jouerAudio("égalité");
        partieTerminer = true;
        const messageEgalite = document.getElementById("messageGagnant");
        messageGagnant.innerHTML = "Égalité, bien jouer a vous !";
        messageGagnant.style.display = "block";
        // faire disparaitre le message qui indique a qui estle tour
        document.getElementById("messageJoueurActif").style.display = "none";
    }
    // Lorsqu'il y a un gagnant il faut informer les utilisateur, un texte va apparaitre
    if (gagnant == "joueur1" || gagnant == "joueur2"){
        const messageGagnant = document.getElementById("messageGagnant");
        if (gagnant == "joueur1"){
            messageGagnant.innerHTML = localStorage.getItem("pseudoJoueur1") + " à gagné !";
            messageGagnant.style.color = "yellow";
        }
        else{
            messageGagnant.innerHTML = localStorage.getItem("pseudoJoueur2") + " à gagné !";
            messageGagnant.style.color = "red";
        }
        
        messageGagnant.style.display = "block";
        // faire disparaitre le message qui indique a qui estle tour
        document.getElementById("messageJoueurActif").style.display = "none";
        partieTerminer = true;

        clignotementPionGagnant(listePionAlignes);

        // jouer le son après le son de poser le pion
        setTimeout(() => {
            jouerAudio("gagnant");
        },450);
        
        // Stocker en local le gagnant
        localStorage.setItem("gagnant", gagnant);
        let scoreActuelJoueur1 = localStorage.getItem("scoreJoueur1");
        let scoreActuelJoueur2 = localStorage.getItem("scoreJoueur2");

        // Ajouter le score aux joueurs
        if (localStorage.getItem("gagnant") == "joueur1"){
            scoreActuelJoueur1++;
            localStorage.setItem("scoreJoueur1", scoreActuelJoueur1);
        }
        if (localStorage.getItem("gagnant") == "joueur2"){
            scoreActuelJoueur2++;
            localStorage.setItem("scoreJoueur2", scoreActuelJoueur2);
        }
    }

    // Afficher le bouton rejouer après 3 secondes si la partie est finie
        if (partieTerminer === true){
            
            const boutonRejouer = document.getElementById("boutonRejouer");
            boutonRejouer.style.opacity = "0";
            boutonRejouer.style.display = "block";

            setTimeout(() => {
                for (let opaciter = 0; opaciter <= 70; opaciter++){
                    setTimeout(function() {
                        // Mettre l'opaciter du bouton a opaciter en pourcentage
                        boutonRejouer.style.opacity = opaciter/100;
                    },opaciter * 5); // ajouter du temps pour chaque incrémentation pour que toutes les animations ne se fassent pas d'un coup en même temps 
                }
                
                

            },3000);
            
        }    afficherTableauScore();
}


function jeu(boutonCliquer){
    // Initialiser les variables
    joueurActif = localStorage.getItem("pseudoJoueur1");

    // Afficher / Cacher les div qu'il faut
    document.getElementById("messageGagnant").style.display = "none";
    const messageLocker = document.getElementById("messageLocker");
    messageLocker.innerHTML = localStorage.getItem("pseudoJoueur1") + " place ton Locker dans la grille"; 
    messageLocker.style.display = "block";
    messageLocker.style.color = "yellow";
    document.getElementById("boutonQuitter").style.display = "block";
    document.getElementById("tableauScore").style.display = "block";
    

    // initialiser la valeur locale en début de partie
    if (boutonCliquer == "jouer"){
        localStorage.setItem("scoreJoueur1", 0);
        localStorage.setItem("scoreJoueur2", 0);
    }
    localStorage.setItem("gagnant", "");
    // Déroulement de la partie
    preparerTableau(localStorage.getItem("nbreDeColonne"), localStorage.getItem("nbreDeLigne"));
       
}



function faireTomberPion(grille, colonneSelectionner){
    // Initialiser les variables
    let caseLibrePourPionActuel = 0; 
    let valeurCaseLibre = "";  
    console.log("colonne : ", colonneSelectionner);
    // Vérifier toutes les cases de la colonne en partant de celle tout en bas de la grille vers le haut
    for (caseColonne = (grille.length - 1); caseColonne >= 0; caseColonne--){
        // Si la case est vide alors la retenir
        if (grille[caseColonne][colonneSelectionner] == "vide" || grille[caseColonne][colonneSelectionner] == "locker1" || grille[caseColonne][colonneSelectionner] == "locker2"){
            caseLibrePourPionActuel = caseColonne;
            valeurCaseLibre = grille[caseColonne][colonneSelectionner];
            break;
            

        }
    }
    // En fonction de la valeur de la case libre, il faut ajouter des conditions ou non
    switch(valeurCaseLibre){
        case "vide":
            break;
        // Si la case est locker1 et que le joueurActif est joueur1 alors le pion pourra être posé sinon, il ne sera pas posé et la fonction s'arrêtera
        case "locker1":
            if (joueurActif == localStorage.getItem("pseudoJoueur1")){
                break;
            }
            else{
                alert("Cette case est verrouillée par " + localStorage.getItem("pseudoJoueur1"));
                return;
            }
        // Si la case est locker2 et que le joueurActif est joueur2 alors le pion pourra être posé sinon, il ne sera pas posé et la fonction s'arrêtera
        case "locker2":
            if (joueurActif == localStorage.getItem("pseudoJoueur2")){
                break;
            }
            else{
                alert("Cette case est verrouillée par "+ localStorage.getItem("pseudoJoueur2") + ". Veuillez choisir une autre case !");
                return;
            }
    }
    
    // Le pion du joueur 1 (Jaune) va s'afficher dans la case libre de la colonne sélectionnée.
    if (joueurActif == localStorage.getItem("pseudoJoueur1")){
        grille[caseLibrePourPionActuel][colonneSelectionner] = "joueur1";
        const cellule = document.getElementById("ligneTableau" + caseLibrePourPionActuel + "_" + "colonneTableau" + colonneSelectionner);
        const image = cellule.querySelector("img");
        image.src = "../../../../../Z_Image/casePionJaune.jpeg";
        // changer le joueurActif
        joueurActif = localStorage.getItem("pseudoJoueur2");
        // jouer un son
        jouerAudio("pionPoser");
        
    }
    // Le pion du joueur 2 (Rouge) va s'afficher dans la case libre de la colonne sélectionnée.
    else{
        grille[caseLibrePourPionActuel][colonneSelectionner] = "joueur2";
        const cellule = document.getElementById("ligneTableau" + caseLibrePourPionActuel + "_" + "colonneTableau" + colonneSelectionner);
        const image = cellule.querySelector("img");
        image.src = "../../../../../Z_Image/casePionRouge.jpeg";
        // changer le joueurActif
        joueurActif = localStorage.getItem("pseudoJoueur1");
        // jouer un son
        new Audio("../../../../../Z_Son/piongrille.mp3").play();
    }
    
    verifierPionAligner(parseInt(localStorage.getItem("puissance")), grille);
    
    
    // Afficher a qui est le tour pour jouer
    const messageJoueurActif = document.getElementById("messageJoueurActif");
    messageJoueurActif.innerHTML = "C'est au tour de " + joueurActif + " de jouer";
    // Changer la couleur du joueurActif dans le message avec la couleur du pion
    if (joueurActif == localStorage.getItem("pseudoJoueur1")){
        messageJoueurActif.style.color = "yellow";
    }
    else{
        messageJoueurActif.style.color = "red";
    }
    // Retourner les valeurs
    return grille;
    
}


function selectionDeLaColonne(grille, colonneSelectionner){
    console.log(grille);

    // Initialiser les variables
    let colonneEligible = false;   

    // Si la partie est terminée alors les joueurs ne peuvent plus poser de pion (return ne retourne rien mais empêche la fonction de s'éxécuter entièrement)
    if (partieTerminer){
        alert("La partie est terminée, vous ne pouvez plus poser de pions");
        return;
    }
    // Vérifier la case tout au dessus de la colonne selectionner
    if (grille[0][colonneSelectionner] == "vide" || grille[0][colonneSelectionner] == "locker1" || grille[0][colonneSelectionner] == "locker2"){
            colonneEligible = true;
            console.log("La colonne ",colonneSelectionner," est éligible.");
            faireTomberPion(grille, colonneSelectionner);
            return colonneEligible;
        }  

    else{
        alert("Vous devez choisir une autre colonne car celle ci est pleine");
    }
}


function sauvegarderParametres(){
    
    // Initialiser les variables
    let parametresVerifier = false;
    let nbreEntier = false;
    
    // Récupérer les valeurs en paramètre.
    const nbreDeLigne = document.getElementById("nbreDeLigne").value;
    const nbreDeColonne = document.getElementById("nbreDeColonne").value;
    const puissance = document.getElementById("puissance").value;
    const pseudoJoueur1 = document.getElementById("pseudoJoueur1").value;
    const pseudoJoueur2 = document.getElementById("pseudoJoueur2").value;

    // Vérifier si les données entrer sont correct
    if (nbreDeLigne == parseInt(nbreDeLigne) && nbreDeColonne == parseInt(nbreDeColonne) && puissance == parseInt(puissance)){
        nbreEntier = true;
    }

    else{
        // avertir l'utilisateur et ne pas rafraichir la page et la laisser tel quel.
        alert("Vous devez entrer des nombres entiers dans les paramètres");
        return;      // Sortir de la fonction car erreur.
        
    }
    
    // une fois le nbreEntier vérifier, vérifier si le nbre est compris entre 4 et 28 compris.
    if (nbreEntier == true){
        if(nbreDeColonne >= 4 && nbreDeColonne <= 24 && nbreDeLigne >= 4 && nbreDeLigne <= 24){
            // Puissance comprise entre 4 et 7
            if (puissance >= 4 && puissance <= 7){
                // Pseudo joueurs doit être différents
                if (pseudoJoueur1 == pseudoJoueur2){
                    alert("Les joueurs doivent avoir un pseudo différent de l'autre !");
                    
                }
                else{
                    if (pseudoJoueur1 == parseInt(pseudoJoueur1) || pseudoJoueur2 == parseInt(pseudoJoueur2)){
                        alert("Les peudos des joueurs doivent contenir au moins une lettre");
                    }
                    else{
                        parametresVerifier = true;
                    }
                }
            }
            else{
                alert("La puissance doit être comprise entre 4 et 7 compris !");
            }
            

        
        }
        else{
            alert("Les nombres de Ligne et de colonne doivent être compris entre 4 et 24 compris !");
            return;      // Sortir de la fonction car erreur
        }
    
    }
    if (parametresVerifier){
        // Sauvegarder les paramètres en mémoire dans le stockage local.
        localStorage.setItem("nbreDeLigne", nbreDeLigne);
        localStorage.setItem("nbreDeColonne", nbreDeColonne);
        localStorage.setItem("puissance", puissance);
        localStorage.setItem("pseudoJoueur1", pseudoJoueur1);
        localStorage.setItem("pseudoJoueur2", pseudoJoueur2);
 
        // informer l'utilisateur que les paramètres ont bien été sauvegarder.
        alert("Les paramètres ont bien été sauvegardé.")
    }
}


function preparerTableau(nbreDeColonne, nbreDeLigne){
    // Initialiser les variables
    const tableau = document.createElement("table");
    let grille = [];
    partieTerminer = false;
    nbreDeColonne = localStorage.getItem("nbreDeColonne");
    nbreDeLigne = localStorage.getItem("nbreDeLigne");
    lockersPoser = false;

    // Mise en page du tableau.
    tableau.id = "grillePuissanceLock";
    tableau.style.setProperty("nbreDeColonnePourCss", nbreDeColonne)
    
    // créer les lignes dans la grille.
    for (let i = 0; i < nbreDeLigne; i++) {
        
        const ligne = document.createElement("tr");
        ligne.className = "ligneTableau";
        // Ajoute les lignes dans la liste grille.
        let grilleListeCase = [];
    

        // créer les colonnes dans la grille.
        for (let j = 0; j < nbreDeColonne; j++) {
            const cellule = document.createElement("td");
            cellule.className = "celluletableau";
            cellule.id = "ligneTableau" + i + "_" + "colonneTableau" + j;

            // Ajouter les cases vides ("vide") dans la liste grille.
            grilleListeCase.push("vide"); 


            // Ajouter un événement sur la cellule qui est créer
            
            cellule.addEventListener("click", () => {
                // Placer les lockers au début de partie
                console.log("cellule cliquer :" + cellule.id);
                if (lockersPoser === false){
                    locker(grille, i, j);
            
                }
                else{
                    selectionDeLaColonne(grille, j);
                }

            });
                
            
            
            // Faire la mise en page de la cellule (taille) selon le nbre de colonne et ligne et de l'image
            const image = document.createElement("img");
            
            if (nbreDeLigne > 14 || nbreDeColonne > 20){
                cellule.style.width = "3vh";
                cellule.style.width = "3vh";
                image.style.width = "3vh";
                image.style.width = "3vh";
            }

            else{ if(nbreDeLigne > 10 || nbreDeColonne >= 14){
                cellule.style.width = "5vh";
                cellule.style.width = "5vh";
                image.style.width = "5vh";
                image.style.width = "5vh";
                }
                else{
                    cellule.style.width = "7vh";
                    cellule.style.width = "7vh";
                    image.style.width = "7vh";
                    image.style.width = "7vh";
                }
            }

            image.className = "imageCaseGrille";
            image.src = "../../../../../Z_Image/texture-bois.jpeg";
            
            
            cellule.appendChild(image);
            
            // Ajouter une cellule dans la ligne (tr).
            ligne.appendChild(cellule);
        }

        grille.push(grilleListeCase);

        tableau.appendChild(ligne);
    }

    const grilleTableau = document.getElementById("grille");

    // Vider le contenu de la grille
    grilleTableau.innerHTML = "";

    grilleTableau.appendChild(tableau);
    console.log("Liste grille : ", grille);

    afficherTableauScore();

    



}


function afficherTableauScore(){
    // Afficher le tableau score en haut a droite
    const tableauScore = document.createElement("table");
    tableauScore.style.setProperty(2,2);
    
    // lignes du tableau des scores (tr)
    const ligneTitreTableauScore = document.createElement("tr");
    const ligneScoreJoueur1 = document.createElement("tr");
    const ligneScoreJoueur2 = document.createElement("tr");
    
    // Cellules dans les lignes du tableau des scores (td)
    const celluleTitreTableauScore = document.createElement("td");
    // La cellule prends la taille de 2 cellules (elle est fusionnée).
    celluleTitreTableauScore.setAttribute("colspan", "2");

    const textscoreJoueur1 = document.createElement("td");
    const textscoreJoueur2 = document.createElement("td");
    const scoreJoueur1 = document.createElement("td");
    const scoreJoueur2 = document.createElement("td");

    // Ajouter les classes des cellules créer ci dessus
    celluleTitreTableauScore.className = ("celluleTableauScore");
    textscoreJoueur1.className = ("celluleTableauScore");
    textscoreJoueur2.className = ("celluleTableauScore");
    scoreJoueur1.className = ("celluleTableauScore");
    scoreJoueur2.className = ("celluleTableauScore");

    // Attribuer les couleurs a leurs cases
    ligneScoreJoueur1.style.backgroundColor = "yellow";
    ligneScoreJoueur2.style.backgroundColor = "red";

    // Écrire dans les cellules
    celluleTitreTableauScore.innerHTML = "Score";
    textscoreJoueur1.innerHTML = localStorage.getItem("pseudoJoueur1");
    textscoreJoueur2.innerHTML = localStorage.getItem("pseudoJoueur2");
    scoreJoueur1.innerHTML = parseInt(localStorage.getItem("scoreJoueur1"));
    scoreJoueur2.innerHTML = parseInt(localStorage.getItem("scoreJoueur2"));

    // Ajouter les cellules dans leurs lignes
    
    ligneTitreTableauScore.appendChild(celluleTitreTableauScore);

    ligneScoreJoueur1.appendChild(textscoreJoueur1);
    ligneScoreJoueur1.appendChild(scoreJoueur1);

    ligneScoreJoueur2.appendChild(textscoreJoueur2);
    ligneScoreJoueur2.appendChild(scoreJoueur2);
    
    // Ajouter les lignes dans le taleauScore
    tableauScore.appendChild(ligneTitreTableauScore);
    tableauScore.appendChild(ligneScoreJoueur1);
    tableauScore.appendChild(ligneScoreJoueur2);
    
    // Ajouter le tableauScore au tableauDesScore qui est une div html
    const tableauDesScore = document.getElementById("tableauScore");
    tableauDesScore.innerHTML = "";
    tableauDesScore.appendChild(tableauScore);
}


// Si la page actuelle est parametre.html alors activer le boutonSauvegarderParametres
if (document.location.pathname.includes("parametre.html")) {

    // Lorsque le bouton sauvegarder les paramètres est cliqué alors les paramètres sont sauvegardés.
    const boutonSauvegarderParametres = document.getElementById("sauvegarderParametres");
    boutonSauvegarderParametres.addEventListener("click", function(){
        jouerAudio("clickBouton");
        // laisser un peu de temps au son pour qu'il soit jouer
        setTimeout(() => {
            sauvegarderParametres();
        },100);

    });
        

}


// Si la page actuelle est jouer_partie_puissance_4.html alors lancer la fonction créer grille.
if (document.location.pathname.includes("jouer_partie_puissance_4.html")) {
    
    // Cacher tout les élements graphiques de la partie
    document.getElementById("tableauScore").style.display = "none";
    document.getElementById("messageJoueurActif").style.display = "none";
    document.getElementById("messageLocker").style.display = "none";
    document.getElementById("messageGagnant").style.display = "none";
    document.getElementById("boutonQuitter").style.display = "none";
    
    document.getElementById("grille").style.display = "none";

    console.log("sonlobby");

    boutonJouer = document.getElementById("boutonJouer");
    boutonJouer.addEventListener("click", function(){
        jeu("jouer");
        jouerAudio("clickBouton");
    
        
        // Cacher le bouton jouer
        boutonJouer.style.display = "none";
        // Afficher l'élément grille
        document.getElementById("grille").style.display = "block";
    });

    const boutonRejouer = document.getElementById("boutonRejouer");
    boutonRejouer.addEventListener("click", () => {
        jeu("rejouer");
        jouerAudio("clickBouton");
        // Cacher le bouton rejouer
        boutonRejouer.style.display = "none";
    })

    const boutonQuitter = document.getElementById("boutonQuitter");
    boutonQuitter.addEventListener("click", () => {
        // Cacher tout les éléments du jeu et réafficher le bouton jouer
        document.getElementById("tableauScore").style.display = "none";
        document.getElementById("messageJoueurActif").style.display = "none";
        document.getElementById("messageLocker").style.display = "none";
        document.getElementById("messageGagnant").style.display = "none";
        document.getElementById("boutonQuitter").style.display = "none";
        document.getElementById("grille").style.display = "none";
        document.getElementById("boutonRejouer").style.display = "none";

        document.getElementById("boutonJouer").style.display = "block";
        
        jouerAudio("clickBouton");

        
    })
    
}

function jouerAudio(nomAudio){
    switch(nomAudio){
        case "clickBouton":
            new Audio("../../../../../Z_Son/clickbouton.wav").play();
            break;

        case "locker":
            new Audio("../../../../../Z_Son/lockergrille.wav").play();
            break;

        case "pionPoser":
            new Audio("../../../../../Z_Son/piongrille.mp3").play();
            break;

        case "gagnant":
            new Audio("../../../../../Z_Son/gagnant.wav").play();
            break;

        case "égalité":
            new Audio("../../../../../Z_Son/gagnant.wav").play();
            break;
            


    }
}