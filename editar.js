document.addEventListener("exibir_lista", function(event)
{
    event.preventDefault();
    
    var lista_contas = JSON.parse(localStorage.getItem('lista_contas'))||[];
    
    var output=document.getElementById('output')

    output.innerHTML= '';

    for(let i=0;i<lista_contas.length;i++) 
        {
            //Cria a variável li e cria o elemento (tag) li 
            let li= document.createElement('li')
            li.textContent = 'Nome: '+lista_contas[i].nome+', Data: '+ lista_contas[i].data;
            output.appendChild(li)
        }
})

