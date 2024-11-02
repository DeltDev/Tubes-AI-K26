export class MagicCubeClass {
    private cubeState: number[][][] = []; //representasi magic cube dalam bentuk array 3d
    private value: number; //nilai objective function dari magic cube saat ini
    public getCurrentValue() : number{ //method mendapatkan objective function dari magic cube saat ini
        return this.value;
    }
    public getCurrentState(): number[][][]{ //method untuk mendapatkan state cube saat ini
        return this.cubeState;
    }
    public setCurrentState(state: number[][][]):void{
        this.cubeState = state;
    }
    constructor() { //konstruktor yang akan inisialisasi objective function = 0 dan nilai cubenya 0 semua
        this.value = 0;
        this.cubeState = Array.from({length:5},()=>Array.from({length:5},()=>Array(5).fill(0)));
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
}
