import React from 'react'
import "./checktransfer.css"
import { AiOutlineSearch } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
function checkTransfer() {
    
    return (
        <div className='checkTransferPage'>
            <div className='checkTransferContainer'>
                <div className='checkTransferWraper'>
                    <h2>Chuyển khoản</h2>
                    <h4>Chọn liên hệ</h4>
                    <div className='checkTransferStyleInput'>
                        <a href="/transfer"><GrAddCircle/>Người nhận mới</a>
                    </div>
                    <div className='checkTransferStyleInput'>
                        <button><AiOutlineSearch/></button>
                        <input type="text" name="search" id="search" placeholder='Tìm người nhận đã lưu'/>
                    </div>
                    {/* Danh sách người nhận đã lưu */}
                    <div className='checkTransferStyleInput'>
                        <ul>
                            <li><FiUser/><a href="#">DAO NGUYEN NGOC DUC</a></li>
                            <li><FiUser/><a href="#">DAO NGUYEN NGOC DUC</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default checkTransfer