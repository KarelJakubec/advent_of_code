package one

import (
	"fmt"
	"main/common"
)

func Hard() {
	arr := common.ReadIntsToArr("1/data")

	increased := 0



	for i := 0; i < len(arr) - 3; i++ {
		if arr[i] + arr[i+1] + arr[i+2] < arr[i+1] + arr[i+2] + arr[i+3] {
			increased++
		}
	}

	fmt.Println(increased)
}
