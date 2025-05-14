import React from "react";

export default function TransactionForm() {
  return (
    <div className="w-[60%] h-[50%] rounded-xl bg-white p-6 shadow-md mx-auto">
      <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
        Nova Transação
      </h3>
      <div className="mb-2 w-full">
        <label
          htmlFor="transaction-type"
          className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          Tipo de Transação
        </label>
        <select
          id="transaction-type"
          className="w-full rounded-md border border-[var(--outline)] bg-[var(--surface)] px-3 py-2 text-[var(--color-text)]"
        >
          <option>Selecione o tipo de transação</option>
          <option>Transferência</option>
          <option>Depósito</option>
          <option>Pagamento</option>
        </select>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="transaction-value"
          className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          Valor
        </label>
        <input
          type="number"
          id="transaction-value"
          placeholder="R$ 0,00"
          className="w-full rounded-md border border-[var(--outline)] bg-[var(--surface)] px-4 py-2 text-[var(--color-text)] placeholder-[var(--color-text-secondary)]"
        />
      </div>
      <button className="w-full rounded-md bg-[var(--color-secondary)] px-4 py-2 text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)]">
        Concluir Transação
      </button>
    </div>
  );
}
