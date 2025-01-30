let pageRevealDelay = 2;
gsap.from(".logo a, .contact a", 1.5, {
    top: "25px",
    ease: "power4.inOut",
    stagger: {
        amount: 0.1,
    },
    delay: pageRevealDelay,
});

gsap.from(
    "h1",
    1.5,
    {
        y: 150,
        ease: "power4.inOut",
        stagger: {
            amount: 0.1,
        },
    },
    "<"
);
gsap.from(
    "p",
    1.75,
    {
        y: 30,
        ease: "power3.inOut",
        stagger: {
            amount: 0.25,
        },
    },
    "<"
);

gsap.from(".loader-wrapper", 2, {
    scale: 0.8,
    ease: "power1.inOut",
});

gsap.from(".loader", 2, {
    top: "100%",
    ease: "power3.inOut",
});

gsap.to(
    ".loader-wrapper, .pre-loader",
    1,
    {
        top: "-100%",
        ease: "power3.inOut",
        delay: 2,
    },
    "-=1"
);

document.addEventListener("mousemove", function (e) {
    let normX = e.clientX / window.innerWidth - 0.5;
    let normY = e.clientY / window.innerHeight - 0.5;

    let moveX = normX * 100;
    let moveY = normY * 50;

    let rotateZ = normX * 25;

    gsap.to(".bubbles", {
        x: moveX,
        y: moveY,
        rotationZ: rotateZ,
        ease: "power2.out",
        duration: 1.5,
    });
});

// gallery

document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".items");
    const itemsCols = document.querySelectorAll(".items-col");
    const filters = document.querySelectorAll(".filter");
    let defaultFontSize = "50px";
    let activeFontSize = "90px";

    function splitTextIntoSpans(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const text = element.innerText;
            element.innerHTML = text
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("");
        });
    }

    function animateFontSize(target, fontSize) {
        const spans = target.querySelectorAll("span");
        gsap.to(spans, {
            fontSize: fontSize,
            stagger: 0.025,
            duration: 0.5,
            ease: "power2.out",
        });
    }

    function clearItems() {
        itemsCols.forEach((col) => {
            col.innerHTML = "";
        });
    }

    function addItemsToCols(filter = "all") {
        let colIndex = 0;
        const filteredItems = items.filter(
            (item) => filter === "all" || item.tag.includes(filter)
        );

        filteredItems.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.className = "item";
            itemElement.innerHTML = `
         <div class="item-img">
            <img src="${item.img}" alt="">
         </div>
         <div class="item-copy"><p>${item.title}</p></div>
       `;
            itemsCols[colIndex % itemsCols.length].appendChild(itemElement);
            colIndex++;
        });
    }

    function animateItems(filter) {
        gsap.to(itemsContainer, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                clearItems();
                addItemsToCols(filter);
                gsap.to(itemsContainer, {
                    opacity: 1,
                    duration: 0.25,
                });
            },
        });
    }

    splitTextIntoSpans(".filter h1");
    animateFontSize(document.querySelector(".filter.active h1"), "300px");
    addItemsToCols();

    filters.forEach((filter) => {
        filter.addEventListener("click", function () {
            if (this.classList.contains("active")) {
                return;
            }

            const previousActiveFilterH1 =
                document.querySelector(".filter.active h1");
            animateFontSize(previousActiveFilterH1, defaultFontSize);

            filters.forEach((f) => f.classList.remove("active"));
            this.classList.add("active");

            const newActiveFilterH1 = this.querySelector("h1");
            animateFontSize(newActiveFilterH1, activeFontSize);

            const filterValue = this.getAttribute("data-filter");
            animateItems(filterValue);
        });
    });
});
