export class MagicCubeClass {
    private cubeState: number[][][] = []; //representasi magic cube dalam bentuk array 3d
    private value: number; //nilai objective function dari magic cube saat ini
    private sumConstraint: number;
    public getCurrentValue() : number{ //method mendapatkan objective function dari magic cube saat ini
        return this.value;
    }
    public getCurrentState(): number[][][]{ //method untuk mendapatkan state cube saat ini
        return this.cubeState;
    }
    public setCurrentState(state: number[][][]):void{ //set state magic cube
        this.cubeState = state;
    }
    public getSumConstraintVal(): number{
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


}
