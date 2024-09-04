import axios from 'axios';

const fetchGeoLocation = async ({
  selectedCity,
  selectedCountry,
  apiKey,
}: {
  selectedCity: string;
  selectedCountry: string;
  apiKey: string;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedCountry},${selectedCity}&key=${apiKey}`,
      );

      const location = response.data.results[0].geometry.location;
      const coords = {
        latitude: location.lat,
        longitude: location.lng,
      };

      resolve({
        ...coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error fetching the geo-location:', error);
      reject();
    }
  });
};

export {fetchGeoLocation};
