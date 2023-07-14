import React from "react";
import '../css/Image.css';

const Image = ({id, tag, url}) => {
  const classname = `disp-img_${tag}`
  return (
    <div id={id} className={classname} >
      <img src={url} alt="" />
    </div>
  )
};

Image.propTypes = {
};

export default Image;