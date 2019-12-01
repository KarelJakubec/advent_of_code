#!/usr/bin/python3
import os

def main():
    fabric = []
    for i in range(0, 1000):
        fabric.append(
            [[] for _ in range(0,1000)]
        )

    claims = [ True ]

    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            if line == "":
                continue

            parts = line.split(" ")

            claim_id = int(parts[0][1:])

            claims.append(False)

            col_start = int(parts[2].split(",")[0])
            row_start = int(parts[2].split(",")[1][:-1])
            col_len = int(parts[3].split("x")[0])
            row_len = int(parts[3].split("x")[1][:-1])

            for i in range(row_start, row_start + row_len):
                for j in range(col_start, col_start+ col_len):
                    fabric[i][j].append(claim_id)
                    if len(fabric[i][j]) > 1:
                        for id in fabric[i][j]:
                            claims[id] = True

    for i in range(0, len(claims)):
        if not claims[i]:
            print(i)

    return 0
                

if __name__ == "__main__":
    main()