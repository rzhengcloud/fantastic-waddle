import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState'

export const AddTransaction = () => {   
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const {addTransaction} = useContext(GlobalContext)

    const onSubmit = (e) => {
        e.preventDefault()

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text: text,
            amount: parseInt(amount) // or +amount works too
        }
        addTransaction(newTransaction);

        setText('')
        setAmount('')
    }
    return (
        <>
        <h3>Add new transaction</h3>
        <form onSubmit={onSubmit}>
            <div className="htmlForm-control">
                <label htmlFor="text">Text</label>
                <input 
                    type="text" 
                    placeholder="Enter text..." 
                    onChange = {(e) => setText(e.target.value)}/>
            </div>
            <div className="htmlForm-control">
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)</label
                >
                <input 
                    type="number" 
                    placeholder="Enter amount..." 
                    onChange = {(e) => setAmount(e.target.value)}/>
            </div>
            <button className="btn">Add transaction</button>
        </form>  
        </>
    )
}
