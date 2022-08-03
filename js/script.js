const joao = document.querySelector(".joao")//personagem
const piper = document.querySelector(".pipe")//cano
const clouds = document.querySelector(".clouds")//nuvem
const clouds1 = document.querySelector(".clouds1")//nuvem
const musicPlay = document.querySelector("#play-music")//audio do jogo
const musicOver = document.querySelector("#game-over-music")//audio ao perder

//funcao para pular
const jump = () =>{
    joao.classList.add("jump")//adcionar classe jump
    joao.src = "img/jump.png"
    //remover classe jump depois de um tempo
    setTimeout(()=>{
        joao.classList.remove("jump")
        joao.src = "img/joao.gif"
    },500)
}

//funcao loop que é chamada a cada 10ms para verificar se o jogo acabou
const loop = setInterval(()=>{
    const piperPosition = piper.offsetLeft;//posicao do cano na esquerda

    //o mais(+) antes do window converte para numero se for possivel
    const joaoPosition = +window.getComputedStyle(joao).bottom.replace('px', '')//pegar a posicao do personagem do bottom e retirar o px para converter para numero
    const cloudsPosition = + window.getComputedStyle(clouds).right.replace('px', '')//pegar a posicao da nuvem a direita e retirar o px para converter para numero
    const cloudsPosition1 = + window.getComputedStyle(clouds1).right.replace('px', '')//pegar a posicao da nuvem a direita e retirar o px para converter para numero
    musicPlay.play()//tocar musica ao comecar o jogo
    
    //verifica se o personagem bateu no objeto
    if(piperPosition < 120 && joaoPosition <= 70 && piperPosition >0){
        piper.style.animation = "none"//tira animacao
        piper.style.left = `${piperPosition}px`//para o cano na ultima posicao dele

        joao.src = "img/game-over.png"//mudar imagem do personagem
        joao.style.marginLeft = "50px"//alinha o personagem
        joao.classList.add("game-over")//adicionar classe com a animacao de game over
        joao.style.bottom ="-250px"//deixa o personagem fora da tela

        clouds.style.animation = "none"//tira a animacao da nuvem
        clouds1.style.animation = "none"//tira a animacao da nuvem
        
        clouds.style.right = `${cloudsPosition}px`//deixa nuvem na ultima posicao dela
        clouds1.style.right = `${cloudsPosition1}px`//deixa nuvem na ultima posicao dela
        

        const tempo = setInterval(gameOver, 1000)//chama a funcao gameOver depois de um segundo com a tela de game over

        clearInterval(loop)//para a funcao loop
        clearInterval(timer)//para a funcao timer

        musicPlay.pause()//pausar musica do jogo
        musicOver.play()//tocar musica de game over
    }

}, 10)

//funcao timer (conta o tempo na tela)
m=0//minutos
s=1//segundos
const timer = setInterval(() =>{
    //caso o segundo for <9 concatenar com 0 para deixar no padrao 00
    if(s<=9){
        s = "0" + s
    }
    
    //quando os segundos chegar no 59, zera o segundo e incrementa os minutos
    if(s >= 59){
        s=0;
        m = m + 1
    }

    //caso o minuto for <9 concatenar com 0 para deixar no padrao 00
    if(m <=9){
        m = "0" + m
    }
    //colocar segundos e minutos na tela
    document.querySelector(".segundo").innerHTML = s
    document.querySelector(".minuto").innerHTML =  m

    //nao aparecer minutos na tela de game over se os minutos for 0
    if(m <=0){
        document.querySelector(".recorde-segundos").innerHTML = s
    }
    else{
        document.querySelector(".recorde-segundos").innerHTML = s
        document.querySelector(".recorde-minutos").innerHTML =  m + " minutos e "
    }
    
    //incrementa segundo
    s ++
    m = +m + 0//converte os minutos para inteiro
}, 1000)

//funcao recomecar 
buttonRecomecar = document.querySelector("button")//botao da tela gameOver
buttonRecomecar.addEventListener("click", ()=>{
    location. reload();//recarregar site
})

//funcao GameOver, mostra a tela de gameOver
function gameOver(){
    document.querySelector(".tela-game-over").style.display = "block"//mostra a tela de game over
        const fundo = document.querySelector(".game-board")//pega valor do fundo
        const chao = document.querySelector(".chao")//pega valor do chao
        const pipe = document.querySelector(".pipe")//pega valor do cano

        //adiciona classe fundo-game-over nos itens para borrar e escurecer o fundo
        fundo.classList.add("fundo-game-over")
        chao.classList.add("fundo-game-over")
        pipe.classList.add("fundo-game-over")
        clouds.classList.add("fundo-game-over-nuvem")
        clouds1.classList.add("fundo-game-over-nuvem")
}

//ativar funcao pular ao clicar em qualquer tecla
document.addEventListener("keydown", jump)

//chamar funcao de pulo ao clicar na tela
body = document.querySelector("body")
body.addEventListener("click", jump)