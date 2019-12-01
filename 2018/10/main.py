#!/usr/bin/python3
import os
import string


def process_without_letter(polymer, l):
    
    polymer = polymer.replace(l, "")
    polymer = polymer.replace(l.upper(), "")

    line = polymer 
    while True:
        completed = True

        i = 0
        while i < len(line):
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
            print l, len(line)
            break

def main():

    line = None
    with open(os.path.dirname(__file__) + "/data") as f:
        line = f.read()

    for l in string.ascii_lowercase:
        process_without_letter(line, l)


if __name__ == "__main__":
    main()