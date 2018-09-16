import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {list: [], shouldHide: true}

    handleChange = item => this.setState({item})

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

    toggleEdit = () => {
        this.setState({shouldHide: false})
    }

    handleEdit = item => {
        this.setState({ editedToDo: item })
    }

    onSave = (value, idx) => {
        const list = this.state.list;
        list.splice(idx, 1, value);
        this.setState({ list, shouldHide: true })
    }



    render() {
        const {list, item, shouldHide, editedToDo } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <h2>Zach Simple To-Do Warmup</h2>
                <input placeholder="Enter To-Do Item" onChange={e => {
                    this.handleChange(e.target.value)
                }}/>
                <button onClick={() => this.addItem()}>Add Item</button>
                <Items
                    list={list}
                    onDelete={this.handleDelete}
                    item={item}
                    toggleEdit={this.toggleEdit}
                    shouldHide={shouldHide}
                    onSave={this.onSave}
                    handleEdit={this.handleEdit}
                    editedToDo={editedToDo}
                />
            </div>
        );
    }
}

export default App;

const Items = ({
                   list,
                   item,
                   onDelete,
                   toggleEdit,
                   shouldHide,
                   onSave,
                   handleEdit,
                   editedToDo
               }) => (
    <React.Fragment>
        {list.map(function (item, idx) {
            return (
                <ul>
                    <li key={idx}>{item}</li>
                    <button onClick={() => onDelete(idx)}>Delete</button>
                    <button onClick={() => toggleEdit(idx)}>Edit</button>
                    <div className={shouldHide ? 'hidden' : ''}>
                        <input placeholder="Enter Revised To-Do Item" onChange={e => handleEdit(e.target.value)} />
                        <button onClick={() => onSave(editedToDo, idx)}>Save</button>
                    </div>
                </ul>
            )
        })}
    </React.Fragment>
)