import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'


class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Đỗ Quốc Huy
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/2BOvMHv6M_M"
                            title="GIẢI MÃ SỨC MẠNH CÁC ĐỘI TUYỂN TẠI MSI 2025: GEN.G - ỨNG CỬ VIÊN SỐ 1 CHO NGÔI VƯƠNG"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Công nghệ thông tin (CNTT) là ngành học ứng dụng máy tính và công nghệ phần mềm để thu thập, lưu trữ, xử lý, truyền tải và phân phối thông tin, đóng vai trò thiết yếu trong mọi lĩnh vực của đời sống hiện đại, từ kinh tế, giáo dục đến y tế và sản xuất. Ngành này mang đến nhiều cơ hội việc làm hấp dẫn, đồng thời đòi hỏi người lao động phải liên tục học hỏi, cập nhật công nghệ mới để thích ứng với tốc độ phát triển chóng mặt của lĩnh vực này.  </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
