import React, { useContext, useEffect, useRef, useState } from 'react'
import IssueBooksitem from './IssueBooksitem'
import bookContext from '../context/books/bookContext';
import { useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";

const IssueBooks = (props) => {
    const context = useContext(bookContext);
    const { books, getBooks, getUser, addBook, deleteBook, user_details, editBook } = context;

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


    const ref = useRef(null)
    const refClose = useRef(null)
    const form = useRef();

    const [done, setDone] = useState(false)


    const sendEmail = (e) => {
        e.preventDefault();
        props.showAlert("Please Wait...", "Info")

        if (book.user_request !== "Renew" && book.user_request !== "Return") {
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
                        if (book.user_request === "Renew") {
                            console.log("Renew book");
                            editBook(book.id, book.user_book, book.user_auther, book.user_publisher)
                        }
                        if (book.user_request === "Return") {
                            console.log("deleted book");
                            deleteBook(book.id);
                        }
                        navigate('/');
                    },
                    (error) => {
                        console.log(error.text);
                        // props.showAlert("Request Rejected", "danger")
                    }
                );
        }
    };

    const [book, setBook] = useState({ id: "", user_book: "", user_auther: "", user_publisher: "", user_request: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setBook({
            ...book,
            id: currentNote._id,
            user_book: currentNote.book,
            user_auther: currentNote.auther,
            user_publisher: currentNote.publisher,

        })
    }


    const onChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value })
    }

    return (
        <div className="row my-3 text-light">
            <h2 className='text-center'>Your Books</h2>
            <div className="container mx-2">
                {books.length === 0 && 'No books to display'}
            </div>
            {books.map((book) => {
                return <IssueBooksitem updateNote={updateNote} key={book._id} book={book} />
            })}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: 'rgb(42 52 60)' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Fill Form for issue Return or Renewal book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-light' id='message'>
                                <form ref={form} onSubmit={sendEmail} className="row g-3 my-2" id="my-form">
                                    <div className="col-md-6 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Enrollment</label>
                                        <input type="number" name="user_enrollment" value={user_details.enrollment} className="form-control" id="exampleInputNumber1" aria-describedby="emailHelp" placeholder='Enter Your Enrollment' required />
                                    </div>
                                    <div className="col-md-6 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" name="user_name" value={user_details.name} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder='Enter Your name' required />
                                    </div>
                                    <div className="col-md-8 d-none">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name="user_email" value={user_details.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='example@gmail.com' required />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="inlineFormSelectPref">Request Type</label>
                                        <select name="user_request" className="form-select mt-2" id="inlineFormSelectPref" value={book.user_request} onChange={onChange} required>
                                            <option selected >Choose...</option>
                                            <option value="Renew">Renew</option>
                                            <option value="Return">Return </option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 d-none">
                                        <label htmlFor="inputCity" className="form-label">Book Name</label>
                                        <input type="text" name="user_book" className="form-control" id="exampleInputBook1" aria-describedby="emailHelp" placeholder='Enter Book Name' value={book.user_book} required />
                                    </div>
                                    <div className="col-md-4 d-none">
                                        <label htmlFor="inputState" className="form-label">Auther</label>
                                        <input type="text" name="user_auther" className="form-control" id="exampleInputAuther1" aria-describedby="emailHelp" placeholder='Enter Auther Name' value={book.user_auther} required />
                                    </div>
                                    <div className="col-md-2 d-none">
                                        <label htmlFor="inputZip" className="form-label">Publisher</label>
                                        <input type="text" name="user_publisher" className="form-control" id="exampleInputPublisher1" aria-describedby="emailHelp" placeholder='Enter Publisher Name' value={book.user_publisher} required />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="floatingTextarea2" className="form-label">Message</label>
                                        <textarea name="message" className="form-control" placeholder="Leave a Message here" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""} />
                                        <div id="emailHelp" className="form-text text-light">All fields are compulsory</div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" value="Send" className="btn btn-outline-light btn-sm">Submit</button>
                                        <button ref={refClose} type="button" className="btn btn-outline-danger btn-sm mx-2" data-bs-dismiss="modal">Close</button>
                                        <br />
                                        <span>{done && "Congrats! Your request has been submit"}</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default IssueBooks
