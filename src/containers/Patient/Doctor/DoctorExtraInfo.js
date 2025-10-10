

import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorExtraInfo.scss"
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowHideDetaiInfor: false
        }
    }


    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    handleChangeShowHide = (status) => {
        this.setState({
            isShowHideDetaiInfor: status
        })
    }

    render() {
        let { isShowHideDetaiInfor } = this.state
        return (

            <div className='doctor-schedule-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng Khám Chuyên Khoa Da Liễu</div>
                    <div className='detail-address'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <hr />
                <div className='content-down'>
                    {isShowHideDetaiInfor === false &&
                        <div className='short-infor'>
                            GIÁ KHÁM: 250.000. <span onClick={() => this.handleChangeShowHide(true)}>Xem chi tiết</span>
                        </div>
                    }

                    {isShowHideDetaiInfor === true &&
                        <>
                            <div className='title-price'>Giá khám:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000Đ</span>
                                </div>
                                <div className='note'>
                                    Được ưu tiên khám trước khi đạt khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
                                </div>
                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán chi phí  bằng hình thức tiền mặt và quẹt thẻ</div>
                            <div className='hide-price'><span onClick={() => this.handleChangeShowHide(false)}>Ẩn bảng giá</span></div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
