import { useState } from "react";

// SampleList Component
const SampleList = () => {
    const fruits = ["Coconut", "Apple", "Orange", "Banana"];
    
    return (
        <div>
            <h2>Fruits</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{index + 1}. {fruit}</li>
                ))}
            </ul>
        </div>
    );
};

// ASEANCountries Component
const ASEANCountries = () => {
    const countries = ["LAOS", "THAILAND", "VIETNAM", "CAMBODIA", "MYANMAR", "SINGAPORE", "INDONESIA", "MALAYSIA", "PHILIPPINES", "BRUNEI"];

    return (
        <div>
            <h2>ASEAN Countries</h2>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>{index + 1}. {country}</li>
                ))}
            </ul>
        </div>
    );
};

// StudentList Component
const StudentList = () => {
    const students = [
        { name: "Nami", class: "C1", gender: "MALE" },
        { name: "Meji", class: "A1", gender: "MALE" },
        { name: "Naomi", class: "A1", gender: "FEMALE" }
    ];

    return (
        <div>
            <h2>List of Students</h2>
            <ul>
                {students
                    .filter(student => student.class === 'A1' && student.gender === "FEMALE")
                    .map((student, index) => (
                        <li key={index}>
                            {index + 1}. {student.name} Class: {student.class} Gender: {student.gender}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

// TodoList Component
const TodoList = () => {
    const [todos, setTodos] = useState([
        { text: 'Learn React', completed: false },
        { text: 'Create To-do app', completed: false },
        { text: 'Training List & Keys', completed: false }
    ]);
    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (index) => {
        setTodos(todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <form onSubmit={addTodo}>
                <input 
                    type="text" 
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="New todo" 
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: 'pointer' }}
                        onClick={() => toggleTodo(index)}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ImageCarousel Component
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel">
            <h2>Image Carousel</h2>
            <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
            {images.map((image, index) => (
                <img
                    src={image}
                    key={index}
                    alt={`Slide ${index + 1}`}
                    className={`carousel-image ${index === currentIndex ? "active" : ""}`}
                />
            ))}
            <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

// Day5 Component
const Day5 = () => {
    const carouselImages = [
        "https://saigontourism.com.vn/wp-content/uploads/2017/12/Patuxay-Monument-Vientiane-Laos-2.jpg",
        "https://thumbs.dreamstime.com/b/patuxai-patyxay-patuxay-laos-landmark-gate-95776211.jpg",
        "https://www.publicdomainpictures.net/pictures/340000/velka/patuxai-victory-gate-vientiane-laos-1588676405dcx.jpg"
    ];

    return (
        <div className="container">
            <p>Hello Day 5</p>
            <hr />
            <SampleList />
            <hr />
            <ASEANCountries />
            <hr />
            <StudentList />
            <hr />
            <TodoList />
            <hr />
            <ImageCarousel images={carouselImages} />
            <hr />
            <style jsx>
                {`
                    .container {
                        max-width: 600px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-height: 100vh;
                        background-color: white;
                        padding: 20px;
                        margin: 0 auto;
                        text-align: start;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        margin-bottom: 10px;
                        padding: 20px;
                        background-color: #f0f0f0;
                        border-radius: 5px;
                    }
                    hr {
                        color: black;
                        width: 100%;
                    }
                    .carousel {
                        position: relative;
                        width: 100%;
                        height: auto;
                    }
                    .carousel-image {
                        display: none;
                        width: 100%;
                        height: auto;
                    }
                    .carousel-image.active {
                        display: block;
                    }
                    .carousel-button {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: rgba(0, 0, 0, 0.5);
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        cursor: pointer;
                        font-size: 18px;
                    }
                    .prev {
                        left: 10px;
                    }
                    .next {
                        right: 10px;
                    }
                `}
            </style>
        </div>
    );
};

export default Day5;
