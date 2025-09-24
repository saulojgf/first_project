/*
===============================================
 Project Name : Menus
 File Name    : menus.jd
 Author       : Saulo Garcia
 Created On   : 2025-09-15
 Last Updated : 2025-09-15
 Version      : 1.0
 Description  : Handles menus behavior.
===============================================
*/

// ==============================================
const mainElemts = document.querySelector("main").querySelectorAll("[id]");
const main ={};
mainElemts.forEach(ele => {
    main[ele.id] = ele;
})
// ============================================
const header = document.querySelector("header").querySelectorAll("[id]");
const hdr = {};
header.forEach(ele => {
    hdr[ele.id] = ele; 
});
// ============================================
let itemsInCart = 0;
hdr.items_inCart.innerText = itemsInCart;

const getAddCartBtns = () => {
    const iframeBody = main.ctner_articles.contentDocument.body;
    const addCartBtns = iframeBody.querySelectorAll(".btn_addCart");
    console.log("Buttons add to cart were collected");
    return addCartBtns;
}

const addArticleCart = (event) => {
    console.log("Click in addCArt");
    // Get article's parent
    const article = event.target.closest("article");
    console.log(article);
    // Extracting product's info
    const productInfo = {
        id: article.id,
        name: article.querySelector(".card__title").textContent,
        price: article.querySelector("#price").textContent,
        image: article.querySelector(".image").src,           
    }
    console.log(productInfo);

    const articleHTML = 
    `<section class="cart__item-container">
        <input class="item__checkbox" type="checkbox" checked>
        <img class="item__image" src="${productInfo.image}" alt="${productInfo.name}">
        <p class="item__description">${productInfo.name}</p>
        <input class="item__quantity" type="number" min="1" max="100" step="1" value="1">
        <p class="item__price">${productInfo.price}</p>
        <span class="cart__icon-trash material-symbols-outlined">remove_shopping_cart</span>
    </section>`;

    // Adding product to list cart
    hdr.ctner_itemsCart.innerHTML += articleHTML;
    // Increas count items
    itemsInCart++;
    hdr.items_inCart.innerText = itemsInCart;
}

const removeArtCart = (item) => {
    item.remove();
    console.log("Item deleted successful")
    itemsInCart--;
    hdr.items_inCart.innerText = itemsInCart;
}

const addListenerAddCartBtns = (addCartBtns) => {
    addCartBtns.forEach(btn => {
        btn.addEventListener("click", addArticleCart);
    });
}

const articles = {};
const iframeGetObj = () => {
    const iframeBody = main.ctner_articles.contentDocument.body;
    const iframeElemts = iframeBody.querySelectorAll("button[id]");
    iframeElemts.forEach(ele => {
        articles[ele.id] = ele;
    })
    console.log("Gathering information DONE");
}

const showCategoMenu = (event) => {
    event.stopPropagation();
    hdr.ctner_menuCatego.classList.toggle("active");
    console.log("Click on btn Categories");
}


const showMenu = (event) => {
    event.stopPropagation();
    hdr.ctner_allBtnsMenu.classList.toggle("active");
    console.log("Click on Menu");
}

const hiddenCategoMenu = (event) => {
    hdr.ctner_menuCatego.classList.remove("active");
    console.log("Click on Close Menu Button");
}

const showCart = (event) => {
    event.stopPropagation();
    hdr.ctner_itemsCart.classList.toggle("active");
}

hdr.ctner_itemsCart.addEventListener("click", (e) => {
    console.log("Click over Shopping Cart");
    console.log(e.target);
    if(e.target.parentElement.classList.contains("cart__btn-close")){
        hdr.ctner_itemsCart.classList.remove("active");
        console.log("Cart was closed by clicking close button");
    }
    if(e.target.closest(".cart__icon-trash")){
        e.stopPropagation();
        const item = e.target.closest(".cart__item-container");
        console.log(item);
        removeArtCart(item);
    }
});

const closeElements = (event) => {
    if(!hdr.ctner_menuCatego.contains(event.target) &&
        hdr.ctner_menuCatego.classList.contains("active")){
            hdr.ctner_menuCatego.classList.remove("active")
            console.log("Menu disabled by clicking outside tghe menu");
        }
    if(!hdr.ctner_itemsCart.contains(event.target) &&
        hdr.ctner_itemsCart.classList.contains("active")){
            hdr.ctner_itemsCart.classList.remove("active");
            console.log("Shopping Cart was closed by clicking outside");
        }
    if(!hdr.ctner_allBtnsMenu.contains(event.target) &&
        hdr.ctner_allBtnsMenu.classList.contains("active")){
            hdr.ctner_allBtnsMenu.classList.remove("active");
            console.log("Menu in diveces was close by outside click");
        }
}

hdr.btn_catego.addEventListener("click", showCategoMenu);
hdr.btn_closeMenu.addEventListener("click", hiddenCategoMenu);
hdr.btn_shopCart.addEventListener("click", showCart);
hdr.btn_iconMenu.addEventListener("click", showMenu);

document.addEventListener("click", closeElements);
main.ctner_articles.contentDocument.addEventListener("click", closeElements);

// console.log(main.ctner_articles);
// console.log(main.ctner_articles.contentDocument);

/* ------------------------------------------------------------------------- 
    Build iframe with all articles inside
   ------------------------------------------------------------------------- */
const makeArticle = (product) => {
    const iframeBody = main.ctner_articles.contentDocument.body;
    const {id, 
            name, 
            description, 
            price, 
            category, 
            image, 
            details} = product;
    
    const setUp = (elem = null, classes = null, attr = null, text = null) => {
        // console.log(classes.constructor.name);
        if(text != null){elem.textContent = text;}
        if(classes != null){
            if(classes.constructor.name == "Array"){
                elem.classList.add(...classes);
            }else{
                elem.classList.add(classes);
            }
        }
        if(attr != null) {
            for(key in attr){
                // console.log(`Attr: ${key}, Value: ${attr[key]}`)
                elem.setAttribute(key, attr[key]);
            }

        }
    }

    const article = document.createElement("article");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const hdr2 = document.createElement("h2");
    const paragraph = document.createElement("p");
    const list = document.createElement("ul");
    const ilist = document.createElement("li");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const shoppingCart = span.cloneNode();
    const countItem = span.cloneNode();


    setUp(article, ["card"]);
    setUp(figure, ["card__image"]);
    setUp(img, ["image"], {src:image, alt:name});
    setUp(hdr2, ["card__title", "truncate"], null, name);
    setUp(paragraph, ["card__text", "truncate"], null, description);
    setUp(list, "card__tag-list");
    setUp(ilist, "tag-item");
    setUp(div, "card__buttons");
    setUp(button, "card__btn--blue");
    setUp(shoppingCart, ["icon", "material-symbols-outlined"], null, "add_shopping_cart");
    setUp(countItem, "countItem", null, "0");
    
    // Creat li's of tag-list
    const [tagModel,tagPrice, tagCatego] = [ilist, ilist, ilist].map(li => ilist.cloneNode());
    const tags = {model:[tagModel,id], price:[tagPrice,price], catego: [tagCatego, category]};
    for(li in tags) {
        setUp(tags[li][0], null, {id:li}, tags[li][1]);
    }
    // Buttons Construction
    const [btnDetail, btnAddCart] = [button, button, button].map(btn => button.cloneNode());
    const btns = {btn_detail:[btnDetail,"Detail"], btn_addCart:[btnAddCart,"Add to Cart"]};
    for(btn in btns){
        setUp(btns[btn][0], btn, {id:btn}, btns[btn][1]);
    }

    // Bild parents
    figure.append(img);
    list.append(tagModel, tagPrice, tagCatego);
    // btn_AddCart.append(shoppingCart, countItem);
    div.append(btnDetail, btnAddCart);
    btnAddCart.append(shoppingCart, countItem);
    article.append(figure, hdr2, paragraph, list, div);
    iframeBody.append(article);

    // console.log(shoppingCart);
    // console.log(countItem);
    // console.log(tagCatego);
    // console.log(`id: ${id}, name: ${name}`);
}

const resizeIframe = () => {
    const iframeBody = main.ctner_articles.contentDocument.body;
    main.ctner_articles.style.height = iframeBody.scrollHeight + "px";
    console.log("resize DONE!!");
}

fetch("js/products.json")
    .then(response => response.json())
    .then(products => {
        for(let product of products){
            makeArticle(product);    
        }
        iframeGetObj();
        const addCartBtns = getAddCartBtns();
        addListenerAddCartBtns(addCartBtns);
        // resizeIframe();
        setTimeout(resizeIframe, 1000);
        // console.log(iframeBody);
    })
    // .then(resizeIframe())
/* --------------------------------------------------------------------------- */

window.addEventListener("resize", resizeIframe)
