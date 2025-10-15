import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data)
}

const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", { data: { id: userId } })
}

const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData)
}

const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDocTorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookApointMent = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllcodeService, getTopDoctorHome, getAllDoctors, saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleByDate, getExtraInforDocTorById,
    getProfileDoctorById, postPatientBookApointMent
}

