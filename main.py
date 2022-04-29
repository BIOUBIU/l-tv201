byte1 = 0
bit3 = 0
bit2 = 0
bit1 = 0
data: List[number] = []
bit_last_time = 0
bit_end_time = 0
bit_start_time = 0
basic.pause(2000)
# 数据

def on_forever():
    global bit_start_time, bit_end_time, bit_last_time
    if input.light_level() > 150:
        basic.show_icon(IconNames.SMALL_DIAMOND)
        bit_start_time = input.running_time()
        while True:
            if input.light_level() < 150:
                bit_end_time = input.running_time()
                bit_last_time = bit_end_time - bit_start_time
                if bit_last_time < 5000:
                    data.append(0)
                    basic.show_icon(IconNames.YES)
                    serial.write_numbers(data)
                    break
                else:
                    data.append(1)
                    basic.show_icon(IconNames.YES)
                    serial.write_numbers(data)
                    break
basic.forever(on_forever)

def on_forever2():
    serial.write_line("" + str(input.light_level()))
    basic.show_number(len(data))
basic.forever(on_forever2)

def on_forever3():
    global bit1, bit2, bit3, byte1
    while len(data) == 3:
        bit1 = data.shift()
        bit2 = data.shift()
        bit3 = data.shift()
        byte1 = bit1 * 100 + (bit2 * 10 + bit3)
        if byte1 == 1:
            music.play_tone(392, music.beat(BeatFraction.DOUBLE))
        elif byte1 == 10:
            music.play_tone(523, music.beat(BeatFraction.DOUBLE))
        elif byte1 == 11:
            music.play_tone(494, music.beat(BeatFraction.DOUBLE))
        elif byte1 == 100:
            music.play_tone(587, music.beat(BeatFraction.DOUBLE))
        elif byte1 == 101:
            music.play_tone(330, music.beat(BeatFraction.DOUBLE))
        elif byte1 == 110:
            music.play_tone(440, music.beat(BeatFraction.DOUBLE))
        else:
            music.play_tone(349, music.beat(BeatFraction.DOUBLE))
basic.forever(on_forever3)
