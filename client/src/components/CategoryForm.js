import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNewCategory, startLoading } from 'actions/category';
import Button from './styled/Button';
import Title from './styled/Title';
import Wrapper from './styled/Wrapper';
import { FormWrapper, StyledForm, FormField } from './styled/Form';
import Input from './styled/Input';
import getDataUrl from '../utils/getDataUrl';



const CategoryForm = props => {
    const [name, setName] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [fileInputState, setFileInputState] = useState('');

    const handleChange = e => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            previewFile(file);
            setFileInputState(e.target.value);
        } else {
            setName(e.target.value);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.startLoading();
        props.createNewCategory(name, coverPhoto);
        setName('');
        setCoverPhoto('');
        setFileInputState('')
    }

    const previewFile = async file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        }
    }


    return (
        <Wrapper color='white'>
            <FormWrapper width='80%'>
                <Title>Create New Category</Title>
                <StyledForm onSubmit={handleSubmit} data-testid='categoryForm'>
                    <FormField>
                        <Input
                            placeholder='Category name'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </FormField>
                    <FormField>
                        <Input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder="Upload an image"
                            required
                            value={fileInputState}
                        />
                    </FormField>
                    <Button type='submit' marginTop='3%' margin='auto'>{props.loading ? 'UPLOADING...' : 'SAVE'}</Button>
                </StyledForm>
                {coverPhoto && (
                    <div data-testid='preview'>
                        <video
                            src={coverPhoto}
                            alt="chosen"
                            style={{ height: '200px' }}
                        />
                    </div>
                )}
            </FormWrapper>
        </Wrapper>
    )
}

const mapStateToProps = state => ({
    loading: state.category.loading
})

export default connect(mapStateToProps, { createNewCategory, startLoading })(CategoryForm);