import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  console.log(10, id)
  const [AllSuperCat, setAllSuperCat] = useState([]);
  const [AllCat, setAllCat] = useState([]);
  const [AllSubCat, setAllSubCat] = useState([]);
  const [AllCatData, setAllCatData] = useState([]);
  const [AllBrands, setAllBrands] = useState([]);
  const [data, setData] = useState({
    name: "",
    short_desc: "",
    long_desc: "",
    additional_info: "",
    ship_policy: "",
    price: "",
    sale_price: "",
    sku: "",
    Collection_Name: "",
    installation_method: "",
    thickness: "",
    wear_layer_thickness: "",
    width: "",
    length: "",
    review: "",
    ratings: "",
    stock: "",
    BestSeller: "",
    newProduct: "",
    IsmostViewed: "",
    isDiscount: "",
    featured: "",
    sold: "",
    SuperCatID: "",
    SuperCatName: "",
    CatID: "",
    CatName: "",
    SubCatID: "",
    SubCatName: "",
    BrandID: "",
    BrandName: "",
    BoxPrice: "",
    BoxCoverage: "",
    isAddon: "",
    productPictures: "",
    color: "",
    createdBy: "",
    updatedAt: "",
  });
  const [productPictures, setproductPictures] = useState([])
  const [formValue, setFormValue] = useState(data);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInput = (e) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(69, data)
    setErrors(Validation(data))
    const err = Validation(data)
    setErrors(true)
    console.log(69, err)
    if (Object.keys(err).length == 0) {
      {
        axios
          .post("http://174.138.112.6/api/product/create", data)
          .then((response) => {
            const products = response.data;
            console.log(77, products.product._id)
            uploadProductPic(products.product._id)
            toast.success('Form Submitted !');
          })
          .catch((error) => { console.log(error) });
      }
    } else {
      setErrors(err)
      console.log(err)
      toast.warn('Please fill all feilds.')
    }
  }

  const uploadProductPic = (id) => {
    const formData = new FormData();
    productPictures.forEach((file, index) => {
      formData.append(`productPictures`, file);
    });
    axios
      .put(
        `http://174.138.112.6/api/product/files/${id}`,
        formData
      )
      .then((res) => console.log("Files", res.data))
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
        setAllSuperCat(Allsupcat);
      })
      .catch((err) => { console.log(err) })

    axios.get("http://174.138.112.6/api/brand/getAll")
      .then((res) => {
        const response = res.data
        console.log(response);
        setAllBrands(response)
      })
      .catch((err) => { console.log(err) })
  }, [])

  const Validation = (values) => {
    const errors = {};
    const regex = "^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$";
    if (!values.name) {
      errors.name = "Please enter product name. ";
    }

    if (!values.sku) {
      errors.sku = " Feild cannot be blank.";
    }
 
    if (!values.short_desc) {
      errors.short_desc = "Description is required.";
    }

    if (!values.price) {
      errors.price = "Please enter price. ";
    }

    if (!values.BoxPrice) {
      errors.BoxPrice = "Please enter box price. ";
    }

    if (!values.BoxCoverage) {
      errors.BoxCoverage = "Feild cannot be blank. ";
    }

    if (!values.sale_price) {
      errors.sale_price = "Feild cannot be blank. ";
    }

    if (!values.stock) {
      errors.stock = "Feild cannot be blank. ";
    }

    if (!values.Collection_Name) {
      errors.Collection_Name = "Feild cannot be blank. ";
    }

    if (!values.installation_method) {
      errors.installation_method = "Feild cannot be blank. ";
    }

    if (!values.thickness) {
      errors.thickness = "Feild cannot be blank. ";
    }

    if (!values.wear_layer_thickness) {
      errors.wear_layer_thickness = "Feild cannot be blank. ";
    }

    if (!values.width) {
      errors.width = "Feild cannot be blank. ";
    }

    if (!values.length) {
      errors.length = "Feild cannot be blank. ";
    }

    // if (!values.BestSeller) {
    //   errors.BestSeller = "Feild cannot be blank. ";
    // }

    // if (!values.IsmostViewed) {
    //   errors.IsmostViewed = "Feild cannot be blank. ";
    // }

    // if (!values.isDiscount) {
    //   errors.isDiscount = "Feild cannot be blank. ";
    // }

    // if (!values.SuperCatID) {
    //   errors.SuperCatID = "Feild cannot be blank. ";
    // }

    // if (!values.CatName) {
    //   errors.CatName = "Feild cannot be blank. ";
    // }

    // if (!values.SubCatID) {
    //   errors.SubCatID = "Feild cannot be blank. ";
    // }

    // if (!values.SuperCatName) {
    //   errors.SuperCatName = "Please Select main category. ";
    // }

    // if (!values.SubCatName) {
    //   errors.SubCatName = "Feild cannot be blank. ";
    // }

    // if (!values.BrandName) {
    //   errors.BrandName = "Please Select brand . ";
    // }

    // if (!values.newProduct) {
    //   errors.newProduct = "Feild cannot be blank. ";
    // }

    // if (!values.CatName) {
    //   errors.CatName = " Please Select category.  ";
    // }

    // if (!values.SuperCatName) {
    //   errors.SuperCatName = "Please Select main category. ";
    // }

    // if (!values.SubCatName) {
    //   errors.SubCatName = "Please Select sub category.  ";
    // }

    // if (!values.color) {
    //   errors.color = " Please select colour  ";
    // }

    return errors;
  };

  const getCat = (id) => {
    const getCat = AllCatData.filter((item) => item.parentId == id)
    setAllCat(getCat);
  }
  
  const getSubCat = (id) => {
    console.log(291, id)
    const getSubCat = AllCatData.filter((item) => item.parentId == id)
    console.log(getSubCat)
    setAllSubCat(getSubCat);
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(300, files)
    setproductPictures([...files]);
  }

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagePreviewArray = [];
    for (let i = 0; i < files.length; i++) {
      const productPictures = files[i];
      const objectURL = URL.createObjectURL(productPictures);
      imagePreviewArray.push(objectURL);
    }
    setImagePreviews(imagePreviewArray);
  };

  useEffect(() => {
    axios.get(`http://174.138.112.6/api/product/${id}`)
      .then((res) => {
        const response = res.data.product
        console.log(278, response)
        setData({
          name: response.name,
          slug: response.slug,
          short_desc: response.short_desc,
          long_desc: response.long_desc,
          additional_info: response.additional_info,
          ship_policy: response.ship_policy,
          price: response.price,
          sale_price: response.sale_price,
          sku: response.sku,
          Collection_Name: response.Collection_Name,
          installation_method: response.installation_method,
          thickness: response.thickness,
          wear_layer_thickness: response.wear_layer_thickness,
          width: response.width,
          length: response.length,
          review: response.review,
          ratings: response.ratings,
          stock: response.stock,
          BestSeller: response.BestSeller ? "true" : "false",
          newProduct: response.newProduct ? "true" : "false",
          IsmostViewed: response.IsmostViewed ? "true" : "false",
          isDiscount: response.isDiscount ? "true" : "false",
          featured: response.featured,
          sold: response.sold,
          SuperCatID: response.SuperCatID,
          SuperCatName: response.SuperCatName,
          CatID: response.CatID,
          CatName: response.CatName,
          SubCatID: response.SubCatID,
          SubCatName: response.SubCatName,
          BrandID: response.BrandID,
          BrandName: response.BrandName,
          isAddon: response.isAddon,
          BoxPrice: response.BoxPrice,
          BoxCoverage: response.BoxCoverage,
          color: response.color,
        })
        console.log(317, response)
      })
      .catch((err) => { console.log(err) })
  }, [id]);

  const updateFormData = (e) => {
    axios.put(`http://174.138.112.6/api/product/update/${id}`, data)
      .then((res) => {
        const response = res.data
        console.log(response)
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div  >
      <h2 className="mb-5">Product Form</h2>
      <form class="row g-3 pt-3 shadow p-3 mb-5" style={{ padding: 20, backgroundColor: "#f7f6ed" }} onSubmit={Validation}>

        <div class="col-md-4">
          <label for="inputEmail4" class="form-label txt-input">Product Name <span className="text-danger">*</span></label>
          <input type="text" class="form-control" value={data.name} id="inputEmail4" onChange={(e) => {
            setData({ ...data, name: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.name.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.name}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Installation Method <span className="text-danger">*</span></label>
          <input type="text" class="form-control" value={data.installation_method} id="inputCity" onChange={(e) => {
            setData({ ...data, installation_method: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.installation_method.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.installation_method}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Price <span className="text-danger">*</span></label>
          <input type="number" class="form-control" value={data.price} id="inputCity" onChange={(e) => {
            setData({ ...data, price: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.price.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.price}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Sale Price <span className="text-danger">*</span></label>
          <input type="number" class="form-control" id="inputCity" value={data.sale_price} onChange={(e) => {
            setData({ ...data, sale_price: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.sale_price.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.sale_price}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Stock <span className="text-danger"></span></label>
          <input type="number" class="form-control" value={data.stock} id="inputZip" onChange={(e) => {
            setData({ ...data, stock: e.target.value });
            handleInput(e);
          }} />
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Box Price <span className="text-danger">*</span></label>
          <input type="number" class="form-control" id="inputZip" value={data.BoxPrice} onChange={(e) => {
            setData({ ...data, BoxPrice: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.BoxPrice.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.BoxPrice}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Box Coverage <span className="text-danger">*</span></label>
          <input type="number" value={data.BoxCoverage} class="form-control" id="inputZip" onChange={(e) => {
            setData({ ...data, BoxCoverage: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.BoxCoverage.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.BoxCoverage}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Rating <span className="text-danger"></span></label>
          <input type="number" class="form-control" id="inputZip" value={data.ratings} onChange={(e) => {
            setData({ ...data, ratings: e.target.value });
            handleInput(e);
          }} />
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Review <span className="text-danger"></span></label>
          <input type="number" class="form-control" id="inputZip" value={data.review} onChange={(e) => {
            setData({ ...data, review: e.target.value });
            handleInput(e);
          }} />
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">Collection Name <span className="text-danger">*</span></label>
          <input type="text" class="form-control" value={data.Collection_Name} id="inputZip" onChange={(e) => {
            setData({ ...data, Collection_Name: e.target.value });
            handleInput(e);
          }} />

          {errors.name && data.Collection_Name.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.Collection_Name}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4 ">
          <label for="floatingSelect " class="col-form-label  pt-0 txt-input">New Product <span className="text-danger">*</span></label>
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example" value={data.newProduct} onChange={(e) => {
            let selectedValue = e.target.value;
            if (selectedValue === "true") {
              setData({ ...data, newProduct: true });
              console.log(442, selectedValue)
              console.log(442, data)
            } else if (selectedValue === "false") {
              setData({ ...data, newProduct: false });
              console.log(442, selectedValue)
            } else {
              setData({ ...data, newProduct: null });
            }
          }}>
            <option value="">  --Select--</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {/* {errors.name && data.newProduct === null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.newProduct}
            </p>
          ) : (
            ""
          )} */}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Thickness <span className="text-danger">*</span></label>
          <input type="text" class="form-control" value={data.thickness} id="inputCity" onChange={(e) => {
            setData({ ...data, thickness: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.thickness.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.thickness}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4 ">
          <label for="floatingSelect1" class="col-form-label  pt-0 txt-input">Discount <span className="text-danger">*</span></label>
          <select class="form-select" id="floatingSelect1" aria-label="Floating label select example" value={data.isDiscount} onChange={(e) => {

            let selectedValue = e.target.value;

            if (selectedValue === "true") {
              setData({ ...data, isDiscount: true });
            } else if (selectedValue === "false") {
              setData({ ...data, isDiscount: false });
            } else {
              setData({ ...data, isDiscount: null });
            }
          }}>
            <option value="">  --Select--</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {/* {errors.name && data.isDiscount ===null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.isDiscount}
            </p>
          ) : (
            ""
          )} */}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Wear Layer Thickness <span className="text-danger">*</span></label>
          <input type="number" class="form-control" value={data.wear_layer_thickness} id="inputCity" onChange={(e) => {
            setData({ ...data, wear_layer_thickness: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.wear_layer_thickness.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.wear_layer_thickness}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Width <span className="text-danger">*</span></label>
          <input type="number" class="form-control" value={data.width} id="inputCity" onChange={(e) => {
            setData({ ...data, width: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.width.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.width}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="floatingSelect1" class="col-form-label  pt-0 txt-input">Best Seller <span className="text-danger">*</span></label>
          <select class="form-select" id="floatingSelect1" aria-label="Floating label select example" value={data.BestSeller} onChange={(e) => {

            let selectedValue = e.target.value; // Get the selected value

            if (selectedValue === "true") {
              setData({ ...data, BestSeller: true });
            } else if (selectedValue === "false") {
              setData({ ...data, BestSeller: false });
            } else {
              setData({ ...data, BestSeller: null }); // Handle other cases if needed
            }
          }}>
            <option value="">  --Select--</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {/* {errors.name && data.BestSeller ===null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.BestSeller}
            </p>
          ) : (
            ""
          )} */}
        </div>

        <div class="col-md-4">
          <label for="inputCity" class="form-label txt-input">Length <span className="text-danger">*</span></label>
          <input type="number" class="form-control" value={data.length} id="inputCity" onChange={(e) => {
            setData({ ...data, length: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.length.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.length}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="inputZip" class="form-label txt-input">SKU <span className="text-danger">*</span></label>
          <input type="number" class="form-control" value={data.sku} id="inputZip" onChange={(e) => {
            setData({ ...data, sku: e.target.value });
            handleInput(e);
          }} />
          {errors.name && data.sku.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.sku}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-3">
          <label for="inputState" class="form-label txt-input">Main Category <span className="text-danger">*</span></label><br />
          <select name="" id="" style={{ width: "200px", backgroundColor: "#e7e7e7", color: "black", }} className="btn btn-secondary border-0"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const id = AllCatData.find(item => item.name === selectedValue)._id;
              setData({ ...data, SuperCatName: selectedValue, SuperCatID: id });
              console.log(932, id);
              getCat(id);
            }}
          >
            <option style={{ background: "white", color: "black", }} value="">Select Category</option>
            {
              AllSuperCat.map((item) => {
                return (<>

                  <option style={{ background: "white", color: "black", textAlign: "left" }} class="dropdown-item" href="#" value={item.name} onChange={(e) => getCat(item._id)}>{item.name}</option>
                </>)
              })
            }
          </select>
          {errors.name && data.SuperCatName.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.SuperCatName}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-3">
          <label for="inputCity" class="form-label txt-input ">Category <span className="text-danger">*</span></label><br />
          <select name="" id="" style={{ width: "200px", backgroundColor: "#e7e7e7", color: "black" }} className="btn btn-secondary border-0"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const id = AllCatData.find(item => item.name === selectedValue)._id;
              console.log(963, id)
              setData({ ...data, CatName: selectedValue, CatID: id });
              getSubCat(id);
            }}
          >
            <option style={{ background: "white", color: "black" }} value="">Select Category</option>
            {
              AllCat.map((item) => {
                return (<>
                  <option class="dropdown-item" href="#" style={{ background: "white", color: "black", textAlign: "left" }} value={item.name}>{item.name}</option>
                </>)
              })
            }
          </select>

          {errors.name && data.CatName.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.CatName}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-3">
          <label for="inputCity" class="form-label txt-input">Sub Category <span className="text-danger">*</span></label><br />
          <select name="" id="" style={{ width: "200px", backgroundColor: "#e7e7e7", color: "black", }} className="btn btn-secondary border-0"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const id = AllCatData.find(item => item.name === selectedValue)._id;
              setData({ ...data, SubCatName: selectedValue, SubCatID: id });
            }}
          >
            <option style={{ background: "white", color: "black", }} value="">Select Category</option>
            {
              AllSubCat.map((item) => {
                return (<>

                  <option style={{ background: "white", color: "black", textAlign: "left" }} class="dropdown-item" href="#" value={item.name} >{item.name}</option>
                </>)
              })
            }
          </select>

          {errors.name && data.SubCatName.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.SubCatName}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-3">
          <label for="inputCity" class="form-label txt-input">Brand Name <span className="text-danger">*</span></label><br />
          <select name="" id="" style={{ width: "200px", backgroundColor: "#e7e7e7", color: "black" }} className="btn btn-secondary border-0"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const id = AllBrands.find(item => item.brand_name === selectedValue)._id;
              setData({ ...data, BrandName: selectedValue, BrandID: id });
              console.log("ok");
            }}
          >
            <option style={{ background: "white", color: "black", }} value="">Select Category</option>
            {
              AllBrands.map((item) => {
                return (<>
                  <option style={{ background: "white", color: "black", textAlign: "left" }} class="dropdown-item" href="#" value={item.brand_name} onChange={(e) => getCat(item._id)}>{item.brand_name}</option>
                </>)
              })
            }
          </select>
          {errors.name && data.BrandName.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.BrandName}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-md-4">
          <label for="floatingSelect1" class="col-form-label  pt-0 txt-input">Most Viewed <span className="text-danger">*</span></label>
          <select class="form-select" id="floatingSelect1" aria-label="Floating label select example" value={data.IsmostViewed} onChange={(e) => {
            let selectedValue = e.target.value;
            if (selectedValue === "true") {
              setData({ ...data, IsmostViewed: true });
            } else if (selectedValue === "false") {
              setData({ ...data, IsmostViewed: false });
            } else {
              setData({ ...data, IsmostViewed: null });
            }
          }}>
            <option value="">  --Select--</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {/* {errors.name && data.IsmostViewed === null ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.IsmostViewed}
            </p>
          ) : (
            ""
          )} */}
        </div>

        <div class="col-lg-4">
          <label for="exampleFormControlTextarea1" class="form-label txt-input">Short Description <span className="text-danger">*</span></label>
          <textarea class="form-control" id="exampleFormControlTextarea1" value={data.short_desc} rows="2" onChange={(e) => {
            setData({ ...data, short_desc: e.target.value });
            handleInput(e);
          }}></textarea>
          {errors.name && data.short_desc.length <= 0 ? (
            <p
              className="text-danger"
              style={{ fontSize: "14px" }}
            >
              {errors.short_desc}
            </p>
          ) : (
            ""
          )}
        </div>

        <div class="col-4">
          <label for="exampleFormControlTextarea1" class="form-label txt-input">Long Description</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" value={data.long_desc} rows="2" onChange={(e) => {
            setData({ ...data, long_desc: e.target.value });
            handleInput(e);
          }}></textarea>
        </div>

        <div class="col-4">
          <label for="exampleFormControlTextarea1" class="form-label txt-input">Additional info</label>
          <textarea class="form-control" value={data.additional_info} id="exampleFormControlTextarea1" rows="2" onChange={(e) => {
            setData({ ...data, additional_info: e.target.value });
            handleInput(e);
          }}></textarea>
        </div>

        <div class="col-md-6">
          <label for="formFileMultiple" class="form-label txt-input">Upload Pictures / Files <span className="text-danger"></span></label>
          <input class="form-control" name="productPictures" value={data.productPictures} type="file" accept="image/png, image/jpeg, video/*" id="formFileMultiple" multiple onChange={(e) => {
            handleFileChange(e)
            console.log(863, productPictures);
            handleImageChange(e);
          }} />

          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} className="mx-1 mt-1" alt="" style={{ height: "30px" }} />
          ))}
        </div>

        <div class="col-md-2">
          <label for="exampleColorInput" class="form-label txt-input">Colour </label>
          <input type="color" class="form-control form-control-color colorrrs" id="exampleColorInput" value={data.color} onChange={(e) => {
            setData({ ...data, color: e.target.value });
            handleInput(e);
          }} />
        </div>

        <div class="col-md-12 text-center" style={{ marginTop: 40 }}>
          {
            id ? (<>
              <button href="/admin/ProductList" type="" class="btn btn-primary fw-bold shadow border-0 p-2" style={{ backgroundColor: "#e67929", width: 120 }} onClick={(e) => { handleFormSubmit(e); updateFormData(e); }}>Update </button>
            </>) : (<>
              <button type="" class="btn btn-primary fw-bold shadow border-0 p-2" style={{ backgroundColor: "#e67929", width: 115, }} onClick={(e) => { handleFormSubmit(e); }}>Submit</button>
            </>)
          }
        </div>

      </form>
    </div>
  );
};

export default Products;
