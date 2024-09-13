import React, { useState } from "react";

// Functional counter component
const FucntionalCounter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 0) {
      alert("Count cannot be less than 0");
    } else {
      setCount(count - 1);
    }
  };
  return (
    <div className="counter">
      <h2>This is functional counter</h2>
      <p>Value: {count}</p>
      <button onClick={handleIncrement}>Add</button>
      <button onClick={handleDecrement}>Minus</button>
    </div>
  );
};

// Class component
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, inputValue: '' };
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
    
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count > 0 ? prevState.count - 1 : prevState.count, 
    }));
    
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSetValue = () => {
    const newValue = parseInt(this.state.inputValue, 10);
    if (!isNaN(newValue)) {
      this.setState({ count: newValue });
    } else {
      alert("Please enter number");
    }
  };

  handleClear = () => {
    this.setState({ count: 0, inputValue: '' });
  };

  render() {
    return (
      <div className="counter">
        <h2>This is ClassCounter</h2>
        <p>Value: {this.state.count}</p>
        <button className="add-btn" onClick={this.handleIncrement}>Add</button>
        <button className="add-btn" onClick={this.handleDecrement}>Minus</button>
        <button1 className="add-btn" onClick={this.handleClear}>Clear</button1>
        <input
          type="number"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Enter a number"
        />
        <button2 className="add-btn" onClick={this.handleSetValue}>Set Value</button2>
        
      </div>
    );
  }
}

const BolgPost = (props) => {
  const [like, setLike] = useState(0);
  return(
    <div>
      <h1> {props.title}</h1>
      <p></p>
      <button3
        onClick={() =>{
          setLike(like + 1);
        }}>
        <img width={50} height={50} src="https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png">
        </img>
        <h1>ຢ່າງຫລິ້ນແຄມຂອງ</h1>
        <p>ເຈົ້າສາມາດຫາປະສົບການຢ່າງຫລິ້ນຢູ່ແຄມຂອງໄດ້</p>
      </button3>
      <h2>{like}</h2>
    </div>
  )
}
// product component
const ProductComp = () => {
  return(
    <div className="product-card">
      <p>Product component</p>
    </div>
  );
}

// Main Component
const Day2 = () => {
  const title = "This is title"
  const content = "This is content"
  return (
    <div className="app">
      <FucntionalCounter />
      <ClassCounter />
      <hr></hr>
      ສ້າງໂພສບົດຄວາມໂດຍມີຊື່ຜູ້ຂຽນ
      <BolgPost 
        title={title}
        content={content}
      ></BolgPost>
      <ProductComp></ProductComp>
      <style jsx>
        {`
          .app {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          .counter {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 15px;
            box-shadow: 4px 3px rgba(0, 0, 0, 0.3);
          }
          button1 {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 15px;
            box-shadow: 4px 3px rgba(0, 0, 0, 0.3);
          }
          button2 {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4caf50;
            color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 15px;
            box-shadow: 4px 3px rgba(0, 0, 0, 0.3);
            font-weight: bold; /* Make the text bold */
          }
          // button3 {
          //   padding: 10px 20px;
          //   font-size: 16px;
          //   background-color: #4caf50;
          //   color: white;
          //   border: none;
          //   border-radius: 5px;
          //   cursor: pointer;
          //   transition: background-color 0.3s;
          //   margin: 15px;
          //   box-shadow: 4px 3px rgba(0, 0, 0, 0.3);
          // }
          button + button {
            background-color: orange;
          }
          button1 {
            background-color: red;
          }
          button2 {
            background-color: #00ff80;
          }
          input {
            padding: 10px;
            font-size: 16px;
            margin: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
          }
          .product-card{
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
        `}
      </style>
    </div>
  );
};

export default Day2;
