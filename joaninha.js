// Esse é um arquivo de testes

let lista = []

for (let i=0; i < 10; i++) {
    lista.push(i)
}

console.log(`lista bruta: ${lista}`)

lista.splice(0,1,10)

console.log(`novaLita: ${lista}`)