let instaPosts = [

    {
        'instaName': 'trueNews',
        'image': './img/haus.jpg',
        'description': 'Ein Wohngebäude inmitten von Italien, erleidet schwere Schäden durch einen Erdrutsch!',
        'likes': 45,
        'liked': false,
        'comments': []
    },

    {
        'instaName': 'bikeShop',
        'image': './img/harley.jpg',
        'description': 'Dieses Prachstück wird zu einem Unschlagbaren Preis von 25.000€ verkauft!. Schnappen sie es sich bevor es zu spät ist!',
        'likes': 5,
        'liked': false,
        'comments': []
    },

    {
        'instaName': 'catBusiness',
        'image': './img/cat.jpg',
        'description': 'Wenn selbst die Katze beim programmieren den Geist aufgibt, was könnne wir dann noch tun?',
        'likes': 78,
        'liked': false,
        'comments': []
    }
];


function show() {
    document.getElementById('postContainer').innerHTML = '';

    for (let i = 0; i < instaPosts.length; i++) {
        const post = instaPosts[i];
        let commentsHTML = '';

        for (let j = 0; j < post.comments.length; j++) {
            commentsHTML += `<div class="comment">${post.comments[j]}</div>`;
        }

        document.getElementById('postContainer').innerHTML += /*html*/`
            <div class="post">
               <div class="postHeader">
                  <img src="./img/biker.png" alt="Profile">
                  <div class="username">${post['instaName']}</div>
               </div>
               <div class="postImage">
                   <img src="${post['image']}">
               </div>
               <div class="postDescription">
                   <p>${post['description']}</p>
                </div>
                <div class="postActions">
                    <button class="likeButton ${post.liked ? 'liked' : ''}" onclick="toggleLike(${i})">&#10084; ${post['likes']}</button>
                </div>
                <div class="commentSection">
                    <input class="commentInput" id="commentInput${i}" type="text" placeholder="Kommentar hinzufügen...">
                    <button class="commentButton" onclick="addComment(${i})">Kommentieren</button>
                    <div class="commentsContainer">
                    ${commentsHTML}
                </div>
            </div>
        `;
    }
}


function toggleLike(index) {
    const post = instaPosts[index];
    if (post.liked) {
        post.likes--;  // Verringert die Anzahl der Likes, wenn bereits geliked ist
        post.liked = false;  // Setzt den Status auf nicht geliked
    } else {
        post.likes++;  // Erhöhe die Anzahl der Likes
        post.liked = true;  // Setze den Status auf geliked
    }
    saveToLocalStorage();
    show();
}


function addComment(index) {
    let inputElement = document.getElementById(`commentInput${index}`);
    if (inputElement.value.trim() !== '') {  // abcheccken ob das Kommentarfeld nicht leer ist
        instaPosts[index].comments.push(inputElement.value.trim()); // Kommentar zum Array hinzufügen
        inputElement.value = ''; // Eingabefeld leeren.
        saveToLocalStorage();
        show(); // Aktualisiert die Ansicht um den neuen Kommentar anzuzeigen
    }
}


function saveToLocalStorage() {
    localStorage.setItem('instaPosts', JSON.stringify(instaPosts));
}


function loadFromLovalStorage() {
    let data = localStorage.getItem('instaPosts');
    if (data) {
        instaPosts = JSON.parse(data);
    }
}


loadFromLovalStorage();
show();