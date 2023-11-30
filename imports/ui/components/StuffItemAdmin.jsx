import React from 'react';
import PropTypes from 'prop-types';

const StuffItemAdmin = ({ stuff }) => (
  <tr>
    <td>{stuff.name}</td>
    <td>{stuff.quantity}</td>
    <td>{stuff.condition}</td>
    <td>{stuff.owner}</td>
  </tr>
);

StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
