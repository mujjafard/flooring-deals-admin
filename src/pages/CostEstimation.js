import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const CostEstimation = () => {
    const [maindata, setMainData] = useState([]);
    useEffect(() => {
        axios.get("http://174.138.112.6/api/cost/get")
            .then((res) => {
                console.log(104, res.data);
                setMainData(res.data);
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    
    const [data, setData] = useState({
        name:"",
        parentId: "",
        parentName: "",
        price: "",
        type:"child"
    });
    const [main, setMain] = useState(false);
    const [sub, setSub] = useState(false);
    const [AllMainData, setAllMainData] = useState([]);

    const handleSelectChange = (event) => {
        const selectedItemId = event.target.value;
        const selectedItem = maindata.find(item => item._id === selectedItemId);
        setData({...data,parentId:selectedItem._id,parentName:selectedItem.name})
        console.log(96,selectedItem)
      };
      
    const SaveData = (e) => {
        e.preventDefault()
        console.log(36,data);
        axios.post("http://174.138.112.6/api/cost/create",data)
        .then(()=>toast.success("Data Posted Successfully...."))
        .catch((err)=>console.log(err))
    }
    return (
        <>

            <div className="">
                <h3 className="mb-4 title">Cost Estimation</h3>
                <select class="form-select fw-medium form-select mb-3" style={{ width: "17rem", backgroundColor: "#dce1e5", color: "black" }} aria-label="Large select example"
                    onChange={(e) => {
                        if (e.target.value === "Main") {
                            setMain(true); setSub(false);
                        } else if (e.target.value === "Sub") {
                            setSub(true); setMain(false)
                        }
                    }}>
                    <option selected style={{ background: "white", }}>Cost Estimation List</option>
                    <option style={{ background: "white", }} value="Main">Main</option>
                    <option style={{ background: "white", }} value="Sub">Sub</option>
                </select>
            </div>

            <div className=''>
                {main && (
                    <form class="row g-3 pt-3 shadow p-3 mt-4" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
          
                        <div class="col-md-7">
                            <label for="inputEmail4" class="form-label txt-input">Name <span className="text-danger"></span></label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Enter main name.." onChange={(e) => { setData({ ...data, name: e.target.value, type: "parent" }) }} />
                        </div>


                        <div class="col-md-12 " style={{ marginTop: 20 }}>
                            <button type="submit" class="btn btn-primary shadow border-0 p-2 " style={{ backgroundColor: "#e67929", width: 100, }} onClick={(e)=>SaveData(e)}>Submit</button>
                        </div>

                    </form>
                )} 

                {sub && (
                    <form class="row g-3 pt-3 shadow p-3 mt-4" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
                        <div class="col-lg-12">
                            <select class="form-select fw-medium form-select mb-3" style={{ width: "16rem", backgroundColor: "#dce1e5", color: "black" }} aria-label="Large select example" onChange={(e)=>{handleSelectChange(e)}}>
                                <option selected style={{ background: "white", }}>Select option</option>
                                {
                                    maindata.map((item)=>{return(<>
                                    
                                    <option value={item._id} style={{ background: "white", }}>{item.name}</option>
                                    </>)})
                                }
                            </select>
                        </div>

                        <div class="col-md-5">
                            <label for="inputEmail4" class="form-label txt-input">Name  <span className="text-danger"></span></label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Enter sub name.." onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                        </div>
                        <div class="col-md-3">
                            <label for="inputEmail4" class="form-label txt-input">Price <span className="text-danger"></span></label>
                            <input type="number" class="form-control" id="inputEmail4" placeholder="Enter price.." onChange={(e) => { setData({ ...data, price: e.target.value }) }} />
                        </div>


                        <div class="col-md-12 " style={{ marginTop: 20 }}>
                            <button type="submit" class="btn btn-primary shadow border-0 p-2 " style={{ backgroundColor: "#e67929", width: 100, }} onClick={(e)=>SaveData(e)}>Submit</button>
                        </div>

                    </form>
                 )} 

            </div>

        </>
    )
}

export default CostEstimation

