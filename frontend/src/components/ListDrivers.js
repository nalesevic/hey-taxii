import React from 'react';

const ListDrivers = ({drivers, deleteDriver}) => {

  const driverList = drivers.length ? (
    drivers.map(driver => {
      return (
        <div className="collection-item" key={driver._id}>
          <span onClick={() => {deleteDriver(driver._id)}}>{driver.first_name}</span>
        </div>
      )
    })
  ) : (
    <p className="center">No registered drivers</p>
  );
  return (
    <div className="driverss collection">
      {driverList}
    </div>
  )
}
export default ListDrivers;