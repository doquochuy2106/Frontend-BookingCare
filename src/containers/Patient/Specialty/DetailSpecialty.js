
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./DetailSpecialty.scss"
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetaiSpecialty, getAllcodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';






class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataSpecialty: {},
            listProvince: []
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getAllDetaiSpecialty({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllcodeService("PROVINCE")

            if (res && res.errCode === 0 && resProvince.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: "All",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc",
                        createdAt: null,
                    })
                }

                this.setState({
                    dataSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    handleOnchangeProvince = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value

            let res = await getAllDetaiSpecialty({
                id: id,
                location: location
            })



            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataSpecialty: res.data,
                    arrDoctorId: arrDoctorId
                })
            }

        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    render() {
        let { arrDoctorId, dataSpecialty, listProvince } = this.state
        let { language } = this.props
        console.log("check state: ", this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>

                        {dataSpecialty && !_.isEmpty(dataSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => { this.handleOnchangeProvince(event) }}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriuptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        // dataScheduleTime={dataScheduleTime}
                                        />
                                    </div>

                                    <div className='dt-content-right'>
                                        <div className='doctor-shedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
