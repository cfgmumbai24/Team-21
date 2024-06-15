import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [file, setFile] = useState();
  const [certificate, setCertificate] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const interests = ["Sports", "Music", "Reading", "Traveling"];
  const languages = ["English", "Spanish", "French", "German"];

  const formik = useFormik({
    initialValues: {
      fullname: apiData?.firstName || '',
      age: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
      district: apiData?.district || '',
      state: apiData?.state || '',
      familyIncome: apiData?.familyIncome || '',
      currentEducation: apiData?.currentEducation || '',
      interest: apiData?.interest || '',
      language: apiData?.language || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '', certificate });

      // Make a POST request to the backend
      try {
        await axios.post('http://localhost:8080/api/students/create', values);
        toast.success('Update Successfully...!');
        if (certificate) {
          toast.success('Certificate uploaded successfully!');
        }
      } catch (error) {
        toast.error('Could not Update!');
      }
    }
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const onCertificateUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setCertificate(base64);
  };

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center min-h-screen'>
        <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2 w-full">
          <div className="text-center">
            <h4 className='text-5xl font-bold'>Student Profile</h4>
            <p className='py-4 text-xl text-gray-500'>
              You can update the details.
            </p>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='flex justify-center py-4'>
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className="w-32 h-32 rounded-full border-4 border-blue-500"
                  alt="avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' className="hidden" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full gap-5">
                <input {...formik.getFieldProps('fullname')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Full Name' />
                <input {...formik.getFieldProps('age')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Age' />
              </div>

              <div className="flex w-full gap-5">
                <input
                  {...formik.getFieldProps('mobile')}
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  placeholder='Mobile No.'
                  pattern="\d*"
                  inputMode="numeric"
                  onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                />
              </div>


              <input {...formik.getFieldProps('email')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Email*' />

              <input {...formik.getFieldProps('address')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Address' />

              <div className="flex w-full gap-5">
                <input {...formik.getFieldProps('district')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='District' />
                <input {...formik.getFieldProps('state')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='State' />
              </div>

              <input {...formik.getFieldProps('familyIncome')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Family Income (must be less than 3 lakh)' />

              <input {...formik.getFieldProps('currentEducation')} className="w-full p-2 border border-gray-300 rounded" type="text" placeholder='Current Education' />

              <select {...formik.getFieldProps('interest')} className="w-full p-2 border border-gray-300 rounded">
                <option value="">Select interest</option>
                {interests.map((interest, index) => (
                  <option key={index} value={interest}>{interest}</option>
                ))}
              </select>

              <select {...formik.getFieldProps('language')} className="w-full p-2 border border-gray-300 rounded">
                <option value="">Select language</option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>

              {/* Certificate upload input */}
              <div className="w-full p-2 border border-gray-300 rounded">
                <label htmlFor="certificate" className="block text-gray-700">
                  Upload Certificate
                </label>
                <input onChange={onCertificateUpload} type="file" id='certificate' name='certificate' className="block w-full text-gray-700" />
              </div>

              <button className="w-full p-2 bg-blue-500 text-white rounded" type='submit'>Update</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500'>Logout</button></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
