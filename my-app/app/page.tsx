"use client"
import { useEffect, useState } from 'react';
import AddItemForm from '../components/AddItemForm';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  category: string;
}

const PantryTracker = () => {
  const [items, setItems] = useState<PantryItem[]>([]);

  // Load items from local storage when the component is mounted
  useEffect(() => {
    const storedItems = loadItemsFromLocalStorage();
    setItems(storedItems);
  }, []);

  // Add a new item to the pantry
  const handleAddItem = (newItem: PantryItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  // Remove an item from the pantry
  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pantry Tracker</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Save items to local storage
const saveItemsToLocalStorage = (items: PantryItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('pantryItems', JSON.stringify(items));
  }
};

// Load items from local storage
const loadItemsFromLocalStorage = (): PantryItem[] => {
  if (typeof window !== "undefined") {
    const storedItems = localStorage.getItem('pantryItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  return [];
};

export default PantryTracker;
