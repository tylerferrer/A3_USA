
# Como executar o formulário

## Pré Requisitos

 - Nodejs instalado.
 - Algum workbench para visualizar os dados do banco de dados (opcional)

## Como colocar o servidor para rodar

 - Em um terminal deve acessar a pasta raiz do projeto e executar o comando

    node servidor.js
    

 - Após isso pode acessar a URL: http://localhost:3000
 - Não é necessário especificar que deseja acessar o form, pois eu fiz um GET que redireciona direto para o endpoint onde o form se encontra.
 - Pode preencher o formulário e clicar em cadastrar que será armazenado no banco.
 - Coloquei um endpoint para fechar o banco em caso de necessidade pode usar a URL: http://localhost:3000/close
