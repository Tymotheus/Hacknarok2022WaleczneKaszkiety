const baseUrl = "http://172.20.15.67:8000";

// export const getAllDevices = async (id) => {
//   const response = axios.post(`${baseUrl}/citizenly_endpoints/devices/by-location/`, {location_id: id});
//   console.log(response);
//   return response.data;
// };

export const getAllDevices = async (id) => {
  fetch(`${baseUrl}/citizenly_endpoints/devices/by-location/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({ location_id: 1 }),
  }).then(response => response.json())
  .then(data => console.log(data));
};
