import React,{Fragment,useEffect} from 'react';

import { AiOutlineShoppingCart,AiOutlineDelete } from "react-icons/ai";
import {useDispatch,useSelector} from 'react-redux';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import cogoToast from 'cogo-toast';
import {useNavigate} from 'react-router-dom'

import { addReturnDetail,removeReturnDetail,setAllCustomerFunc,setAllProductFunc,emptyReturnDetail } from '../../redux/stateSlice/returnState';
import { customerDropdown,productDropDown } from '../../APIServices/SellAPIServices';
import { createReturn } from '../../APIServices/ReturnAPIServices';


const ReturnCreateUpdate = () => 
{

    var dispatch = useDispatch();
    var navigate = useNavigate();

    useEffect(()=>{

        customerDropdown().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllCustomerFunc(res));
                    
                }
            }
        )


        productDropDown().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllProductFunc(res));
                }
            }
        )

    },[])

    var addReturnDetailFunc = ()=>
    {
        var productId = document.querySelector('.selectProduct').value;
        var productName = document.querySelector('.selectProduct').selectedOptions[0].text;
        var quantity = document.querySelector('.quantity').value;
        var unitCost = document.querySelector('.unitCost').value;

        if(productId.length===0)
        {
            cogoToast.error("product can not be empty")
        }
        else if(quantity.length===0)
        {
            cogoToast.error("quantity can not be empty")
        }
        else if(unitCost.length===0)
        {
            cogoToast.error("unitCost not be empty")
        }
        else
        {
            dispatch(addReturnDetail({productId:productId,productName:productName,quantity:quantity,unitCost:unitCost,total:quantity*unitCost}))
            document.querySelector('.selectProduct').value="";
            document.querySelector('.quantity').value="";
            document.querySelector('.unitCost').value="";
        }
    }


    var deleteReturnDetailFunc = (p4)=>
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then
          (
            (result) => 
            {
                if (result.isConfirmed) 
                {
                    dispatch(removeReturnDetail(p4))
                }
            }
          )
    }

    var returnDetail = useSelector((state)=>state.returnState.returnDetail)
    var returnDetailArr = returnDetail.map
    (
        (p1,p2)=>
        {
            return(
                <tr>
                    <td>{p1.productName}</td>
                    <td>{p1.quantity}</td>
                    <td>{p1.unitCost}</td>
                    <td>{p1.total}</td>
                    <td>
                        <button onClick={deleteReturnDetailFunc.bind(this,p2)} className='table-delete-btn'><span ><AiOutlineDelete/></span></button> 
                    </td>
                </tr>
            )
        }
    )





    var returnCreateUpdateFunc = ()=>
    {
        var child  = returnDetail.map
        (
            (p1)=>
            {
                return(
                    {productId:p1.productId,quantity:p1.quantity,unitCost:p1.unitCost,total:p1.total}
                )
            }
        )

        var customerId = document.querySelector('.selectCustomer').value;
        var vatTax = document.querySelector('.vatTax').value;
        var discount = document.querySelector('.discount').value;
        var otherCost = document.querySelector('.otherCost').value;
        var shippingCost = document.querySelector('.shippingCost').value;
        var grandTotal = document.querySelector('.grandTotal').value;
        var note = document.querySelector('.note').value;

        if(child.length===0)
        {
            cogoToast.error("your product cart can not be empty")
        }
        else if(customerId.length===0)
        {
            cogoToast.error("please select a customer")
        }
        else if(vatTax.length===0)
        {
            cogoToast.error("vat tax can not be empty")
        }
        else if(discount.length===0)
        {
            cogoToast.error("discount can not be empty")
        }
        else if(otherCost.length===0)
        {
            cogoToast.error("otherCost can not be empty")
        }
        else if(shippingCost.length===0)
        {
            cogoToast.error("shippingCost can not be empty")
        }
        else if(grandTotal.length===0)
        {
            cogoToast.error("grandTotal can not be empty")
        }
        else if(note.length===0)
        {
            cogoToast.error("note can not be empty")
        }
        else
        {
            var parent = {
                customerId:customerId,
                vatTax:vatTax,
                discount:discount,
                otherCost:otherCost,
                shippingCost:shippingCost,
                grandTotal:grandTotal,
                note:note
            }
            
            createReturn(parent,child).then
            (
                (res)=>
                {
                    if(res===true)
                    {
                        cogoToast.success("return saved");

                        //bofore redirect the return list page i am making the cart empty.
                        dispatch(emptyReturnDetail());
                    
                        navigate('/returnList')
                    }
                }
            )

        }


       
    }





    var allCustomer = useSelector((state)=>state.returnState.allCustomer)
    var allProduct = useSelector((state)=>state.returnState.allProduct)

    return (
        <Fragment>
            <div className='sell-create-update-section'>

                <div className='form'>
                    <div className='sell-form-grid'>
                        <div className='left'>
                            <h4>Save Return</h4>
                            <div className='col'>
                                <label>Select Customer</label>
                                <select className='selectCustomer'>
                                    <option value="">Select Customer</option>
                                    {
                                        allCustomer.map(
                                            (p1,p2)=>
                                            {
                                                return(
                                                    <option value={p1._id}>{p1.customerName}</option>
                                                )
                                            }
                                        )
                                    }
                                </select>
                            </div>
                            <div className='col'>
                                <label>Vat/Tax</label>
                                <input className='vatTax' type="number" />
                            </div>
                            <div className='col'>
                                <label>Discount</label>
                                <input className='discount' type="number" />
                            </div>
                            <div className='col'>
                                <label>Other Cost</label>
                                <input className='otherCost' type="number" />
                            </div>
                            <div className='col'>
                                <label>Shipping Cost</label>
                                <input className='shippingCost' type="number" />
                            </div>
                            <div className='col'>
                                <label>Grand Total</label>
                                <input className='grandTotal' type="number" />
                            </div>
                            <div className='col'>
                                <label>Note</label>
                                <input className='note' type="text" />
                            </div>
                        </div>

                        <div className='right'>
                            <div className='sell-detail-form-grid'>
                                <div className='col'>
                                    <label>Select Product</label>
                                    <select className='selectProduct'>
                                        <option value="">Product</option>
                                        {
                                            allProduct.map(
                                                (p1,p2)=>
                                                {
                                                    return(
                                                        <option value={p1._id}>{p1.name}</option>
                                                    )
                                                }
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='col'>
                                    <label>Quantity</label>
                                    <input className='quantity' type="number" />
                                </div>
                                <div className='col'>
                                    <label>Unit Cost</label>
                                    <input className='unitCost' type="number" />
                                </div>
                                <div className='col'>
                                    <label>Add to Cart</label>
                                    <button className='add-to-cart-btn ' onClick={addReturnDetailFunc} ><AiOutlineShoppingCart/></button>
                                </div>
                            </div>
                            <div>
                                <Table  hover >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Unit Cost</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {returnDetailArr}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <button onClick={returnCreateUpdateFunc} className='sell-save-btn' >Save Return</button>
                </div>

            </div>
        </Fragment>
    );
};

export default ReturnCreateUpdate;