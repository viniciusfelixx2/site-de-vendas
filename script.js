let carrinho = [];


// ADICIONAR PRODUTO

function adicionarProduto(nome, preco){

    let produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if(produtoExistente){
        produtoExistente.quantidade++;
    }else{
        carrinho.push({ nome:nome, preco:preco, quantidade:1 });
    }

    atualizarCarrinho();
    abrirCarrinho();

}


// ATUALIZAR CARRINHO

function atualizarCarrinho(){

    let lista = document.getElementById("listaCarrinho");
    let total = 0;
    let quantidade = 0;

    if(carrinho.length === 0){

        lista.innerHTML = "Seu carrinho está vazio.";

    }else{

        lista.innerHTML = "";

        carrinho.forEach((item, index) => {

            total += item.preco * item.quantidade;
            quantidade += item.quantidade;

            lista.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${item.nome}</strong><br>
                    <span>Qtd: ${item.quantidade} — R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
                <button onclick="removerProduto(${index})">Remover</button>
            </div>
            `;

        });

    }

    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("quantidade").innerHTML = quantidade;

}


// REMOVER PRODUTO

function removerProduto(index){
    carrinho.splice(index, 1);
    atualizarCarrinho();
}


// ABRIR / FECHAR CARRINHO

function abrirCarrinho(){
    document.getElementById("carrinho").classList.add("ativo");
    document.getElementById("overlayCarrinho").classList.add("ativo");
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("ativo");
    document.getElementById("overlayCarrinho").classList.remove("ativo");
}


// MENU MOBILE

function alternarMenu(){
    document.getElementById("navPrincipal").classList.toggle("ativo");
}


// ENVIAR PEDIDO WHATSAPP

function finalizarWhatsApp(){

    if(carrinho.length === 0){
        alert("Seu carrinho ainda está vazio. Adicione um item antes de finalizar.");
        return;
    }

    let nome = document.getElementById("nome").value.trim();

    if(nome === ""){
        alert("Por favor, informe seu nome antes de finalizar o pedido.");
        return;
    }

    let data = document.getElementById("data").value;
    let observacao = document.getElementById("observacao").value;

    let mensagem =
`🍿 *NOVO PEDIDO - PIPOTHAA*

👤 Cliente: ${nome}

📦 Pedido:
`;

    carrinho.forEach(item => {
        mensagem += `🍿 ${item.quantidade}x ${item.nome} — R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    let total = document.getElementById("total").innerHTML;

    mensagem +=
`
💰 Total: R$ ${total}

📅 Data do evento: ${data || "não informada"}

📝 Observações: ${observacao || "nenhuma"}

Aguardo confirmação do pedido.
Obrigado! 🍿`;


    // ALTERE AQUI O NÚMERO DO WHATSAPP (com DDI + DDD, só números)
    let telefone = "5511963903051";

    let url = "https://wa.me/5511963903051" + telefone + "?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");

}
