#!/usr/bin/python3
import os


def main():

    line = None

    with open(os.path.dirname(__file__) + "/data") as f:
        line = f.read()

    while True:
        completed = True

        i = 0
        while i < len(line):
            print len(line)
            if i == len(line) - 1:
                break
            elif line[i] != line[i+1] and line[i].lower() == line[i+1].lower():
                line = line[:i] + line[i+2:]
                completed = False
                if i >= 1:
                    i -= 1
            else:
                i += 1

        if completed:
            print len(line), line
            break
        

if __name__ == "__main__":
    main()