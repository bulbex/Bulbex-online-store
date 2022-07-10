const html = document.querySelector("html")

const loginPop = document.getElementById("login_pop")
const openBtn = document.getElementById("user_acc")
const closeBtn = document.getElementById("close_btn")
const registerLink = document.querySelectorAll(".register_link")
const seePassButt = document.querySelectorAll(".far.fa-eye-slash")
const loginPass = document.getElementById("pass_inp")
const signPassInp = document.getElementById("sign_pass_inp")


const cartPop = document.getElementById("cart_pop")
const cartCloseBtn = document.getElementById("cart_close_btn")
const cartOpenBtn = document.getElementById("user_orders")
const loginForm = document.querySelectorAll(".login_form")
const signinForm = document.querySelectorAll(".signin_form")


const menuBtn = document.getElementById("menu_btn")
const lsCloseBtn = document.getElementById("ls_close_btn")
const lsMenu = document.getElementById("ls_menu")
const lsMenuBck = document.getElementById("ls_menu_back")
const lsMenuInfoBtn = document.querySelectorAll(".ls_info_btn")
const lsMenuInfoHidden = document.getElementById("ls_info_hidden")
const lsMenuInfoHidden2 = document.getElementById("ls_info_hidden_2")
const lsLoginBtn = document.getElementById("ls_login_btn")
const lsSigninBtn = document.getElementById("ls_signin_btn")
const lsCartBtn = document.getElementById("cart_btn")
const lsCatalogBtn = document.getElementById("ls_catalog_btn")


const catalogBtn = document.getElementById("catalog_btn")
const catalogPop = document.getElementById("catalog_pop")


const searchResults = document.getElementById("search_results")
const searchField = document.getElementById("search_field")
const searchResList = document.getElementById("search_results_list")
const searchFormBck = document.getElementById("search_form_back")
const searchClearBtn = document.getElementById("search_clear_btn")


const catalogCtgries = document.getElementById("catalog_categories").children
const catalogPrdcts = document.getElementById("catalog_products").children
const catalogCloseBtn = document.querySelectorAll(".catalog_close_btn")
const catalogHead = document.getElementById("catalog_head")
const catalogToAll = document.getElementById("to_all_categories")

const expandBtns = document.querySelectorAll(".expand_btn")
const offerSections = document.querySelectorAll(".main_offers_list")
const loadingElem = document.querySelector(".end_content_loading_elem")

const asideLoginBtn = document.getElementById("aside_register_btn")
const mobileCatalogBtn = document.getElementById("mobile_catalog_btn")
const mainLikeBtns = document.querySelectorAll(".main_offers_like_btn")
const tabletCatalog = document.querySelectorAll(".main_catalog_tablet_category")
const mainOffers = document.querySelector(".main_offers")

const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    speed: 600,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },

})

// Function when screen is resizing
let screenSize = window.innerWidth
let prevElem = 0;
let windowTimeout
let flag = true
function screenSizeAffect() {
    if (screenSize <= 1023) {
        for (category of catalogCtgries) {
            category.addEventListener("click", catalogAction)
            category.removeEventListener("mouseenter", catalogAction)
        }
        if (flag) {
            catalogCtgries[prevElem].style.backgroundColor = "#fff"
            catalogCtgries[prevElem].child.style.display = "none"
            flag = false
        }
    } else if (screenSize > 1023) {
        for (category of catalogCtgries) {
            category.removeEventListener("click", catalogAction)
            category.addEventListener("mouseenter", catalogAction)
        }
        catalogCtgries[prevElem].style.backgroundColor = "#f3f3f3"
        catalogCtgries[prevElem].child.style.display = "flex"
        flag = true
        catalogToAll.style.display = "none"
        catalogCtgries[0].parentNode.style.display = "block"
    }
}
// Listener on window when resizing and scrolling
window.addEventListener("resize", () => {
    screenSize = window.innerWidth
    screenSizeAffect()
})




// Cycle to give all categories in catalog block of products
for (let i = 0; i < (catalogPrdcts.length - 1); i++) {
    tabletCatalog[i].child = catalogPrdcts.item(i + 1)
    tabletCatalog[i].id = i + 1
    catalogCtgries[i].child = catalogPrdcts.item(i + 1)
    catalogCtgries[i].id = i + 1
    tabletCatalog[i].addEventListener("click", tabletCatalogAction)
}

// Function of switching category in catalog (depends on screen size)
function catalogAction() {
    if (screenSize <= 1023) {
        catalogToAll.style.display = "flex"
        catalogCtgries[0].parentNode.style.display = "none"
        this.child.style.display = "flex";
        catalogHead.innerHTML = this.innerText
        prevElem = this.id - 1
    } else if (screenSize > 1023) {
        catalogCtgries[prevElem].style.backgroundColor = "#fff"
        catalogCtgries[prevElem].child.style.display = "none"
        this.style.backgroundColor = "#f3f3f3"
        this.child.style.display = "flex";
        prevElem = this.id - 1
    }
}

// Function to open popups
function openPop() {
    html.classList.add("lock_scroll")
    if (this === openBtn || this === lsLoginBtn) {
        loginPop.classList.remove("close")
        loginForm.forEach(elem => elem.classList.add("visible"))
        signinForm.forEach(elem => elem.classList.remove("visible"))
        catalogBtn.children[0].classList.remove("fa-times")
        catalogPop.classList.add("close")
    } else if (this === cartOpenBtn || this === lsCartBtn) {
        catalogBtn.children[0].classList.remove("fa-times")
        catalogPop.classList.add("close")
        cartPop.classList.remove("close")
    } else if (this === lsSigninBtn) {
        loginPop.classList.remove("close")
        loginForm.forEach(elem => elem.classList.remove("visible"))
        signinForm.forEach(elem => elem.classList.add("visible"))
        catalogBtn.children[0].classList.remove("fa-times")
        catalogPop.classList.add("close")
    } else if (this === catalogBtn || this === lsCatalogBtn) {
        screenSizeAffect()
        catalogBtn.children[0].classList.add("fa-times")
        catalogPop.classList.remove("close")
    }
    search("")
    seePassButt.forEach(elem => elem.classList.add("fa-eye-slash"))
}


// Function to close popups
function closePop(e) {
    if (e) {
        if (e.target === loginPop || e.currentTarget === closeBtn) {
            html.classList.remove("lock_scroll")
            loginPop.classList.add("close")
        } else if (e.target === cartPop || e.currentTarget === cartCloseBtn) {
            html.classList.remove("lock_scroll")
            cartPop.classList.add("close")
        } else if (e.target === catalogPop) {
            html.classList.remove("lock_scroll")
            catalogCtgries[0].parentNode.style.display = "block"
            catalogBtn.children[0].classList.remove("fa-times")
            catalogPop.classList.add("close")
        }
    } else if (this === catalogBtn || this === searchField) {
        html.classList.remove("lock_scroll")
        catalogCtgries[0].parentNode.style.display = "block"
        catalogBtn.children[0].classList.remove("fa-times")
        catalogPop.classList.add("close")
    }
}

// Function of switching between loginform and signinform in Popup of login/signin
function actionInLogInPop() {
    loginPass.setAttribute("type", "password")
    signPassInp.setAttribute("type", "password")
    seePassButt.forEach(elem => elem.classList.add("fa-eye-slash"))
    signinForm.forEach(elem => elem.classList.toggle("visible"))
    loginForm.forEach(elem => elem.classList.toggle("visible"))
}

// Function to see pass instead of ******* in popup of login/signin
function seePass() {
    let typeOfLogPassInp = loginPass.getAttribute("type")
    let typeOfSignPassInp = signPassInp.getAttribute("type")
    typeOfLogPassInp === "password"
        ? loginPass.setAttribute("type", "text")
        : loginPass.setAttribute("type", "password")
    typeOfSignPassInp === "password"
        ? signPassInp.setAttribute("type", "text")
        : signPassInp.setAttribute("type", "password")
    this.classList.toggle("fa-eye-slash")
}

// Function that open and close Leftside menu
function actionLeftSide() {
    search("")
    if (this === menuBtn) {
        html.classList.add("lock_scroll")
        lsMenu.classList.add("open_menu")
        lsMenuBck.classList.remove("close")
        catalogBtn.children[0].classList.remove("fa-times")
        catalogPop.classList.add("close")
    } else {
        html.classList.remove("lock_scroll")
        lsMenu.classList.remove("open_menu")
        lsMenuBck.classList.add("close")
    }
}

// Function to open hidden sections in Leftside menu
function actionLsInfo() {
    this.parentNode.id === "1"
        ? lsMenuInfoHidden.classList.toggle("open_lsinfo_hidden")
        : lsMenuInfoHidden2.classList.toggle("open_lsinfo_hidden")
}

// Function to open another popups from Leftside menu
function lsOpenLink() {
    actionLeftSide.call(this)
    openPop.call(this)
}

// Function to open catalog and switching the icon on catalog open button
function actionCatalog() {
    catalogBtn.children[0].classList.toggle("fa-times")
    catalogPop.classList.contains("close")
        ? openPop.call(this)
        : closePop.call(this)
}


// Functions of search field
let inpTimeOut
// Function to give main function the value of input when user stops for 4ms
searchField.addEventListener("input", () => {
    if (searchField.value) {
        clearTimeout(inpTimeOut)
        inpTimeOut = setTimeout(() => search(searchField.value), 400)
    } else {
        searchClearBtn.style.display = "none"
        search(searchField.value)
    }
})
// Function that close all previously open popups when user focus the search field
searchField.addEventListener("focus", () => {
    closePop.call(searchField)
    search(searchField.value)
})
// Main function of searching and giving results
function search(value) {
    searchResList.innerHTML = ""
    if (value) {
        searchClearBtn.style.borderRadius = "0px 4px 0px 0px"
        searchClearBtn.style.display = "block"
        searchResults.parentNode.parentNode.style.borderBottomLeftRadius = "0px"
        searchResults.classList.remove("close")
        searchFormBck.classList.remove("close")
        let results = mockDB.filter(e => e.toUpperCase().startsWith(value.toUpperCase()))
        if (results.length != 0) {
            results.length = 10
            results.forEach(elem => {
                let eyeCatch = '<a href="">' + "<span>" + value.toLowerCase() + "</span>" + elem.slice(value.length).toLowerCase() + "</a>" + "\n"
                let li = document.createElement("li")
                li.innerHTML = eyeCatch
                searchResList.appendChild(li)
            })
        } else if (results.length === 0) {
            let li = document.createElement("li")
            li.innerHTML = ' <a href=""> Nothing found for your request </a>\n'
            li.children[0].style.color = "#000"
            searchResList.appendChild(li)
        }
    } else {
        searchClearBtn.style.borderRadius = "4px"
        searchResults.parentNode.parentNode.style.borderBottomLeftRadius = "4px"
        searchFormBck.classList.add("close")
        searchResults.classList.add("close")
    }
}


// Slider function 



for (let i = 0;i < offerSections.length;i++) {
    expandBtns[i].parent = offerSections[i]
}

function expandOffer(e) {
    e.currentTarget.classList.add("closed")
    e.currentTarget.parent.classList.add("expanded")
}


let windowPos
let windowEnd
let pageTimeout
const closedSections = document.querySelectorAll(".main_offers_container.closed")
let counter = 0

window.addEventListener("scroll", expandPage)

function expandPage() {
    windowEnd = document.body.offsetHeight - loadingElem.clientHeight * 2
    windowPos = window.innerHeight + window.scrollY
    if (windowPos >= windowEnd && counter !== closedSections.length) {
        clearTimeout(pageTimeout)
        pageTimeout = setTimeout(() => {
            closedSections[counter].classList.remove("closed")
            counter += 1
        }, 400)
    } else if(counter === closedSections.length){
        loadingElem.parentNode.style.display = "none"
    }
}

function liked() {
    this.children[0].classList.toggle("fas")
}

function tabletCatalogAction() {
    openPop.call(catalogBtn)
    catalogAction.call(this)
}


// Event listeners
registerLink.forEach(elem => elem.addEventListener("click", actionInLogInPop))
seePassButt.forEach(elem => elem.addEventListener("click", seePass))
openBtn.addEventListener("click", openPop)
loginPop.addEventListener("click", closePop)
closeBtn.addEventListener("click", closePop)

asideLoginBtn.addEventListener("click", () => openPop.call(openBtn))
mobileCatalogBtn.addEventListener("click", () => openPop.call(catalogBtn))
mainLikeBtns.forEach(elem => elem.addEventListener("click", liked))

cartOpenBtn.addEventListener("click", openPop)
cartPop.addEventListener("click", closePop)
cartCloseBtn.addEventListener("click", closePop)

lsCloseBtn.addEventListener("click", actionLeftSide)
lsMenuBck.addEventListener("click", actionLeftSide)
menuBtn.addEventListener("click", actionLeftSide)
lsMenuInfoBtn.forEach(elem => elem.addEventListener("click", actionLsInfo))
lsLoginBtn.addEventListener("click", lsOpenLink)
lsSigninBtn.addEventListener("click", lsOpenLink)
lsCartBtn.addEventListener("click", lsOpenLink)
lsCatalogBtn.addEventListener("click", lsOpenLink)

catalogBtn.addEventListener("click", actionCatalog)
catalogPop.addEventListener("click", closePop)
catalogCloseBtn.forEach(e => e.addEventListener("click", () => {
    html.classList.remove("lock_scroll")
    catalogToAll.style.display = "none"
    catalogHead.innerText = "Catalog"
    catalogBtn.children[0].classList.remove("fa-times")
    catalogCtgries[0].parentNode.style.display = "block"
    catalogPop.classList.add("close")
    flag = true
    screenSizeAffect()
}))
catalogToAll.addEventListener("click", () => {
    catalogToAll.style.display = "none"
    catalogCtgries[0].parentNode.style.display = "block"
    catalogCtgries[prevElem].child.style.display = "none";
    catalogHead.innerHTML = "Catalog"
})

searchFormBck.addEventListener("click", () => search(""))

searchClearBtn.addEventListener("click", () => {
    search("")
    searchField.value = ""
    searchClearBtn.style.display = "none"
})

expandBtns.forEach(elem => elem.addEventListener("click", expandOffer))

// Mock DataBase of values to search
const mockDB = ["Laptops",
    "Asus",
    "Acer",
    "HP(Hewlett Packard)",
    "Dell",
    "Apple",
    "Fleshdisk USB",
    "Laptop bags",
    "Laptop stands",
    "Powerbanks",
    "Cables and adapters",
    "Tablets",
    "Accessories for tablets",
    "Cases and keyboards for tablets",
    "Protective glasses",
    "Graphics tablets",
    "eBooks",
    "Accessories for eBooks",
    "Videocards",
    "Hard drives",
    "Processors",
    "SSD",
    "Memory",
    "Motherboards",
    "Power supplies",
    "Computer cases",
    "Cooler systems",
    "Sound cards",
    "Computers",
    "Monitors",
    "Mouses",
    "Keyboards"]
