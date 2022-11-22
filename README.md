# Web wallet NG.CASH :money_mouth_face:

- Neste repositório contém a aplicação pedida no processo seletivo da NG.CASH um app financeiro da **N**ova **G**eração!, consiste em uma aplicação web fullstack, dockerizada cujo o objetivo é possibilitar os usuários da NG a realizarem transferências entre si.

---

# Tecnologias Utilizadas :books:

- Typescript, Node.js, Docker, Sequelize, PostgreSQL, React, Express, Joi, CSS.

---

# Como utilizar a aplicação

## Importante :warning:

- A Aplicação utiliza as portas **3000**(frontend), **3001**(backend), **3002**(database), para garantir melhor funcionamento da mesma garanta que as 3 portas citadas anteriormente estão disponíveis para serem utilizadas, caso precise utilizar outra porta, altere as mesmas manualmente no arquivo `docker-compose.yml` localizado na pasta `/app`, assim como suas variáveis de ambiente caso seja necessário mudar algo, (Caso deseje rodá-la sem o docker será necessário alterar as portas ou as variáveis manualmente nos repositórios de frontend e backend).

<details>
  <summary>
    <strong>
      Rodando com o docker <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="30px" />
    </strong>
  </summary><br>

  - Primeiro clone o repositório com o comando `git clone git@github.com:matheusnff85/ngcash-app.git` e após clonar instale suas dependências com o comando `npm install` na raiz do projeto.

  - Após instaladas ainda na raiz do projeto utilize o comando `npm run install:apps`, após todas as dependências de frontend e backend serem instaladas, basta utilizar o comando `npm run compose:up` e aguardar a inicialização dos containers.

</details>

<details>
  <summary><strong>Rodando manualmente :wrench:</strong></summary><br>

  - Primeiro clone o repositório com o comando `git clone git@github.com:matheusnff85/ngcash-app.git` e após clonar instale suas dependências com o comando `npm install` na raiz do projeto.

  - Após instaladas ainda na raiz do projeto utilize o comando `npm run install:apps` e aguarda a instalação das dependências de frontend e backend.

  - Garanta que possui um serviço de PostgreSQL em sua máquina rodando normalmente, após isso entre na pasta de backend `/app/backend`, e altere o nome do arquivo `.env.example` para `.env`, este arquivo possui as variaveis de ambiente necessárias para o funcionamento da aplicação, as mesmas são:

```
JWT_SECRET=ngcash
APP_PORT=3001
DB_USER=postgres
DB_PASS=1234
DB_HOST=localhost
DB_PORT=5432
```
(Caso altere a variável **APP_PORT** será necessário alterar os endpoints de requisição no repositório de frontend também).

</details>

---

- Desenvolvido por [Matheus Marinho](https://www.linkedin.com/in/matheus-marinhodsp/).