#!/usr/bin/python3
import os


def main():
    sum = 0
    
    seen = set()
    seen.add(sum)

    all = []
    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            all.append(int(line))

    i = 0
    while(True):
        sum += all[i]
        if sum in seen:
            break
        else:
            seen.add(sum)
        
        if i >= len(all) - 1:
            i = 0
        else:
            i += 1

    print(sum)

if __name__ == "__main__":
    main()