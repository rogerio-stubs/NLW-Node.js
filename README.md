<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>NLW - Trilha de Nodejs</h1>
    <h2>Nessa trilha desenvolvemos uma API Restful para calculo de NPS</h2>
    <p>NPS - Net Promoter Score é uma métrica de lealdade do cliente</p>
    <br>
    <h2>Tecnologias usadas</h2>
    <ul>
        <li>Typescript</li>
        <li>Express</li>
        <li>TypeORM</li>
        <li>Jest</li>
    </ul>
    <br>
    <h2>Utilizando o projeto</h2>
    <ol>
        <li>Instale o <strong>YARN</strong></li>
        <li>Instale o <strong>Nodejs</strong></li>
        <li>Utilize o camando <code>yarn</code></li>
        <li>Inicie o projeto com <code>yarn dev</code></li>
    </ol>
    <br>
    <h2>Rotas</h2>
    <h4>POST</h4>
    <ul>
        <li><code>/surveys</code> - Cadastrar pesquisa</li>
        <li><code>/users</code> - Cadastrar usuário</li>
        <li><code>/sendMail</code> - Enviar email com a pesquisa</li>
    </ul>
    <h4>GET</h4>
    <ul>
        <li><code>/surveys</code> - Retorna as pesquisas</li>
        <li><code>/answers/:value</code> - Enviar a nota selecionada</li>
        <li><code>/nps/:survey_id</code> - Retonar o calculo de NPS</li>
    </ul>
</body>
</html>
