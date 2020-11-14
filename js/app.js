
new Vue({
    el: "#app",
    data: {
        logado: false,
        nome: 'Jogador',
        start: false,
        player: 100,
        monstro: 100,
        jogadas: 0,
        atkPlayer: [],
        curaPlayer: [],
        atkMonstro: [],
        resultado: 'Jogando',
        fim: false,
        stop: true,
        mobs: []
    },
    computed: {
        playerHealth() {
            
            return {
                height: '100%',
                width: `${this.player}%`,
                backgroundColor: this.player > 20 ? 'green' : 'red',
                transition: 'all 0.3s'
            }
        },
        monstroHealth() {
            return {
                height: '100%',
                width: `${this.monstro}%`,
                backgroundColor: (this.monstro > 20) ? 'green' : 'red',
                transition: 'all 0.3s'
            }
        }
    },
    methods: {
        inicio() {
            this.player = 100;
            this.atkPlayer = [];
            this.monstro = 100;
            this.atkMonstro = [];
            this.curaPlayer = [];
            this.jogadas = 0;
            this.start = true;
            this.resultado = 'Jogando';
            this.stop = true;
            this.fim = false;
        },
        ataque() {
            const danoPlayer = parseInt(Math.random() * (7 - 1) + 1);
            const danoMonstro = parseInt(Math.random() * (11 - 1) + 1);
            this.curaPlayer.push(0);
            this.player - danoMonstro <= 0 ? this.player = 0 : this.player -= danoMonstro;
            this.atkMonstro.push(danoMonstro);
            this.monstro - danoPlayer <= 0 ? this.monstro = 0 : this.monstro -= danoPlayer;
            this.atkPlayer.push(danoPlayer);
            this.jogadas++;
            this.end();
            // console.log(danoPlayer, danoMonstro);
        },
        skill() {
            const skillPlayer = parseInt(Math.random() * (11 - 1) + 1);
            const danoMonstro = parseInt(Math.random() * (7 - 1) + 1);
            this.curaPlayer.push(0);
            this.player - danoMonstro <= 0 ? this.player = 0 : this.player -= danoMonstro;
            this.atkMonstro.push(danoMonstro);
            this.monstro - skillPlayer <= 0 ? this.monstro = 0 : this.monstro -= skillPlayer;
            this.atkPlayer.push(skillPlayer);
            this.jogadas++;
            this.end();
            // console.log(skillPlayer, danoMonstro);
        },
        heal() {
            const healPlayer = parseInt(Math.random() * (11 - 1) + 1);
            const danoMonstro = parseInt(Math.random() * (11 - 1) + 1);
            this.atkPlayer.push(0);
            this.player - danoMonstro < 0 ? this.player = 0 : this.player -= danoMonstro;
            this.atkMonstro.push(danoMonstro);
            this.player + healPlayer >= 100 ? this.player = 100 : this.player += healPlayer;
            this.curaPlayer.push(healPlayer);
            this.jogadas++;
            this.end();
            // console.log(healPlayer, danoMonstro);
        },
        auto() {
            this.stop = !this.stop;
            const timer = setInterval(() => {
                const play = parseInt(Math.random() * (30 - 1) + 1);
                if ((this.resultado == 'Jogando') && (this.stop == false)) {
                    if (play <= 10) this.ataque();
                    else if ((play > 10) && (play <= 20)) this.skill();
                    else this.heal();
                    this.end();
                    // console.log('-> ', play);
                } else clearInterval(timer);
            }, 500);
        },
        end() {
            if (this.player == 0) {
                this.start = false;
                this.resultado = 'Perdeu';
                this.fim = true;
            } else if (this.monstro == 0) {
                this.start = false;
                this.resultado = 'Ganhou';
                this.fim = true;
            }
        }
    },
})