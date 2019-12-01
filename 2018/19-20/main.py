#! env/bin/python3
import os
from pandas import DataFrame

class Point(object):
    def __init__(self, x, y, v_x, v_y):
        self.x = x
        self.y = y
        self.v_x = v_x
        self.v_y = v_y

    def move(self):
        self.x += self.v_x
        self.y += self.v_y

class Message(object):
    def __init__(self):
        self.points = []
    
    def add_point(self, x, y, v_x, v_y):
        self.points.append(Point(x, y, v_x, v_y))

    def step(self, verbose=False):
        max_x = -100000
        min_x = 100000
        max_y = -100000
        min_y = 100000

        for p in self.points:
            p.move()
            max_x = max(p.x, max_x)
            max_y = max(p.y, max_y)
            min_x = min(p.x, min_x)
            min_y = min(p.y, min_y)

        dif_x = abs(min_x - max_x)
        dif_y = abs(min_y - max_y)
        if verbose:
            print(dif_x, dif_y)
            matrix = [
                [ '.' for _ in range(0, dif_x + 1)  ] for _ in range(0, dif_y + 1)
            ]

            for p in self.points:
                matrix[p.y - abs(min_y)][p.x - abs(min_x)] = '#'

            for row in matrix:
                print("".join(row))
            

def main():

    m = Message()
    with open(os.path.dirname(__file__) + "/data") as f:
        for line in f:
            data = line.split(",")
            m.add_point(int(data[0]),int(data[1]), int(data[2]), int(data[3]))

    for i in range(0,10511):
        if i == 10510:
            print(i)
            m.step(True)
        else:
            m.step(False)

if __name__ == "__main__":
    main()