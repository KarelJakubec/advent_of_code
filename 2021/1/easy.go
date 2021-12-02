package one

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func Easy() {

	file, err := os.Open("1/data")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	increased := 0
	last := int(^uint(0) >> 1) // MaxInt

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lineStr := scanner.Text()
		num, _ := strconv.Atoi(lineStr)

		if num > last {
			increased++
		}

		last = num
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Println(increased)
}
