

import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss"
import moment from 'moment';
import localization from 'moment/locale/vi'

import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';





class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            arrAvalableTime: []
        }
    }


    async componentDidMount() {
        let { language } = this.props

        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'))
        this.setArrDays(language)
    }

    capitallizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitallizeFirstLetter(labelVi)
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }

        this.setState({
            allDays: allDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language)
        }
    }

    handleOnchangeSelect = async (event) => {
        console.log('check id: ', this.props.doctorIdFromParent)
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent != 1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    arrAvalableTime: res.data ? res.data : []
                })
            }
            console.log("check api: ", res)
        }
    }



    render() {
        let { allDays, arrAvalableTime } = this.state
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>
                        {arrAvalableTime && arrAvalableTime.length > 0 ?
                            arrAvalableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })
                            :
                            <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
