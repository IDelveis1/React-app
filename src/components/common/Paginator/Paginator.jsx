import React from 'react';
import clas from './Paginator.module.css'




const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={clas.use}>
            <div>
                {pages.map(p => {
                    return <span onClick={(e) => { props.onPageChanged(p) }} className={props.currentPage === p && clas.selectedPage}>{p}</span>
                })}
            </div>
        </div>
    )
}


export default Paginator;