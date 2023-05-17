// API Doc: https://www.last.fm/api/show/artist.getTopAlbums

// Importante: Obtenha uma chave de API de https://www.last.fm/api/account/create
const apiKey = "PEGUE UMA CHAVE NO LAST FM";

// URL base da API do last.fm para buscar os álbuns mais populares de um artista
const baseUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums`

// Seleciona o elemento HTML com o id 'albums-container' onde a informação dos álbuns será exibida
const container = document.querySelector('#albums-container')

// Seleciona o elemento de entrada com id 'artist' onde o nome do artista é digitado
const artist = document.querySelector('#artist')

// Seleciona o formulário com o id 'search' onde a pesquisa será realizada
const form = document.querySelector('#search')

// Adiciona um 'event listener' ao formulário que será disparado quando o formulário for submetido
form.addEventListener('submit', (event) => {
  // Evita o comportamento padrão do evento de submissão do formulário (que é recarregar a página)
  event.preventDefault();

  // Constrói a URL completa para a chamada da API incluindo o artista digitado e a chave da API
  const url = `${baseUrl}&artist=${artist.value}&api_key=${apiKey}&format=json&limit=5`

  // Faz uma chamada HTTP para a API usando a função fetch que retorna uma promessa
  fetch(url)
    .then(response => response.json()) // Converte a resposta em um objeto JSON
    .then((data) => { // Uma vez que os dados estão disponíveis, este bloco de código será executado
      container.innerHTML = '' // Limpa o conteúdo anterior do container
      // Itera sobre a lista de álbuns
      data.topalbums.album.forEach((album) => {
        // Chama a função makeAlbum para criar o HTML para cada álbum
        const albumHTML = makeAlbum(album)
        // Insere o HTML do álbum no container
        container.insertAdjacentHTML('beforeend', albumHTML)
      })
    })
})

// Função que recebe um objeto de álbum e retorna uma string de HTML
const makeAlbum = (album) => {
  // Utiliza a template string para inserir dinamicamente os dados do álbum no HTML
  return `
  <div class="row mt-3">
    <div class="col-12 d-flex justify-content-start">
      <img src="${album.image[2]['#text']}">
      <div class='ms-3'>
        <h2>${album.name}</h2>
        <p>${album.artist.name}</p>
      </div>
    </div>
  </div>
  `
}
