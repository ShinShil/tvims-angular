export class ValuesCounter {
    constructor(private numbers: Array<Row>) { }
    get Numbers(): Array<Row> {
        return this.numbers;
    }
    count(): Values {
        return {
            mathOjidanie: this.mathOjidanie(),
            dispersiya: this.dispersiya(),
            assimetiya: this.assimetiya(),
            excess: this.excess(),
            moda: this.moda(),
            razmah: this.razmah(),
            sko: this.sko(),
            centr3: this.centrMoment(3),
            centr4: this.centrMoment(4)
        };
    }

    mathOjidanie(): number {
        let res = 0;
        for (const n of this.numbers) {
            res += n.p * n.val;
        }

        return res;
    }
    dispersiya(): number {
        let res = 0;
        const mathOjidanie = this.mathOjidanie();
        for (const n of this.numbers) {
            res += (Math.pow((n.val - mathOjidanie), 2) * n.p);
        }

        return res;
    }
    assimetiya(): number {
        return this.centrMoment(3) / Math.pow(this.sko(), 3);
    }
    excess(): number {
        return (this.centrMoment(4) / Math.pow(this.sko(), 4)) - 3;
    }
    moda(): number {
        return this.numbers.filter(n => n.p === (Math.max(...this.numbers.map(num => num.p))))[0].val;
    }
    razmah(): number {
        let max = 0;
        let min = 0;
        for (const n of this.numbers) {
            if (n.val > max) {
                max = n.val;
            }
            if (n.val < min) {
                min = n.val;
            }
        }

        return max - min;
    }
    sko(): number {
        return Math.sqrt(this.dispersiya());
    }
    nachMoment(pow: number): number {
        let res = 0;
        let finalAmount = 0;
        for (const n of this.numbers) {
            finalAmount += n.amount;
            res += Math.pow(n.val, pow) * n.amount;
        }

        return res / finalAmount;
    }

    centrMoment(pow: number): number {
        let res = 0;
        let finalAmount = 0;
        const mathOjidanie = this.mathOjidanie();
        for (const n of this.numbers) {
            finalAmount += n.amount;
            res += Math.pow(n.val - mathOjidanie, pow) * n.amount;
        }

        return res / finalAmount;
    }

}
