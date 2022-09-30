const r = document.querySelector(':root')
const wheelContainer = document.querySelector('.wheel-container')
const lightContainer = document.querySelector('.light-container')
const wheel = document.querySelector('.wheel')
const start = document.querySelector('.fixed-part')
const division = 16
const fakeMove = 360 * 2

const prizes = [
    {prize: "0", chance: 25},
    {prize: "22.5", chance: 20},
    {prize: "45", chance: 7},
    {prize: "67.5", chance: 15},
    {prize: "90", chance: 10},
    {prize: "112.5", chance: 2},
    {prize: "135", chance: 5},
    {prize: "157.5", chance: 10},
    {prize: "180", chance: 7},
    {prize: "202.5", chance: 30},
    {prize: "225", chance: 4},
    {prize: "247.5", chance: 5},
    {prize: "270", chance: 15},
    {prize: "292.5", chance: 10},
    {prize: "315", chance: 5},
    {prize: "337.5", chance: 10}
]

let rotation = []
for (let i = 0; i < division; i++) {
    for (let j = 0; j < prizes[i].chance; j++) {
        rotation.push(360/division*i)
    }
}

let rotationDeg = 0
let prevDeg = 0
let lightSwitch = true

setDivision()
lightGenerator()
prizeGenerator()
start.addEventListener("click", startHandler)


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
        pie.style.transform = `rotate(${(i+1)*360/division+360-360/division/2}deg)`
        wheel.appendChild(pie)
        const prize = document.createElement('p')
        prize.innerText = `${prizes[i].prize}`
        prize.className = 'prize'
        pie.appendChild(prize)
    }
}


function setDivision () {
    r.style.setProperty('--division', division)
    r.style.setProperty('--result-pin', `${360/division/2}deg`)
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
    const finalRotationDeg = rotation[Math.floor(Math.random()*rotation.length)]
    if (prevDeg - finalRotationDeg <= 0) {
        rotationDeg += -1*(prevDeg - finalRotationDeg) + fakeMove
    } else {
        rotationDeg += (360 - prevDeg + finalRotationDeg) + fakeMove
    }
    prevDeg = finalRotationDeg
    wheel.style.transform = `rotate(${-rotationDeg}deg)`   
}

setInterval(switchHandler, 1000)