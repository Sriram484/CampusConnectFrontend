import { Rate } from 'antd'
import React from 'react'
import "../Assets/CSS/CourseMainBodyLikeThisCard.css"

const CourseMainBodyLikeThisCard = ({
    Image,
    Course_Name,
    Course_Author,
    Ratings,
    NoOfCustomers,
    time,
    Price
}) => {
    return (
        <div className='CourseMainBodyLikeThisCard-Container'>

            <div className='CourseMainBodyLikeThisCard-Img'>
                <img src={`${Image}`} alt="" />
            </div>
            <div className='CourseMainBodyLikeThisCard-Header'>
                {Course_Name.length > 30 ? `${Course_Name.slice(0, 30)}...` : Course_Name}
            </div>
            <div className="CourseMainBodyLikeThisCard-Author">
                {Course_Author.length > 30 ? `${Course_Author.slice(0, 30)}...` : Course_Author}
            </div>
            <div className='CourseMainBodyLikeThisCard-Rating'>
                <span style={{ fontWeight: "700" }}>{Ratings}</span>
                <Rate allowHalf value={Ratings} disabled style={{ fontSize: "14px" }} />
                <span style={{ marginLeft: "10px" }}>({NoOfCustomers})</span>

            </div>
            <div className='CourseMainBodyLikeThisCard-Time'>
                {20} total hours
            </div>
            <div className='CourseMainBodyLikeThisCard-Price'>
                ${Price}
            </div>

        </div>
    )
}

export default CourseMainBodyLikeThisCard
