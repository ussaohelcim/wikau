//ids
const idResolucao = "#resolucao"
const idMainRespostas = "#mrespostas"
const idCheckMobile = "#mobile"
//pegar resolucão
document.querySelector("#botao").addEventListener("click",MostrarAVerdade)

function pegarResolucao()
{
    document.querySelector(idResolucao).innerHTML = `${window.innerHeight}x${window.innerWidth}`
    document.querySelector(idMainRespostas).style.display = "block";
    //document.querySelector("#init").style.display="none"

}

//navegador
function navegador()
{
    infoNavegador = ""
    for (let index = 0; index < navigator.userAgentData.brands.length; index++) {
        infoNavegador+= navigator.userAgentData.brands[index].brand+" ";
    }
    infoNavegador = infoNavegador.replace("Not A;Brand","")
    document.querySelector("#navegador").innerHTML = infoNavegador;

}

//document.querySelector("#ip").innerHTML = 

//document.querySelector("#clipboard").innerHTML = navigator.clipboard.read();


function ApagarFirulas()
{
    document.querySelector("#tuto").style.display="none"
    document.querySelector("#botao").style.display="none"
    document.querySelector("#init").style.display="none"
    document.querySelector("#infos").style.display="none"
}

function pegarIp()
{
    text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
        let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
        let ip = data.match(ipRegex)[0];
        document.querySelector("#ip").innerHTML = ip
    });
    function text(url) {
        return fetch(url).then(res => res.text());
    }
}
let tostando = ""
function lerClipboard()
{
    //document.querySelector("#clipboard").innerHTML= navigator.clipboard.readText()
    
    navigator.clipboard.readText().then(txt => {
        document.querySelector("#clipboard").innerHTML=txt
    })
}
function checarMobile()
{
    navigator.userAgentData.mobile ? document.querySelector(idCheckMobile).innerHTML= "celular": document.querySelector(idCheckMobile).innerHTML= "computador";
    /*
    if(navigator.userAgentData.mobile)
    {
        document.querySelector(idCheckMobile).innerHTML= "celular"
    }
    else
    {
        document.querySelector(idCheckMobile).innerHTML= "computador"
    }*/
}
function MostrarAVerdade()
{
    pegarResolucao();
    navegador();
    pegarIp();
    ApagarFirulas();
    checarMobile()
    //habilitarCamera()
    lerClipboard()
    pegarSistemaOperacional()
}

function pegarSistemaOperacional()
{
    let a = navigator.userAgent
    
    a = a.slice(a.indexOf(`(`)+1,a.indexOf(`)`))
    document.querySelector("#os").innerHTML = a
}

function PedirPermissoes()
{

}
//https://developer.mozilla.org/en-US/docs/Web/API/Permissions
//https://w3c.github.io/permissions/#enumdef-permissionname
let camera = document.querySelector("#webcam")
function habilitarCamera()
{
    //<video height="200px" width="300px" id="webcam" autoplay="true"></video>
    if(navigator.mediaDevices.getUserMedia)
    {
        navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:'user'}}).then(function(stream){
            document.querySelector("#webcam").innerHTML = 
            camera.srcObject = stream
        }).catch(function(erro){
            document.querySelector("#camera").innerHTML = "<p><span class='resposta'> Não consegui pegar sua camera</span><p>"
        })
    }
}
