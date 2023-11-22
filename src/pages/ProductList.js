import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rowsPerPage = 10;

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [prodName, setprodName] = useState();
    const [prodid, setprodid] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get("http://174.138.112.6/api/product/getAll")
            .then((res) => {
                console.log(18, res.data.get);
                setData(res.data.get);
            }).catch((err) => {
                console.log(err)
            })
    
    }, [refresh])

    console.log(24, data)

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: 'Product Name',
            selector: row => row.name,
            width: "250px"
        },
        {
            name: 'SKU',
            selector: row => row.sku,
        },
        {
            name: 'Main Category',
            width: "160px",
            selector: row => row.SuperCatName,
        },
        {
            name: 'Category',
            selector: row => row.CatName,
        },
        {
            name: 'Sub Category',
            selector: row => row.SubCatName,
            width: "160px"
        },
        {
            name: 'Brand Name',
            selector: row => row.BrandName,
            width: "130px",
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Sale Price',
            selector: row => row.sale_price,
        },
        // {
        //     name: 'Stock',
        //     selector: row => row.stock,
        // },
        {
            name: 'Best Seller',
            selector: row => row.BestSeller ? "true" : "false",
        },
        {
            name: 'Box Price',
            selector: row => row.BoxPrice,
        },
        {
            name: 'Box Coverage',
            selector: row => row.BoxCoverage,
        },
        {
            name: 'Thickness',
            selector: row => row.thickness,
        },
        {
            name: 'Wear Layer Thickness',
            selector: row => row.wear_layer_thickness,
        },
        {
            name: 'Discount',
            selector: row => row.isDiscount ? "true" : "false",
        },
        // {
        //     name: 'Shipping Policy',
        //     selector: row => row.ship_policy,
        // },
        {
            name: 'Review',
            selector: row => row.review,
        },
        {
            name: 'Ratings',
            selector: row => row.ratings,
        },
        {
            name: 'Most Viewed',
            selector: row => row.IsmostViewed ? "true" : "false",
        },
        {
            name: 'Width',
            selector: row => row.width,
        },
        {
            name: 'Length',
            selector: row => row.length,
        },
        {
            name: 'Actions',
            selector: row => (<>
                <button className='border-0 bg-transparent' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { setprodName(row.name); setprodid(row._id); }}><MdDelete className="fs-4" style={{ color: "#dc3545" }} />  </button>
                <Link to={`/admin/ProductViewPage/${row.slug}`}>
                    <button className='border-0 bg-transparent '>
                        <FaEye className="fs-4" style={{ color: "#198754" }} />
                    </button>
                </Link>
            </>)
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px',
                backgroundColor: 'white',
                marginTop: "7px",
                boxShadow: " 0px 2px 2px #ced4da",
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                },
            },
        },

        headCells: {
            style: {
                backgroundColor: 'rgb(230, 121, 41)',
                fontSize: "15px",
                color: "white",
                fontWeight: "600",
                boxShadow: "0 2px 2px 0 #ced4da, 0 2px 4px 0 rgba(0, 0, 0, 0.19)"
            },
        },

        cells: {
            style: {
                // width:"60%",
                // paddingLeft: '8px',
                // paddingRight: '8px',
                // backgroundColor: '#f7f6ed'
            },
        },
    };

    const handleDeleteRow = (id) => {
        console.log(id);
        axios
            .delete(`http://174.138.112.6/api/product/delete/${id}`)
            .then((response) => {console.log('Deleted successfully', id)
                setRefresh(!refresh)
            })
            .catch(toast.success('Deleted successfully !')
            );
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <>
            <h3 className="mb-3 title ">Product List</h3>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h6 className='' style={{ fontSize: "18px" }}>Are you sure you want to delete <span className='fw-bold'>{prodName}</span> item ?</h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary border-0" data-bs-dismiss="modal" style={{ backgroundColor: "#dd1e1e" }} onClick={() => handleDeleteRow(prodid)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={currentPageData}
                customStyles={customStyles}
            />

            <nav aria-label="Page navigation example .d-sm-none .d-md-block">
                <ul className="pagination justify-content-end mt-4">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link "
                            style={{
                                backgroundColor: 'transparent',
                                color: 'black',
                                border: '0',
                            }}
                            href="#"
                            aria-label="Previous"
                            onClick={() => handlePageClick(currentPage - 1)}
                        >
                            <span className="" style={{ fontSize: "25px" }} aria-hidden="true">
                                &laquo;
                            </span>
                        </button>
                    </li>

                    {Array.from({ length: 5 }).map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <button
                                className="page-link num-click ms-1 mt-2"
                                style={{
                                    borderRadius: 60,
                                    backgroundColor: currentPage === index + 1 ? '#e67929' : '#f7f6ed',
                                    color: currentPage === index + 1 ? 'white' : 'black',
                                    border: '0',
                                }}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === (data.length) ? 'disabled' : ''}`}>
                        <button
                            className="page-link "
                            style={{
                                backgroundColor: 'transparent',
                                color: "black",
                                border: 0,
                                fontSize: "25px",
                            }}
                            onClick={() => handlePageClick(currentPage + 1)}
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ProductList
