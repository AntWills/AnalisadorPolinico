# Analisador Polínico - Frontend

![Licence](https://img.shields.io/badge/license-%20%20GNU%20GPLv3%20-green?style=plastic)

## Descrição

O Analisador Polínico é uma ferramenta desenvolvida no âmbito do Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI) do Instituto Federal de Educação, Ciência e Tecnologia do Maranhão (IFMA) - Campus Caxias, em parceria com FAPEMA e CNPq (Edital PRPGI Nº 14/2024, vigência 2024/2025).

O projeto visa auxiliar apicultores e meliponicultores na identificação rápida e eficiente do espectro polínico presente no mel. Esta é a interface de frontend, que permite ao usuário enviar uma imagem de uma amostra de mel e receber a análise de uma Rede Neural Convolucional (CNN).

## Tecnologias Utilizadas

Este projeto é construído utilizando tecnologias web padrão:

-   **HTML5:** Para a estrutura da página.
-   **CSS3:** Para a estilização da interface.
-   **JavaScript (ES6+):** Para a lógica do cliente, incluindo o envio de imagens para a API.

O projeto **não** executa o modelo de IA no navegador. Em vez disso, ele consome uma API backend que é responsável pelo processamento da imagem.

## Como Executar

Como este é um projeto de frontend simples, não há necessidade de um servidor web ou de instalar dependências.

1.  Clone este repositório:
    ```bash
    git clone https://github.com/AntWills/AnalisadorPolinico.git
    ```
2.  Abra o arquivo `index.html` em seu navegador de preferência (Google Chrome, Firefox, etc.).

**Importante:** A funcionalidade de análise de imagem depende de uma API backend. A aplicação está configurada para usar a API de produção. Se a API estiver offline ou se você estiver desenvolvendo localmente, a análise não funcionará.

## Estrutura do Projeto

```
.
├── index.html          # Arquivo principal da aplicação
├── LICENSE             # Licença do projeto
├── README.md           # Este arquivo
├── src
│   └── index.js        # Lógica de interação com a API e manipulação do DOM
└── styles
    └── index.css       # Folha de estilos (atualmente não utilizada, estilos no HTML)
```

-   **`index.html`**: Contém toda a estrutura da página, incluindo o formulário de upload e a área de resultados. Os estilos CSS estão incluídos diretamente neste arquivo.
-   **`src/index.js`**: Responsável por capturar a imagem enviada pelo usuário, enviá-la para a API backend e exibir os resultados recebidos.
-   **`styles/index.css`**: Contém os mesmos estilos do `index.html`, mas não está linkado no momento.

## Contato

Em caso de dúvidas ou problemas com esta interface, entre em contato:

-   **Antônio Willis:** [antoniowillissilvasantos@gmail.com](mailto:antoniowillissilvasantos@gmail.com)
