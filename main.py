def on_button_pressed_a():
    if execute == 1:
        radio.send_string("" + str(control.device_serial_number()) + "§" + "pressed")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    global accepted, cible
    if receivedString == "" + str(control.device_serial_number()) + "§" + "ok":
        accepted = True
    elif receivedString.includes("" + str(control.device_serial_number()) + "§" + "target"):
        cible = parse_float(receivedString.split("§")[2])
        basic.show_number(cible)
    elif receivedString.includes("" + str(control.device_serial_number()) + "§" + "go"):
        pass
radio.on_received_string(on_received_string)

_continue = False
accepted = False
execute = 0
cible = 0
cible = 0
radio.set_group(1)
execute = 0
accepted = False
code_auth = ""
for index in range(5):
    _continue = True
    while _continue:
        if input.button_is_pressed(Button.A):
            code_auth = "" + code_auth + "a"
            _continue = False
            while input.button_is_pressed(Button.A):
                pass
        elif input.button_is_pressed(Button.B):
            code_auth = "" + code_auth + "b"
            _continue = False
            while input.button_is_pressed(Button.B):
                pass
radio.send_string("admission_code" + "§" + code_auth + "§" + str(control.device_serial_number()))
while not (accepted):
    pass
basic.show_leds("""
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    """)
execute += 1