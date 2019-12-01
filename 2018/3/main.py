#!/usr/bin/python3
import os


def main():   
    two = 0
    three = 0
    
    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            counts = {}
            for letter in line:
                if letter not in counts:
                    counts[letter] = 1
                else:
                    counts[letter] += 1
        
            two_found = False
            three_found = False


            for key, value in counts.items():
                if not two_found and value == 2:
                    two_found = True
                    two += 1
                
                if not three_found and value == 3:
                    three_found = True
                    three += 1

                if two_found and three_found:
                    break

    print two, three
    print two * three

if __name__ == "__main__":
    main()