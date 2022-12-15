import React from "react";
import "./transferhistory.css";
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


function TransferHistory() {
    const milliseconds = new Date();
    const [acctNo, setAcct] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [error, setError] = useState("");
    const [errorAcct, setErrorAcct] = useState("");
    const [tranHis, setTranHis] = useState([]);
    
    const url = "https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/tranhis";

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "access-token": "eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTQxMDQyOS03NWJkLTQwYTgtYmQwYy0xMTUyNzZiZWYyNDEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiIzYTQxMDQyOS03NWJkLTQwYTgtYmQwYy0xMTUyNzZiZWYyNDEiLCJvcmlnaW5fanRpIjoiN2QwY2YwNjAtYThlOC00ZmUxLWIyZDMtN2M3NmRjMGZkYTU5IiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNTI5MTJiYTAtYTUxNS00ZWVkLTkzMjEtZDcxNmZiMTBjYmMxIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2NzkyMTksIm5hbWUiOiLEkMOgbyBOZ3V54buFbiBOZ-G7jWMgxJDhu6ljIiwiZXhwIjoxNjcxMTEwNjQxLCJpYXQiOjE2NzEwMjQyNDEsImp0aSI6IjJjODVjMzNkLTZiYWEtNDg3Zi1hMmY2LTM4MjgzMzBiNzdlYiIsImVtYWlsIjoiZGFvZHVjMTMyQGdtYWlsLmNvbSJ9.quj2BYDLCIdhoLRQeBaCgsCIoYOtmu7uIH5XCJa0-SA2T_MQUbSL1-mNNQIRsfMJMsJ4Ie1hMpRVyhG_PYofRhcAFMvf2S9SVR3s02n_-8xtzYqTyOkFRDumWqvnoYS94gkYlmnRRgLg_dNc2j5uwAOeF4fYmVKD2Gvvs-jmQ-AniTbsfkX9zLpXpB8EqRBBd7BE7LYixYNfIL7iXUPbsyAAJcBaMq77btIMOumqo10GoLvjetSfUWWYzHDSEa5XW--Js9z8E634o5YMRz1GSGTwC26-IM62FJa22uaJ8BpJumirJIaTjku-t5rc1N5ZcWTRQYWs3O6iclM2B1Il6A",
            "x-api-key": "hutech_hackathon@123456"
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(acctNo.length <6 || acctNo.length>15) {
            document.getElementById("accountid").focus();
        } else {
            let miliseconddiff = moment(toDate,"DDMMYYYY").diff(moment(fromDate,"DDMMYYYY"));
            let daydiff = moment.duration(miliseconddiff).asDays();
            if(miliseconddiff < 0) {
                //fromdate must less than todate
                setError("Ngày bắt đầu phải nhỏ hơn!!!");
            } else if(daydiff > 9) {
                //less than 10 day diff
                setError("Khoảng cách giữa hai ngày phải nhỏ hơn 10 ngày!!");
            } else {
                //call api
                setError("");
                const values = {
                    data: {
                        acctNo: acctNo,
                        fromDate: fromDate,
                        toDate: toDate
                    },
                    request: {
                        requestId: uuidv4(),
                        requestTime: milliseconds.getTime(),
                    }
                }

                axios.post(url, JSON.stringify(values), config)
                .then(res => {
                    console.log(res.data.data.transHis);
                    if( res.data.response.responseCode === '00'){
                        //thanh cong
                        setError("");
                        setTranHis(res.data.data.transHis);
                    } else if(res.data.response.responseCode === '01') {
                        //Unauthorized
                        setError("Bạn chưa đăng nhập");
                    } else if(res.data.response.responseCode === '03' && res.data.response.responseMessage === "Format message invalid, fromDate format invalid, distance of date must less than 10") {
                        //Format message invalid
                        setError("Khoảng cách giữa hai ngày phải nhỏ hơn 10 ngày!!");
                    } else if(res.data.response.responseCode === '03') {
                        //less than 10 day diff
                        setError("Dữ liệu sai định dạng");
                    } else if(res.data.response.responseCode === '07') {
                        //BankAccount not found
                        setError("Tài khoản ngân hàng không tồn tại");
                    } else if(res.data.response.responseCode === '08') {
                        //BankAccount not active
                        setError("Tài khoản ngân hàng không kích hoạt");
                    } else if(res.data.response.responseCode === '09') {
                        //BankAccount's ccy invalid
                        setError("Số tài khoản không hợp lệ");
                    } else if(res.data.response.responseCode === '99') {
                        //System error
                        setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                    } else {
                        setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                    }
                })
                .catch(error => {
                    setError("Hệ thống đang xảy ra lỗi vui lòng quay lại sau!");
                    console.log(error);
                })
            }
        }
        
    }

    return (
        <div className='transferHistoryPage'>   
            <div className='transferHistoryContainer'>
                <div className='transferHistoryWraper'>
                    <h2>Liệt kê các giao dịch ngân hàng điện tử</h2>
                    <span className='textErrorMsg'>{error}</span>
                    <form onSubmit={handleSubmit}>
                        <div className='transferHistoryStyleInput'>
                            <label>Số tài khoản</label>
                            <span className='textErrorMsg'>{errorAcct}</span>
                            <input type="number" name="accountid" id="accountid" required
                                onChange={(e) => setAcct(e.target.value)}
                                onBlur = {(e) => {
                                    if(e.target.value.length <6 || e.target.value.length>15) {
                                        setErrorAcct("Số tài khoản trong khoảng từ 6 đến 15 ký tự!!!");
                                    } else
                                        setErrorAcct("");
                                }} />
                            <button type="submit" className='btnButton btnTransferHistory'>Truy vấn</button>
                        </div>
                        <div className='transferHistoryStyleInput'>
                            <label>Từ ngày</label>
                            <input type="date" name="fromdate" id="fromdate" required
                                onChange={(e) => setFromDate(moment(e.target.value).format("DDMMYYYY"))} />
                        </div>

                        <div className='transferHistoryStyleInput'>
                            <label>Lời nhắn</label>
                            <input type="date" name="todate" id="todate" required
                                onChange={(e) => setToDate(moment(e.target.value).format("DDMMYYYY"))} />
                        </div>
                    </form>

                    <div>
                        <ul>
                            {
                                tranHis.map((item,i) => <li key={i}>{item.transDesc} - {item.transDate} - {item.transAmount}</li>)
                            }
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TransferHistory;