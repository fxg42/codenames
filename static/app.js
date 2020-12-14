document.addEventListener('DOMContentLoaded', e => {
  let params = (new URL(document.location)).searchParams;
  const socket = io({
    query: { board: params.get('board') }
  });

  socket.on('init-game', ({ firstTeam, board }) => {
    document.querySelector('body').classList.remove('red');
    document.querySelector('body').classList.remove('blue');
    document.querySelector('body').classList.add(firstTeam);

    document.querySelector('#board').innerHTML = board.map(({ word, team }, idx) => `
      <div class="card ${ team }" data-index=${ idx }>
        <div class="content">${ word }</div>
      </div>`).join('');

    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('click', e => {
        socket.emit('pick-card', el.getAttribute('data-index'));
      });
    });

  });

  socket.on('card-team', ({ cardIdx, team }) => {
    document.querySelector(`[data-index='${cardIdx}']`).classList.add(team);
  });

});

