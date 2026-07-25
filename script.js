// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-buttons button");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioCards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// Video Modal


const playButtons = document.querySelectorAll(".play-btn");
const modal = document.getElementById("videoModal");
const video = document.getElementById("portfolioVideo");
const videoSource = video.querySelector("source");
const closeBtn = document.querySelector(".close-btn");

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const videoPath = button.dataset.video;

        videoSource.src = videoPath;

        video.load();

        modal.classList.add("active");

        video.play();

    });

});


// Close Modal


function closeVideo(){

    modal.classList.remove("active");

    video.pause();

    video.currentTime = 0;

    videoSource.src = "";

}

closeBtn.addEventListener("click", closeVideo);

// Click outside the video

modal.addEventListener("click", function(e){

    if(e.target === modal){

        closeVideo();

    }

});


document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        closeVideo();

    }

});


// Smooth Navbar Highlight


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// Navbar Shadow


const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "rgba(0,0,0,.75)";
        header.style.backdropFilter = "blur(20px)";

    }

    else{

        header.style.background = "rgba(0,0,0,.45)";
        header.style.backdropFilter = "blur(18px)";

    }

});


// Card Fade Animation


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

        }

    });

},{
    threshold:0.2
});

portfolioCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition = ".7s";

    observer.observe(card);

});

/* ===========================
   GOOGLE SHEETS INTEGRATION
=========================== */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwKWN_w0pZcNEDbpqrEpXAnsVG5nHfpxrSV3d_H3TFOOiryOPsbOPJzaEx5-upBgmaYCQ/exec";


// ================= SUBSCRIBE FORM =================

const subscribeForm = document.getElementById("subscribeForm");

if (subscribeForm) {

    subscribeForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const email = document.getElementById("subscriberEmail").value;

        try{

            await fetch(SCRIPT_URL,{

                method:"POST",

                body:JSON.stringify({

                    type:"subscriber",

                    email:email

                })

            });

            alert("Subscribed Successfully!");

            subscribeForm.reset();

        }

        catch(error){

            alert("Something went wrong.");

        }

    });

}


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const data={

            type:"contact",

            name:document.getElementById("name").value,

            email:document.getElementById("email").value,

            phone:document.getElementById("phone").value,

            message:document.getElementById("message").value

        };

        try{

            await fetch(SCRIPT_URL,{

                method:"POST",

                body:JSON.stringify(data)

            });

            alert("Message Sent Successfully!");

            contactForm.reset();

        }

        catch(error){

            alert("Failed to send message.");

        }

    });

}