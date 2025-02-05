# pweb-II
# Gerenciamento de Biblioteca

Uma API completa para gerenciar o acervo de uma biblioteca, leitores cadastrados e empréstimos de livros. O sistema inclui autenticação via JWT para admins (gestores da biblioteca) e controle automatizado de disponibilidade de livros e histórico de empréstimos.

## Funcionalidades

### 🧑‍💼 **Usuários**
- Registro e autenticação de admins (via JWT).
- Autenticação de leitores (via JWT).

### 📚 **Livros**
- CRUD completo: listar, cadastrar, editar e excluir livros.
- Atualização automática de `quantidadeDisponivel` com base nos empréstimos.

### 📖 **Leitores**
- Cadastro, listagem, edição e exclusão de leitores por admin.
- Leitores podem visualizar seu histórico de empréstimos e listar o acervo da biblioteca.

### 🔄 **Empréstimos**
- Registro de novos empréstimos com validação de disponibilidade de livros.
- Atualização de status para "devolvido" quando um livro é devolvido.
- Listagem de empréstimos pendentes e histórico completo.

### 📊 **Relatórios**
- Listagem dos livros mais emprestados.
- Histórico de empréstimos por leitor.

## Dupla de Desenvolvimento
- Amauri Pereira de Lima Júnior  
- Anderson de Lima Leite
