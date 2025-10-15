
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./BookingModal.scss"
import { Modal } from "reactstrap"
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions"
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookApointMent } from '../../../../services/userService';
import { toast } from 'react-toastify';




class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            gender: [],
            doctorId: '',
            timeType: ''
        }
    }


    async componentDidMount() {
        this.props.getGenderStart()
    }

    buildDataGender = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.dataScheduleTime !== this.props.dataScheduleTime) {
            if (this.props.dataScheduleTime && !_.isEmpty(this.props.dataScheduleTime)) {
                let doctorId = this.props.dataScheduleTime.doctorId
                let timeType = this.props.dataScheduleTime.timeType
                console.log("Setting state with:", { doctorId, timeType }) // Thêm log để debug
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        //invalid input

        let date = new Date(this.state.birthday).getTime()

        let res = await postPatientBookApointMent({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        })

        if (res && res.errCode === 0) {
            toast.success("Booking Patient Success!")
            this.props.handleCloseModalBoking()
        }
        else {
            toast.error("Error from server")

        }
        console.log("check state: ", this.state)
    }


    render() {
        let { isOpenModalBooking, handleCloseModalBoking, dataScheduleTime } = this.props
        let doctorId = dataScheduleTime && !_.isEmpty(dataScheduleTime) ? dataScheduleTime.doctorId : ''
        console.log("check props doquochuy: ", dataScheduleTime)
        //toggle={}
        return (
            <Modal
                isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                size='lg'
                centered
            // backdrop={true}
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span className='right' onClick={() => { handleCloseModalBoking() }}><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriuptionDoctor={false}
                                dataScheduleTime={dataScheduleTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'fullName') }}
                                />


                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'reason') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.gender}
                                />
                            </div>


                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => { this.handleConfirmBooking() }}><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                        <button className='btn-booking-cancel' onClick={() => { handleCloseModalBoking() }}><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
