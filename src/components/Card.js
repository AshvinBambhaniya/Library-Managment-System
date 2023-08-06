import React from 'react'

const Card = (props) => {
    return (
        <div className="col-md-4 my-3">
            <div className="card text-center" style={{ backgroundColor: 'rgb(42 52 60)' }}>
                <img src={props.imgUrl} className="card-img-top" alt="..." />
                <div className="card-body " >
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a target="_blank" rel="noreferrer" href={props.sheetUrl} className="btn btn-sm btn-outline-primary">Book List</a>
                </div>
            </div>
        </div >

    )
}

export default Card
