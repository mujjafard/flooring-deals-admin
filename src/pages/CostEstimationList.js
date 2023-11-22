import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const rowsPerPage = 10;
const CostEstimationList = () => {
    const [maindata, setMainData] = useState([]);
    const [data, setData] = useState([]);
    const [prodName, setprodName] = useState();
    const [costName, setCostName] = useState();
    const [costId, setCostId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [refresh, setRefresh] = useState(true);


    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: "270px"
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Parent Name',
            selector: row => row.parentName,
        },

        {
            name: 'Actions',
            selector: row => (<>
                <button className='border-0 bg-transparent' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { setprodName(row._id);handleDeleteRow(row._id) }}><MdDelete className="fs-4" style={{ color: "#dc3545" }} />  </button>
                {/* <Link to={`/admin/CostEstiOrderView/${row._id}`}>
                    <button className='border-0 bg-transparent '>
                        <FaEye className="fs-4" style={{ color: "#198754" }} />
                    </button>
                </Link> */}
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

            },
        },
    };

    useEffect(() => {
        axios.get("http://174.138.112.6/api/cost/get")
            .then((res) => {
                console.log(104, res.data);
                setMainData(res.data);
                
            }).catch((err) => {
                console.log(err)
            })
    }, [refresh])

    const handlePageClick = (id) => {
        axios.get(`http://174.138.112.6/api/cost/get/${id}`)
            .then((res) => {
                console.log(104, res.data);
                setData(res.data);
            }).catch((err) => {
                console.log(err)
            })
    };

    const handleDeleteRow = (id) => {
        console.log(102,id);
        axios
            .delete(`http://174.138.112.6/api/cost/delete/${id}`)
            .then((response) => {console.log(29, response)
                setRefresh(!refresh)
            })
            .catch(
                toast.success('Deleted successfully !')
            );
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <>
            <h3 className="mb-4 title ">Cost Estimation List</h3>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h6 className='' style={{ fontSize: "18px" }}>Are you sure you want to delete <span className='fw-bold'>{costName}</span> Item ?</h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary border-0" data-bs-dismiss="modal" style={{ backgroundColor: "#dd1e1e" }} onClick={(e) => handleDeleteRow(costId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <select class="form-select fw-medium form-select mb-3" style={{ width: "16rem", backgroundColor: "#dce1e5", color: "black" }} aria-label="Large select example"
                onChange={(e) => {
                    handlePageClick(e.target.value)
                }}
            >
                <option selected style={{ background: "white", }}>Cost Estimation List</option>
                {
                    maindata.map((item) => {
                        return (<>

                            <option style={{ background: "white", }} value={item._id}>{item.name}</option>
                        </>)
                    })
                }
                {/* <option style={{ background: "white", }} value="Sub">Sub</option> */}
            </select>
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
            />

            {/* <nav aria-label="Page navigation .d-sm-none .d-md-block example">
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

                    <li className={`page-item ${currentPage === 5 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
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
            </nav> */}
        </>
    )
}

export default CostEstimationList
