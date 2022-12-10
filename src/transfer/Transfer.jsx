import React from 'react'
import "./transfer.css"
import { useState } from 'react';
function Transfer() {
    const [fromAcc, setFromAcc] = useState("")
    const [toAcc, setToAcc] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "fromAcc" : fromAcc,
                "toAcc" : toAcc,
                "amount" : amount,
                "description" : description
            })
        } 
        fetch(url, requestOptions)
            .then(res => {
                console.log(res.json())
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='transferPage'>
            <div className='transferContainer'>
                <div className='tranferWraper'>
                    <h2>Chuyển khoản</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='transferStyleInput'>
                            <label>Số tài khoản người nhận</label>
                            <input type="number" name="accountid" id="accountid" required
                            onChange={(e) => setToAcc(e.target.value)}/>
                        </div>
                        <div className='transferStyleInput'>
                            <label>Số tiền chuyển khoản</label>
                            <input type="number" name="amount" id="amount" required
                            onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                        <span className='textErrorMsg'>{errorDescription}</span>
                        <div className='transferStyleInput'>
                            <label>Lời nhắn</label>
                            <input type="text" name="description" id="description" required
                             onChange={(e) => setDescription(e.target.value)}
                            onBlur={e => {
                                console.log(e.target.value.length)
                                if(e.target.value.length >= 151)
                                    setErrorDescription("Lời nhắn không dài quá 150 ký tự!!!")
                                else
                                    setErrorDescription("")
                            }}/>
                        </div>
                        <div className='transferSubmit'>
                            <button type="submit">Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Transfer