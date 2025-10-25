
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ProfileDoctor.scss"
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';




class profileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfileDoctor: {}
        }
    }


    async componentDidMount() {
        let data = await this.getInforDoctorById(this.props.doctorId)
        this.setState({
            dataProfileDoctor: data
        })
    }

    getInforDoctorById = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getProfileDoctorById(this.props.doctorId)
        }
    }

    capitallizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataScheduleTime) => {
        let { language } = this.props

        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            let time = language === LANGUAGES.VI
                ?
                dataScheduleTime.timeTypeData.valueVi
                :
                dataScheduleTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI
                ?
                moment.unix(+dataScheduleTime.date / 1000).format('dddd-DD/MM/YYYY')
                :
                moment.unix(+dataScheduleTime.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>

    }


    render() {
        let { dataProfileDoctor } = this.state
        let { language, isShowDescriuptionDoctor, dataScheduleTime, isShowLinkDetail, isShowPrice, doctorId } = this.props
        console.log("check props: ", dataScheduleTime)

        let nameVi = '', nameEn = ''
        if (dataProfileDoctor && dataProfileDoctor.positionData) {
            nameVi = `${dataProfileDoctor.positionData.valueVi}, ${dataProfileDoctor.lastName} ${dataProfileDoctor.firstName}`;
            nameEn = `${dataProfileDoctor.positionData.valueEn}, ${dataProfileDoctor.firstName} ${dataProfileDoctor.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfileDoctor && dataProfileDoctor.image ? dataProfileDoctor.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriuptionDoctor === true
                                ?
                                <>
                                    {dataProfileDoctor && dataProfileDoctor.Markdown && dataProfileDoctor.Markdown.description &&
                                        <span>{dataProfileDoctor.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataScheduleTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }

                {isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfileDoctor && dataProfileDoctor.Doctor_Infor && language === LANGUAGES.VI
                            &&
                            <NumberFormat
                                className='currency'
                                value={dataProfileDoctor.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        }

                        {dataProfileDoctor && dataProfileDoctor.Doctor_Infor && language === LANGUAGES.EN
                            &&
                            <NumberFormat
                                className='currency'
                                value={dataProfileDoctor.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
                }


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

export default connect(mapStateToProps, mapDispatchToProps)(profileDoctor);
