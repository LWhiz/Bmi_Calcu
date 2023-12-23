let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})


// Get the scroll handle element
const scrollHandle = document.querySelector('.scroll-handle');

// Define variables to keep track of scroll position and initial touch/mouse positions
let isScrolling = false;
let startY = 0;
let scrollTop = 0;

// Event listener for starting the scroll
scrollHandle.addEventListener('mousedown', startScroll);
scrollHandle.addEventListener('touchstart', startScroll);

// Event listener for ending the scroll
document.addEventListener('mouseup', endScroll);
document.addEventListener('touchend', endScroll);

// Event listener for scrolling
document.addEventListener('mousemove', scroll);
document.addEventListener('touchmove', scroll);

// Function to start scrolling
function startScroll(event) {
    isScrolling = true;
    startY = event.pageY || event.touches[0].pageY;
    scrollTop = document.documentElement.scrollTop;
}

// Function to end scrolling
function endScroll() {
    isScrolling = false;
}

// Function to perform scrolling based on drag movement
function scroll(event) {
    if (!isScrolling) return;

    const currentY = event.pageY || event.touches[0].pageY;
    const deltaY = currentY - startY;
    const newScrollTop = scrollTop - deltaY;
    document.documentElement.scrollTop = newScrollTop;
}


const btnEl = document.getElementById("btn");
const weightConditionEl = document.getElementById("weight-condition");
const bmiValue = document.getElementById("bmi-result")

function calculateBMI() {
    const heightValue = document.getElementById("height").value / 100;
    const weightValue = document.getElementById("weight").value;

    const bmiValue = weightValue / (heightValue * heightValue);

    if (bmiValue < 18.5) {
        weightConditionEl.innerText = "Under weight";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        weightConditionEl.innerText = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        weightConditionEl.innerText = "Overweight";
    } else if (bmiValue >= 30) {
        weightConditionEl.innerText = "Obesity";
    }


    // Call sendMail function here
    sendMail(bmiValue);
}

btnEl.addEventListener("click", calculateBMI);

function sendMail(bmiValue) {
    (function () {
        emailjs.init("v4lJHzwJd0X1BYtMu");
        console.log("Email Initialized")
    })();

    var params = {
        from_name: "pedrito.parrilla05@gmail.com",
        to_email: document.querySelector("#email_id").value,
        bmi: bmiValue.toFixed(2),
        condition: weightConditionEl.innerText
    };
    var serviceID = "service_pgffasw";
    var templateID = "template_alpcjmi";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            alert("Email Sent Successfully!");
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
}
