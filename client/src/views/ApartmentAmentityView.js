import React from 'react';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let {apartment, limit = 3} = this.props;
    let amentities = [];
    apartment.amenities.map((item, index) => {
      if (index < limit) {
        amentities.push(<span className="_1h9l4w0vvX6d56ZnJ3NLod"><i></i><span>{item}</span></span>);
      }
    });
    return amentities
  }
}
