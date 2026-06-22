document.addEventListener("DOMContentLoaded", () => {
    // Page navigation
    const pages = document.querySelectorAll(".page");

    function showPage(index) {
        pages.forEach(page => {
            page.classList.remove("active");
        });
        pages[index].classList.add("active");
    }

    const bgm = document.getElementById("bgm");

    document.getElementById("startBtn").onclick = () => {
        showPage(1);
        if (bgm) bgm.play().catch(e => console.log("Audio autoplay prevented"));
    };
    
    document.getElementById("nextBtn").onclick = () => showPage(2);
    document.getElementById("finishBtn").onclick = () => showPage(3);

    // Gift Box Logic
    const giftBox = document.getElementById("giftBox");
    const surpriseContent = document.getElementById("surpriseContent");

    if (giftBox) {
        giftBox.addEventListener("click", () => {
            giftBox.style.display = "none";
            surpriseContent.style.display = "flex";
            
            // Trigger confetti
            if (typeof confetti !== "undefined") {
                const duration = 3000;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#c8a66b', '#f4e7cf', '#ffffff']
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#c8a66b', '#f4e7cf', '#ffffff']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }
        });
    }

    // Typing Effect
    const titleElement = document.querySelector("#welcome h1");
    const textToType = "Happy Birthday, Sayang";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            titleElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);

    /* STAR PARTICLES */
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars = [];

    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            v: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            s.y += s.v;

            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});