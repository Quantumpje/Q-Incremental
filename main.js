const unsupportedVersions = [0]

var saveData = {
    points: 0,
    upgrades: 0,
    autoclickers: 0,
    update: 0.01,
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

if (unsupportedVersions.includes(saveData.update)) {
    DelSave()
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

function display_AutoClickers() {
    document.getElementById("AutoClickers").innerHTML = `${formatNum(saveData.autoclickers)} Auto Clickers`
}

function display_PointsButton() {
    document.getElementById("PointsButton").innerHTML = `${formatNum(formula_points())} Points Button`
}

function display_UpgradesButton() {
    document.getElementById("UpgradesButton").innerHTML = `${formatNum(formula_upgrade_P())} Points >>> ${formatNum(formula_upgrade_U())} Upgrades Button`
}

function display_BuyAutoClickerButton() {
    document.getElementById("BuyAutoClickerButton").innerHTML = `${formatNum(formula_buyautoclicker_U())} Upgrades >>> ${formatNum(formula_buyautoclicker_CL())} Auto Clickers Button`
}


function cooldown_PointsButton() {
    document.getElementById("PointsButton").disabled = true
    setTimeout(function () { document.getElementById("PointsButton").disabled = false }, 100)
}

function cooldown_UpgradesButton() {
    document.getElementById("UpgradesButton").disabled = true
    setTimeout(function () { document.getElementById("UpgradesButton").disabled = false }, 100)
}

function cooldown_BuyAutoClickerButton() {
    document.getElementById("BuyAutoClickerButton").disabled = true
    setTimeout(function () { document.getElementById("BuyAutoClickerButton").disabled = false }, 100)
}


function formula_points() {
    return saveData.upgrades >= 1 ? 1 * 1.25 ** saveData.upgrades : 1
}

function formula_upgrade_U() {
    return 1
}
function formula_upgrade_P() {
    return saveData.upgrades >= 1 ? 10 * 1.35 ** saveData.upgrades : 10
}

function formula_buyautoclicker_CL() {
    return 1
}
function formula_buyautoclicker_U() {
    return saveData.autoclickers >= 1 ? 8 * 1.25 ** (saveData.autoclickers) : 8
}


function check_upgrade() {
    return saveData.points >= formula_upgrade_P()
}

function check_autoclicker() {
    return saveData.upgrades >= formula_buyautoclicker_U()
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

function BuyAutoClicker() {
    if (check_autoclicker()) {
        saveData.upgrades -= formula_buyautoclicker_U()
        saveData.autoclickers += formula_buyautoclicker_CL()

        display_Upgrades()
        display_AutoClickers()
        display_UpgradesButton()
        display_BuyAutoClickerButton()

        cooldown_BuyAutoClickerButton()
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
    if (check_autoclicker()) {
        document.getElementById("BuyAutoClickerButton").disabled = false
    } else {
        document.getElementById("BuyAutoClickerButton").disabled = true
    }
}, 100)


window.setInterval(function () {
    saveData.points += formula_points() * (saveData.autoclickers / 2)
    display_Points()
}, 1000)


window.setTimeout(function () {
    display_Points()
    display_PointsButton()
    display_Upgrades()
    display_UpgradesButton()
    display_AutoClickers()
    display_BuyAutoClickerButton()
}, 50)
