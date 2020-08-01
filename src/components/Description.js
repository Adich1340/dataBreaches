
import React from 'react';

function Description (props) {

return (
    <div>    
        <h1>Title:</h1><p>{props.title}</p>
        <h4>Description:</h4><p> {props.path}</p>     
    </div>  
);

}

export default Description;
