import React from 'react';
import { Map, Marker } from 'google-maps-react';

export default function MapContainer(props) {
  const { lat, lng, venueAddress } = props;
  return (
    <Map
      google={window.google}
      center={{
        lat: lat || 37.3382,
        lng: lng || -121.8863
      }}
      zoom={10}
    >
      {lat && lng ? (
        <Marker title={venueAddress} position={{ lat, lng }} />
      ) : null}
    </Map>
  );
}
