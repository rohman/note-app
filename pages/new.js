import Link from 'next/link'
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
                // alert('Sucess SUbmit');
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createNote =  async () => {
        try {
            const res = await fetch('https://note-app-teal.vercel.app/api/notes',{
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    'Content-type': "application/json"
                },
                body: JSON.stringify(form)
            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};
        if (!form.title) {
            err.title = 'Title is Required';
        }

        if (!form.description) {
            err.description = 'Description is Required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline="centered" />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please input title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Description'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please input description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button primary type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;