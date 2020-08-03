import React from 'react';

const style = {
  display: "flex",
  listStyle: "none",
  height: 50,
  margin: 8,
  padding: 8

};

const breachStyle1 = {
  marginRight: 35
}

const breachStyle2 = {
  marginRight: 50
}

export default function Post({ onClick, post }) {
 
  const { LogoPath, Title, BreachDate } = post;

    return(
      <div>
      <div >
        <ul style={style}>
          <li style={breachStyle1}><img src={LogoPath} height="30" width="80"/></li>
          <li style={breachStyle2}>
            <div onClick={onClick} value={Title}>{Title}</div>
          </li>
          <li>{BreachDate}</li>
        </ul>
      </div>
    </div>
    )
}