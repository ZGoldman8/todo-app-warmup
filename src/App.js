import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {list: [], shouldHide: true}

    handleChange = item => this.setState({ item: item.target.value })

    addItem = () => {
        const list = this.state.list;
        list.push(this.state.item);
        this.setState({list})
    }

    handleDelete = idx => {
        const list = this.state.list;
        list.splice(idx, 1)
        this.setState({list})
    }

    toggleEdit = (idx) => {
        this.setState(prevState => ({shouldHide: !prevState.shouldHide, editIdx: idx}))
    }

    handleEdit = item => {
        this.setState({editedToDo: item})
    }

    onSave = (value, idx) => {
        const list = this.state.list;
        list.splice(idx, 1, value);
        this.setState({list, editIdx: null})
    }


    render() {
        const {list, shouldHide, editedToDo, editIdx} = this.state;
        {console.log(editIdx)}
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <h2>Zach Simple To-Do Warmup</h2>
                <input placeholder="Enter To-Do Item" onChange={e => {
                    this.handleChange(e)
                }}/>
                <button onClick={() => this.addItem()}>Add Item</button>
                <Items
                    list={list}
                    onDelete={this.handleDelete}
                    toggleEdit={this.toggleEdit}
                    shouldHide={shouldHide}
                    onSave={this.onSave}
                    handleEdit={this.handleEdit}
                    editedToDo={editedToDo}
                    editIdx={editIdx}
                />
            </div>
        );
    }
}

export default App;

const Items = ({ list, onDelete, toggleEdit, shouldHide, onSave, handleEdit, editedToDo, editIdx }) =>
            <React.Fragment>
                {list.map(function (item, idx) {
                    return (
                        <ul>
                            <li key={idx}>{item}</li>
                            <button onClick={() => onDelete(idx)}>Delete</button>
                            <button onClick={() => toggleEdit(idx)}>Edit</button>
                            {idx === editIdx && <Edit
                                idx={idx}
                                handleEdit={handleEdit}
                                onSave={onSave}
                                editedToDo={editedToDo}
                            />}
                        </ul>
                    )
                })}
            </React.Fragment>

const Edit = ({
                  handleEdit,
                  onSave,
                  idx,
                  editedToDo
              }) => (
    <React.Fragment>
        <div>
            <input placeholder="Enter Revised To-Do Item" onChange={e => handleEdit(e.target.value)}/>
            <button onClick={() => onSave(editedToDo, idx)}>Save</button>
        </div>
    </React.Fragment>
)