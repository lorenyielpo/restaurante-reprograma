const container = document.querySelector('#items-cardapio')
fetch('http://localhost:3000/comidas')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    data.forEach(prato => {
      console.log(prato)

      const mediaItem = document.createElement('div');
      mediaItem.setAttribute('class', 'media mb-4');
      mediaItem.innerHTML = `
            <img src="${prato.imagem}" alt="${prato.nome}" class="mr-3 img-thumbnail" width="200px">

            <div class="media-body">

                <h5 class="mt-0"><strong>${prato.nome}</strong></h5>
                ${prato.descricao}
              </div>`
      container.appendChild(mediaItem);

      const btnRemove = document.createElement('button')
      btnRemove.innerHTML = "X"
      btnRemove.setAttribute('type', 'button')
      btnRemove.setAttribute('data-id', `${prato._id}`)
      btnRemove.setAttribute('class', 'btn btn-dark')
      mediaItem.appendChild(btnRemove)

      btnRemove.addEventListener('click', () => {

        fetch(`http://localhost:3000/comidas/${prato._id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(()=>{
          container.removeChild(mediaItem)
        })
        .catch((erro)=>{
          console.log(erro)
        })
      })
    })
  })
  .catch((erro) => {
    console.log(erro)
  })

const btn = document.querySelector('#criar_comida_button')
btn.addEventListener('click', () => {

  const nome = document.querySelector('#nome_input').value
  const descricao = document.querySelector('#descricao_input').value
  const imagem = document.querySelector('#imagem_input').value
  const comida = {
    nome,
    descricao,
    imagem
  }

  fetch('http://localhost:3000/comidas', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comida)
  })
})