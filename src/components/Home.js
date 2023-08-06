import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";
import bookContext from '../context/books/bookContext';
import emailjs from "@emailjs/browser";

const Home = (props) => {

    const context = useContext(bookContext);
    const { addBook, deleteBook, getUser, getBooks, user_details } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getBooks()
            getUser();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])


    const [book, setBook] = useState({ user_book: "", user_auther: "", user_publisher: "", user_request: "Issue" })

    const onChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value })
    }

    const form = useRef();
    const refClose = useRef(null)

    const [done, setDone] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
        props.showAlert("Please Wait...", "Info")

        if (book.user_request !== "Issue") {
            alert('please enter book type')
        } else {
            emailjs
                .sendForm(
                    "service_j32oteh",
                    "template_ikr6mrq",
                    form.current,
                    "7g0IPD1vDcx2-3Ctb"
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setDone(true);
                        refClose.current.click();
                        let form = document.getElementById("my-form")
                        form.reset();
                        if (book.user_request === "Issue") {
                            console.log("Issuening book");
                            addBook(book.user_book, book.user_auther, book.user_publisher);
                        }
                        navigate('/');
                        setBook({
                            ...book, user_book: "", user_auther: "", user_publisher: ""

                        })
                    },
                    (error) => {
                        console.log(error.text);
                        props.showAlert("Request Rejected", "danger")
                    }
                );
        }
    };



    return (
        <section id="home">
            <h1 className="h-primary">Welcome to Library</h1>
            <p>This is GEC Rajkot Library website for All Gecr Student.</p>
            <p>That provide online list of books Department vise and also issue, renew and return book throw this website</p>
            <div className="d-flex">
                <Link id='btnforBook' to="/bookslist" className='btn btn-lg btn-outline-light my-2'>Books List</Link>
                <Link id='btnforBook' className='btn btn-lg btn-outline-light my-2 mx-2' data-bs-toggle="modal" data-bs-target="#book_issue_modal" >Issue Book</Link>
            </div>
            <div className="modal fade text-light" id="book_issue_modal" tabIndex="-1" aria-labelledby="book_issue_modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: 'rgb(42 52 60)' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Fill Form for Issue book</h5>
                            <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-light' id='message'>
                                <form ref={form} onSubmit={sendEmail} className="row g-3 my-2" id="my-form">
                                    <div className="col-md-6 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Enrollment</label>
                                        <input type="number" value={user_details.enrollment} name="user_enrollment" className="form-control" id="exampleInputNumber1" aria-describedby="emailHelp" placeholder='Enter Your Enrollment' required />
                                    </div>
                                    <div className="col-md-6 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" name="user_name" value={user_details.name} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder='Enter Your name' required />
                                    </div>
                                    <div className="col-md-12 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name="user_email" value={user_details.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='example@gmail.com' required />
                                    </div>
                                    <div className="col-md-4 d-none">
                                        <label htmlFor="inlineFormSelectPref">Request Type</label>
                                        <select name="user_request" className="form-select mt-2" id="inlineFormSelectPref" value={book.user_request} onChange={onChange} required>
                                            {/* <option selected >Choose...</option> */}
                                            <option selected value="Issue">Issue </option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="inputCity" className="form-label">Book Name</label>
                                        <input type="text" name="user_book" className="form-control" id="exampleInputBook1" aria-describedby="emailHelp" placeholder='Enter Book Name' value={book.user_book} onChange={onChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputState" className="form-label">Auther</label>
                                        <input type="text" name="user_auther" className="form-control" id="exampleInputAuther1" aria-describedby="emailHelp" placeholder='Enter Auther Name' value={book.user_auther} onChange={onChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputZip" className="form-label">Publisher</label>
                                        <input type="text" name="user_publisher" className="form-control" id="exampleInputPublisher1" aria-describedby="emailHelp" placeholder='Enter Publisher Name' value={book.user_publisher} onChange={onChange} required />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="floatingTextarea2" className="form-label">Message</label>
                                        <textarea name="message" className="form-control" placeholder="Leave a Message here" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""} />
                                        <div id="emailHelp" className="form-text text-light">All fields are compulsory</div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" value="Send" className="btn btn-outline-light mb-3">Submit</button>
                                        <br />
                                        <span>{done && "Congrats! Your request has been submit"}</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
