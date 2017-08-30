interface Row {
    val: number;
    amount: number;
    p: number;
    pSumm: number;
}

interface Values {
    mathOjidanie: number;
    dispersiya: number;
    moda: number;
    razmah: number;
    sko: number;
    assimetiya: number;
    excess: number;
    centr3: number;
    centr4: number;
}

interface RowInterval extends Row {
    intervalStart: number;
    intervalEnd: number;
}

interface Point {
    x: number;
    y: number;
}

interface Graphs {
    gistogramm: Array<Point>
    empericFunc: Array<Point>
}

interface Hypothesis {

}