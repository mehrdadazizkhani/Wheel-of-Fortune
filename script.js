const r = document.querySelector(':root')
const wheelContainer = document.querySelector('.wheel-container')
const wheel = document.querySelector('.wheel')
const start = document.querySelector('.fixed-part')
const division = 20

let rotationDeg = 360
let lightSwitch = true

setDivision()
lightGenerator()
start.addEventListener("click", startHandler)


function lightGenerator () {
    for (let i = 0; i < division / 2; i++) {
        const lightBulb = document.createElement('div')
        lightBulb.className = 'light-bulb'
        lightBulb.style.transform = `rotate(${i*360/division*2}deg)`
        wheelContainer.appendChild(lightBulb)
        const light = document.createElement('div')
        light.className = 'light'
        lightBulb.appendChild(light)
        const lightSource = document.createElement('div')
        lightSource.className = 'light-source off'
        light.appendChild(lightSource)
    }
    for (let i = 0; i < division / 2; i++) {
        const lightBulb = document.createElement('div')
        lightBulb.className = 'light-bulb'
        lightBulb.style.transform = `rotate(${((i+1)*360/division*2)+360/division}deg)`
        wheelContainer.appendChild(lightBulb)
        const light = document.createElement('div')
        light.className = 'light'
        lightBulb.appendChild(light)
        const lightSource = document.createElement('div')
        lightSource.className = 'light-source on'
        light.appendChild(lightSource)
    }
}


function setDivision () {
    r.style.setProperty('--division', division)
}

const switchHandler = () => {
    lightSwitch = !lightSwitch
}

function startHandler () {
    wheel.style.transform = `rotate(${rotationDeg}deg)`   
}

setInterval(switchHandler, 1000)