<template>
  <section class="container">
    <div :class="'row header'">
      <h1>Jogo do Monstro</h1>
      <button v-show="logado" @click="logado=!logado" :class="'p-revert'">Sair</button>
    </div>
    <div v-show="!logado" :class="'row box text-center'">
      <div :class="'col-10 col-sm-4'">
        <span>Digite seu nome: </span>
      </div>
      <div :class="'col-8 col-sm-4 mt-3 mt-sm-0'">
        <input type="text" v-model="nome" @click="$event.target.value=''" @keyup.enter="logado=!logado" />
      </div>
      <div :class="'col-10 col-sm-4 mt-3 mt-sm-0'">
        <button @click="logado=!logado" :style="'backgroundColor: lightseagreen'">Entrar</button>
      </div>
    </div>
    <div v-show="logado">
      <div :class="'box'">
        <div :class="'players'">
          <h2>{{ nome }}</h2>
          <div :class="'progress'">
            <div :style="playerHealth"></div>
          </div>
          <div>{{ player }}%</div>
        </div>
        <div :class="'players'">
          <h2>Monstro</h2>
          <div :class="'progress'">
            <div :style="monstroHealth"> </div>
          </div>
          <div>{{ monstro }}%</div>
        </div>
      </div>
      <div v-if="fim" :class="'box'">
        <span v-if="resultado=='Ganhou'" :style="'color: green'">
          <strong>{{ nome }} derrotou o MONSTRO !!!</strong>
        </span>
        <span v-else :style="'color: red'">
          <strong>{{ nome }} Perdeu =/ !!!</strong>
        </span>
      </div>
      <div :class="'box row text-center'">
        <button @click="inicio" v-if="!start" :style="'backgroundColor: #474787'">INICIAR NOVO JOGO</button>
        <template v-else>
          <div :class="'col-6 col-sm-3 mt-3 mt-sm-0'">
            <button @click="ataque" :style="'backgroundColor: #e55039'">ATAQUE</button>
          </div>
          <div :class="'col-6 col-sm-3 mt-3 mt-sm-0'">
            <button @click="skill" :style="'backgroundColor: #1e3799'">HABILIDADE</button>
          </div>
          <div :class="'col-6 col-sm-3 mt-3 mt-sm-0'">
            <button @click="heal" :style="'backgroundColor: #079992'">CURAR</button>
          </div>
          <div :class="'col-6 col-sm-3 mt-3 mt-sm-0'">
            <button @click="start=!start" :style="'backgroundColor: #747d8c'">DESISTIR</button>
          </div>
          <div :class="'col-10 mt-3'">
            <button @click="auto" :style="'backgroundColor: #f7b731; color: #000'">
              {{ (stop==true) ? 'Auto Game' : 'Stop' }} </button>
          </div>
        </template>
      </div>
      <div v-if="(atkPlayer != '') && (atkMonstro != '')" :class="'box'">
        <ul>
          <li v-for="(game, i) in jogadas" :key="i">
            <p v-if='atkPlayer[jogadas-game]!=0' :class="'jogador'">
              {{ nome }} causou <strong>{{ atkPlayer[jogadas-game] }}</strong> de dano ao
              <strong>Monstro</strong>
            </p>
            <p v-else :class="'cura'">
              {{ nome }} curou <strong>{{ curaPlayer[jogadas-game] }}</strong> de
              <strong>Vida</strong>
            </p>
            <p :class="'monster'">
              O <strong>Monstro</strong> causou <strong>{{ atkMonstro[jogadas-game] }}</strong>
              de dano em {{ nome }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'HelloWorld',
    data() {
      return {
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
      }
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
        this.mobs.push(new Monstro());
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
  }

</script>