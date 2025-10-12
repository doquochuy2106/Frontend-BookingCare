
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ProfileDoctor.scss"
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';




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


    render() {
        let { dataProfileDoctor } = this.state
        let { language } = this.props
        console.log("check state: ", this.state)

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
                            {dataProfileDoctor && dataProfileDoctor.Markdown && dataProfileDoctor.Markdown.description &&
                                <span>{dataProfileDoctor.Markdown.description}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
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
