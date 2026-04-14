export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-[#e8dccc] bg-white p-3">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-[#3D2030]">Rs. {item.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.sku, Number(e.target.value))}
          className="w-16 rounded border border-[#d8c8b0] px-2 py-1"
        />
        <button onClick={() => onRemove(item.sku)} className="text-sm text-[#6B1C2E]">
          Remove
        </button>
      </div>
    </div>
  )
}
