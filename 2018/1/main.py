#!/usr/bin/python3
import os

def main():
    sum = 0
    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            sum += int(line)

    print(sum)

if __name__ == "__main__":
    main()