const input = document.getElementById('input-busca');
const apiKey ='ae5702bcdb83b75ef1531de90e0ca249';

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

            mostrarClimaNaTela(resultado);
            console.log(resultado, '<<')

         }else{
            throw new Error
         }     

        

    } catch  {
        alert ('A pesuisa por cidade deu errado!');
        
    }    
    
}

function mostrarClimaNaTela(resultado){
    
    document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
    document.querySelector('.temperatura').innerHTML = `${resultado.main.temp. toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `máx: ${resultado.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `mín: ${resultado.main.temp_min.toFixed(0)}°C`;

}



