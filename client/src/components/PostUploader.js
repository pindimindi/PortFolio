import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPost } from '../actions/posts';
import { startLoading } from '../actions/category';
import { StyledForm as Form, FormWrapper, FormField } from './styled/Form';
import Button from './styled/Button';
import Upload from './styled/Uploader';
import TextArea from './styled/TextArea';
import getFileType from '../utils/getFileType';
import getDataUrl from '../utils/getDataUrl';
import Wrapper from './styled/Wrapper';

const Uploader = ({ post, loading, createPost, startLoading, match }) => {
    const [dataUrl, setDataUrl] = useState('');
    const [fileType, setFileType] = useState('');
    const [description, setDescription] = useState('');
    const [inputValue, setInputValue] = useState('');

    const getFileData = async (file) => {
        const type = getFileType(file);
        const url = await getDataUrl(file);
        setFileType(type);
        setDataUrl(url);
    }

    const onSubmit = async e => {
        e.preventDefault();
        startLoading();
        const portfolioId = match.params.portfolioId;
        const postData = {
            file: dataUrl,
            description

        }
        await createPost(postData, portfolioId);

        setDescription('');
        setDataUrl('');
        setInputValue('');
    }
    console.log('file input value', inputValue)

    return (
        <Wrapper>
            <FormWrapper >
                <Form onSubmit={e => onSubmit(e)}>
                    <Button>{loading ? 'Uploading...' : 'Post'}</Button>
                    <FormField>
                        <Upload
                            type={fileType}
                            height={dataUrl ? 'auto' : '220px'}
                            url={dataUrl}
                            onChange={(e) => { setInputValue(e.target.files[0].name); getFileData(e.target.files[0]); }}
                            key={inputValue}
                        />
                    </FormField>
                    <FormField>
                        <TextArea
                            name='description'
                            rows='3'
                            placeholder='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </FormField>
                </Form>
            </FormWrapper>
        </Wrapper>
    )

};

Uploader.propTypes = {
    loading: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post.post,
    loading: state.post.loading,
});

export default connect(mapStateToProps, { createPost, startLoading })(Uploader);
