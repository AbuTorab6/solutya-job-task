import React,{Fragment,useEffect} from 'react';

import { brandDropdown,categoryDropdown,createProduct,productDetailById,updateProduct} from '../../APIServices/ProductAPIServices';
import { setAllProductBrandFunc,setAllProductCategoryFunc } from '../../redux/stateSlice/productState';

import cogoToast from 'cogo-toast';

import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,useParams} from 'react-router-dom'

const ProductCreateUpdate = () => 
{

    var navigate = useNavigate();
    var dispatch = useDispatch();

    var idFromUrl = useParams().id;

    useEffect(()=>{

        if(idFromUrl===undefined)
        {
            brandDropdown().then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllProductBrandFunc(res));
                    }
                }
            )

            categoryDropdown().then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllProductCategoryFunc(res));
                    }
                }
            )
        }
        else
        {
            productDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.productName').value=res[0].name;
                        document.querySelector('.productBrand').value=res[0].brandId;
                        document.querySelector('.productCategory').value=res[0].categoryId;
                        document.querySelector('.productUnit').value=res[0].unit;
                        document.querySelector('.productDetail').value=res[0].details;
                    }
                }
            )
        }
        
            
       
    },[])



    var productCreateUpdateFunc = ()=>
    {
        var productName = document.querySelector('.productName').value;
        var productBrand =document.querySelector('.productBrand').value ;
        var productCategory = document.querySelector('.productCategory').value;
        var productUnit = document.querySelector('.productUnit').value;
        var productDetail = document.querySelector('.productDetail').value;

        if(productName.length===0)
        {
            cogoToast.error("Please provide product name");
        }
        else if (productBrand.length===0)
        {
            cogoToast.error("Please select product brand");
        }
        else if (productCategory.length===0)
        {
            cogoToast.error("Please select product category");
        }
        else if (productUnit.length===0)
        {
            cogoToast.error("Please provide product unit");
        }
        else if (productDetail.length===0)
        {
            cogoToast.error("Please provide product details");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createProduct(productCategory,productBrand,productName,productUnit,productDetail).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("product saved");
    
                            document.querySelector('.productName').value="";
                            document.querySelector('.productBrand').value ="";
                            document.querySelector('.productCategory').value="";
                            document.querySelector('.productUnit').value="";
                            document.querySelector('.productDetail').value="";
                            
                            navigate('/productList')
                        }
                    }
                )
            }
            else
            {
                updateProduct(productCategory,productBrand,productName,productUnit,productDetail,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("product updated");

                            document.querySelector('.productName').value="";
                            document.querySelector('.productBrand').value ="";
                            document.querySelector('.productCategory').value="";
                            document.querySelector('.productUnit').value="";
                            document.querySelector('.productDetail').value="";

                            navigate('/productList')
                        }
                    }
                )
            }
            
        }


    }




    let allProductBrand = useSelector((state)=>state.productState.allProductBrand);
    let allProductCategory = useSelector((state)=>state.productState.allProductCategory);

    return (
        <Fragment>
            <div className='product-create-update-section'>

                <div className='form'>
                    <h4>Save Product</h4>
                        <form>
                            <div className='product-form-grid'>
                                <div className='col'>
                                    <label>Product Name</label>
                                    <input className='productName' type="text" />
                                </div>
                                <div className='col'>
                                    <label>Product Brand</label>
                                    <select className='productBrand'>
                                        <option value="">Select Type</option>
                                        {
                                            allProductBrand.map(
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
                                    <label>Product Category</label>
                                    <select className='productCategory'>
                                        <option value="">Select Type</option>
                                        {
                                            allProductCategory.map(
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
                                    <label>Unit</label>
                                    <input className='productUnit' type="text" />
                                </div>
                                <div className='col'>
                                    <label>Details</label>
                                    <input className='productDetail' type="text" />
                                </div>
                            </div>
                        </form>
                        <button onClick={productCreateUpdateFunc}  className='product-save-btn' >Save Product</button>
                </div>

            </div>
        </Fragment>
    );
};

export default ProductCreateUpdate;