import { useState } from "react";
import BookContext from "./bookContext";

const BookState = (props) => {
    const host = "http://localhost:5000"
    const booksInitial = []
    const userInitial = null

    const [books, setBooks] = useState(booksInitial)
    const [user, setUser] = useState(userInitial)
    const [user_details, setUser_details] = useState({})

    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        const nameLetter = json.name.split(" ");
        let FSname = ""
        for (let index = 0; index < nameLetter.length && index < 2; index++) {
            FSname = FSname.concat(nameLetter[index].charAt(0))
        }
        FSname = FSname.toUpperCase();
        setUser(FSname)
        console.log(json);
        setUser_details(json)
    }

    const removeUser = async () => {
        setUser(null)
    }

    const getBooks = async () => {
        const response = await fetch(`${host}/api/book/fetchallbook`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setBooks(json)
    }

    const addBook = async (book, auther, publisher) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/book/addbook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ book, auther, publisher })
        });

        if (response.status === 201) {
            props.showAlert("Issue successfully", "success")
        } else {
            props.showAlert("Request Rejected", "danger")
        }
    }

    const editBook = async (id, book, auther, publisher) => {
        // API Call 
        const response = await fetch(`${host}/api/book/updatebook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ book, auther, publisher })
        });

        if (response.status === 201) {
            props.showAlert("Renew successfully", "success")
        } else {
            props.showAlert("Request Rejected", "danger")
        }
    }

    const deleteBook = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/book/deletebook/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        if (response.status === 201) {
            props.showAlert("Return successfully", "success")
        } else {
            props.showAlert("Request Rejected", "danger")
        }
    }

    return (
        <BookContext.Provider value={{ books, setBooks, user, setUser, removeUser, getUser, getBooks, addBook, deleteBook, user_details, editBook }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState
