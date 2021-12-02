package common

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func ReadIntsToArr(filename string) []int {

	var arr []int

	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lineStr := scanner.Text()
		num, _ := strconv.Atoi(lineStr)
		arr = append(arr, num)
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return arr
}

func ReadStringsToArr(filename string) []string {

	var arr []string

	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		arr = append(arr, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return arr
}