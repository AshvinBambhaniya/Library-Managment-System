import React, { useContext } from 'react'
import bookContext from '../context/books/bookContext';

const IssueBooksitem = (props) => {
    const context = useContext(bookContext);

    const { book,updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ border: "none", backgroundColor: "#042743" }}>
                <div className="card-body" style={{ backgroundColor: 'rgb(42 52 60)', borderRadius: "10px", border: "1px solid white" }}>
                    <div className="d-flex align-items-center card-text">
                        <h5 className="card-text text-center mb-2">{book.book}</h5>
                        <button className='btn btn-outline-primary mx-3 btn-sm' onClick={() => { updateNote(book) }}>Request</button>

                        {/* <i style={{ cursor: "pointer" }} className="far fa-trash-alt mx-2" onClick={() => {
                            deleteNote(note._id)
                        }}></i> */}
                        {/* <i style={{ cursor: "pointer" }} className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i> */}
                    </div>
                    <p className="card-text">Auther: {book.auther}</p>
                    <p className="card-text">Publisher: {book.publisher}</p>
                    <p className="card-text">IssueDate: {new Date(book.date).getDate()}-{new Date(book.date).getMonth()}-{new Date(book.date).getFullYear()} </p>
                    <p className="card-text">Time: {new Date(book.date).getHours()}:{new Date(book.date).getMinutes()}:{new Date(book.date).getSeconds()}</p>
                </div>
            </div>
        </div>
    )
}

export default IssueBooksitem
