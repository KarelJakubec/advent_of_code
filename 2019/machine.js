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
        this.data = data;
        this.input = input;
        this.output = output;
    }

    getArgs(ins, n) {
        let arr = Array(n);
        for(let i = 0; i < n; ++i) {
            arr[i] = ins.paramModes[i] === 1 ? this.data[this.pos + 1 + i] : this.data[this.data[this.pos + 1 + i]];
        }
        return arr;
    }

    run() {
        let ins = Machine.decodeInstruction(this.data[this.pos]);

        while(ins.opcode != 99) {

            if(ins.opcode == 1) {
                let args = this.getArgs(ins, 2);
                this.data[this.data[this.pos + 3]] = args[0] + args[1];
                this.pos += 4;
            }
            else if(ins.opcode == 2) {
                let args = this.getArgs(ins, 2);
                this.data[this.data[this.pos + 3]] = args[0] * args[1];
                this.pos += 4;
            }
            else if(ins.opcode == 3) {
                let inp = this.input();
                if(inp === null) {
                    return -1;
                }

                this.data[this.data[this.pos + 1]] = inp;
                this.pos += 2;
            }
            else if(ins.opcode == 4) {
                this.output(this.data[this.data[this.pos + 1]]);
                this.pos += 2;
            }
            else if(ins.opcode == 5) {
                let args = this.getArgs(ins, 2);
                if(args[0] != 0) {
                    this.pos = args[1];
                }
                else {
                    this.pos += 3;
                }
            }
            else if(ins.opcode == 6) {
                let args = this.getArgs(ins, 2);
                if(args[0] == 0) {
                    this.pos = args[1];
                }
                else {
                    this.pos += 3;
                }
            }
            else if(ins.opcode == 7) {
                let args = this.getArgs(ins, 2);
                this.data[this.data[this.pos + 3]] = args[0] < args[1] ? 1 : 0;
                this.pos += 4;
            }
            else if(ins.opcode == 8) {
                let args = this.getArgs(ins, 2);
                this.data[this.data[this.pos + 3]] = args[0] == args[1] ? 1 : 0;
                this.pos += 4;
            }
            else {
                console.log("ERROR " + ins + " " + this.data[this.pos]);
                break;
            }

            ins = Machine.decodeInstruction(this.data[this.pos]);
        }

        return 0;
    }
}


exports.Machine = Machine