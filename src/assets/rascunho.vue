teste1 () {
        var partidas = this.grupos[0].partidas
        var soma = 0
        partidas.forEach(partida => {
          if (partida.time1gols !== null) {
            soma += partida.time1gols
          }
        })
        return soma
      },