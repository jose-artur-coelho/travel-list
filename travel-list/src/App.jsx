import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={setItems} />
      <Packinglist
        itemList={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats itemList={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ addItem }) {
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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={{
          opacity: `${item.packed ? 0.5 : 1}`,
          textDecoration: `${item.packed ? "line-through" : "none"}`,
        }}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Packinglist({ itemList, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {itemList.map((item) => (
          <Item
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ itemList }) {
  if (!itemList.length)
    return (
      <footer className="stats">
        <em>Comece adicionando coisas para sua lista de viagem.</em>
      </footer>
    );

  const packedItens = itemList.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc + 0),
    0
  );

  const percentage = Math.round((packedItens / itemList.length) * 100);

  return (
    <footer className="stats">
      {percentage < 100 ? (
        <em>
          🧳 Você tem {itemList.length} itens na sua lista, e{" "}
          {packedItens > 0 ? `já embalou ${packedItens}` : "não embalou nenhum"}{" "}
          ({percentage || 0}
          %).
        </em>
      ) : (
        <em>✈️ Tudo embalado. Pronto para viajar!</em>
      )}
    </footer>
  );
}
