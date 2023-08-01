export default function Stats({ itemList }) {
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
