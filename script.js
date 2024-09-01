let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset-btn");
let turnx = true;
var count = 0;
let msg = document.querySelector(".win")
var myCanvas = document.createElement('canvas');
document.body.appendChild(myCanvas);

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnx) {
            box.innerHTML = "X"
            turnx = false
            box.classList.add("x")
        }
        else {
            box.innerHTML = "O"
            box.classList.add("o")
            turnx = true
        }
        box.disabled = true
        count += 1
        checkwinner();
    });
});

const disablebtn = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

const enablebtn = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText = ""
        reset.innerText = "Reset Game"
        msg.innerText = ""
        box.classList.remove("x", "o")
        box.classList.remove("anima")
        count = 0
    }
}

let anima = (pattern) => {
    boxes[pattern[0]].classList.add("anima")
    boxes[pattern[1]].classList.add("anima")
    boxes[pattern[2]].classList.add("anima")
}

let checkwinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerHTML
        let pos2 = boxes[pattern[1]].innerHTML
        let pos3 = boxes[pattern[2]].innerHTML

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 === pos3) {
                anima(pattern)
                msg.innerHTML = `Congratulations ${pos1} wins..`
                disablebtn()
                reset.innerHTML = "New Game"

                // Trigger the confetti animation when a player wins
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.7 }
                });

                break;
            } else if(count == 9) {
                msg.innerHTML = "Oops Draw.."
                disablebtn()
                reset.innerHTML = "New Game"
            }
        }
    }
}

reset.addEventListener("click", enablebtn);
