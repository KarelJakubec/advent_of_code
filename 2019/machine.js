class Memory {
    constructor(initialData) {
        this.storage = initialData.slice();
    }

    extend(address) {
        while(address > this.storage.length) {
            this.storage.push(null);
        }
    }

    getValue(address) {
        this.extend(address);
        return this.storage[address];
    }

    setValue(address, value) {
        this.extend(address);
        this.storage[address] = value;
    }
}


class Machine {
    static decodeInstruction(num) {
        let ins = {
            opcode: 0,
            paramModes: [0,0,0]
        }
        ins.opcode = num % 100;
        num = Math.floor(num / 100);
        let i = 0;
        while(num > 0) {
            ins.paramModes[i] = num % 10;
            num = Math.floor(num / 10);
            ++i;
        }

        return ins;
    }

    constructor(data, input, output) {
        this.pos = 0;
        this.rel_pos = 0;
        this.memory = new Memory(data);
        this.input = input;
        this.output = output;
    }

    getArgsAdresses(ins, n) {
        let arr = Array(n);
        for(let i = 0; i < n; ++i) {
            // Position mode
            if (ins.paramModes[i] == 0) {
                arr[i] = this.memory.getValue(this.pos + 1 + i);
            }
            // Imediate mode
            else if (ins.paramModes[i] == 1) {
                arr[i] = this.pos + 1 + i;
            }
            // Relative mode
            else if (ins.paramModes[i] == 2) {
                arr[i] = this.memory.getValue(this.pos + 1 + i) + this.rel_pos;
            }
        }
        return arr;
    }

    run() {
        let ins = Machine.decodeInstruction(this.memory.getValue(this.pos));

        while(ins.opcode != 99) {
            if(ins.opcode == 1) {
                let args = this.getArgsAdresses(ins, 3);
                this.memory.setValue(
                    args[2],
                    this.memory.getValue(args[0]) + this.memory.getValue(args[1])
                );
                this.pos += 4;
            }
            else if(ins.opcode == 2) {
                let args = this.getArgsAdresses(ins, 3);
                this.memory.setValue(
                    args[2],
                    this.memory.getValue(args[0]) * this.memory.getValue(args[1])
                );
                this.pos += 4;
            }
            else if(ins.opcode == 3) {
                let inp = this.input();
                if(inp === null) {
                    return -1;
                }
                let args = this.getArgsAdresses(ins, 1);
                this.memory.setValue(args[0], inp);
                this.pos += 2;
            }
            else if(ins.opcode == 4) {
                let args = this.getArgsAdresses(ins, 1);
                this.output(this.memory.getValue(args[0]));
                this.pos += 2;
            }
            else if(ins.opcode == 5) {
                let args = this.getArgsAdresses(ins, 2);
                if(this.memory.getValue(args[0]) != 0) {
                    this.pos = this.memory.getValue(args[1]);
                }
                else {
                    this.pos += 3;
                }
            }
            else if(ins.opcode == 6) {
                let args = this.getArgsAdresses(ins, 2);
                if(this.memory.getValue(args[0]) == 0) {
                    this.pos = this.memory.getValue(args[1]);
                }
                else {
                    this.pos += 3;
                }
            }
            else if(ins.opcode == 7) {
                let args = this.getArgsAdresses(ins, 3);
                this.memory.setValue(
                    args[2],
                    this.memory.getValue(args[0]) < this.memory.getValue(args[1]) ? 1 : 0
                );
                this.pos += 4;
            }
            else if(ins.opcode == 8) {
                let args = this.getArgsAdresses(ins, 3);
                this.memory.setValue(
                    args[2],
                    this.memory.getValue(args[0]) == this.memory.getValue(args[1]) ? 1 : 0
                );
                this.pos += 4;
            }
            else if(ins.opcode == 9) {
                let args = this.getArgsAdresses(ins, 1);
                this.rel_pos += this.memory.getValue(args[0]);
                this.pos += 2;
            }
            else {
                console.log("ERROR " + ins + " " + this.memory.getValue(this.pos));
                break;
            }

            ins = Machine.decodeInstruction(this.memory.getValue(this.pos));
        }

        return 0;
    }
}


exports.Machine = Machine