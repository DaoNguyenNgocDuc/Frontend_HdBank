import React from 'react'
import "./transfer.css"
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

function Transfer() {
    const milliseconds = new Date();
    const [fromAcc, setFromAcc] = useState("")
    const [toAcc, setToAcc] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const [modaltitle, setModalTitle] = useState("");
    const navigate = useNavigate();
    const url = "https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/transfer"

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "access-token": "eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJvcmlnaW5fanRpIjoiNWE4ZmVhZTYtZjdlZC00MGY4LThmNWQtYzdiN2U1OTYxNTFiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNTYzODJmNjQtMjI1Yi00YzQ5LWJiYmUtM2ZlNjIzMGI2MmQ3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2MTc5OTAsIm5hbWUiOiJOZ8O0IFRyw60gVHLGsOG7nW5nIiwiZXhwIjoxNjcwNTYzNzQwLCJpYXQiOjE2NzA0NzczNDAsImp0aSI6IjU5MTZmMzE3LTJkNDAtNGJkMy05ZTMzLTc1ODY0YWM2Y2E1MCIsImVtYWlsIjoidHJ1b25namFjazI4MDZAZ21haWwuY29tIn0.YmmVA8bxFkh1K-TICkeynhposXkDLdjtKYWpLc9IXyoD3sVDFdjDfqB8kDPtPjAhFSiR8zCdrStzx_ggGgmuno8Nhq4VwcxN1WfQgUUGhsYVgmSfjwnaXffBEaIW-h4koDtGNG9gy-vaavqsHP_VOTDE_SS0TzbYmyO-0L7CDaR-PLYYg1jWXQaEq0YMldnYXb9nMf2kyHR_XZSvqu7Yu4g8gJ-GJ3AdIWhZbCf1w_tpWyH1CI_iFL5MM4S3xj4RhYB9yWGWyxrChq_mijsrqyyu7op_LymqjtspfQI57FcHD0bM6pRMTN0GK5tUaXkgZbBwGEd4VyJK-egdfsIsog",
            "x-api-key": "hutech_hackathon@123456"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            data: {
                fromAcc: fromAcc,
                toAcc: toAcc,
                amount: amount,
                description: description
            },
            request: {
                requestId: uuidv4(),
                requestTime: milliseconds.getTime(),
            }
        }

        axios.post(url, JSON.stringify(values), config)
            .then(res => {
                console.log(res)
                if( res.data.response.responseCode === '00'){
                    //thanh cong
                    setModalTitle("Thành công")
                    sessionStorage.setItem("toAcc", toAcc);
                    sessionStorage.setItem("amount", amount);
                    sessionStorage.setItem("description", description);
                    navigate("/confirmtransfer");
                } else if(res.data.response.responseCode === '01') {
                    //Unauthorized
                    setModalTitle("Bạn chưa đăng nhập")
                } else if(res.data.response.responseCode === '03') {
                    //Format message invalid
                    setModalTitle("Dữ liệu sai định dạng")
                } else if(res.data.response.responseCode === '04') {
                    //Not enough money
                    setModalTitle("Số dư còn lại không đủ")
                } else if(res.data.response.responseCode === '06') {
                    //Bank end of date
                    setModalTitle("Ngân hàng hiện không cho phép thanh toán")
                } else if(res.data.response.responseCode === '07') {
                    //BankAccount not found
                    setModalTitle("Tài khoản ngân hàng không tồn tại")
                } else if(res.data.response.responseCode === '08') {
                    //BankAccount not active
                    setModalTitle("Tài khoản ngân hàng không kích hoạt")
                } else if(res.data.response.responseCode === '09') {
                    //BankAccount's ccy invalid
                    setModalTitle("Số tài khoản không hợp lệ")
                } else if(res.data.response.responseCode === '99') {
                    //System error
                    setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                } else {
                    setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                }
            })
            .catch(error => {
                setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                console.log(error)
            })
    }

    return (
        <div className='transferPage'>   
            <div className='transferContainer'>
                <div className='transferWraper'>
                    <h2>Chức năng chuyển khoản</h2>
                    <span className='textErrorMsg'>{modaltitle}</span>
                    <form onSubmit={handleSubmit}>
                        <div className='transferStyleInput'>
                            <label>Số tài khoản người nhận</label>
                            <input type="number" name="accountid" id="accountid" required
                                onChange={(e) => setToAcc(e.target.value)} />
                        </div>
                        <div className='transferStyleInput'>
                            <label>Số tiền chuyển khoản</label>
                            <input type="number" name="amount" id="amount" required
                                onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <div className='transferStyleInput'>
                            <label>Lời nhắn</label>
                            <textarea type="text" name="description" id="description" required
                                onChange={(e) => setDescription(e.target.value)}
                                onBlur={e => {
                                    if (e.target.value.length >= 151)
                                        setErrorDescription("Lời nhắn không dài quá 150 ký tự!!!")
                                    else
                                        setErrorDescription("")
                                }} />
                            <span className='textErrorMsg'>{errorDescription}</span>
                        </div>

                        <div className='transferSubmit'>
                            <button type="submit" className='btnButton btnTransfer'>Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Transfer