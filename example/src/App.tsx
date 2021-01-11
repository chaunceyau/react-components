import * as React from 'react'

import {
  Form,
  FormInput,
  FormUpload,
  FormToggle,
  FormRadioGroup
} from '@chaunceyau/react-components'

import './assets/generated/style.css'
import '@chaunceyau/react-components/dist/index.css'

const App = () => {
  async function onSubmit(data: any) {
    // call mutation here
    await new Promise((res) => {
      setTimeout(() => {
        console.log(data)
        res(data)
      }, 2500)
    })
  }

  const onDelete = React.useCallback(() => {}, [])
  const onUploadComplete = React.useCallback(async () => {
    // await new Promise((res, rej) => setTimeout(() => res({}), 1000));
    return {}
  }, [])

  const options = React.useMemo(
    () => [
      {
        id: '9ca87723-6c2c-434c-8572-0d64864825f6',
        name: 'Monthly Subscription',
        description: '$5/mo'
      },
      {
        id: 'b5173512-423e-458d-b55c-151647652dc7',
        name: 'Yearly Subscription',
        description: '$45/yr'
      }
    ],
    []
  )

  const defaults = React.useMemo(
    () => ({
      firstName: 'austin',
      lastName: 'chauncey',
      allowNotifications: true,
      profilePhoto: [
        {
          id: '8cd306aa-9fe1-445b-bb45-56e49786a317',
          fileName: 'interesting.png',
          status: 'IDLE'
        },
        {
          id: '84282870-fbeb-47df-a05b-b5924586a634',
          fileName: 'another.pdf',
          status: 'IDLE'
        }
      ]
    }),
    []
  )
  return (
    <div className='max-w-2xl mx-auto py-8'>
      <Form
        styled
        onSubmit={onSubmit}
        defaultValues={defaults}
        title='User Information'
        description='Basic information about user'
      >
        <FormInput
          name='firstName'
          label='First Name'
          registerOptions={{
            minLength: { value: 2, message: 'Length must be at least 2' },
            required: true
          }}
        />
        <FormInput
          name='lastName'
          label='Last Name'
          registerOptions={{ required: 'You must provide information' }}
        />
        <FormToggle
          name='allowNotifications'
          label='Allow Notifications'
          description='This will allow mobile phone notifications'
        />
        <FormRadioGroup
          variableName='subscriptionType'
          label='Subscription Type'
          options={options}
        />
        <FormUpload
          name='profilePhoto'
          label='Profile Photo'
          onDeleteMutation={onDelete}
          onUploadComplete={onUploadComplete}
          multiple={true}
        />
      </Form>
    </div>
  )
}

export default App
