import React from 'react'
import "./transfer.css"
import { useState } from 'react';
import axios from 'axios';
import moment from "moment";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


function Transfer() {
    const [fromAcc, setFromAcc] = useState("")
    const [toAcc, setToAcc] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const [key, setKey] = useState("")
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modaltitle, setModalTitle] = useState("");

    // const getKey = (async () => {
    //     let config = {
    //         "headers": {
    //             "accept": "application/json",
    //             "access-token": "eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJvcmlnaW5fanRpIjoiNWE4ZmVhZTYtZjdlZC00MGY4LThmNWQtYzdiN2U1OTYxNTFiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNTYzODJmNjQtMjI1Yi00YzQ5LWJiYmUtM2ZlNjIzMGI2MmQ3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2MTc5OTAsIm5hbWUiOiJOZ8O0IFRyw60gVHLGsOG7nW5nIiwiZXhwIjoxNjcwNTYzNzQwLCJpYXQiOjE2NzA0NzczNDAsImp0aSI6IjU5MTZmMzE3LTJkNDAtNGJkMy05ZTMzLTc1ODY0YWM2Y2E1MCIsImVtYWlsIjoidHJ1b25namFjazI4MDZAZ21haWwuY29tIn0.YmmVA8bxFkh1K-TICkeynhposXkDLdjtKYWpLc9IXyoD3sVDFdjDfqB8kDPtPjAhFSiR8zCdrStzx_ggGgmuno8Nhq4VwcxN1WfQgUUGhsYVgmSfjwnaXffBEaIW-h4koDtGNG9gy-vaavqsHP_VOTDE_SS0TzbYmyO-0L7CDaR-PLYYg1jWXQaEq0YMldnYXb9nMf2kyHR_XZSvqu7Yu4g8gJ-GJ3AdIWhZbCf1w_tpWyH1CI_iFL5MM4S3xj4RhYB9yWGWyxrChq_mijsrqyyu7op_LymqjtspfQI57FcHD0bM6pRMTN0GK5tUaXkgZbBwGEd4VyJK-egdfsIsog",
    //             "x-api-key": "hutech_hackathon@123456"
    //         }
    //     }
    //     const res = await axios.get("/get_key",config);
    //     setKey(res.data);
    // },[])

    // getKey();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit")
        const requestOptions = {
            method: 'POST',
            url: "https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/transfer",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                "access-token": "eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJvcmlnaW5fanRpIjoiNWE4ZmVhZTYtZjdlZC00MGY4LThmNWQtYzdiN2U1OTYxNTFiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNTYzODJmNjQtMjI1Yi00YzQ5LWJiYmUtM2ZlNjIzMGI2MmQ3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2MTc5OTAsIm5hbWUiOiJOZ8O0IFRyw60gVHLGsOG7nW5nIiwiZXhwIjoxNjcwNTYzNzQwLCJpYXQiOjE2NzA0NzczNDAsImp0aSI6IjU5MTZmMzE3LTJkNDAtNGJkMy05ZTMzLTc1ODY0YWM2Y2E1MCIsImVtYWlsIjoidHJ1b25namFjazI4MDZAZ21haWwuY29tIn0.YmmVA8bxFkh1K-TICkeynhposXkDLdjtKYWpLc9IXyoD3sVDFdjDfqB8kDPtPjAhFSiR8zCdrStzx_ggGgmuno8Nhq4VwcxN1WfQgUUGhsYVgmSfjwnaXffBEaIW-h4koDtGNG9gy-vaavqsHP_VOTDE_SS0TzbYmyO-0L7CDaR-PLYYg1jWXQaEq0YMldnYXb9nMf2kyHR_XZSvqu7Yu4g8gJ-GJ3AdIWhZbCf1w_tpWyH1CI_iFL5MM4S3xj4RhYB9yWGWyxrChq_mijsrqyyu7op_LymqjtspfQI57FcHD0bM6pRMTN0GK5tUaXkgZbBwGEd4VyJK-egdfsIsog",
                "x-api-key": "hutech_hackathon@123456"
            },
            body: JSON.stringify({
                "data": {
                    "fromAcc" : fromAcc,
                    "toAcc" : toAcc,
                    "amount" : amount,
                    "description" : description
                },
                "request": {
                    "requestId": "a7ea23df-7468-439d-9b12-26eb4a760901",
                    "requestTime": moment().format("DD-MM-YYYY hh:mm:ss")
                }
            })
        } 
        axios(requestOptions)
            .then(res => {
                console.log(res)
                if( res.data.response.responseCode === '00'){
                    //thanh cong
                    openModal()
                    setModalTitle("Thành công") 
                } else if(res.data.response.responseCode === '01') {
                    //Unauthorized
                    openModal()
                    setModalTitle("Bạn chưa đăng nhập")
                } else if(res.data.response.responseCode === '03') {
                    //Format message invalid
                    openModal()
                    setModalTitle("Dữ liệu sai định dạng")
                } else if(res.data.response.responseCode === '04') {
                    //Not enough money
                    openModal()
                    setModalTitle("Số dư còn lại không đủ")
                } else if(res.data.response.responseCode === '06') {
                    //Bank end of date
                    openModal()
                    setModalTitle("Ngân hàng hiện không cho phép thanh toán")
                } else if(res.data.response.responseCode === '07') {
                    //BankAccount not found
                    openModal()
                    setModalTitle("Tài khoản ngân hàng không tồn tại")
                } else if(res.data.response.responseCode === '08') {
                    //BankAccount not active
                    openModal()
                    setModalTitle("Tài khoản ngân hàng không kích hoạt")
                } else if(res.data.response.responseCode === '09') {
                    //BankAccount's ccy invalid
                    openModal()
                    setModalTitle("Số tài khoản không hợp lệ")
                } else if(res.data.response.responseCode === '99') {
                    //System error
                    openModal()
                    setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                } else {
                    openModal()
                    setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                }
            })
            .catch(error => {
                openModal()
                setModalTitle("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!")
                console.log(error)
            })
    }

    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='transferPage'>
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel= {modaltitle}
            ></Modal>
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