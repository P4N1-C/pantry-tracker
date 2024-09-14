import { useState } from 'react';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  category: string;
}

interface AddItemFormProps {
  onAddItem: (item: PantryItem) => void;
}

const AddItemForm = ({ onAddItem }: AddItemFormProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expirationDate, setExpirationDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: PantryItem = {
      id: Date.now().toString(), // generate a unique ID
      name,
      quantity,
      expirationDate,
      category
    };

    onAddItem(newItem);

    // Reset form fields
    setName('');
    setQuantity(1);
    setExpirationDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Item Name" 
        required
      />
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))} 
        placeholder="Quantity" 
        required
      />
      <input 
        type="date" 
        value={expirationDate} 
        onChange={(e) => setExpirationDate(e.target.value)} 
        placeholder="Expiration Date"
      />
      <input 
        type="text" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
