def main():
    # use list comprehension to read numbers into a list, and convert
    # to integers.
    ints = [int(x) for x in  open('data').read().split(',')]

    # main loop
    for op in range(0, len(ints), 4):
        opcode = ints[op]
        # set positions
        input_pos1 = ints[op + 1]
        input_pos2 = ints[op + 2]
        output_pos = ints[op + 3]
        
        if opcode == 1:
            #add
            input1 = ints[input_pos1]
            input2 = ints[input_pos2]
            ints[output_pos] = input1 + input2
            
        elif opcode == 2:
            #multiply
            input1 = ints[input_pos1]
            input2 = ints[input_pos2]
            ints[output_pos] = input1 * input2

        elif opcode == 99:
            print("Code 99: Program Halting...")
            break    
    print(ints[0])
main()
