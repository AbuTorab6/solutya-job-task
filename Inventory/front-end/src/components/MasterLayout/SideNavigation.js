import React,{Fragment} from 'react';

import '../../asset/css/custom.css'

import {Navbar,Nav,Container} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import {NavLink} from 'react-router-dom'


// react icon start
import { AiOutlineMenuUnfold,AiOutlineUser,AiOutlineLogout,AiOutlineEdit,AiOutlineCheckCircle } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BsListNested,BsHourglass } from "react-icons/bs";
import { MdOutlineCancelPresentation,MdCreateNewFolder } from "react-icons/md";
import {AiOutlineBank, AiOutlineMenu} from 'react-icons/ai';
import {BsBagPlus, BsBagX, BsBox, BsCartPlus, BsCircle, BsGraphUp, BsPeople} from 'react-icons/bs';
import { TbTruckDelivery } from "react-icons/tb";
// react icon end


import myPic from '../../asset/image/jubo.jpg'
import sideNavLogo from '../../asset/image/sideNavLogo.svg'

const SideNavigation = (props) => 
{

    var jubo = ()=>
    {
        var sideNav = document.querySelector('.side-nav');
        var myContent = document.querySelector('.my-content');
        var navLogo = document.querySelector('.nav-logo');
        
        console.log(sideNav)

        if(sideNav.classList.contains('side-nav-open'))
        {
            
            sideNav.classList.add('side-nav-close');
            sideNav.classList.remove('side-nav-open')

            myContent.classList.add('content-expand')
            myContent.classList.remove('content')

            navLogo.classList.add('nav-logo-close')
            navLogo.classList.remove('nav-logo-open')
        }
        else
        {
            sideNav.classList.remove('side-nav-close');
            sideNav.classList.add('side-nav-open')

            myContent.classList.add('content')
            myContent.classList.remove('content-expand')

            navLogo.classList.add('nav-logo-open')
            navLogo.classList.remove('nav-logo-close')
        }
    }

    var accessibility = JSON.parse(localStorage.getItem('userDetail')).accessibility;
    


// ***********subNavigation Start****************
    var sidebarItems = [
        {
            title:"createUser",
            icon: <MdCreateNewFolder />,
            url : '/createUser',
            subMenu :[]
        },
        {
            title:"dashboard",
            icon: <RiDashboardLine />,
            url : '/',
            subMenu :[]
        },
        {
            title:"customer",
            icon: <BsPeople/>,
            url : '/customer',
            subMenu : [
                {
                    title : "New Customer",
                    icon : <BsCircle/>,
                    url : '/customerCreateUpdate'
                },
                {
                    title : "Customer List",
                    icon : <BsCircle />,
                    url : '/customerList'
                }
            ]
        },
        {
            title : "supplier",
            icon : <TbTruckDelivery />,
            url : '/supplier',
            subMenu:[
                {
                    title : "New Supplier",
                    icon : <BsCircle/>,
                    url : '/supplierCreateUpdate'
                },
                {
                    title : "Supplier List",
                    icon : <BsCircle />,
                    url : '/supplierList'
                }
            ]
        },
        {
            title:"expense",
            icon : <AiOutlineBank/>,
            url : '/expense',
            subMenu:[
                {
                    title : 'New Expense Type',
                    icon : <BsCircle/>,
                    url : '/expenseTypeCreateUpdate'
                },
                {
                    title : 'Expense Type List',
                    icon : <BsCircle/>,
                    url : '/expenseTypeList'
                },
                {
                    title : 'New Expense',
                    icon : <BsCircle/>,
                    url : '/expenseCreateUpdate'
                },
                {
                    title : 'Expense List',
                    icon : <BsCircle/>,
                    url : '/expenseList'
                }
            ]
        },
        {
            title : "product",
            icon : <BsBox />,
            url : '/product',
            subMenu:[
                {
                    title:"New Brand",
                    icon : <BsCircle/>,
                    url : '/brandCreateUpdate'
                },
                {
                    title : 'Brand List',
                    icon : <BsCircle/>,
                    url : '/brandList'
                },
                {
                    title:'New Category',
                    icon : <BsCircle/>,
                    url : '/categoryCreateUpdate'
                },
                {
                    title : 'Category List',
                    icon : <BsCircle/>,
                    url : '/categoryList'
                },
                {
                    title:'New Product',
                    icon : <BsCircle/>,
                    url : '/productCreateUpdate'
                },
                {
                    title : 'Product List',
                    icon : <BsCircle/>,
                    url : '/productList'
                },
            ]
        },
        {
            title:'purchase',
            icon : <BsBagPlus/>,
            url : '/purchase',
            subMenu:[
                {
                    title:'New Purchase',
                    icon : <BsCircle/>,
                    url: '/purchaseCreateUpdate'
                },
                {
                    title:'Purchase List',
                    icon : <BsCircle/>,
                    url: '/purchaseList'
                }
            ]
        },
        {
            title:'sell',
            icon : <BsCartPlus/>,
            url : '/sell',
            subMenu:[
                {
                    title:'New Sell',
                    icon : <BsCircle/>,
                    url: '/sellCreateUpdate'
                },
                {
                    title:'Sell List',
                    icon : <BsCircle/>,
                    url: '/sellList'
                }
            ]
        },
        {
            title:'return',
            icon : <BsBagX />,
            url : '/return',
            subMenu:[
                {
                    title:'New Return',
                    icon : <BsCircle/>,
                    url: '/returnCreateUpdate'
                },
                {
                    title:'Return List',
                    icon : <BsCircle/>,
                    url: '/returnList'
                }
            ]
        },
        {
            title:'report',
            icon : <BsGraphUp />,
            url:'/report',
            subMenu:[
                {
                    title: 'Sell Report',
                    icon: <BsCircle />,
                    url: '/sellDetailReport',
                },
                {
                    title: 'Return Report',
                    icon: <BsCircle />,
                    url: '/returnDetailReport',
                },
                {
                    title: 'Purchase Report',
                    icon: <BsCircle />,
                    url: '/purchaseDetailReport',
                },
                {
                    title: 'Expense Report',
                    icon: <BsCircle />,
                    url: '/expenseReport',
                }
            ]
        }
    ]



    const isSidebarAccordionActive = () => 
    {
        let urlList = [];
        sidebarItems.map
        (
            (item) => 
            {
                urlList.push
                (
                    item.subMenu.map
                    (
                        (subItem) => 
                        {
                            return subItem.url;
                        }
                    )
                );
            }   
        );
        console.log("/"+window.location.pathname.split("/")[1])
        console.log(window.location.pathname.split("/"))
        console.log(window.location.pathname)
       
        return urlList.findIndex((items) =>
            items.includes("/"+window.location.pathname.split("/")[1])
        );
 
    };

// ***********subNavigation End****************
    

    var logOutFunc = ()=>
    {
        localStorage.clear();
        window.location.href='/login'
    }



    return (
        <Fragment>
            <Navbar className='navigation-bg' fixed='top' collapseOnSelect expand="lg"  variant="dark">
                    <Container>
                            <Navbar.Brand className='navigation-brand' >
                                <span  className='nav-logo nav-logo-open' onClick={jubo} ><AiOutlineMenuUnfold/></span> <span className='navigation-brand-text'>Inventory Management</span> 
                            </Navbar.Brand>
                            
                            <div className='drp-down'>
                                <img className='drp-down-img' src={JSON.parse(localStorage.getItem('userDetail')).photo} />

                                <div className='drp-down-content'>
                                    <div className='drp-down-content-info'>
                                        <img className='drp-down-content-img' src={JSON.parse(localStorage.getItem('userDetail')).photo}  />
                                        <h6>{JSON.parse(localStorage.getItem('userDetail')).firstName+" "+JSON.parse(localStorage.getItem('userDetail')).lastName}</h6>
                                        <hr/>
                                    </div>
                                    <NavLink to='/profile' className='drp-down-item'>
                                        <span><AiOutlineUser/></span> <span>Profile</span>
                                    </NavLink>
                                    {/* we can not add "onClick" event inside the "Navlink" tag. Thats why we have to use "a" tag instead of "NavLink" tag */ }
                                    <a onClick={logOutFunc} className='drp-down-item'> 
                                        <span><AiOutlineLogout/></span> <span>Logout</span>
                                    </a>
                                </div>
                            </div>
                    </Container>
            </Navbar>

            {/* sideNavigation Start */}
            <div className='side-nav-open side-nav'>

                <div className='side-nav-image-div'>
                    <img className='side-nav-image' src={sideNavLogo} />
                </div>
                
                <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
                    {
                        sidebarItems.map
                        (
                            (item,index)=>
                            {
                               if(accessibility.includes(item.title))
                               {
                                    return item.subMenu.length!==0 ?
                                    (
                                        
                                        <Accordion.Item eventKey={`${index}`} >
                                            <Accordion.Header>
                                                {/* accordion-button */}
                                                <div>
                                                    <span className='side-nav-icon'>{item.icon}</span>  <span className='side-nav-text'>{item.title}</span>
                                                </div>
                                                {/* accordion-button */}
                                            </Accordion.Header>

                                            <Accordion.Body>
                                                {
                                                    // accordion-body
                                                    item.subMenu.map
                                                    (
                                                        (subItem,index)=>
                                                        {
                                                            return <NavLink  to={subItem.url} className={(p1) => p1.isActive ? "side-nav-item-active side-nav-item" : "side-nav-item" }>
                                                                <span className='side-nav-icon'>{subItem.icon}</span>  <span className='side-nav-text'>{subItem.title}</span>
                                                            </NavLink>
                                                        }
                                                    )
                                                    // accordion-body
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                    :
                                    (
                                        <NavLink to={item.url} className={(p1) => p1.isActive ? "side-nav-item-active side-nav-item" : "side-nav-item" }>
                                            <span className='side-nav-icon'>{item.icon}</span>  <span className='side-nav-text'>{item.title}</span>
                                        </NavLink>
                                    )
                               }
                                
                            }
                        )
                    }
                </Accordion>
                
            </div>
            {/* sideNavigation End */}

            <div className='content my-content'>
                {props.children}
            </div>

        </Fragment>
    );
};

export default SideNavigation;