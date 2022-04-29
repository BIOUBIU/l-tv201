let bit_start_time = 0
let bit_end_time = 0
let bit_last_time = 0
let data: number[] = []
let bit1 = 0
let bit2 = 0
let bit3 = 0
let byte1 = 0
/**
 * v2.0.1 紧急修复开机亮度为255导致直接写入0的bug
 */
// 数据
basic.forever(function () {
    if (input.lightLevel() < 200 && input.lightLevel() > 150) {
        basic.showIcon(IconNames.SmallDiamond)
        bit_start_time = input.runningTime()
        while (true) {
            if (input.lightLevel() < 150) {
                bit_end_time = input.runningTime()
                bit_last_time = bit_end_time - bit_start_time
                if (bit_last_time < 5000) {
                    data.push(0)
                    basic.showIcon(IconNames.Yes)
                    serial.writeNumbers(data)
                    break;
                } else {
                    data.push(1)
                    basic.showIcon(IconNames.Yes)
                    serial.writeNumbers(data)
                    break;
                }
            }
        }
    }
})
basic.forever(function () {
    serial.writeLine("" + input.lightLevel())
    basic.showNumber(data.length)
})
basic.forever(function () {
    while (data.length == 3) {
        bit1 = data.shift()
        bit2 = data.shift()
        bit3 = data.shift()
        byte1 = bit1 * 100 + (bit2 * 10 + bit3)
        if (byte1 == 1) {
            music.playTone(392, music.beat(BeatFraction.Double))
        } else if (byte1 == 10) {
            music.playTone(523, music.beat(BeatFraction.Double))
        } else if (byte1 == 11) {
            music.playTone(494, music.beat(BeatFraction.Double))
        } else if (byte1 == 100) {
            music.playTone(587, music.beat(BeatFraction.Double))
        } else if (byte1 == 101) {
            music.playTone(330, music.beat(BeatFraction.Double))
        } else if (byte1 == 110) {
            music.playTone(440, music.beat(BeatFraction.Double))
        } else {
            music.playTone(349, music.beat(BeatFraction.Double))
        }
    }
})
