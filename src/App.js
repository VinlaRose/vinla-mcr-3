
import { useContext, useState } from 'react';
import './App.css';
import { DataContext } from './context/context';
import { snacks } from './data';

function App() {
  const {state, dispatch} = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
  
    setSearchTerm(searchTerm);
  
    const filteredSnacks = state.data.filter((snack) => {
      const productNameMatches = snack.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      const ingredientMatches = snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return productNameMatches || ingredientMatches;
    });
  
    dispatch({ type: "UPDATE", payload: filteredSnacks });
  };
  

const sortByPrice = () => {
  const sortedSnacks = state.filteredData.sort((a, b) => b.price - a.price);
 
  dispatch({type: "UPDATE", payload: sortedSnacks})
}

const sortByCalories = () => {
  const sortedCalories = state.filteredData.sort((a, b) => b.calories - a.calories);
 
  dispatch({type: "UPDATE", payload: sortedCalories})
}

const sortById = () => {
  const sortedID = state.filteredData.sort((a, b) => a.id - b.id);
 
  dispatch({type: "UPDATE", payload: sortedID})
}

const sortByProductWeight = () => {
  const sortedSnacks = state.filteredData.slice().sort((a, b) => {
   
    const weightA = parseFloat(a.product_weight);
    const weightB = parseFloat(b.product_weight);

    return weightB - weightA;
  });

  
  dispatch({type: "UPDATE", payload: sortedSnacks})
};

const sortByProductName = () => {
  const sortedSnacks = state.filteredData.slice().sort((a, b) => {
    const nameA = a.product_name.toLowerCase();
    const nameB = b.product_name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  dispatch({type: "UPDATE", payload: sortedSnacks})
  
};

  
  console.log(state)
  return (
    <div className="App">
    <h1>MCR -3</h1>

    <input
        type="text"
        placeholder="Search by product name or ingredient..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    <table className="table">
        <thead>
          <tr>
            <th  onClick={sortById}>ID</th>
            <th onClick={sortByProductName}>Product Name</th>
            <th onClick={sortByProductWeight}>Product Weight</th>
            <th onClick={sortByPrice}>Price</th>
            <th onClick={sortByCalories}>Calories</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {state.filteredData.map(snack => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
