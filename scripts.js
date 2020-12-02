//generic scroll to any position and any duration
function smoothScroll(target, duration) {
    var target = document.querySelector(target);

    //this will have the targets position relative ro top of SCREEN - where we want to go
    var targetPosition = target.getBoundingClientRect().top;

    //this will give SCREENS position realtive to top - where we are NOW
    var startingPosition = window.pageYOffset;

    var distance = targetPosition - startingPosition;
    var startTime = null;

    console.log("start pos=", startingPosition);
    console.log("target pos =", targetPosition);
    console.log("distance =", distance);


    function animation(currentTime) {

        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;

        //can use some easing function
        var run = easeInOut(timeElapsed, startingPosition, distance, duration);

        //or some very basic linear scrolling
        //each frame we move a bit up - minus from current position
        //we want to cover the whole distance in duration, so we move with
        // speed = distance/duration px/ms
        //so when timeElapsed == duration we will have covered the whole distance;
        var runSimple = startingPosition + (distance / duration) * timeElapsed;



        //this scrolls to given X Y position;
        window.scrollTo(0, runSimple);
        if (timeElapsed < duration) requestAnimationFrame(animation);



        //the easing function it justs works ( http://gizma.com/easing/ )
        function easeInOut(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    }

    //60fps so one animation frame last 1/60 second
    //if the animation lasts 2s the function will be called 120 times(frames)
    requestAnimationFrame(animation);
}

//scroll to top
function smoothScrollTop() {

    var target = 0; // scroll top top 0px

    //this will give SCREENS position realtive to top - where we are NOW
    var startingPosition = window.pageYOffset;
    //the scrolling distance will be equal to the position since target is 0
    var distance = startingPosition - target;
    var startTime = null;

    // console.log("start pos=", startingPosition);
    // console.log("target pos =", targetPosition);
    // console.log("distance =", distance);


    function animation(currentTime) {

        if (startTime === null) startTime = currentTime;

        //the duration will not be set but relative to scrolling distance
        //average speed is distance(px)/duration(ms) = 4px/ms 
        var duration = distance / 4;
        var timeElapsed = currentTime - startTime;

        //we can use some EASING function
        //scrollStep goes from 0 to the full distance we want to scroll
        var scrollStep = easeInOut(timeElapsed, 0, distance, duration);

        //or a simple LINEAR scrolling
        //each frame we move a bit up - minus from current position
        //we want to cover the whole distance in duration, so we move with
        // speed = distance/duration px/ms
        //so when timeElapsed == duration we will have covered the whole distance;
        //runSimple goes from the startPosition ang decreases to target
        var scrollStepSimple = (distance / duration) * timeElapsed;



        //this scrolls to given X Y position;
        window.scrollTo(0, startingPosition - scrollStep);
        if (timeElapsed <= duration) requestAnimationFrame(animation);



        //the easing function it justs works ( http://gizma.com/easing/ )
        function easeInOut(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    }

    //60fps so one animation frame last 1/60 second
    //if the animation lasts 2s the function will be called 120 times(frames)
    requestAnimationFrame(animation);
}

var linkToTop = document.querySelector(".scroll-to-top");
linkToTop.addEventListener("click", function () {
    smoothScrollTop();
})

var accordionButtons = document.querySelectorAll(".acc-anchor");
// console.log(accordionButtons);
// console.log(accordionButtons[1].hash);
// console.log(location.hash);
//MAKES THE ACCORDION ANCHORS IDABLED ON RECLICK
accordionButtons.forEach(function (accBut) {

    accBut.addEventListener("click", function (event) {
        console.log(location.hash);

        //the hash is the #part of the url or and anchor
        //if the hash of the anchor is equal to the url hash
        //then this anchor is allready active so...
        if (event.target.hash == location.hash) {
            console.log("here");
            location.hash = "";
            console.log(event);
            event.preventDefault();   //default action is to set location hash to its own hash
        }
    })

})


function appearOnScroll() {

    var texts = document.querySelectorAll(".text-area");
    texts.forEach(function (text) {
        if (text.getBoundingClientRect().top - 400 < window.pageYOffset) {
            // console.log(text.getBoundingClientRect().top)
            // console.log(window.pageYOffset)
            text.classList.add("text-area-show");
        }
        else {
            text.classList.remove("text-area-show");
        }
    })

}

window.addEventListener("scroll", appearOnScroll);