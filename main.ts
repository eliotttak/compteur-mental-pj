function showConnectCode (code: string) {
    basic.clearScreen()
    let showConnectCode_x = 0
    for (let showConnectCode_n of code) {
        let showConnectCode_y = 4
        while (showConnectCode_y > 4 - parseFloat(showConnectCode_n)) {
            led.plot(showConnectCode_x, showConnectCode_y)
            showConnectCode_y += -1
        }
        showConnectCode_x += 1
    }
}
let selectedPixel: number[] = []
let executionStatus = "entering_code"
let code = "1"
let oldCode = ""
radio.setGroup(1)
basic.forever(function () {
    if (executionStatus == "entering_code") {
        if (code !== oldCode) {
            showConnectCode(code)
            selectedPixel = [code.length - 1, 5 - parseInt(code[code.length - 1])]
            led.plotBrightness(selectedPixel[0], selectedPixel[1], 127.5)
            oldCode = code
        }
    }
})

input.onButtonPressed(Button.A, () => {
    if (executionStatus == "entering_code" && parseInt(code[code.length - 1]) > 1 ) {
        code = code.slice(0, -1) + (parseInt(code[code.length - 1]) - 1).toString()
    }
})

input.onButtonPressed(Button.B, () => {
    if (executionStatus == "entering_code" && parseInt(code[code.length - 1]) < 5) {
        code = code.slice(0, -1) + (parseInt(code[code.length - 1]) + 1).toString()
    }
})

input.onButtonPressed(Button.AB, () => {
    if (executionStatus == "entering_code") {
        if (code.length < 5) {
            code += "1"
        }

        else {
            executionStatus = "waiting_for_acceptance"
            basic.clearScreen()
            basic.showLeds(
                `
                . . . . .
                . . . . .
                # . # . #
                . . . . .
                . . . . .
                `
            )
            basic.showString("l:" + parseInt(code) + ":" + control.deviceSerialNumber())
            radio.sendString("l:" + parseInt(code) + ":" + control.deviceSerialNumber())
        }
    }
})

radio.onReceivedString(value => {
    basic.showString(value)
    if (executionStatus === "waiting_for_acceptance") {
        let parts = value.split(":")
        if (parts[0] === "accepted") {
            let acceptedSerial = parseInt(parts[1])
            let acceptedNumber = parseInt(parts[2])
            if (acceptedSerial == control.deviceSerialNumber()) {
                basic.showString("N")
                basic.pause(500)
                basic.showNumber(acceptedNumber)
            }
        }
    }
})