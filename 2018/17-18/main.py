#! env/bin/python3
import os
from llist import dllist, dllistnode

def play(players, max_marble):
    score = [ 0 for _ in range(0, players)]
    # Do first step to initialize the list...
    l = dllist([0])

    # player 0 already played during init
    player = 0
    for i in range(1, max_marble + 1):
        if i % 23 == 0:
            l.rotate(7)
            score[player] += (i + l.first.value)
            l.remove(l.first)
        else:
            new = dllistnode(i)
            l.rotate(-2)
            l.appendleft(new)

        if (player + 1) >= players:
            player = 0
        else:
            player += 1

    print("Result for {0} players and {1} marbles is {2}".format(players, max_marble, max(score)))

def main():
    plays = [
        [9, 25],
        [10, 1618],
        [13, 7999],
        [17, 1104],
        [21, 6111],
        [30, 5807],
        [479, 71035],
        [479, 7103500]
    ]

    for item in plays:
        play(item[0], item[1])

if __name__ == "__main__":
    main()