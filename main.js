const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];



const eleContainerPosts = document.getElementById('container');


//ciclo per scorrere gli oggetti dell'arrey ed appenderli nel DOM
for (let indexPost = 0; indexPost < posts.length; indexPost++) {

    //condizionale per inserire le iniziale autore qundo l'immagine profilo non c'è
    let arrNamesAuthors = posts[indexPost]['author']['name'].split(' ');
    let letterName = arrNamesAuthors[0][0] + arrNamesAuthors[1][0];
    let authorPicName; 
    let authorPic;
    if (posts[indexPost]['author']['image'] == null) {
        authorPic = null;
        authorPicName = letterName;
        
    }else {
        authorPic = posts[indexPost]['author']['image'];
        authorPicName = posts[indexPost]['author']['name'];
    }

    //creo il post con i dati dell'arrey di oggetti posts
    const elePost = document.createElement('div');
    elePost.classList.add('post');
    elePost.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src=${authorPic} alt=${authorPicName}>                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${posts[indexPost]['author']['name']}</div>
                    <div class="post-meta__time">${posts[indexPost].created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.</div>
        <div class="post__image">
            <img src=${posts[indexPost]['media']} alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid=${posts[indexPost].id}>
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id=${posts[indexPost].id} class="js-likes-counter">${posts[indexPost].likes}</b> persone
                </div>
            </div> 
        </div> 
    `;



    eleContainerPosts.append(elePost);

}




// ciclo per aggiungere eventlistener a tutti i bottoni like
for (let i = 0; i < posts.length; i++) {
    const eleLikeButton = document.querySelector(`[data-postid="${posts[i].id}"]`);
    eleLikeButton.addEventListener('click', pressLikeButton);   
}


const arrPostsLiked = [];
//funzione per aumentare i likes e salvare gli id dei post liked
function pressLikeButton(event) {
    this.classList.toggle('like-button--liked');

    const eleLikesCounter = document.querySelectorAll('.js-likes-counter');

    const index = this.attributes['data-postid'].value - 1; // (id post - 1) equivale all'indice del post nell'arrey

    //condizionale per aggiungere o togliere il like 
    if (this.classList.contains('like-button--liked')) {

        eleLikesCounter[index].innerHTML = posts[index].likes += 1 // incremento numero likes

        arrPostsLiked.push(posts[index].id); //inserisco gli id dei post liked in un nuovo arrey

    }else {
        eleLikesCounter[index].innerHTML = posts[index].likes -= 1 // decremento numero likes

        arrPostsLiked.pop(posts[index].id); //tolgo dal nuovo arrey gli id dei post a cui ho tolto il like
    }
    
    event.preventDefault()
}
