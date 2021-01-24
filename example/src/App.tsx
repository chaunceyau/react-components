import * as React from 'react'

import {
  Form,
  Slideover,
  FormInput,
  FormUpload,
  FormSelect,
  FormToggle,
  FormRadioGroup,
  SectionHeading
} from '@chaunceyau/react-components'

import './assets/generated/style.css'
import '@chaunceyau/react-components/dist/index.css'
import { FormOption } from '../../dist/components/form/elements/radio/option'

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

  const options: FormOption[] = React.useMemo(
    () => [
      {
        id: '9ca87723-6c2c-434c-8572-0d64864825f6',
        value: 'Monthly Subscription',
        description: '$5/mo'
      },
      {
        id: 'b5173512-423e-458d-b55c-151647652dc7',
        value: 'Yearly Subscription',
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

  // const [isSlideoverOpen, setIsSlideoverOpen] = React.useState(true)

  return (
    <div className='max-w-2xl mx-auto py-8'>
      <Slideover
        actions={[{ label: 'Create Example', onClick: () => {} }]}
        // onClose={() => {
        //   console.log('CLSOING')
        //   setIsSlideoverOpen(!isSlideoverOpen)
        // }}
        trigger={<button className='bg-red-500'>slideover trigger</button>}
      >
        <Form
          onSubmit={onSubmit}
          defaultValues={defaults}
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
            name='subscriptionType'
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
          <FormSelect
            name='company'
            label='Company Name'
            options={[
              { id: 'kl402kc', value: 'Apple Inc' },
              { id: 'c340kc340', value: 'Google Inc' }
            ]}
          />
        </Form>
      </Slideover>

      <SectionHeading
        title='Hello There'
        description='lfmsdalfmds'
        action={{ label: 'Create Something', onClick: () => {} }}
      />
    </div>
  )
}

export default App
