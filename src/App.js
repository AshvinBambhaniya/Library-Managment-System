import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from './components/Login';
import Home from './components/Home';
import Books from './components/Books';
import Message from './components/Message';
import BookState from './context/books/BookState';
import IssueBooks from './components/IssueBooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const host = process.env.REACT_APP_HOST_URL;

  const showAlert = (message, type) => {

    if (type === 'success') {
      toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      })
    }

    if (type === 'danger') {
      toast.error(message, {
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      })
    }

    if (type === 'Info') {
      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1500)
        }), {
        pending: message
      }, {
        position: "top-center",
        autoClose: 1500,
        theme: "dark"
      }
      )
    }


  }

  document.body.style.backgroundColor = '#042743'

  return (
    <>
      <BookState showAlert={showAlert} host={host}>
        <Router>
          <Navbar showAlert={showAlert} />
          {/* <Alert alert={alert} /> */}
          <div className="container mt-5">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login host={host} showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup host={host} showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/bookslist" element={<Books />} />
              <Route exact path="/allissuebook" element={<IssueBooks showAlert={showAlert} />} />
            </Routes>
          </div>
          <ToastContainer />
        </Router>
      </BookState>
    </>
  );
}

export default App;
