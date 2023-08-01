import { useState } from "react";
import Item from "./Item";

export default function Packinglist({
  itemList,
  onDeleteItem,
  onToggleItem,
  onClearIntems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = itemList;

  if (sortBy === "description")
    sortedItems = itemList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">Ordenar por ordem de entrada</option>
          <option value="description">Ordenar por nome do item</option>
          <option value="packed">Ordenar por status de embalado</option>
        </select>
        <button onClick={onClearIntems}>Limpar lista</button>
      </div>
    </div>
  );
}
