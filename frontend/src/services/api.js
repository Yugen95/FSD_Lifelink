import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Donor APIs
export const registerDonor = (donorData) => API.post('/donors/register', donorData);
export const getAllDonors = () => API.get('/donors');
export const getDonorById = (id) => API.get(`/donors/${id}`);
export const checkEligibility = (donorId) => API.post(`/donors/${donorId}/check-eligibility`);
export const scheduleDonation = (donorId, data) => API.post(`/donors/${donorId}/schedule-donation`, data);

// Blood Unit APIs
export const createBloodUnit = (unitData) => API.post('/blood-units/create', unitData);
export const getAvailableUnits = (bloodGroup) => API.get(`/blood-units/available/${bloodGroup}`);
export const updateTestingStatus = (unitId, status) => API.patch(`/blood-units/${unitId}/test-status`, { testingStatus: status });

// Emergency Request APIs
export const createEmergencyRequest = (requestData) => API.post('/emergency-requests/create', requestData);
export const getAllRequests = () => API.get('/emergency-requests');

export default API;