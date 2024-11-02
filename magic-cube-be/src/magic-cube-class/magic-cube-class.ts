export class MagicCubeClass {
    private cubeState: number[][][] = []; //representasi magic cube dalam bentuk array 3d
    private value: number; //nilai objective function dari magic cube saat ini
    private sumConstraint: number;
    public getCurrentValue() : number{ //method mendapatkan objective function dari magic cube saat ini
        return this.value;
    }
    public setCurrentValue(value: number){ //set value dari suatu state dengan nilai yang baru
        this.value = value;
    }
    public getCurrentState(): number[][][]{ //method untuk mendapatkan state cube saat ini
        return this.cubeState;
    }
    public setCurrentState(state: number[][][]):void{ //set state magic cube
        this.cubeState = state;
    }
    public getSumConstraintVal(): number{ // mendapatkan syarat jumlah agar bisa menjadi magic cube
        return this.sumConstraint;
    }
    constructor() { //konstruktor yang akan inisialisasi objective function = 0 dan nilai cubenya 0 semua
        this.value = 0;
        this.cubeState = Array.from({length:5},()=>Array.from({length:5},()=>Array(5).fill(0)));
        this.sumConstraint = this.getSumConstraint(5);
    }

    private getSumConstraint(n:number):number{
        //menghitung nilai dari hasil penjumlahan di setiap bagian magic cube yang diminta yang menjadi syarat suatu kubus
        //bisa dianggap sebagai magic cube (untuk kasus ini, n=5, maka sum constraintnya adalah 315)
        //artinya, penjumlahan semua bagian magic cube yang diperlukan harus sama dengan 315
        return (n * (n**3+1) )/2;
    }

    public getRandomInitState():number[][][]{ //buat acak state cube yang bakal jadi initial state
        //buat array yang isinya angka dari 1 sampai 125
        const cubeNumbers = Array.from({length:125}, (_,i) => i+1);

        //acak angka dari 1 sampai 125
        for(let i = cubeNumbers.length - 1; i >= 0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [cubeNumbers[i],cubeNumbers[j]] = [cubeNumbers[j],cubeNumbers[i]];
        }

        const initState: number[][][] = Array.from({length:5},()=>Array.from({length:5},()=>Array(5).fill(0)));
        let idx = 0;
        for(let x =0; x<5; x++){
            for(let y =0; y <5; y++){
                for(let z =0; z<5; z++){
                    initState[x][y][z] = cubeNumbers[idx++];
                }
            }
        }

        return initState;
    }

    private row315(state: number[][][]): number {
        //hitung banyaknya baris yang jumlahnya sama dengan sumConstraint (n = 5, sumConstraint = 315)
        let cnt = 0;
        for (let z = 0; z < 5; z++) {
            for (let y = 0; y < 5; y++) {
                const sum = state[z][y].reduce((acc, val) => acc + val, 0);
                if (sum === this.sumConstraint) {
                    cnt++;
                }
            }
        }
        return cnt;
    }

    private column315(state: number[][][]): number {
        //hitung banyaknya kolom yang jumlahnya sama dengan sumConstraint (n = 5, sumConstraint = 315)
        let cnt = 0;
        for (let z = 0; z < 5; z++) {
            for (let x = 0; x < 5; x++) {
                const sum = state[z].reduce((acc, row) => acc + row[x], 0);
                if (sum === this.sumConstraint) {
                    cnt++;
                }
            }
        }
        return cnt;
    }

    private pillar315(state: number[][][]): number {
        //hitung banyaknya tiang yang jumlahnya sama dengan sumConstraint (n = 5, sumConstraint = 315)
        let cnt = 0;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                let sum = 0;
                for (let z = 0; z < 5; z++) {
                    sum += state[z][y][x];
                }
                if (sum === this.sumConstraint) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
    private planeDiag315(state: number[][][]): number {
        //hitung banyaknya diagonal bidang yang jumlahnya sama dengan sumConstraint (n = 5, sumConstraint = 315)
        let cnt = 0;

        // hitung semua diagonal bidang di bidang z
        for (let z = 0; z < 5; z++) {
            // periksa diagonal bidang dari kiri bawah ke kanan atas
            let sum1 = 0;
            for (let i = 0; i < 5; i++) {
                sum1 += state[z][i][i];
            }
            if (sum1 === this.sumConstraint) {
                cnt++;
            }

            // periksa diagonal bidang dari kiri atas ke kanan bawah
            let sum2 = 0;
            for (let i = 0; i < 5; i++) {
                sum2 += state[z][i][4 - i];
            }
            if (sum2 === this.sumConstraint) {
                cnt++;
            }
        }

        // hitung semua diagonal bidang di bidang y
        for (let y = 0; y < 5; y++) {
            // periksa diagonal bidang dari kiri bawah ke kanan atas
            let sum1 = 0;
            for (let i = 0; i < 5; i++) {
                sum1 += state[i][y][i];
            }
            if (sum1 === this.sumConstraint) {
                cnt++;
            }

            // periksa diagonal bidang dari kiri atas ke kanan bawah
            let sum2 = 0;
            for (let i = 0; i < 5; i++) {
                sum2 += state[i][y][4 - i];
            }
            if (sum2 === this.sumConstraint) {
                cnt++;
            }
        }

        // hitung semua diagonal bidang di bidang x
        for (let x = 0; x < 5; x++) {
            // periksa diagonal bidang dari kiri bawah ke kanan atas
            let sum1 = 0;
            for (let i = 0; i < 5; i++) {
                sum1 += state[i][i][x];
            }
            if (sum1 === this.sumConstraint) {
                cnt++;
            }

            // periksa diagonal bidang dari kiri atas ke kanan bawah
            let sum2 = 0;
            for (let i = 0; i < 5; i++) {
                sum2 += state[i][4 - i][x];
            }
            if (sum2 === this.sumConstraint) {
                cnt++;
            }
        }

        return cnt;
    }
    private spaceDiag315(state: number[][][]): number {
        //hitung banyaknya diagonal ruang yang jumlahnya sama dengan sumConstraint (n = 5, sumConstraint = 315)
        let cnt = 0;

        let sum1 = 0;
        for (let i = 0; i < 5; i++) {
            sum1 += state[i][i][i];
        }
        if (sum1 === this.sumConstraint) {
            cnt++;
        }

        let sum2 = 0;
        for (let i = 0; i < 5; i++) {
            sum2 += state[i][i][4 - i];
        }
        if (sum2 === this.sumConstraint) {
            cnt++;
        }

        let sum3 = 0;
        for (let i = 0; i < 5; i++) {
            sum3 += state[i][4 - i][i];
        }
        if (sum3 === this.sumConstraint) {
            cnt++;
        }

        let sum4 = 0;
        for (let i = 0; i < 5; i++) {
            sum4 += state[i][4 - i][4 - i];
        }
        if (sum4 === this.sumConstraint) {
            cnt++;
        }

        return cnt;
    }

    public objectiveFunction(state: number[][][]): number {
        //hitung nilai Objective Function dari state saat ini
        const rowCnt = this.row315(state);
        const colCnt = this.column315(state);
        const pillarCnt = this.pillar315(state);
        const planeDiagCnt = this.planeDiag315(state);
        const spaceDiagCnt = this.spaceDiag315(state);
        return rowCnt + colCnt + pillarCnt + pillarCnt + planeDiagCnt+spaceDiagCnt;
    }

    public getRandomSuccessor(state:number[][][]): number[][][]{ // method untuk mencari state tetangga random

        const newState = state.map(layer => layer.map(row => [...row]));
        //pilih posisi pertama acak
        const p1 ={
            x: Math.floor(Math.random() * 5),
            y: Math.floor(Math.random() * 5),
            z: Math.floor(Math.random() * 5)
        };
        //pilih posisi kedua acak
        const p2 ={
            x: Math.floor(Math.random() * 5),
            y: Math.floor(Math.random() * 5),
            z: Math.floor(Math.random() * 5)
        }
        //kalo posisinya kebetulan sama, acak lagi p2 sampai beda posisi dengan p1
        while (p1.x === p2.x && p1.y === p2.y && p1.z === p2.z){
            p2.x = Math.floor(Math.random() * 5);
            p2.y = Math.floor(Math.random() * 5);
            p2.z = Math.floor(Math.random() * 5);
        }
        //tukar 2 angka di posisi yang udah dipilih
        const temp = newState[p1.x][p1.y][p1.z];
        newState[p1.x][p1.y][p1.z] = newState[p2.x][p2.y][p2.z];
        newState[p2.x][p2.y][p2.z] = temp;

        return newState;
    }

    public getBestSuccessor(state:number[][][]): number[][][]{
        //mendapatkan successor dengan value objective function tertinggi
        let bestState = state;
        let bestValue = this.objectiveFunction(bestState);
        for (let x1 = 0; x1 < 5; x1++) {
            for (let y1 = 0; y1 < 5; y1++) {
                for (let z1 = 0; z1 < 5; z1++) {
                    for (let x2 = 0; x2 < 5; x2++) {
                        for (let y2 = 0; y2 < 5; y2++) {
                            for (let z2 = 0; z2 < 5; z2++) {
                                if (x1 === x2 && y1 === y2 && z1 === z2) {
                                    continue;
                                }
                                const neighbor = state.map(layer => layer.map(row => [...row]));

                                const temp = neighbor[x1][y1][z1];
                                neighbor[x1][y1][z1] = neighbor[x2][y2][z2];
                                neighbor[x2][y2][z2] = temp;

                                const neighborVal = this.objectiveFunction(neighbor);

                                if (neighborVal > bestValue) {
                                    bestState = neighbor;
                                    bestValue = neighborVal;
                                }
                            }
                        }
                    }
                }
            }
        }

        return bestState;
    }
}