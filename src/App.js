import React from 'react'
import Info from './Info'
import Form from './Form'
import axios from 'axios'
import axiosService from './axios-services/persons'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [
        { name: 'Prajil Limbu',
          number: '040123456',  
        }
      ],
      newName: '',
      newNum: '',
      error: ''
    }
    console.log('C');
  }

  componentDidMount() {
    console.log('M');
    axiosService
      .read()
      .then(persons => {
        console.log('cRud');
        this.setState({ persons })
      })
      .catch(error => {
        this.setState({
          error: `Information unfortunately not found.`
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 2000)
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumChange = (event) => {
    this.setState({ newNum: event.target.value })
  }

  addName = (event) => {
    event.preventDefault()
    const nameNumber = {name: this.state.newName, number: this.state.newNum}
    let checkName = this.state.persons.find(e => e.name === nameNumber.name)
    let checkNumber = this.state.persons.find(e => e.number === nameNumber.number)
    if ((checkName !== undefined || checkNumber !== undefined) || (checkName !== undefined && checkNumber !== undefined)) {
        alert('Name or number match');
        this.setState({
          persons: this.state.persons,
          newName: '',
          newNum: '',
          error: `Info ${nameNumber.name} and ${nameNumber.number} must be unique.`
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 3000)
    } else{
      axiosService
        .create(nameNumber)
        .then(newNameNumber => {
          console.log('Crud');
          this.setState({
            persons: this.state.persons.concat(newNameNumber),
            newName: '',
            newNum: ''
          })
        })
    }
  }

  deleteInfo = (idd) => {
    return () => {
      (window.confirm("Do you really want to delete?")) 
      axiosService
        .dilit(idd)
        .then(newpersons => {
          console.log('cruD', newpersons);
          const personsAterDel = this.state.persons.filter(e => e.id !== idd)
          this.setState({
            persons: [...personsAterDel]
          })
        })
        .catch(error => {
          this.setState({
            error: `Info ${this.state.persons.filter(e => e.id === idd)} can not be unfortunately removed from server.`,
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 3000)
        })
    }
  }

  editInfo = (idd) => {
    return (event) => {
      event.preventDefault();
      const updatedName = prompt('Enter the updated name (Cancel to retain value):');
      const updatedNum = prompt('Enter the updated number ((Cancel to retain value)):');
  
      const updatedPerson = {
        name: updatedName !== null ? updatedName : this.state.persons.find(e => e.id === idd).name,
        number: updatedNum !== null ? updatedNum : this.state.persons.find(e => e.id === idd).number
      };
  
      axios
        .update(idd, updatedPerson)
        .then(updatedPerson => {
          console.log('crUd');
          const updatedPersons = this.state.persons.map(person => {
            if (person.id === idd) {
              return { ...person, name: updatedPerson.name, number: updatedPerson.number };
            }
            return person;
          })
          this.setState({
            persons: updatedPersons
          })
        })
        .catch(error => {
          this.setState({
            error: `Info ${updatedName} or ${updatedNum} have been already unfortunately edited from server.`,
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 3000)
        })
    };
  }  

  render() {
    console.log('R');
    return (
      <div>
        <h2>Telephone Directory</h2>
        <Form newName={this.state.newName} newNum={this.state.newNum} addName={this.addName}
          handleNameChange={this.handleNameChange} handleNumChange={this.handleNumChange}/>
        <h2>Name and Numbers</h2>
        <Info data={this.state.persons} handleDelete={this.deleteInfo} handleEdit={this.editInfo}/>
      </div>
    )
  }
}

export default App;