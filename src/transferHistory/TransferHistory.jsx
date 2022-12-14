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
    const url = "https://7ucpp7lkyl.execute-api.ap-southeast-1.amazonaws.com/dev/transfer";

    const config = {
        "headers": {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "access-token": "eyJraWQiOiJXcDRGMndiQVpMa1d2WWgyNDhnYjNtUHBLRzZTdDRNcG85Tmc3U2diZ2E0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FiMVE4VFBzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJiMjcwMzA4MS0zMTA2LTRmOWUtYWE4Zi0zZGYyMGVmN2I3MWUiLCJvcmlnaW5fanRpIjoiNWE4ZmVhZTYtZjdlZC00MGY4LThmNWQtYzdiN2U1OTYxNTFiIiwiYXVkIjoic2lrY25laTR0MmgzbnRrcWo1ZDQ5bHR2ciIsImV2ZW50X2lkIjoiNTYzODJmNjQtMjI1Yi00YzQ5LWJiYmUtM2ZlNjIzMGI2MmQ3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Njk2MTc5OTAsIm5hbWUiOiJOZ8O0IFRyw60gVHLGsOG7nW5nIiwiZXhwIjoxNjcwNTYzNzQwLCJpYXQiOjE2NzA0NzczNDAsImp0aSI6IjU5MTZmMzE3LTJkNDAtNGJkMy05ZTMzLTc1ODY0YWM2Y2E1MCIsImVtYWlsIjoidHJ1b25namFjazI4MDZAZ21haWwuY29tIn0.YmmVA8bxFkh1K-TICkeynhposXkDLdjtKYWpLc9IXyoD3sVDFdjDfqB8kDPtPjAhFSiR8zCdrStzx_ggGgmuno8Nhq4VwcxN1WfQgUUGhsYVgmSfjwnaXffBEaIW-h4koDtGNG9gy-vaavqsHP_VOTDE_SS0TzbYmyO-0L7CDaR-PLYYg1jWXQaEq0YMldnYXb9nMf2kyHR_XZSvqu7Yu4g8gJ-GJ3AdIWhZbCf1w_tpWyH1CI_iFL5MM4S3xj4RhYB9yWGWyxrChq_mijsrqyyu7op_LymqjtspfQI57FcHD0bM6pRMTN0GK5tUaXkgZbBwGEd4VyJK-egdfsIsog",
            "x-api-key": "hutech_hackathon@123456"
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(acctNo.length <6 || acctNo.length>15) {
            document.getElementById("accountid").focus();
        } else {
            let miliseconddiff = moment(toDate).diff(moment(fromDate));
            let daydiff = moment.duration(miliseconddiff).asDays();
            if(miliseconddiff < 0) {
                //fromdate must less than todate
                setError("Ngày bắt đầu phải nhỏ hơn!!!");
            } else if(daydiff > 10) {
                //max 10 day diff
                setError("Khoảng cách giữa hai ngày tối đa là 10 ngày!!");
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
                    console.log(res);
                    if( res.data.response.responseCode === '00'){
                        //thanh cong
                        setError("");
                        setTranHis();
                    } else if(res.data.response.responseCode === '01') {
                        //Unauthorized
                        setError("Bạn chưa đăng nhập");
                    } else if(res.data.response.responseCode === '03') {
                        //Format message invalid
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
        <div className='transferPage'>   
            <div className='transferContainer'>
                <div className='transferWraper'>
                    <h2>Liệt kê các giao dịch ngân hàng điện tử</h2>
                    <span className='textErrorMsg'>{error}</span>
                    <form onSubmit={handleSubmit}>
                        <div className='transferStyleInput'>
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
                            <button type="submit" className='btnButton btnTransfer'>Truy vấn</button>
                        </div>
                        <div className='transferStyleInput'>
                            <label>Từ ngày</label>
                            <input type="datetime-local" name="fromdate" id="fromdate" required
                                onChange={(e) => setFromDate(e.target.value)} />
                        </div>

                        <div className='transferStyleInput'>
                            <label>Lời nhắn</label>
                            <input type="datetime-local" name="todate" id="todate" required
                                onChange={(e) => setToDate(e.target.value)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransferHistory;