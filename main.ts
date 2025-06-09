input.onButtonPressed(Button.A, function () {
    if (execute == 1) {
        radio.sendString("" + control.deviceSerialNumber() + "§" + "pressed")
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "" + control.deviceSerialNumber() + "§" + "ok") {
        accepted = true
    } else if (receivedString.includes("" + control.deviceSerialNumber() + "§" + "target")) {
        cible = parseFloat(receivedString.split("§")[2])
        basic.showNumber(cible)
    } else if (receivedString.includes("" + control.deviceSerialNumber() + "§" + "go")) {
    	
    }
})
let code_auth = ""
let _continue = false
let accepted = false
let execute = 0
let cible = 0
cible = 0
radio.setGroup(1)
execute = 0
accepted = false
for (let index = 0; index < 5; index++) {
    _continue = true
    while (_continue) {
        if (input.buttonIsPressed(Button.A)) {
            code_auth = "" + code_auth + "a"
            _continue = false
            while (input.buttonIsPressed(Button.A)) {
            	
            }
        } else if (input.buttonIsPressed(Button.B)) {
            code_auth = "" + code_auth + "b"
            _continue = false
            while (input.buttonIsPressed(Button.B)) {
            	
            }
        }
    }
}
radio.sendString("admission_code" + "§" + code_auth + "§" + control.deviceSerialNumber())
while (!(accepted)) {
    basic.showLeds(`
        . . . . .
        . . . . .
        # . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # # .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . # #
        . . . . .
        . . . . .
        `)
}
basic.showLeds(`
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    `)
execute += 1
