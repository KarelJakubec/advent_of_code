package two

import (
	"fmt"
	"main/common"
	"strconv"
	"strings"
)

func Easy() {
	arr := common.ReadStringsToArr("2/data")

	vertical, horizontal := 0, 0

	for _, v := range arr {
		instructions := strings.Fields(v)

		value, _ := strconv.Atoi(instructions[1])

		switch instructions[0] {
		case "up":
			vertical -= value
		case "down":
			vertical += value
		case "forward":
			horizontal += value
		}
	}
	fmt.Println(vertical * horizontal)

}
