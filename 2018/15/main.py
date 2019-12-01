#!/usr/bin/python3
import os

def process_node(input, i):
    childs = input[i]
    metadata = input[i+1]

    all_sum = 0

    next_i = i + 2
    for l in range(0, childs):
        (next_i, sum_metadata) = process_node(input, next_i)
        all_sum += sum_metadata

    for l in range(next_i, next_i + metadata):
        all_sum += input[l]

    next_i += metadata
    
    return (next_i, all_sum)

def main():

    
    with open(os.path.dirname(__file__) + "/data") as f:
        line = list(map(int, f.read().split(" ")))
        print(process_node(line, 0))

if __name__ == "__main__":
    main()