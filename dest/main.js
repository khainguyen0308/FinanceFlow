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
    var flktySlider = new Flickity(
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
    setWidthSliderItem()
    handleSlider()
})

// show popup video
function showPopup () {
    const body = document.querySelector('body')
    const popup = document.querySelector(".popup")
    const btnPlay = document.querySelector(".play-btn")
    const iframeVideo = document.querySelector(".popup__video-inner")
    const btnClose = document.querySelector(".popup__video-close")
  
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
showPopup() 

// btt btn
//show backtotop ... scroll
function showBacktotop () {
    const body = document.querySelector('body')
    const btt = document.querySelector('.btt-btn');
    let scrollY = window.scrollY;
    if (scrollY > body.clientHeight/2)
    {
        btt.classList.add('show');
    } else
        {
            btt.classList.remove('show');
        }
}
window.addEventListener('scroll', function () {
    showBacktotop();
})
// click backtotop
function topFunction() {
    let backTop = document.querySelector(".btt-btn");
    backTop.addEventListener('click', function(){
        window.scrollTo({
            top: 0
          });
    })
}
topFunction();