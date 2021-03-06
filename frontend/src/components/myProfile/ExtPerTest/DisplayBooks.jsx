import React from 'react';
import BookIcon from '@mui/icons-material/Book';
import Book from '@mui/icons-material/Book';

const DisplayBooks = (props)=>{
    return(
        <div style = {MainStyle}>
            <div style = {{display: 'flex'}}>
                <BookIcon sx = {{color: '#daa520'}}/>
            </div>
            <div style = {TextStyle}>
                <p style = {{fontWeight: 'bold', margin: 0, fontSize: 15, fontFamily: 'monospace'}}>{props.book.mapValue.fields.title.stringValue}</p>
                <p style = {{margin: 0, fontSize: 12}}>{props.book.mapValue.fields.author.stringValue}</p>
            </div>
        </div>
    )
}

const MainStyle = {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 12,
    padding: 3,
    borderRadius: 9
    
}

const TextStyle = {
    display: 'flex',
    width: 'fitContent',
    flexDirection: 'column'
}

export default DisplayBooks;