

import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss"
import moment from 'moment';
import localization from 'moment/locale/vi'

import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';





class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            arrAvalableTime: [],

        }
    }


    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }
    }

    capitallizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitallizeFirstLetter(labelVi)
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object)
        }
        return allDays


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language)
            console.log('allDays: ', allDays)
            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                arrAvalableTime: res.data ? res.data : []
            })
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
                        <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                    </div>
                    <div className='time-content'>
                        {arrAvalableTime && arrAvalableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {arrAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? "btn-vie" : "btn-en"}>{timeDisplay}</button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id="patient.detail-doctor.choose" /> <i class="fas fa-hand-pointer"></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
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
