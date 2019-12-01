#!/usr/bin/python3
import os

def main():
    ar = []

    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            ar.append(line.strip('\n'))
    
    for i1 in ar:
        for i2 in ar:
            diff = 0
            for i in range(0, len(i1)):
                if i1[i] != i2[i]:
                    diff += 1

                if diff > 1:
                    break

            if diff == 1:
                out = ""
                for i in range(0, len(i1)):
                    if i1[i] == i2[i]:
                        out += i1[i]
                
                print(out)
                return 


if __name__ == "__main__":
    main()