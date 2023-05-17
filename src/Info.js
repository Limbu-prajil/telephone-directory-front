import React from 'react'

const Info = ({data, handleDelete, handleEdit}) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td><button onClick={handleDelete(item.id)} >Delete</button></td>
            <td><button onClick={handleEdit(item.id)} >Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default Info;


