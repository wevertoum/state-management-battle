## Relatório de Análise de Performance de Gerenciamento de Mensagens

### 1 - Primeiro caso com useContext sem useMemo nos components de `<Prompt/>` e `<MessageList/>`

Durante a análise de performance utilizando o React Profiler, foi observado que cada ciclo completo de envio de uma mensagem e recepção da resposta automática do bot resultou em, aproximadamente, **4 commits de atualização** na árvore de componentes. Esses commits envolvem a renderização de componentes como `ChatProvider`, `MessageList` e `Prompt`.

![Performance Analysis - First Case](./assets/first_case.png)

### 2 - Segundo caso com useContext e useMemo nos components de prompt e messageList

Messmo após a implementação do `useMemo` nos componentes `Prompt` e `MessageList`, o número de commits de atualização na árvore de componentes permaneceu em **4 commits**. Isso indica que, embora o `useMemo` tenha sido aplicado, ele não teve um impacto significativo na redução do número de renderizações.

![Performance Analysis - Second Case](./assets/second_case.png)

### 3 - Terceiro caso com useContext, useMemo e useCallback nos components de prompt e messageList