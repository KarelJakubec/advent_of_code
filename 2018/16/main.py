#!/usr/bin/python3
import os

def process_node(input, i):
    childs = input[i]
    metadata = input[i+1]

    values = []
    next_i = i + 2
    for l in range(0, childs):
        (next_i, node_value) = process_node(input, next_i)
        values.append(node_value)

    value = 0
    if len(values) == 0:
        for l in range(next_i, next_i + metadata):
            value += input[l]     
    else:
        for l in range(next_i, next_i + metadata):
            if input[l] != 0 and input[l] <= len(values):
                value += values[input[l] - 1]
    
    return(next_i + metadata, value)

def main():

    
    with open(os.path.dirname(__file__) + "/data") as f:
        line = list(map(int, f.read().split(" ")))
        print(process_node(line, 0))

if __name__ == "__main__":
    main()