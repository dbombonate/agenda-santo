# REGRAS DA API

## Usuários - Tabela

- Nome *;
- Email *;
- Password *;
- Grupo (default = grupo Padrão);
- isAdmin (default = false);
## Usuários - Regras

* Email único;
* Senha com mais de 6 caracteres;
* Grupo padrão para todos os usuários;
* Usuário só pode pertencer a um Grupo;
* Usuário não é Admin por padrão;
* Cada usuário pode ter seu próprio grupo de contatos.

## Usuários - Validações

* Validar campo email;
* Validar campo senha;
* Validar campo nome;
* Validar se email já está cadastrado;
* Validar senha de usuário;

## Grupos - Tabela

- Nome *;
- Usuario *;
- isDefault (default = false);
## Grupos - Regras

* Todo usuário, ao ser cadastrado, vai para o Grupo Padrão;
* Somente usuário Administrador pode mudar um usuário de Grupo;
* Somente Admin pode cadastrar Grupo;
* Grupo pode ser associado somente a um usuário;
## Grupos - Validações

* Validar o campo nome do Grupo;
* Validar se o boolean de Default está marcado;
* Validar se usuário é Admin ao cadastrar Grupo.

## Contatos - Tabela

- Nome *;
- Fornecedor *;
- Telefone1 *;
- Telefone2;
- Email *;
- Grupo (default = grupo Padrao);
- User (default = user logado);
## Contatos - Regras

* Todo contato deve ter nome, fornecedor, telefone1 e email;
* Se não enviado, deve ser atribuído ao grupo Padrão;
* Pertence a um grupo apenas;

## Contatos - Validações

* Validar os campos Nome, Fornecedor, telefone1 e email;
* Validar se o Grupo informado existe;
* Gravar o usuário que cadastrou.
