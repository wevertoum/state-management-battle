import { useState } from 'react';

export default function ErrorComponent() {
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    throw new Error('Erro simulado ao clicar no botão!');
  }

  return (
    <div>
      <button
        onClick={() => setTriggerError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Disparar Erro
      </button>
    </div>
  );
}