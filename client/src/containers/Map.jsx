import React, { Component } from 'react';
import {
  Map, InfoWindow, Marker, GoogleApiWrapper
} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const { lat, lng, venueAddress } = this.props;
    return (
      <Map
        google={this.props.google}
        center={{
          lat: lat || 37.3382,
          lng: lng || -121.8863
        }}
        zoom={10}
      >
        {lat && lng ? (
          <Marker title={venueAddress} name="SOMA" position={{ lat, lng }} />
        ) : null}
      </Map>
    );
  }
}

const LoadingContainer = props => <div>Loading...</div>;

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
  LoadingContainer
})(MapContainer);
