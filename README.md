## Análise de Performance dos Casos de Gerenciamento de Estado

---

### 1. Caso 1: `useContext` com re-render em todos os componentes filhos

![Performance Analysis - First Case](./assets/first_case.png)

**Cenário:**
Após enviar a mensagem "oi" 4 vezes na página que utiliza Context API (`ChatProvider`), temos o seguinte resultado de renders:

* **TitlePageCtx**: 9 renders (memoizados)
* **MessageListCtx**: 9 renders (memoizados)
* **PromptCtx**: 17 renders (memoizados)
* **ChatProvider**: 9 renders

---

* **Total de renders:** 75
* **FPS registrado:** ![Performance Analysis - First Case](./assets/fps_ctx.png)

---

### 2. Caso 2: Zustand com re-render apenas nos componentes necessários

![Performance Analysis - Second Case](./assets/second_case.png)

**Cenário:**
Após enviar a mensagem "oi" 4 vezes na página que utiliza Zustand (`LabZustand`), temos o seguinte resultado de renders:

* **TitlePageZtd**: 1 render (memoizado)
* **MessageListZtd**: 8 renders (memoizados)
* **PromptZtd**: 12 renders (memoizados)

---

* **Total de renders:** 39
* **FPS registrado:** ![Performance Analysis - First Case](./assets/fps_zdt.png)

---

### Link para acessar o projeto rodando

[https://state-management-battle.vercel.app/](https://state-management-battle.vercel.app/)