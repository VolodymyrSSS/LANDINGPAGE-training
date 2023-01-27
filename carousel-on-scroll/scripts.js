const cards = [...document.querySelectorAll('.card')],
      container = document.querySelector('.container'),
      arrows = [...document.querySelectorAll('.arrow')]

let angle = 0,
    chgtCard = 0,
    canChange = true, //prevent spam
    prevX,
    prevY,
    timeElapsed = 50

window.onLoad = animateCards();

// first card animation when the page is loaded
function animateCards(){  
    cards.forEach((card,idx) => {
        setTimeout(function() {
            let divClassName;
        
            if (idx % 2 === 0) {
                divClassName = "card-on-left"
            } else {
                divClassName = "card-on-right"        
            }
        
            card.classList.remove(divClassName);

            setTimeout(function() {
                card.classList.add("card-centered")
            }, 150 + cards.length * 150);

        }, timeElapsed);
        
        timeElapsed += 150;
    });
}

function changeCard(direction) {
    // direction : -1 => left / 1 => right
  
    if (canChange) {
        canChange = false;
  
        for(let i = 0; i < 8; i++) {
            let pos = parseInt(cards[i].dataset.pos, 10);   
            let formerPos = pos;  
            pos += direction;
        
            cards[i].dataset.pos = pos;
    
            if (pos === 0) {
                setTimeout(function() {
                    cards[i].dataset.pos = 8;
                    canChange = true;
                }, 500);
            } else if (pos === 9) {
                setTimeout(function(){
                    cards[i].dataset.pos = 1
                    canChange = true
                }, 500)     
            }
        }
    }
}


// -A- change cards with wheel
container.addEventListener('wheel', e  =>{
    if (canChange) {
        const direction = Math.sign(e.deltaY);
        chgtCard += direction;
        
        Math.abs(chgtCard) > 5 && (
        changeCard(direction),
        chgtCard = 0)
    }
});

// -B- change cards with touches
container.addEventListener('touchstart', (e) => {
    e.preventDefault();
    prevX = e.touches[0].clientX;
    prevY = e.touches[0].clientY;
});

container.addEventListener('touchmove', (e) => {
    e.preventDefault();

    if (canChange) {
        let direction;
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let deltaX = Math.abs(newX - prevX);
        let deltaY = Math.abs(newY - prevY);

        if (deltaX > 10 || deltaY > 10) {
            deltaX > deltaY 
            ? (direction = Math.sign(newX - prevX), prevX = newX) 
            : (direction = Math.sign(newY - prevY), prevY = newY)
            changeCard(direction);
        }
    }
});


// -C- change cards with arrows
arrows.forEach(arrow => arrow.addEventListener('click', e => changeCard(parseInt(e.target.dataset.dir) )));
