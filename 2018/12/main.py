#!/usr/bin/python3
import os

MAX_ROW = 355
MAX_COL = 355

def main():

    matrix = []
    for i in range(0, MAX_ROW):
        matrix.append([0 for _ in range(0, MAX_COL)])

    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            x,y = line.split(",")
            x = int(x)
            y = int(y)

            for row in range(0, MAX_ROW):
                for col in range(0, MAX_COL):
                    matrix[row][col] += abs(row-y) + abs(col-x)


    sum = 0
    for row in range(0, MAX_ROW):
        for col in range(0, MAX_COL):
            if matrix[row][col] < 10000:
                sum += 1

    print(sum)

if __name__ == "__main__":
    main()