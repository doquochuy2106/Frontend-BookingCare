
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManageClinic.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            address: ''

        }
    }


    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeName = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handelOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleOnchangeMarkdown = ({ text, html }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleSave = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })

        if (res && res.errCode === 0) {
            toast.success("Create a Clinic Success!")
            this.setState({
                name: '',
                imageBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                address: ''
            })
        }
        else {
            toast.error("Error from Server!")
        }
    }


    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>
                    Quản lý phòng khám
                </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type={'text'}
                            value={this.state.name}
                            onChange={(event) => { this.handleOnchangeName(event, 'name') }}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type={'file'}
                            onChange={(event) => { this.handelOnchangeImage(event) }}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type={'text'}
                            value={this.state.address}
                            onChange={(event) => { this.handleOnchangeName(event, 'address') }}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleOnchangeMarkdown}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-new-specialty' onClick={() => { this.handleSave() }}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
