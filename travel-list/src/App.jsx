import Form from "./components/Form";
import Logo from "./components/Logo";
import Packinglist from "./components/PackingList";
import Stats from "./components/Stats";
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
  function handleClearItems() {
    const confirmed = window.confirm(
      "Tem certeza que quer deletar todos os itens?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={setItems} />
      <Packinglist
        itemList={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearIntems={handleClearItems}
      />
      <Stats itemList={items} />
    </div>
  );
}
