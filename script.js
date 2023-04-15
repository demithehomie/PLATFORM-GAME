var character = document.getElementById('character');
  var platform = document.getElementById('platform');
  var prize = document.getElementById('prize');

  // Posição inicial do personagem
  var characterLeft = 0;
  var characterBottom = 0;
  var isJumping = false;

  // Event listener para as teclas de movimentação do personagem
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      moveLeft();
    } else if (event.key === 'ArrowRight') {
      moveRight();
    } else if (event.key === 'ArrowUp' && !isJumping) { // Adicionamos a condição para verificar se o personagem já está pulando
      jump();
    }
    checkWin();
  });

  // Função para obter uma cor aleatória em formato hexadecimal
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Função para mover o personagem para a esquerda
  function moveLeft() {
    characterLeft -= 10;
    character.style.left = characterLeft + 'px';
  }

  // Função para mover o personagem para a direita
  function moveRight() {
    characterLeft += 10;
    character.style.left = characterLeft + 'px';
  }

  // Função para fazer o personagem pular
  function jump() {
    isJumping = true;
    var jumpInterval = setInterval(function() {
      characterBottom += 5;
      character.style.bottom = characterBottom + 'px';
      if (characterBottom > 325) { // Altura máxima do salto
        clearInterval(jumpInterval);
        var fallInterval = setInterval(function() {
          characterBottom -= 5;
          character.style.bottom = characterBottom + 'px';
          if (characterBottom === 0) { // Personagem voltou ao chão
            clearInterval(fallInterval);
            isJumping = false;
          }
        }, 20);
      }
    }, 20);
  }

  // Função para verificar se o personagem alcançou o prêmio
  function checkWin() {
    var characterRect = character.getBoundingClientRect();
    var prizeRect = prize.getBoundingClientRect();
    if (
      characterRect.right >= prizeRect.left &&
      characterRect.left <= prizeRect.right &&
      characterRect.bottom >= prizeRect.top &&
      characterRect.top <= prizeRect.bottom
    ) {
      prize.style.backgroundColor = getRandomColor();
    }
  }
