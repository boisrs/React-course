import { useEffect, useState } from "react";

function BasicForm (){
    const [name, setName]=useState('');
    const handleSubmit = (e)=>{
        alert(`Name Send ${name}`)
    }
    return(
        <div>
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder="Put your name"></input>
            <button type="submit">Send Data</button>
          </form>
        </div>
    )
}
///---------------NEXT--------------------///
const MultipleInputsForm =()=>{
    const [Formdata,setFormdata]=useState({
        firstName: "",
        lastName: "",
        email:"",
    })
    const handleChange = (e)=>{
        const {name,value}= e.target;
        setFormdata((Formdata)=>({
           ...Formdata,
           [name]:value, 
        }))
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        alert(`Name send ${JSON.stringify(Formdata)}`)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}  name="firstName" placeholder="Name"></input>
                <input onChange={handleChange}  name="lastName" placeholder="Lastname"></input>
                <input onChange={handleChange}  name="email" placeholder="Email"></input>
                <button type="submit">Send data</button>
            </form>
        </div>
    )
}
const SelectandRadio = ()=>{
    const [selectFruits,setselectFruits]=useState('');
    const [gender,setGender]=useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <select value={setselectFruits} onChange={(e)=>setselectFruits(e.target.value)}>

                    <option value="">Chose Fruits</option>
                    <option value="Apple">Apple</option>
                    <option value="Banana">Banana</option>
                    <option value="Orange">Orange</option>
                </select>
                {selectFruits && (<h4>All Fruits: {selectFruits}</h4>)}
                <div>
                    <input onChange={(e)=>setGender(e.target.value)} type="radio" id="male" name="gender" value="male"></input>
                    <label>Male</label>
                    <input onChange={(e)=>setGender(e.target.value)} type="radio" id="Female" name="gender" value="Female"></input>
                    <label>Female</label>
                </div>
                {gender && <h4>Your gender: {gender}</h4>}
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
const ProductSearch = ()=>{
    const [sortOder, setSortOrder] = useState ("asc");
    const [priceFilter, setPriceFilter] = useState({min: "", max: ""})
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 2;
    const [results, setResults] = useState([
        {
            id: 1, name: "Phone number", price: 5
        },
        {
            id: 2, name: "Laptop", price: 700
        },
        {
            id: 3, name: "Airpods", price: 50
        },
        {
            id: 4, name: "camera", price: 300
        },
        {
            id: 5, name: "TWS", price: 100
        },
        

        
    ]);
    const product =[
        {
            id: 1, name: "Phone number", price: 5
        },
        {
            id: 2, name: "Laptop", price: 700
        },
        {
            id: 3, name: "Airpods", price: 50
        },
        {
            id: 4, name: "camera", price: 300
        },
        {
            id: 5, name: "TWS", price: 100
        },
    ];

    useEffect(() =>{
        handleSearch();
    },[sortOder, priceFilter, currentPage]);
    
    const handleSearch = () => {
        let filterProducts = product.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (priceFilter.min !== ""){
            filterProducts = filterProducts.filter(
                (product) => product.price >= parseInt(priceFilter.min)
            );
        }
        if (priceFilter.max !== ""){
            filterProducts = filterProducts.filter(
                (product) => product.price >= parseInt(priceFilter.max)
            );
        }
filterProducts.sort((a,b) =>{
    return sortOder === "asc" ? a.price - b.price : b.price - a.price;
});
        setResults(filterProducts);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }
    
    const handlepriceFilterChange = (e) => {
        setPriceFilter({...priceFilter,[e.target.name]: [e.target.value]});
    };
    // ການແບ່ງຫນ້າ
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(results.length / itemPerPage);
    return(
        <div>
            <form onSubmit={(e) =>{
               e.preventDefault();
                handleSearch();
            }}>
                <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
                <button type="submit">Search</button>
            </form>
            <div>
                <label>ຈັດລຽງຕາມລາຄາ: <select onChange={handleSortChange}>
                    <option value="asc">Price (Low To High)</option>
                    <option value="desc">Price (High To Low)</option>
                </select>
                </label>
            </div>
            <div>
                <label>Minimun Price: <input 
                type="number" 
                name="min"
                value={priceFilter.min}
                onChange={handlepriceFilterChange}></input> 
                </label>   
            </div>
            <div> 
            <label>Maximum Price: <input 
                type="number" 
                name="max"
                value={priceFilter.max}
                onChange={handlepriceFilterChange}></input> 
                </label>
            </div>
            <ul>
                    {currentItems.map((product, index) =>
                        <li key={product.id}>
                            {index + 1}. {product.name}, Price: {product.price} LAK
                        </li>
                    )}
                </ul>
            <div>

                <button
                onClick={() => 
                    setCurrentPage((prev) => Math.min(prev -1,1)) 
                }
                disabled={currentPage === 1}
                >prev</button>
                <span>Page {currentPage} form {totalPages}</span>
                <button
                onClick={() => 
                    setCurrentPage((prev) => Math.min(prev +1,totalPages)) 
                }
                disabled={currentPage === totalPages}
                >Next</button>
            </div>
        </div>
    )
}

const Day6 =()=>{
    return(
        <div className="container">
            <p>hello day 6</p>
            <h1></h1>
            <BasicForm></BasicForm>
            <h2>Form Input</h2>
            <MultipleInputsForm></MultipleInputsForm>
            <h2>radio and Dropdown</h2>
            <SelectandRadio></SelectandRadio>
            <h2>ProductSearch</h2>
            <ProductSearch></ProductSearch>
            <style jsx>
                {`
                .container{
                max-width:800px;
                margin:0 auto;
                padding:20px;
                }
                form{
                margin-bottom:20px;
                }
                input,select{
                margin:10px 0;
                padding:10px;
                border-radius:4px;
                border:1px solid #ddd;
                font-size:16px;
                border-radius:5px;
                }
                button{
                background-color:brown;
                border-radius:20px;
                box-shadow:5px 5px rgba(0,0,0,0.3);
                padding:10px 20px;
                margin:5px;
                font-size:15px;
                color:white;
                border:none;
                cursor:pointer;
                transition:background-color 0.3s;
                }
                .error {
                color: red;
                font-size: 20px;
                }
                ul{
                list-style-type: none;
                padding: 0;
                }
                li {
                margin: 5px 0;
                padding: 5px;
                background-color: #f0f0f0;
                border-radius: 3px;
                }
            `}
            </style>
        </div>
    )
}

export default Day6;