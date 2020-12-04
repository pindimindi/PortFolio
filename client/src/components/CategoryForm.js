import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNewCategory, startLoading } from '../actions/category';
import Button from './styled/Button';
import Title from './styled/Title';
import Wrapper from './styled/Wrapper';
import { FormWrapper, StyledForm, FormField, FormInput } from './styled/Form';



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

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        }
    }
    return (
        <Wrapper>
            <FormWrapper width='80%'>
                <Title>Create New Category</Title>
                <StyledForm onSubmit={handleSubmit}>
                    <FormField>
                        <FormInput
                            placeholder='Category name'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </FormField>
                    <FormField>
                        <FormInput
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder="Upload an image"
                            required
                            value={fileInputState}
                        />
                    </FormField>
                    <Button type='submit' marginTop='3%'>{props.loading ? 'UPLOADING...' : 'SAVE'}</Button>
                </StyledForm>
                {coverPhoto && (
                    <div>
                        <img
                            src={coverPhoto}
                            alt="chosen"
                            style={{ height: '200px' }}
                        />
                    </div>
                )}
            </FormWrapper>
        </Wrapper>

        // <div className='form-holder'>
        //     <h2 className='title-lg'>Create New Category</h2>
        //     <form onSubmit={handleSubmit} className='auth-form'>
        //         <div className='form-field'>
        //             <input className='no-border'
        //                 placeholder='Category name'
        //                 type='text'
        //                 name='name'
        //                 value={name}
        //                 onChange={handleChange}
        //                 required />
        //         </div>
        //         <div className='form-field'>
        //             <input
        //                 type="file"
        //                 name="image"
        //                 onChange={handleChange}
        //                 placeholder="Upload an image"
        //                 required
        //                 value={fileInputState}
        //             />
        //         </div>
        //         <div className='button-holder'>
        //             <button type='submit' className='button-oval button-yellow'>{props.loading ? '...LOADING' : 'CREATE'}</button>
        //         </div>
        //         {coverPhoto && (
        //             <div>
        //                 <img
        //                     src={coverPhoto}
        //                     alt="chosen"
        //                     style={{ height: '200px' }}
        //                 />
        //             </div>
        //         )}
        //     </form>
        // </div>
    )
}

const mapStateToProps = state => ({
    loading: state.category.loading
})

export default connect(mapStateToProps, { createNewCategory, startLoading })(CategoryForm);