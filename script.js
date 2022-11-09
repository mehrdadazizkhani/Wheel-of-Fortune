const r = document.querySelector(':root')
const wheelContainer = document.querySelector('.wheel-container')
const lightContainer = document.querySelector('.light-container')
const wheel = document.querySelector('.wheel')
const start = document.querySelector('.fixed-part')
const score = document.querySelector('.score')
const scoreText = document.querySelector('.score-text')
const winSound = new Audio('./win.wav')
const chanceSound = new Audio('./chance.wav')
const lsoeSound = new Audio('./lose.wav')
const spinSound = new Audio('./spin.mp3')
const division = 16
const fakeMove = 360 * 3

const prizes = [
    {prize: "100$", chance: 24},
    {prize: "CHANCE", chance: 30},
    {prize: "800$", chance: 4},
    {prize: "YOU LOST", chance: 25},
    {prize: "400$", chance: 7},
    {prize: "5000$", chance: 1},
    {prize: "600$", chance: 5},
    {prize: "500$", chance: 6},
    {prize: "10$", chance: 40},
    {prize: "CHANCE", chance: 30},
    {prize: "100$", chance: 29},
    {prize: "YOU LOST", chance: 25},
    {prize: "1500$", chance: 3},
    {prize: "500$", chance: 6},
    {prize: "1000$", chance: 4},
    {prize: "350$", chance: 8}
]

let rotation = []
let duplicatedPrize = []
for (let i = 0; i < division; i++) {
    for (let j = 0; j < prizes[i].chance; j++) {
        rotation.push(360/division*i)
    }
    for (let j = 0; j < prizes[i].chance; j++) {
        duplicatedPrize.push(prizes[i])
    }
}

let rotationDeg = 0
let prevDeg = 0
let lightSwitch = true

setDivision()
lightGenerator()
prizeGenerator()
start.addEventListener("click", startHandler)

function setDivision () {
    r.style.setProperty('--division', division)
    r.style.setProperty('--result-pin', `${360/division/2}deg`)
}

function lightGenerator () {
    for (let i = 0; i < division; i++) {
        const lightBulb = document.createElement('div')
        lightBulb.className = 'light-bulb'
        lightBulb.style.transform = `rotate(${i*360/division}deg)`
        lightContainer.appendChild(lightBulb)
        const light = document.createElement('div')
        light.className = 'light'
        lightBulb.appendChild(light)
        const lightSource = document.createElement('div')
        lightSource.className = 'light-source'
        light.appendChild(lightSource)
    }
}

function prizeGenerator () {
    for (let i = 0; i < division; i++) {
        const pie = document.createElement('div')
        pie.className = 'pie'
        pie.style.transform = `rotate(${i*360/division+360/division/2}deg)`
        wheel.appendChild(pie)
        const prize = document.createElement('p')
        prize.innerText = `${prizes[i].prize}`
        prize.className = 'prize'
        pie.appendChild(prize)
    }
}

const switchHandler = () => {
    const light = document.querySelectorAll('.light-source')
    lightSwitch = !lightSwitch
    for (let i = 0; i < light.length; i += 2) {
        lightSwitch ? light[i].classList.add("on") : light[i].classList.remove("on")
    }
    for (let i = 1; i < light.length; i += 2) {
        !lightSwitch ? light[i].classList.add("on") : light[i].classList.remove("on")
    }
}

function startHandler () {
    const randomNumber = Math.floor(Math.random()*rotation.length)
    const finalRotationDeg = rotation[randomNumber]
    if (prevDeg - finalRotationDeg <= 0) {
        rotationDeg += -1*(prevDeg - finalRotationDeg) + fakeMove
    } else {
        rotationDeg += (360 - prevDeg + finalRotationDeg) + fakeMove
    }
    prevDeg = finalRotationDeg
    wheel.style.transform = `rotate(${-rotationDeg}deg)`
    start.removeEventListener("click",startHandler)
    scoreText.innerText = duplicatedPrize[randomNumber].prize
    spinSound.play()

    setTimeout(() => {
        audioHandler()
        addListener()
        scoreHandler()
    }, 5300)

    const audioHandler = () => {
        if (duplicatedPrize[randomNumber].chance == 30) {
            chanceSound.play()
        } else if (duplicatedPrize[randomNumber].chance == 25) {
            lsoeSound.play()
        } else {
            winSound.play()
        }
    }
}


const addListener = () => {
    start.addEventListener("click", startHandler)
}

const scoreHandler = () => {
    score.classList.add("score-active")
    scoreText.classList.add("score-text-active")
    setTimeout(scoreClear, 2000)
}

const scoreClear = () => {
    score.classList.remove("score-active")
    scoreText.classList.remove("score-text-active")
}

setInterval(switchHandler, 1500)