package two

import (
	"fmt"
	"main/common"
	"strconv"
	"strings"
)

func Hard() {
	arr := common.ReadStringsToArr("2/data")

	vertical, horizontal, aim := 0, 0, 0

	for _, v := range arr {
		instructions := strings.Fields(v)

		value, _ := strconv.Atoi(instructions[1])

		switch instructions[0] {
		case "up":
			aim -= value
		case "down":
			aim += value
		case "forward":
			horizontal += value
			vertical += aim * value
		}
	}
	fmt.Println(vertical * horizontal)

}
