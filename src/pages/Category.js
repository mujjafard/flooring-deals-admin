import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [SuperCat, setSuperCat] = useState(false);
  const [Cat, setCat] = useState(false);
  const [SubCat, setSubCat] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState()
  const [AllCat, setAllCat] = useState([]);
  const [AllCatData, setAllCatData] = useState([]);
  const [AllSuperCat, setAllSuperCat] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(27, AllSuperCat)

  const [data, setData] = useState({
    name: "",
    categoryImage: "",
    parentId: "",
    parentName: "",
    superCatName: "",
    Type: ""
  })
  const [docs, setdocs] = useState({
    categoryImage: "",
  })

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);

    setIsFormVisible(true);
  };

  const uploadimage = (id) => {
    const formData = new FormData();
    formData.append("categoryImage", docs.addressProof);
    console.log(39, formData)
    axios
      .put(`http://174.138.112.6/api/addressProof/${id}`, formData)
      .then((res) => console.log("addressUploaded", res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("http://174.138.112.6/api/category/get")
      .then((res) => {
        const response = res.data.categories
        setAllCatData(response)
        const Allsupcat = response.filter((item) => item.Type == "Super_Cat");
        setAllSuperCat(Allsupcat)
      })
      .catch((err) => { console.log(err) })
  }, [])

  const SaveCAt = (e) => {
    e.preventDefault()
    console.log(data);
    axios.post("http://174.138.112.6/api/category/createTemp", data)
      .then((res) => {
        const response = res.data.categories
        alert("Submitted");
      })
      .catch((err) => { console.log(err) })
  }

  const getCat = (id) => {
    console.log(54, id)
    const getCat = AllCatData.filter((item) => item.parentId == id)
    setAllCat(getCat);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div >
      <h3 className="mb-4 title ">Category</h3>

      <select class="form-select fw-medium form-select w-25 mb-3" style={{ width: "260px", backgroundColor: "#dce1e5", color: "black" }} aria-label="Large select example"
        onChange={(e) => {
          if (e.target.value === "Main Category") {
            setSuperCat(true); setCat(false); setSubCat(false);
          } else if (e.target.value === "Category") {
            setCat(true); setSuperCat(false); setSubCat(false)
          } else if (e.target.value === "Sub Category") {
            setSubCat(true); setCat(false); setSuperCat(false)
          }
        }}>
        <option style={{ background: "white", color: "black", }} className="" value="">Category List</option>
        <option style={{ background: "white", color: "black", textAlign: "left" }} value="Main Category">Main Category</option>
        <option style={{ background: "white", color: "black", textAlign: "left" }} value="Category"> Category</option>
        <option style={{ background: "white", color: "black", textAlign: "left" }} value="Sub Category">Sub Category</option>
      </select>

      {SuperCat && (
        <form class="row g-3 pt-3 shadow p-3 mt-4" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
          <div class="col-md-7">
            <label for="inputEmail4" class="form-label txt-input">Main Category <span className="text-danger"></span></label>
            <input type="text" class="form-control" id="inputEmail4" placeholder="Enter main category.." onChange={(e) => { setData({ ...data, superCatName: e.target.value, Type: "Super_Cat" }) }} />
          </div>

          <div class="col-md-6">
            <label for="formFile" class="form-label txt-input">Upload File <span className="text-danger"></span></label>
            <input class="form-control" type="file" id="formFile" onChange={(e) => {
              handleImageChange(e);
            }} />
            {selectedImage && (
              <div>
                <img src={selectedImage} className="m-1" alt="Selected" style={{ maxWidth: '100%', maxHeight: '33px' }} />
              </div>
            )}
          </div>

          <div class="col-md-12 " style={{ marginTop: 20 }}>
            <button type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }}>Submit</button>
          </div>

        </form>
      )}

      {Cat && <form class="row g-3 pt-3 shadow p-3 mt-4" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
        <div class="col-md-6">
          <div class="col-md-4">
            <label for="inputState" class="form-label txt-input">Category <span className="text-danger"></span></label><br></br>
            <select name="" id="" style={{ width: "200px", backgroundColor: "#dce1e5", color: "black" }} className="btn btn-secondary border-0"

            >
              <option style={{ background: "white", color: "black" }} value="">--Select Category--</option>
              {
                AllSuperCat.map((item) => {
                  return (<>
                    <option class="dropdown-item" href="#" style={{ background: "white", color: "black", textAlign: "left" }} onClick={(e) => { setData({ ...data, parentId: item._id, parentName: item.name }); document.getElementById("selectedItemDisplay1").textContent = item.name; }}>{item.name}</option>
                  </>)
                })
              }
            </select>
          </div>
          <br />
          <input type="text" class="form-control" id="inputEmail4" placeholder="Enter category.." onChange={(e) => setData({ ...data, name: e.target.value, Type: "Cat" })} />
        </div>

        <div class="col-md-6">
          <label for="formFile" class="form-label txt-input">Upload File <span className="text-danger"></span></label>
          <input class="form-control" type="file" id="formFile" onChange={(e) => {
            handleImageChange(e);
          }} />
          {selectedImage && (
            <div>
              <img src={selectedImage} className="mx-1 mt-1" alt="Selected" style={{ maxWidth: '100%', maxHeight: '33px' }} />
            </div>
          )}
        </div>

        <div class="col-md-12 " style={{ marginTop: 20 }}>
          <button type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} onClick={(e) => { SaveCAt(e) }}>Submit</button>
        </div>
      </form>}

      {SubCat && <form class="row g-3 pt-3 shadow p-3 mt-4" style={{ padding: 20, backgroundColor: "#f7f6ed" }} >
        <div class="col-md-6">
          <div class="col-md-4">
            <label for="inputState" class="form-label txt-input">Sub Category <span className="text-danger"></span></label><br />
            <select name="" id="" style={{ width: "200px", backgroundColor: "#dce1e5", color: "black" }} className="btn btn-secondary border-0"
              onChange={(e) => {
                const selectedValue = e.target.value;
                setData({ ...data, superCatName: selectedValue, Type: "Sub_cat" });
                console.log("ok");
                getCat(AllSuperCat.find(item => item.name === selectedValue)._id);
              }}
            >
              <option style={{ background: "white", color: "black", }} value="">Sub Category</option>
              {
                AllSuperCat.map((item) => {
                  return (<>

                    <option style={{ background: "white", color: "black", textAlign: "left" }} class="dropdown-item" href="#" value={item.name} onChange={(e) => getCat(item._id)}>{item.name}</option>
                  </>)
                })
              }
            </select>

            <br /><br />

            <select name="" id="" style={{ width: "200px", backgroundColor: "#dce1e5", color: "black" }} className="btn btn-secondary border-0"
            >
              <option style={{ background: "white", color: "black" }} value=""> Category</option>
              {
                AllCat.map((item) => {
                  return (<>
                    <option class="dropdown-item" href="#" style={{ background: "white", color: "black", textAlign: "left" }} onClick={(e) => { setData({ ...data, parentId: item._id, parentName: item.name }); }}>{item.name}</option>
                  </>)
                })
              }
            </select>

          </div>
          <br />
          <input type="text" class="form-control" id="inputEmail4" placeholder="Enter sub category.." onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>

        <div class="col-md-6">
          <label for="formFile" class="form-label txt-input">Upload File <span className="text-danger"></span></label>
          <input class="form-control" type="file" id="formFile" onChange={(e) => {
            handleImageChange(e);
          }} />
          {selectedImage && (
            <div>
              <img src={selectedImage} className="mx-1 mt-1" alt="Selected" style={{ maxWidth: '100%', maxHeight: '33px' }} />
            </div>
          )}
        </div>

        <div class="col-md-12 " style={{ marginTop: 20 }}>
          <button type="submit" class="btn btn-primary shadow border-0 p-2 fw-bold" style={{ backgroundColor: "#e67929", width: 100, }} onClick={(e) => { SaveCAt(e) }}  >Submit</button>
        </div>
      </form>}


    </div>
  );
};

export default Category;
