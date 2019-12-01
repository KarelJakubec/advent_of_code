#!/usr/bin/python3
import os

def main():
    fabric = []
    for i in range(0, 1000):
        fabric.append(
            [[] for _ in range(0,1000)]
        )

    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            if line == "":
                continue

            parts = line.split(" ")

            col_start = int(parts[2].split(",")[0])
            row_start = int(parts[2].split(",")[1][:-1])
            col_len = int(parts[3].split("x")[0])
            row_len = int(parts[3].split("x")[1][:-1])

            for i in range(row_start, row_start + row_len):
                for j in range(col_start, col_start+ col_len):
                    fabric[i][j] += 1

    sum = 0
    for i in range(0, 1000):
        for j in range(0, 1000):
            if fabric[i][j] > 1:
                sum += 1
    print(sum)
    #print(fabric)

    return 0
                

if __name__ == "__main__":
    main()