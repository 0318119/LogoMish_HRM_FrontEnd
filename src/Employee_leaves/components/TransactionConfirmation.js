import React from "react";
import { Link } from "react-router-dom";
import '../Assets/css/TransactionConfirmation.css'

function TransactionConfirmation_list() {

    return (
        <div className="container-fluid">
            <div className="container-fluid mt-2  TransactionConfirmation_listContainer">
                <span className="TransactionConfirmation_listHeader">
                    Transaction Confirmation - List
                </span>
                <div className="row px-3 mt-2 py-1">
                    <div className="col-lg-5 d-flex">
                        <input type="text" className="form-control TransactionConfirmation_listSearch" name="" id="" />
                        <button className="btn btn-dark mx-1">Search</button>
                    </div>
                </div>
                <div className="row  p-3">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                
                                <th scope="col">Edit</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                
                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                
                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td><button className="editBtnTable">Edit</button></td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row mt-1 p-3">
                    <div className="col-md-12 col-sm-12 p-2">
                        <div className="    ">
                            <button type="submit" className='btn btn-dark'>
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionConfirmation_list;