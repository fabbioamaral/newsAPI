/* Variáveis Globais */ 
const paisMenu=document.getElementById('paisMenu');
const categoriaMenu=document.getElementById('categoriaMenu');
const buscarBotao=document.getElementById('buscarButton');


const opcaoEscolhida = (selecionado)=>{
    return selecionado.options[selecionado.selectedIndex].value;
}
  

/* Fetch API */
buscarBotao.addEventListener('click', () => {    
    let pais = opcaoEscolhida(paisMenu);
    let categoria = opcaoEscolhida(categoriaMenu);
    const apiKey='6558e9dd0a8141ba801820cb7d0a759d'

    fetch(`https://newsapi.org/v2/top-headlines?country=${pais}&category=${categoria}&apiKey=${apiKey}`)
    .then((res)=> {return res.json()})
    .then((res) =>{return exibirNews(res.articles)})
    });


/* Definição de Funções */


function exibirNews(news){
    let newsDiv = document.getElementById('newsContainerDiv');
    let newsContainerHtml='';    

    for (let i=0;i<news.length;i++){
        let dataDaNoticia = new Date(news[i].publishedAt);

        newsContainerHtml= newsContainerHtml + `            
            <div class="row col-12" id="singleNew">                    
                <div class="imgDiv col-12 col-lg-4 col-xl-3">    
                    <a href="${news[i].url}"><img class="imgNews" src="${news[i].urlToImage}" alt="Imagem da notícia"></a>
                </div>                    
                <div class="textoNew col-12 col-lg-8 col-xl-9">
                    <a class="newsLink" href="${news[i].url}">${news[i].title}</a>
                    <div class="textoNewSubDiv">
                        <span>${news[i].source.name}</span>
                        ${news[i].author ? `<span>${news[i].author}</span>`: ''}
                        <span>${dataDaNoticia.toLocaleDateString()}</span>
                        ${news[i].content ? `<p class="corpoDaNoticia">${news[i].content}</p>` : ''}
                    </div>
                </div>
            </div>  

    `        
        
    }

    newsDiv.innerHTML=newsContainerHtml;



}


