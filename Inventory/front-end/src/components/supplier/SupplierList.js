import React,{Fragment,useEffect,useState} from 'react';


import Table from 'react-bootstrap/Table';
import { AiOutlineEdit,AiOutlineEye,AiOutlineDelete } from "react-icons/ai";

import { supplierList,deleteSupplier } from '../../APIServices/SupplierAPIServices';
import { setAllSupplierFunc,setTotalFunc } from '../../redux/stateSlice/supplierState';
import Swal from 'sweetalert2'
import cogoToast from 'cogo-toast';


import {useDispatch,useSelector} from 'react-redux';

import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


const SupplierList = () => 
{


    var dispatch = useDispatch();

    const[searchKey,setSearchKey]=useState(0)
    const[perPage,setPerPage]=useState(5);


    var deleteSupplierFunc = (p2)=>
    {
        Swal.fire
        (
            {
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }
        ).then
        (
            (result)=> 
            {
                if (result.isConfirmed) 
                {
                    deleteSupplier(p2).then
                    (
                        (res)=>
                        {
                            if(res===true)
                            {
                                cogoToast.success("supplier deleted successfully")
                                supplierList(1,perPage,searchKey).then
                                (
                                    (res)=>
                                    {
                                        if(res!==false)
                                        {

                                            dispatch(setAllSupplierFunc(res[0].allData));
                                            dispatch(setTotalFunc(res[0].totalData[0].total))
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
          }
        )
    }



    useEffect(()=>{

        supplierList(1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllSupplierFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )

    },[])


    //for pagination
    const handlePageClick = (p1) => // here the parameter "p1" will receive 2.so p1=2
    {
        supplierList(p1.selected+1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllSupplierFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    };

    var productPerPage = (p1)=>
    {
        var value = p1.target.value;
        var intValue = parseInt(value)

        setPerPage(intValue)
        supplierList(1,intValue,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllSupplierFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    }


    //for search
    var searchOnChange = (p1)=>
    {
        var value = p1.target.value;
        setSearchKey(value);


        if(value.length===0)
        {
            setSearchKey(0);
            supplierList(1,perPage,0).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllSupplierFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
        else
        {
            supplierList(1,perPage,value).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllSupplierFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
    }


    
    let total = useSelector((state)=>state.supplierState.total);

    var allSupplier = useSelector((state)=>state.supplierState.allSupplier);
    if(allSupplier.length===0)
    {
        var allSupplierArr = <h1>No data found</h1>
    }
    else
    {
        var allSupplierArr = allSupplier.map(
            function(p1,p2)
            {
                return(
                    <tr>
                        <td> {p2+1} </td>
                        <td>{p1.supplierName}</td>
                        <td>{p1.phone}</td>
                        <td>{p1.email}</td>
                        <td> 
                            <button  className='table-edit-btn me-2'><Link className='table-edit-btn-link' to={'/supplierCreateUpdate/'+p1._id} ><span ><AiOutlineEdit/></span></Link></button> 
                            <button onClick={deleteSupplierFunc.bind(this,p1._id)}   className='table-delete-btn'><span ><AiOutlineDelete/></span></button>
                        </td>
                    </tr>
                )
            }
        )
    }
    






    return (
        <Fragment>
            <section className='supplier-list-section'>
                <div className='table-content'>

                    <div className='table-grid'>
                        <h4>Supplier List</h4>
                        <div>
                            <select onChange={productPerPage}>
                                <option value="5">5 per page</option>
                                <option value="10">10 Per page</option>
                                <option value="15">15 per page</option>
                                <option value="20">20 per page</option>
                            </select>
                        </div>
                        <div className='search'>
                            <input onChange={searchOnChange} type="text" placeholder='search your brand here . . ' />
                        </div>
                    </div>

                    <div className='my-table'>
                        <Table  hover >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSupplierArr}
                            </tbody>
                        </Table>
                    </div>

                    <nav>
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={total/perPage} 
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick} // if i click "3rd" page from pagination. it will pass 2(3rd-1) to "handlePageClick" function.
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>

                </div>
            </section>
        </Fragment>
    );
};

export default SupplierList;