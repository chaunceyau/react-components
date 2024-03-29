import * as React from 'react'

import {
  Modal,
  Button,
  Toasts,
  Slideover,
  DropdownMenu,
  SectionHeading,
  //
  Form,
  FormInput,
  FormUpload,
  FormSelect,
  FormToggle,
  FormButton,
  FormTextarea,
  FormDateInput,
  FormRadioGroup
} from '@chaunceyau/react-components'
import '@chaunceyau/react-components/dist/index.css'

import './assets/generated/style.css'
import { FormOption } from '../../dist/components/form/elements/radio/option'

const App = () => {
  async function onSubmitForm(data: any) {
    // call mutation here
    await new Promise((res) => {
      setTimeout(() => {
        console.log(data)
        res(data)
      }, 2500)
    })
  }

  const onDelete = React.useCallback(() => {}, [])
  // const onUploadComplete: (fileId: string)
  //  => Promise<{
  //   fileId: string
  // }>
  const onUploadComplete = React.useCallback(async (key: string) => {
    // return await new Promise((res) =>
    console.log('FILEMAFDSLMAFLSD', key)
    // )
  }, [])

  const options: FormOption[] = React.useMemo(
    () => [
      {
        id: '9ca87723-6c2c-434c-8572-0d64864825f6',
        value: 'Monthly Subscription',
        caption: '$5/mo'
      },
      {
        id: 'b5173512-423e-458d-b55c-151647652dc7',
        value: 'Yearly Subscription',
        caption: '$45/yr'
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
        // {
        //   id: '8cd306aa-9fe1-445b-bb45-56e49786a317',
        //   fileName: 'interesting.png',
        //   status: 'IDLE'
        // },
        // {
        //   id: '84282870-fbeb-47df-a05b-b5924586a634',
        //   fileName: 'another.pdf',
        //   status: 'IDLE'
        // }
      ]
    }),
    []
  )

  // const [isSlideoverOpen, setIsSlideoverOpen] = React.useState(true)
  // const [showModal, setShowModal] = React.useState(true)
  return (
    <div className='max-w-2xl mx-auto py-8'>
      <Toasts />
      <Modal
        title='Delete account'
        description='Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.'
        // show={showModal}
        // onClose={() => setShowModal(false)}
        trigger={<button>modal clicker</button>}
        action={{
          label: 'Deactivate',
          func: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({} as any)
              }, 2000)
            })
          }
        }}
      />
      <DropdownMenu
        links={[
          { to: '/tes', label: 'Account Settings' },
          { to: '/sup', label: 'Support' },
          { to: '/li', label: 'License' }
        ]}
        linkComponent={(link: any) => <a href={link.to}>{link.label}</a>}
      />
      <Slideover
        title='cool test slideover'
        description='lorem ispumfsdlkamfdlsamfldsmalfmsdl'
        // onClose={() => {
        //   console.log('CLSOING')
        //   setIsSlideoverOpen(!isSlideoverOpen)
        // }}
        trigger={<Button buttonStyle='primary'>slideover trigger</Button>}
      >
        <Form id='form123' onSubmit={onSubmitForm} defaultValues={defaults}>
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
            required={false}
            name='profilePhoto'
            label='Profile Photo'
            onDeleteMutation={onDelete}
            // upload={() => {}}
            multiple={true}
            onUploadComplete={onUploadComplete}
            presignedUpload={async (fileData: { id: string; file: File }) => {
              return await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: `
                    # Write your query or mutation here
                    query(
                      $size: Int!
                      $type: String!
                      $fileId: String!
                      $fileName: String!
                    ) {
                      presignedUpload(
                        input: {
                          type: $type
                          size: $size
                          fileId: $fileId
                          fileName: $fileName
                        }
                      ) {
                        url
                        fileId
                        fields {
                          key
                          value
                        }
                      }
                    }
                  `,
                  variables: {
                    fileId: fileData.id,
                    type: fileData.file?.type,
                    size: fileData.file?.size,
                    fileName: fileData.file?.name
                  }
                })
              }).then((res) => res.json())
            }}
          />
          <FormSelect
            name='company'
            label='Company Name'
            options={[
              { id: 'kl402kc', value: 'Apple Inc' },
              { id: 'c340kc340', value: 'Google Inc' }
            ]}
          />
          <FormTextarea name='description' label='Description' />
          <FormDateInput name='eventDate' label='Event Start' />
          <FormButton buttonStyle='primary'>Save Information</FormButton>
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
