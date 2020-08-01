import React, { useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';

const style = {
  display: "flex",
  listStyle: "none",
  height: 50,
  margin: 8,
  padding: 8

};

const breachStyle1 = {
  marginRight: 32
}

const breachStyle2 = {
  marginRight: 64
}

function Post(props) {
  const [visible, setVisible] = useState(() => {
  const localData = localStorage.getItem('popUp');
    return localData? JSON.parse(localData) : false;
  });
  var key = 0;

useEffect(() => {
  localStorage.setItem('popUp', JSON.stringify(visible))
}, [visible])


  const openModal = () => {
    setVisible(true);
  }

  const closeModal = () => {
    setVisible(false);
  }

    return(
      <div>
      <div key={key++}>
        <ul style={style}>
          <li style={breachStyle1}><img src={props.logo} height="30" width="80"/></li>
          <li style={breachStyle2}>
          <div onClick={openModal} value={props.title}>{props.title}</div>
            <Modal visible={visible} width="400" height="700" effect="fadeInUp" onClickAway={closeModal}>
                <div>
                    <h1>Title:</h1><p>{props.title}</p>
                    <h4>Description:</h4><p> {props.path}</p>
                    <a onClick={closeModal}>Close</a>
                </div>
            </Modal>
          </li>
          <li>{props.date}</li>
        </ul>
      </div>
    </div>
    )
}

export default Post;
