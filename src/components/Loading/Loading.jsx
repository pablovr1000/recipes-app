import React from 'react';

import rockGlass from '../../images/rockGlass.svg';
import './loading.scss';

export default function Loading() {
  return (
    <div className="meals">
      <span className="logo">Loading</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}
