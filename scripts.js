const input = document.getElementById('input-busca');
const apiKey ='ae5702bcdb83b75ef1531de90e0ca249';

const clientID ='fd3c832aac0b4d32897df79294e8f9e6';
const clientSecret ='e5fdde66b199445fb992741730892faf';

function botaoDeBusca() {
    const inputValue = input.value;

   

    movimentoInput(inputValue);
}

function fecharInput(){
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem;';   
    input.style.transition = 'all 0.5s ease-in-out 0s;'; 
    input.value = "";  

}

function abrirInput(){
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem;';
    input.style.transition = 'all 0.5s ease-in-out 0s;'; 
    input.value = "";      
}

function movimentoInput(inputValue){
   const visibility =  document.getElementById('input-busca').style.visibility;
   
   inputValue && procurarCidade(inputValue);

   visibility === 'hidden' ? abrirInput : fecharInput ();
}

input.addEventListener('keyup', function (event){
    if(event.keyCode == 13){
     const valorInput = input.value;  
     movimentoInput(valorInput)
    }
})
/*escutador , recebe e depoi executa uma função*/
document.addEventListener('DOMContentLoad',() => {
  fecharInput();
})


async function procurarCidade(city) {
    try {
        const dados = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`)
        
         if(dados.status ===200){
            const resultado = await dados.json();

            obterTopAlbunsPorPais(resultado.sys.country);
            mostrarClimaNaTela(resultado);
         }else{
            throw new Error
         }     

        

    } catch  {
        alert ('A pesuisa por cidade deu errado!');
        
    }    
    
}

function mostrarClimaNaTela(resultado){
    document.querySelector('.icone-tempo').src = `./assets/${resultado.weather[0].icon}.png`
    document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
    document.querySelector('.temperatura').innerHTML = `${resultado.main.temp. toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `máx: ${resultado.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `mín: ${resultado.main.temp_min.toFixed(0)}°C`;

}

async function obterAcessoToken(){
    const credentials =`${clientID}:${clientSecret}`;
    const encodedCredentials = btoa (credentials);

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {
            'Althorization': `Basic ${encodedCredentials}`,
           'content-type' :'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credential',
    });

    const data = await response.json()
    return data.access_Token;
    
}

function obterDataAtual() {
    const currentDate =  new Date();
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth()+ 1).toString().padStart(2,'0');
    const dia = currentDate.getDate().toString().padStart(2, '0');

    return `${ano} - ${mes}- ${dia}`
}

async function obterTopAlbunsPorPais(country) {
    try {
        const access_Token = await obterAcessoToken();
        const dataAtual = obterDataAtual();

        const url = `https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=3&locale=${country}&`
    
        const resultado = await fetch (`${url}`,{
           headers:{
            'Authorization':`Bearer ${access_Token}`
           } ,
        });

        if(resultado.status === 200){
            const data = await resultado.json()
            const result = data.playlists.items.map(item =>({
             name:item.name,
             item:images[0].url
            }))
         
           console.log(data);

        }else {
            throw new Error
        }
    
      
     
    }catch{
     alert ('A pesquisa de Música deu erro!')
    }
}

const ulElement = document.querySelector ('.playlist-caixa');
const liElement = ulElement.querySelectorAll('li');


function mostrarCilmaNaTela(){
 liElement.forEach((liElement,index) => {
  const imgElement =liElement.querySelector('img');
  const pElement =  liElement.querySelector('p') 

  imgElement.src =  


 } )
}


