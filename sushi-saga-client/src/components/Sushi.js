import React, { Fragment } from 'react'

sushi = (props) => {

    let sushi = this.props.sushi
    return (
      <div className="sushi">
        <div className="plate" 
             onClick={props.eatSushi}>
          { this.state.eaten ? null : <img src={sushi.img_url} width="100%" /> }
        </div>
        <h4 className="sushi-details">
          {sushi.name} - ${sushi.price}
        </h4>
      </div>
    )
    
}

export default Sushi