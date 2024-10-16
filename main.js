var saveData = {
    points: 0,
    upgrades: 0,
    update: 0,
}
var defSave = saveData


var savegame = JSON.parse(localStorage.getItem("Quantumpje-IncrementalSave"))
if (savegame !== null && savegame.update == saveData.update) {
    saveData = savegame
} else if (savegame !== null) {
    for (let i in saveData) {
        if (i != 'update') {
            if (typeof savegame[i] !== "undefined") {
                gameData[i] = savegame[i]
            }
        }
    }
}

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("Quantumpje-IncrementalSave", JSON.stringify(saveData))
}, 2500)


function formatNum(num) {
    if (num >= 1000) {
        return num.toExponential(3)
    }
    return (Math.floor(num * 1000) / 1000)
}


function display_Points() {
    document.getElementById("Points").innerHTML = `${formatNum(saveData.points)} Points`
}

function display_Upgrades() {
    document.getElementById("Upgrades").innerHTML = `${formatNum(saveData.upgrades)} Upgrades`
}

function display_PointsButton() {
    document.getElementById("PointsButton").innerHTML = `${formatNum(formula_points())} Points Button`
}

function display_UpgradesButton() {
    document.getElementById("UpgradesButton").innerHTML = `${formatNum(formula_upgrade_P())} Points >>> ${formatNum(formula_upgrade_U())} Upgrades Button`
}


function cooldown_PointsButton() {
    document.getElementById("PointsButton").disabled = true
    setTimeout(function () { document.getElementById("PointsButton").disabled = false }, 100)
}

function cooldown_UpgradesButton() {
    document.getElementById("UpgradesButton").disabled = true
    setTimeout(function () { document.getElementById("UpgradesButton").disabled = false }, 100)
}


function formula_points() {
    return 1 * 1.25 ** saveData.upgrades
}

function formula_upgrade_U() {
    return 1
}
function formula_upgrade_P() {
    return 10 * 1.35 ** saveData.upgrades
}


function check_upgrade() {
    return saveData.points >= formula_upgrade_P()
}


function MainClick() {
    saveData.points += formula_points()

    display_Points()

    cooldown_PointsButton()
}

function Upgrade() {
    if (check_upgrade()) {
        saveData.points -= formula_upgrade_P()
        saveData.upgrades += formula_upgrade_U()

        display_Points()
        display_Upgrades()
        display_PointsButton()
        display_UpgradesButton()

        cooldown_UpgradesButton()
    }
}


function DelSave() {
    saveData = defSave
    localStorage.setItem("Quantumpje-IncrementalSave", JSON.stringify(saveData))
    location.reload()
}


window.setInterval(function () {
    if (check_upgrade()) {
        document.getElementById("UpgradesButton").disabled = false
    } else {
        document.getElementById("UpgradesButton").disabled = true
    }
}, 100)


setTimeout(function () {
    display_Points()
    display_PointsButton()
    display_Upgrades()
    display_UpgradesButton()
}, 50)
