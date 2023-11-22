import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrandList = () => {
    const [data, setData] = useState([]);
    const [brandName, setBrandName] = useState();
    const [brandid, setbranddid] = useState();
    const [brandData, setBrandData] = useState([]);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCard, setTotalCard] = useState(data.length);
    const cardsPerPage = 6;

    useEffect(() => {
        axios.get("http://174.138.112.6/api/brand/getAll", data)
            .then((res) => {
                console.log(18, res.data);
                setData(res.data);
                console.log(13, res)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDeleteRow = (id) => {
        console.log(26, data.id);
        axios
            .delete(`http://174.138.112.6/api/brand/${id}`)
            .then((response) => console.log(29, response))
            .catch(
                toast.success('Deleted successfully !')
            );
    };

    useEffect(() => {
        axios.get(`http://174.138.112.6/api/brand/get/${id}`)
            .then((res) => {
                const response = res
                console.log(41, response)
                setBrandData(response)
                console.log(43, response)
            })
            .catch((err) => { console.log(err) })
    }, [id]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);


    return (
        <>
            <h3 className="mb-4 title">Brand List</h3>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h6 className='' style={{ fontSize: "18px" }}>Are you sure you want to delete <span className='fw-bold'>{brandName}</span> Item ?</h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary border-0" data-bs-dismiss="modal" style={{ backgroundColor: "#dd1e1e" }} onClick={(e) => handleDeleteRow(brandid)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" gap-4 m-0 row">
                {
                    currentCards.length > 0 && currentCards.map?.((item) => {
                        return (
                            <>
                                <div class=" card border-0 shadow p-2 mb-5 bg-body-tertiary rounded" style={{ width: "18rem", backgroundColor: "#f7f6ed", }}>
                                    <img src={item.brandLogo} class="card-img-top" alt="..." />
                                    <div class="card-body p-2 " >
                                        <h5 class="card-title">{item.brand_name}</h5>
                                    </div>

                                    <div class="card-body text-end" >
                                        <Link to={`/admin/brand/${item._id}`} type="button" class="btn btn-primary border-0 text-dark" style={{ backgroundColor: "#ced4da", width: "4rem" }}>Edit</Link>
                                        <Link type="button" class="btn btn-primary border-0" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "#f13a3a", marginLeft: "0.3rem" }} onClick={(e) => { setBrandName(item.brand_name); setbranddid(item._id) }}>Delete</Link>
                                    </div>
                                </div>
                            </>)
                    })
                }
            </div>

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

                            aria-label="Previous"
                            onClick={() => paginate(currentPage - 1)}
                        >
                            <span className="" style={{ fontSize: "25px" }} aria-hidden="true">
                                &laquo;
                            </span>
                        </button>
                    </li>

                    {Array.from({ length: 5 }).map(
                        (_, index) => (

                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link num-click ms-1 mt-2"
                                    key={index}
                                    style={{
                                        borderRadius: 60,
                                        backgroundColor: currentPage === index + 1 ? '#e67929' : '#f7f6ed',
                                        color: currentPage === index + 1 ? 'white' : 'black',
                                        border: '0',
                                    }}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        )
                    )}

                    <li className={`page-item ${currentPage === 5 ? 'disabled' : ''}`}>
                        <button
                            className="page-link "
                            style={{
                                backgroundColor: 'transparent',
                                color: "black",
                                border: 0,
                                fontSize: "25px",
                            }}
                            onClick={() => paginate(currentPage + 1)}
                            aria-label="Next"
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
};

export default BrandList
