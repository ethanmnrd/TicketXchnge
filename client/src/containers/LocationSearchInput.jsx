// @flow

import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default function LocationSearchInput(props) {
  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.handleLocationChange}
      onSelect={props.handleLocationSelect}
      searchOptions={{
        location: new google.maps.LatLng(37.3382, -121.8863),
        radius: 16000,
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'us' }
      }}
      googleCallbackName="initPlacesAutocomplete"
    >
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading
      }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Addresses ...',
              className: 'form-control'
            })}
          />
          <div
            className="autocomplete-dropdown-container"
            style={{ position: 'absolute', zIndex: '1' }}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = {
                backgroundColor: suggestion.active ? '#fafafa' : '#fff',
                cursor: 'pointer'
              };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
