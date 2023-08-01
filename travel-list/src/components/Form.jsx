import { useState } from "react";

export default function Form({ addItem }) {
  const [qntItem, setQntItem] = useState(1);
  const [newItem, setNewItem] = useState("");

  function handleSubmitItem(event) {
    event.preventDefault();
    if (!newItem) return;

    const itemToAdd = {
      description: newItem,
      id: Date.now(),
      quantity: qntItem,
      packed: false,
    };

    addItem((prevItems) => [...prevItems, itemToAdd]);

    setNewItem("");
    setQntItem(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmitItem}>
      <h3>O que você precisa para sua viagem?</h3>
      <select
        value={qntItem}
        onChange={() => setQntItem(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={newItem}
        onChange={() => setNewItem(event.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
