#!./env/bin/python3

import os
import networkx as nx

def main():

    g = nx.DiGraph()
    with open(os.path.dirname(__file__) + "data") as f:
        for line in f:
            elements = line.split(" ")
            a = elements[1]
            b = elements[7]

            if a not in g:
                g.add_node(a, time=(ord(a) - ord('A') + 61))
                print(a, g.node[a]["time"])

            if b not in g:
                g.add_node(b, time=(ord(b) - ord('A') + 61))
                print(b, g.node[b]["time"])


            g.add_edge(a,b)

    working = ["", "", "", "", ""]
    time = 0
    while len(g) > 0:
        candidates = []
        for n in g:
            if len(nx.ancestors(g, n)) == 0:
                candidates.append(n)
        
        candidates.sort()

        for l in candidates:
            if l not in working:
                for i in range(0, len(working)):
                    if working[i] == "":
                        working[i] = l
                        break

        print("C", candidates, "W", working)

        for i in range(0, len(working)):
            if working[i] != "":
                g.node[working[i]]["time"] -= 1
                if g.node[working[i]]["time"] == 0:
                    g.remove_node(working[i])
                    working[i] = ""

        time += 1

    print(time)

if __name__ == "__main__":
    main()