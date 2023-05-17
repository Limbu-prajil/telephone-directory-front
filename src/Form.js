import React from 'react'

const Form = ({newName, newNum , addName, handleNameChange, handleNumChange}) => {

  return (
    <form onSubmit={addName}>
        <div>
            Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>  
  )
}

export default Form;