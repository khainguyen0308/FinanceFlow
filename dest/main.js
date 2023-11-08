//loading
function loadPage () {
    function handlePercent (percent) {
        const perNumber = document.querySelector('.loading__number');
        const perInner = document.querySelector('.loading-inner')
        perInner.style.width = `${percent}%`
        perNumber.textContent = `${percent}%`
    }  
    function hideLoading () {
        const body = document.querySelector('body')
        const loading = document.querySelector('.loading');
        body.classList.remove("--disable-body-scroll");
        loading.classList.add('--hide');
    }
    // img loaded   
    const lengthImgs = document.querySelectorAll('img').length
    let imgsLoaded = new imagesLoaded('body');
    let count = 0
    imgsLoaded
    .on("progress", (instance ) => {
      count++;
      let percent = Math.floor((count / lengthImgs) * 100);
      handlePercent(percent);
    })
    .on("always", (instance ) => {
      console.log("ALWAYS - all images have been loaded");
    })
    .on("fail", (instance ) => {
      console.log("FAIL - all images loaded, at least one is broken");
    })
    .on("done", (instance ) => {
      console.log("DONE  - all images have been successfully loaded");
      hideLoading();
    })
    
}
loadPage()

// set width Slider item
function setWidthSliderItem () {
    const container = document.querySelector('.container')
    const items = document.querySelectorAll('.users__slider-item')
    const containerComputedStyle = window.getComputedStyle(container)
    let paddingLeft = parseFloat(containerComputedStyle.paddingLeft)
    let width = (container.clientWidth - 26)/2 -  paddingLeft
    console.log(parseFloat(containerComputedStyle.paddingRight))
    items.forEach(item => item.style.width = `${width}px`)
}

// handle users slider
function handleSlider () {
    var userSlider = document.querySelector('.users__slider')
    var flktySlider = new FlickityResponsive(
        userSlider,
        {
            // options
            contain: true,
            draggable: '>1',
            prevNextButtons: false,
            wrapAround: true,
            pageDots: true,
            groupCells: true,
            groupCells: 2,
            // fade: true,
            responsive: [
            
                {
                  breakpoint: 768,
                  settings: {
                    // cellAlign: "left",
                    prevNextButtons: false,
                    wrapAround: true,
                    pageDots: true,
                    groupCells: true,
                    groupCells: 1,
                  }
                }
              ],
            on: {
                // handle height content
                ready: function() {
                    const listItems = document.querySelectorAll('.slider-content')
                    let maxHeight = 0 
                    listItems.forEach(item =>  {
                        if (item.clientHeight > maxHeight)
                            {
                                maxHeight = item.clientHeight
                            }
                    })
                    listItems.forEach(item => item.style.height = `${maxHeight}px`)
                    
                },
                change: function( index ) {
                  console.log( 'Slide changed to' + index );
                }
              }
        }
    );
}
// load => handleCarousel, handleSlider
window.addEventListener('load', function() {
    var userSlider = document.querySelector('.users__slider')
    if (userSlider != null) {
        setWidthSliderItem()
        handleSlider()
    }
    
})
window.addEventListener('resize', function() {
    var userSlider = document.querySelector('.users__slider')
    if (userSlider != null) {
        setWidthSliderItem()
        handleSlider()
    }
})

// show popup video
// const popup = document.querySelector(".popup")
function showPopup () {
    const body = document.querySelector('body')
    const popup = document.querySelector(".popup")
    const btnPlay = document.querySelector(".play-btn")
    const iframeVideo = document.querySelector(".popup__video-inner")
    const btnClose = document.querySelector(".popup__video-close")
    if (popup != null)
    {
        btnPlay.addEventListener("click", function() {
            let id = btnPlay.getAttribute("data-videoid");
            iframeVideo.innerHTML = ` <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay" frameborder=”0″ allowfullscreen
            ></iframe>`
            popup.classList.add("show")
            body.classList.add('--disable-body-scroll')
        })
        // close popup
        function clsPopup() {
            popup.classList.remove("show");
            iframeVideo.innerHTML = "";
            body.classList.remove('--disable-body-scroll')
        }
        btnClose.addEventListener("click", function() {
            clsPopup();
        })
        popup.addEventListener("click", function() {
            clsPopup();
        })
        document.addEventListener('keydown', function(e) {
            if (e.which == 27) {
                clsPopup();
            }
        })
    }
    
}
showPopup() 

//change background header ... scroll
function changeBackground () {
    const element = document.getElementById('scroll-to')
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero')
    if (hero != null) {
        let scrollY = window.scrollY;
        if (scrollY > hero.clientHeight)
        {
            header.classList.add('--bg-blue');
        } else
            {
                header.classList.remove('--bg-blue');
            }
    }
    
}

// btt btn
//show backtotop ... scroll
function showBacktotop () {
    const body = document.querySelector('body')
    const btt = document.querySelector('.btt-btn');
    let scrollY = window.scrollY;
    if (btt != null) {
        if (scrollY > body.clientHeight/2 - window.innerHeight)
    {
        btt.classList.add('show');
    } else
        {
            btt.classList.remove('show');
        }
    }   
}
window.addEventListener('scroll', function () {
    showBacktotop();
    changeBackground();
})
// click backtotop
function topFunction() {
    let backTop = document.querySelector(".btt-btn");
    if (backTop != null) {
        backTop.addEventListener('click', function(){
            window.scrollTo({
                top: 0
              });
        })
    }
}
topFunction();

// toggle nav menu
function toggleNav() {
    const html = document.querySelector('html')
    const navMenu = document.querySelector('.nav');
    const hamburger = document.querySelector('.hambergur');
    const liNav = document.querySelectorAll('.nav .nav__menu li');
    const btnMenu = document.querySelector('.header__right-ham')
    btnMenu.addEventListener('click', function() {
        navMenu.classList.toggle("show");
        hamburger.classList.toggle("active-menu");
        html.classList.toggle('--disable-body-scroll')
    })  
    // hide nav
    function hideNav() {
        navMenu.classList.remove("show")
        hamburger.classList.remove("active-menu")
        html.classList.remove('--disable-body-scroll')
    }

    liNav.forEach (item => item.addEventListener('click', function() {
        hideNav()
    }))

    window.addEventListener('resize', function() {
        let wWindow = window.innerWidth
        if (wWindow > 992) {
            hideNav()
        }
    })
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            hideNav()  
        }
    }) 
}
toggleNav();

// Handle click menu header / nav
function handleClickMenu () {
    const itemMenus = document.querySelectorAll('.item-menu')
    const itemNavs = document.querySelectorAll('.item-nav')
    itemMenus.forEach(item => item.addEventListener('click', function(e) {
        // e.preventDefault();
        itemMenus.forEach(item => item.classList.remove('--active'))
        item.classList.add('--active')
    }))
    itemNavs.forEach(item => item.addEventListener('click', function(e) {
        // e.preventDefault();
        itemNavs.forEach(item => item.classList.remove('--active'))
        item.classList.add('--active')
    }))
}
handleClickMenu()

// tab
function changeTab () {
    tabs = document.querySelectorAll(".posts__tabs-tab")
    lists = document.querySelectorAll(".posts__list")
    if (tabs != null) {
        tabs.forEach((tab, index) => tab.addEventListener('click', function(){
            console.log(index)
            tabs.forEach(tab => tab.classList.remove('--active'))
            tab.classList.add('--active')   
            lists.forEach (list => list.classList.remove('--active'))
            lists[index].classList.add('--active')
        }))
    }
    
}
changeTab()

// faq accordion
function accordion () {
    const accordion = document.querySelectorAll('.accordion__content-title');
    if (accordion != null) {
        accordion.forEach((item,index) => item.addEventListener('click', function() {
            item.classList.toggle('--active')
            accordion.forEach((item2,index2)=>{ 
                if(index != index2){ 
                    item2.classList.remove("--active");  
                } 
            }) 
        })
    )
    }
}
accordion()

// validate form
// function validateForm() {
//     let name = document.forms["form-contact"]["fullname"].value;
//     const formGroup = document.querySelectorAll('.form-group')
//   if (name == "") {
//     alert("Name must be filled out");
//     return false;
//   }

//   let email = document.forms["form-contact"]["email"].value;
//   if (name == "") {
//     alert("Name must be filled out");
//     return false;
//   }
// }
// const form = document.querySelector('#form-contact')
// form.addEventListener('submit',function () {
//     validateForm();
// })