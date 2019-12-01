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
                g.add_node(a)

            if b not in g:
                g.add_node(b)

            g.add_edge(a,b)
    
    s = ""
    while len(g) > 0:
        candidates = []
        for n in g:
            if len(nx.ancestors(g, n)) == 0:
                candidates.append(n)
            
        candidates.sort()
        s += candidates[0]
        g.remove_node(candidates[0])

    print(s)

if __name__ == "__main__":
    main()