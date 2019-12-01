#!/usr/bin/python3
import os

MAX_ROW = 355
MAX_COL = 355

def main():

    matrix = []
    for i in range(0, MAX_ROW):
        matrix.append([ {"belongs": None, "dist": MAX_ROW + MAX_COL + 1} for _ in range(0,MAX_COL)])

    line_no = 0

    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            x,y = line.split(",")
            x = int(x)
            y = int(y)
            matrix[y][x] = {"belongs": line_no, "dist": 0}

            for row in range(0, MAX_ROW):
                for col in range(0, MAX_COL):
                    if row == y and col == x:
                        continue

                    dist = abs(row-y) + abs(col-x)
                    if matrix[row][col]["dist"] > dist:
                        matrix[row][col]["dist"] = dist
                        matrix[row][col]["belongs"] = line_no
                    elif matrix[row][col]["dist"] == dist:
                        matrix[row][col]["belongs"] = "X"
            line_no += 1

    sizes = {}
    for row in range(0, MAX_ROW):
        for col in range(0, MAX_COL):
            owner = matrix[row][col]["belongs"]
            if owner == "X":
                continue

            if owner not in sizes:
                sizes[owner] = 0

            if row == 0 or col == 0 or row == (MAX_ROW - 1) or col == (MAX_COL - 1):
                sizes[owner] = -1
            elif sizes[owner] != -1:
                sizes[owner] +=1 

    max = 0
    for v in sizes.values():
        if v > max:
            max = v

    print max

if __name__ == "__main__":
    main()