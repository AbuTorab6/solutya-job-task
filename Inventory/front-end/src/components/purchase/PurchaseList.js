import React,{Fragment,useEffect,useState} from 'react';


import Table from 'react-bootstrap/Table';
import { AiOutlineEye,AiOutlineDelete } from "react-icons/ai";
import Swal from 'sweetalert2'
import cogoToast from 'cogo-toast';

import { purchaseList,deletePurchase } from '../../APIServices/PurchaseAPIServices';
import { setAllPurchaseFunc,setTotalFunc } from '../../redux/stateSlice/purchaseState';

import {useDispatch,useSelector} from 'react-redux';

import ReactPaginate from 'react-paginate';

const PurchaseList = () => 
{

    var dispatch = useDispatch();

    const[searchKey,setSearchKey]=useState(0)
    const[perPage,setPerPage]=useState(5);




    var deletePurchaseFunc = (p2)=>
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
                    deletePurchase(p2).then
                    (
                        (res)=>
                        {
                            if(res===true)
                            {
                                cogoToast.success("purchase deleted successfully")
                               
                                purchaseList(1,perPage,searchKey).then
                                (
                                    (res)=>
                                    {
                                        if(res!==false)
                                        {

                                            dispatch(setAllPurchaseFunc(res[0].allData));
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

        purchaseList(1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllPurchaseFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )

    },[])

    //for pagination
    const handlePageClick = (p1) => // here the parameter "p1" will receive 2.so p1=2
    {
        purchaseList(p1.selected+1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllPurchaseFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    };


    //for dropdown 
    var productPerPage = (p1)=>
    {
        var value = p1.target.value;
        var intValue = parseInt(value)

        setPerPage(intValue)
        purchaseList(1,intValue,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllPurchaseFunc(res[0].allData));
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
            purchaseList(1,perPage,0).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllPurchaseFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
        else
        {
            purchaseList(1,perPage,value).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllPurchaseFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
    }


    let total = useSelector((state)=>state.purchaseState.total);

    var allPurchase = useSelector((state)=>state.purchaseState.allPurchase);
    if(allPurchase.length===0)
    {
        var allPurchaseArr = <h1>No data found</h1>
    }
    else
    {
        var allPurchaseArr = allPurchase.map(
            function(p1,p2)
            {
                return(
                    <tr>
                        <td> {p1.supplierDetail[0].supplierName} </td>
                        <td>{p1.grandTotal}</td>
                        <td>{p1.shippingCost}</td>
                        <td>{p1.vatTax}</td>
                        <td>{p1.otherCost}</td>
                        <td>{p1.discount}</td>
                        <td>{p1.createdDate}</td>
                        <td> 
                            <button onClick={deletePurchaseFunc.bind(this,p1._id)} className='table-delete-btn'><span ><AiOutlineDelete/></span></button>
                        </td>
                    </tr>
                )
            }
        )
    }


    return (
        <Fragment>
            <section className='brand-list-section'>
                <div className='table-content'>

                    <div className='table-grid'>
                        <h4>Purchase List</h4>
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
                                    <th>Supplier</th>
                                    <th>Grand Total</th>
                                    <th>Shipping Cost</th>
                                    <th>Vat-Tax</th>
                                    <th>Other Cost</th>
                                    <th>Discount</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPurchaseArr}
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

export default PurchaseList;