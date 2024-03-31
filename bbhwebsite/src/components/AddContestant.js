import React, { useState, useEffect } from 'react';

function ContestantsPage() {
  const [contestants, setContestants] = useState([]);

  const addNewContestant = async () => {
    // Define the blank contestant data
    const newContestantData = {
      name: '?', // Assuming 'name' can be empty initially
      image_url: 'blob:https://imgur.com/50d884c7-bb33-4145-8514-eedd153af37a',
      eviction_image_url: '',
      status: 'Sem Status', // Assuming there's a default status for new contestants
    };

    try {
      // Make an API call to the backend to add the new contestant
      const response = await fetch('http://127.0.0.1:5000/create-contestant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContestantData),
      });

      if (!response.ok) {
        throw new Error('Failed to add new contestant');
      }

      // Optionally, fetch the updated list of contestants from the backend
      // Or update the local state to reflect the addition
      const addedContestant = await response.json(); // Assuming your API returns the added contestant
      setContestants([...contestants, addedContestant]);
    } catch (error) {
      console.error('Error adding new contestant:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/contestants');
        if (!response.ok) {
          throw new Error('Failed to fetch contestants');
        }
        const data = await response.json();
        setContestants(data);
      } catch (error) {
        console.error('Error fetching contestants:', error);
      }
    };

    fetchContestants();
  }, []);

  const updateContestant = async (id, updatedContestant) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/contestants/${id}`, {
        method: 'PUT', // Assuming your backend supports PUT requests for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContestant),
      });

      if (!response.ok) {
        throw new Error('Failed to update contestant');
      }

      // Refetch contestants to reflect the update
      // Alternatively, you can update the state locally without refetching
      const updatedData = await response.json();
      setContestants(contestants.map(contestant => contestant.id === id ? updatedData : contestant));
    } catch (error) {
      console.error('Error updating contestant:', error);
    }
  };

  const handleSubmit = (e, id) => {
    const formData = new FormData(e.target);
    const updatedContestant = Object.fromEntries(formData.entries());
    updateContestant(id, updatedContestant);
  };

  return (
    <div>
      {contestants.map(contestant => (
        <form key={contestant.id} onSubmit={(e) => handleSubmit(e, contestant.id)}>
          <input name="name" defaultValue={contestant.name} placeholder="Name" />
          <input name="image_url" defaultValue={contestant.image_url} placeholder="Image URL" />
          <input name="eviction_image_url" defaultValue={contestant.eviction_image_url} placeholder="Eviction Image URL" />
          <select name="status" defaultValue={contestant.status}>
            <option value="Emparedado">Emparedado</option>
            <option value="Eliminado">Eliminado</option>
            <option value="Anjo">Anjo</option>
            <option value="Lider">Líder</option>
            <option value="Casa de vidro">Casa de Vidro</option>
            <option value="Sem Status">Sem Status</option>
          </select>
          <button type="submit">Update</button>
        </form>
      ))}
      <button onClick={addNewContestant}>+</button>
    </div>
  );
}

export default ContestantsPage;
