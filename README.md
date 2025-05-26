## Descrição

App [Next](https://nextjs.org/) para gestão de tarefas, com cadastro de usuário e sistema de autenticação.

### Pré-requisitos

- [Node 22](https://nodejs.org/en/blog/release/v22.11.0)

### Passos

1. **Clone o repositório e acesse a pasta do projeto:**

   ```bash
   git clone https://github.com/GabrielDNeto/teste-new-way-fe.git
   cd teste-new-way-fe
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Rodando o projeto**

   ```bash
   # instalar dependencias
   npm install

   # buildando projeto
    npm run build

   # rodar aplicação
   npm start
   ```

4. **Acesse a aplicação:**

   - A aplicação estará disponível em: [http://localhost:3000/](http://localhost:3000)

### Recursos

**Acesso Admin**

```bash
# user
admin@mail.com

# senha
admin@123
```

**Importante:** Através da conta administradora citada acima é possível gerenciar os membros, podendo alterar o tipo dos demais para admin/membro.

** Lista de Recursos **
1. Autenticação de usuário
2. Cadastro de usuário (por padrão sempre como membro, conta admin pode mudar o tipo dos usuários, conforme citado acima.)
3. Cadastro, edição, exclusão de tarefas.